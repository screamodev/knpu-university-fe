import MiniSearch from 'minisearch'
import { directusDocuments } from './directus'
import { collapse, normalizeSearchTerm, summarize, tokenize } from './text'
import type {
  SearchDocument,
  SearchHit,
  SearchLocale,
  SearchResponse,
  SearchType,
  StaticSearchIndexFile,
} from './types'

/**
 * The index itself.
 *
 * One MiniSearch instance over both halves of the corpus — the static documents baked in at build
 * time and the Directus rows fetched at runtime. Built lazily on the first query, so a site nobody
 * searches never pays for it, and refreshed on the same cadence as the Directus cache. While a
 * refresh runs the previous index keeps answering.
 */

const REBUILD_TTL_MS = 10 * 60 * 1000

interface BuiltIndex {
  mini: MiniSearch<SearchDocument>
  /** Source documents, kept so a rebuild is possible and snippets can quote the real body. */
  byId: Map<string, SearchDocument>
  builtAt: number
}

let index: BuiltIndex | null = null
let building: Promise<BuiltIndex> | null = null
let staticDocuments: SearchDocument[] | null = null

async function loadStaticDocuments(): Promise<SearchDocument[]> {
  if (staticDocuments) return staticDocuments
  try {
    const file = await useStorage('assets:server').getItem<StaticSearchIndexFile | string>(
      'search-static.json',
    )
    const parsed = typeof file === 'string' ? (JSON.parse(file) as StaticSearchIndexFile) : file
    staticDocuments = parsed?.documents ?? []
  }
  catch (error) {
    // Missing file means `pnpm build:search-index` did not run — degrade to Directus-only rather
    // than failing the request.
    console.warn('[search] static index unavailable:', (error as Error)?.message ?? error)
    staticDocuments = []
  }
  return staticDocuments
}

function createMiniSearch(): MiniSearch<SearchDocument> {
  return new MiniSearch<SearchDocument>({
    idField: 'id',
    fields: ['title', 'summary', 'body'],
    // `body` is intentionally not stored: the source documents are kept in `byId`, so storing it
    // again would double the memory for no gain.
    storeFields: ['type', 'url', 'title', 'summary', 'date', 'locale'],
    tokenize,
    processTerm: term => normalizeSearchTerm(term) ?? undefined,
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      combineWith: 'AND',
      boost: { title: 4, summary: 2, body: 1 },
    },
  })
}

async function build(): Promise<BuiltIndex> {
  const documents = [...(await loadStaticDocuments()), ...(await directusDocuments())]
  const mini = createMiniSearch()
  mini.addAll(documents)

  const byId = new Map<string, SearchDocument>()
  for (const document of documents) byId.set(document.id, document)

  return { mini, byId, builtAt: Date.now() }
}

async function getIndex(): Promise<BuiltIndex> {
  const stale = !index || Date.now() - index.builtAt > REBUILD_TTL_MS

  if (stale && !building) {
    building = build()
      .then((built) => {
        index = built
        return built
      })
      .catch((error) => {
        console.warn('[search] index build failed:', (error as Error)?.message ?? error)
        if (index) index.builtAt = Date.now() - REBUILD_TTL_MS + 30_000
        throw error
      })
      .finally(() => {
        building = null
      })
  }

  // Serve the stale index while the new one builds; only a cold start waits.
  if (index) return index
  return building!
}

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => HTML_ESCAPES[character] ?? character)
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Wrap the matched terms in `<mark>`, escaping everything on the way out.
 *
 * The trailing `[\p{L}\p{N}']*` mirrors the prefix search: a query for «студент» highlights the
 * whole of «студентів», not the first seven letters of it.
 */
function highlight(text: string, terms: string[]): string {
  if (!terms.length) return escapeHtml(text)

  const pattern = new RegExp(
    `(${terms.map(escapeRegExp).join('|')})[\\p{L}\\p{N}']*`,
    'giu',
  )

  let result = ''
  let cursor = 0
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0
    result += escapeHtml(text.slice(cursor, start))
    result += `<mark>${escapeHtml(match[0])}</mark>`
    cursor = start + match[0].length
  }
  result += escapeHtml(text.slice(cursor))
  return result
}

const SNIPPET_RADIUS = 90

/** A window of the body around the first match, so the reader sees why this hit came back. */
function snippetFor(document: SearchDocument, terms: string[]): string {
  // Chunk bodies keep paragraph newlines for readability; a one-line snippet does not want them.
  const body = collapse(document.body || document.summary)
  if (!terms.length || !body) return highlight(document.summary, terms)

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'iu')
  const found = body.match(pattern)
  if (!found || found.index === undefined) return highlight(document.summary, terms)

  const start = Math.max(0, found.index - SNIPPET_RADIUS)
  const end = Math.min(body.length, found.index + found[0].length + SNIPPET_RADIUS)
  const slice = `${start > 0 ? '…' : ''}${body.slice(start, end).trim()}${end < body.length ? '…' : ''}`
  return highlight(slice, terms)
}

export interface SearchParams {
  query: string
  locale?: SearchLocale
  type?: SearchType | null
  limit?: number
  offset?: number
}

export async function searchSite({
  query,
  locale = 'uk',
  type = null,
  limit = 10,
  offset = 0,
}: SearchParams): Promise<SearchResponse> {
  const trimmed = query.trim()
  if (trimmed.length < 2) {
    return { query: trimmed, total: 0, types: [], hits: [] }
  }

  const { mini, byId } = await getIndex()

  const raw = mini.search(trimmed, {
    // English visitors still see Ukrainian records — the site's fallback policy everywhere else.
    filter: result => (locale === 'en' ? true : result.locale === 'uk'),
  })

  // One result per URL: a long faculty tab produces many chunks, and a reader wants the page once.
  const seen = new Set<string>()
  const deduped: typeof raw = []
  for (const result of raw) {
    const key = `${result.url}::${result.locale}`
    if (seen.has(key)) continue
    seen.add(key)
    deduped.push(result)
  }

  const counts = new Map<SearchType, number>()
  for (const result of deduped) {
    counts.set(result.type as SearchType, (counts.get(result.type as SearchType) ?? 0) + 1)
  }

  const filtered = type ? deduped.filter(result => result.type === type) : deduped
  const terms = [...new Set(raw.flatMap(result => result.terms))]

  const hits: SearchHit[] = filtered.slice(offset, offset + limit).map((result) => {
    const document = byId.get(String(result.id))
    const title = result.title as string
    // Rows with no body of their own (a document row is just a file) chunk to their own title;
    // repeating it under itself reads as a bug.
    const snippet = document && collapse(document.body) !== collapse(title)
      ? snippetFor(document, terms)
      : ''
    return {
      id: String(result.id),
      type: result.type as SearchType,
      url: result.url as string,
      title,
      summary: (result.summary as string) ?? '',
      snippet: snippet || (document ? '' : highlight(summarize((result.summary as string) ?? ''), terms)),
      date: (result.date as string | null) ?? null,
      score: result.score,
    }
  })

  return {
    query: trimmed,
    total: filtered.length,
    types: [...counts.entries()]
      .map(([entryType, count]) => ({ type: entryType, count }))
      .sort((left, right) => right.count - left.count),
    hits,
  }
}

/** Forces a rebuild on the next query. */
export function invalidateSearchIndex(): void {
  index = null
}
