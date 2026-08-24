/**
 * Keep the old hnpu.edu.ua URLs alive after the domain moves here.
 *
 * The one-time academic councils (`/uk/specializovana-vchena-rada-…`) and the PDFs they link
 * (`/sites/default/files/…`) are recorded in the state dissertation register, so those exact
 * paths have to keep resolving. Directus holds the mapping in `legacy_redirects`; this
 * middleware turns it into 301s.
 *
 * Two lookup strategies, because the two path shapes have very different traffic:
 *
 * - **Pages** — `/uk/**` never routes anywhere on this site (Ukrainian is the unprefixed default
 *   locale) but `/en/**` is a real locale prefix, so a per-request lookup would hit Directus on
 *   every English page view. The page map is small (~530 rows), so it is loaded in bulk once and
 *   refreshed on a timer.
 * - **Files** — `/sites/default/files/**` can only ever be a legacy URL, and there are thousands
 *   of them. Those are resolved one path at a time and cached, hits and misses alike.
 *
 * A Directus outage must never turn a 404 into a 500: every failure falls through to normal
 * routing.
 */

interface LegacyRedirectRow {
  legacyPath: string
  targetPath?: string | null
  file?: string | null
}

const LEGACY_FILE_PREFIX = '/sites/default/files/'
const LOCALE_PREFIX_RE = /^\/(?:uk|en)\//

/** How long a loaded page map, or a remembered file lookup, stays good. */
const PAGE_MAP_TTL_MS = 10 * 60 * 1000
const FILE_MISS_TTL_MS = 10 * 60 * 1000
/** After a failed bulk load, wait before hammering Directus again. */
const PAGE_MAP_RETRY_MS = 30 * 1000
const MAX_FILE_CACHE_ENTRIES = 5000

let pageMap: Map<string, string> | null = null
let pageMapLoadedAt = 0
let pageMapInFlight: Promise<void> | null = null

const fileHits = new Map<string, string>()
const fileMisses = new Map<string, number>()

function directusBases(): { lookupBase: string; publicBase: string } {
  const config = useRuntimeConfig()
  const publicBase = String(config.public.directusUrl ?? '').replace(/\/$/, '')
  const lookupBase = String(config.directusServerUrl || publicBase).replace(/\/$/, '')
  return { lookupBase, publicBase }
}

/** Percent-encoded and trailing-slash variants must land on the same key the migration wrote. */
function normalizePath(pathname: string): string | null {
  let path = pathname
  try {
    path = decodeURIComponent(pathname)
  }
  catch {
    // Malformed escape — compare the raw path instead of throwing.
  }
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path.startsWith('/') ? path : null
}

async function loadPageMap(): Promise<void> {
  const { lookupBase } = directusBases()
  const response = await $fetch<{ data: LegacyRedirectRow[] }>(`${lookupBase}/items/legacy_redirects`, {
    query: {
      'filter[kind][_eq]': 'page',
      'fields': 'legacyPath,targetPath',
      'limit': -1,
    },
  })
  const next = new Map<string, string>()
  for (const row of response.data ?? []) {
    if (row.legacyPath && row.targetPath) next.set(row.legacyPath, row.targetPath)
  }
  pageMap = next
  pageMapLoadedAt = Date.now()
}

async function pageTargetFor(path: string): Promise<string | null> {
  const stale = Date.now() - pageMapLoadedAt > PAGE_MAP_TTL_MS
  if (!pageMap || stale) {
    if (!pageMapInFlight) {
      pageMapInFlight = loadPageMap()
        .catch(() => {
          // Keep whatever map we already have and back off before retrying.
          pageMapLoadedAt = Date.now() - PAGE_MAP_TTL_MS + PAGE_MAP_RETRY_MS
        })
        .finally(() => {
          pageMapInFlight = null
        })
    }
    // A stale map still answers correctly for everything already migrated; only block when
    // there is nothing to answer with at all.
    if (!pageMap) await pageMapInFlight
  }
  return pageMap?.get(path) ?? null
}

function rememberFileMiss(path: string): void {
  if (fileMisses.size >= MAX_FILE_CACHE_ENTRIES) fileMisses.clear()
  fileMisses.set(path, Date.now())
}

/** The migration's snapshot of old file URLs. */
async function redirectRowFileId(path: string): Promise<string | null> {
  const { lookupBase } = directusBases()
  const response = await $fetch<{ data: LegacyRedirectRow[] }>(`${lookupBase}/items/legacy_redirects`, {
    query: {
      'filter[legacyPath][_eq]': path,
      'fields': 'file',
      'limit': 1,
    },
  })
  return response.data?.[0]?.file ?? null
}

/**
 * The `Legacy Path` field editors fill in on a council document.
 *
 * `legacy_redirects` was built once, by the migration, from the data as it stood then. A defense
 * added afterwards is registered with НАЗЯВО under its old-site URL, and the editor records that
 * URL on the document — so that field has to resolve too, without anyone remembering to mirror
 * the row into a second collection.
 */
async function councilFileId(path: string): Promise<string | null> {
  const { lookupBase } = directusBases()
  const response = await $fetch<{ data: { file?: string | null }[] }>(
    `${lookupBase}/items/dissertation_council_files`,
    {
      query: {
        'filter[legacyPath][_eq]': path,
        'fields': 'file',
        'limit': 1,
      },
    },
  )
  return response.data?.[0]?.file ?? null
}

async function fileIdFor(path: string): Promise<string | null> {
  const cached = fileHits.get(path)
  if (cached) return cached

  const missedAt = fileMisses.get(path)
  if (missedAt && Date.now() - missedAt < FILE_MISS_TTL_MS) return null

  const fileId = await redirectRowFileId(path) ?? await councilFileId(path)
  if (!fileId) {
    rememberFileMiss(path)
    return null
  }
  if (fileHits.size >= MAX_FILE_CACHE_ENTRIES) fileHits.clear()
  fileHits.set(path, fileId)
  return fileId
}

export default defineEventHandler(async (event) => {
  const method = event.method
  if (method !== 'GET' && method !== 'HEAD') return

  const pathname = getRequestURL(event).pathname
  const isFile = pathname.startsWith(LEGACY_FILE_PREFIX)
  if (!isFile && !LOCALE_PREFIX_RE.test(pathname)) return

  const path = normalizePath(pathname)
  if (!path) return

  try {
    if (isFile) {
      const fileId = await fileIdFor(path)
      if (!fileId) return
      const { publicBase } = directusBases()
      return sendRedirect(event, `${publicBase}/assets/${fileId}`, 301)
    }

    const target = await pageTargetFor(path)
    if (target) return sendRedirect(event, target, 301)
  }
  catch {
    // Directus unreachable or the collection is missing — let Nuxt render its own 404.
  }
})
