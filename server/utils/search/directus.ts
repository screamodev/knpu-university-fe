import { SEARCH_COLLECTIONS, type CollectionSource } from './collections'
import { chunkText, collapse, stripHtml, summarize } from './text'
import type { SearchDocument, SearchLocale } from './types'

/**
 * The runtime half of the index: everything editors manage in Directus.
 *
 * Fetched in one pass and cached in process for `TTL_MS`, the same shape of cache the legacy
 * redirect middleware already uses. A failing collection is skipped rather than allowed to empty
 * the whole index — a search that is missing one collection is still a working search.
 */

const TTL_MS = 10 * 60 * 1000

interface Cache {
  documents: SearchDocument[]
  fetchedAt: number
}

let cache: Cache | null = null
let inFlight: Promise<SearchDocument[]> | null = null

function directusBases(): { lookupBase: string; publicBase: string } {
  const config = useRuntimeConfig()
  const publicBase = String(config.public.directusUrl ?? '').replace(/\/$/, '')
  const lookupBase = String(config.directusServerUrl || publicBase).replace(/\/$/, '')
  return { lookupBase, publicBase }
}

/** Article bodies are either editor HTML or the legacy block JSON; both must reduce to text. */
function fieldText(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return stripHtml(value)
  if (typeof value === 'number') return String(value)
  if (Array.isArray(value)) return value.map(fieldText).filter(Boolean).join('\n')
  if (typeof value === 'object') {
    const node = value as Record<string, unknown>
    if (typeof node.text === 'string') return node.text
    if (Array.isArray(node.children)) return fieldText(node.children)
    return ''
  }
  return ''
}

/**
 * Ask for `*` rather than an explicit field list.
 *
 * Directus answers **403** — not a friendlier error — when a requested field does not exist or is
 * not readable, which would take a whole collection out of the index because one optional field
 * was renamed. With `*` the descriptor decides which of the returned fields to use, and a field
 * that is gone is simply absent.
 */
const REQUESTED_FIELDS = '*'

function documentsFor(
  source: CollectionSource,
  rows: Record<string, any>[],
  publicBase: string,
): SearchDocument[] {
  const documents: SearchDocument[] = []

  for (const row of rows) {
    const rawUrl = source.url(row)
    if (!rawUrl) continue
    const url = rawUrl.startsWith('asset:')
      ? `${publicBase}/assets/${rawUrl.slice('asset:'.length)}`
      : rawUrl

    const date = source.dateField ? (row[source.dateField] ?? null) : null

    // English gets its own document only when the row is actually translated; otherwise an
    // English visitor still finds the Ukrainian record, which is the site-wide fallback policy.
    const locales: SearchLocale[] = ['uk']
    const englishTitle = source.title.en ? collapse(fieldText(row[source.title.en])) : ''
    const englishBody = (source.body?.en ?? [])
      .map(field => fieldText(row[field]))
      .filter(Boolean)
      .join('\n')
    if (englishTitle || englishBody) locales.push('en')

    for (const locale of locales) {
      const title = source.titleText
        ? source.titleText[locale]
        : locale === 'en'
          ? englishTitle || collapse(fieldText(row[source.title.uk]))
          : collapse(fieldText(row[source.title.uk]))
      if (!title) continue

      const body = locale === 'en'
        ? [englishBody, ...(source.body?.uk ?? []).map(field => fieldText(row[field]))]
        : (source.body?.uk ?? []).map(field => fieldText(row[field]))

      // The title is a searchable field of its own, so the chunks carry the body alone — that
      // keeps the summary from being a copy of the heading right above it.
      const text = body.filter(Boolean).join('\n')
      const chunks = text ? chunkText(text) : [title]
      chunks.forEach((chunk, index) => {
        documents.push({
          id: `${source.collection}:${locale}:${row.id}:${index}`,
          type: source.type,
          locale,
          url,
          title,
          summary: summarize(chunk),
          body: chunk,
          date,
        })
      })
    }
  }

  return documents
}

async function fetchCollection(
  source: CollectionSource,
  lookupBase: string,
  publicBase: string,
): Promise<SearchDocument[]> {
  const query: Record<string, string> = { fields: REQUESTED_FIELDS, limit: '-1' }
  if (source.hasStatus !== false) query['filter[status][_eq]'] = 'published'

  const response = await $fetch<{ data: Record<string, any> | Record<string, any>[] }>(
    `${lookupBase}/items/${source.collection}`,
    { query },
  )

  // A singleton collection answers with the record itself, not a list of one.
  const data = response.data
  const rows = Array.isArray(data) ? data : data ? [data] : []
  return documentsFor(source, rows, publicBase)
}

async function fetchAll(): Promise<SearchDocument[]> {
  const { lookupBase, publicBase } = directusBases()
  const documents: SearchDocument[] = []

  const results = await Promise.allSettled(
    SEARCH_COLLECTIONS.map(source => fetchCollection(source, lookupBase, publicBase)),
  )

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      documents.push(...result.value)
      return
    }
    // A collection that does not exist in this environment, or a permission gap: log once and
    // carry on. Never let it take the rest of the index down.
    console.warn(
      `[search] skipped ${SEARCH_COLLECTIONS[index]?.collection}:`,
      (result.reason as Error)?.message ?? result.reason,
    )
  })

  return documents
}

/** Cached Directus documents. Serves the previous set while a refresh is in flight. */
export async function directusDocuments(): Promise<SearchDocument[]> {
  const fresh = cache && Date.now() - cache.fetchedAt < TTL_MS
  if (fresh) return cache!.documents

  if (!inFlight) {
    inFlight = fetchAll()
      .then((documents) => {
        cache = { documents, fetchedAt: Date.now() }
        return documents
      })
      .catch((error) => {
        console.warn('[search] Directus feed failed:', (error as Error)?.message ?? error)
        // Back off before retrying, and keep serving whatever we already had.
        if (cache) cache.fetchedAt = Date.now() - TTL_MS + 30_000
        return cache?.documents ?? []
      })
      .finally(() => {
        inFlight = null
      })
  }

  // A stale set still answers correctly for everything already published; only block on a cold start.
  return cache ? cache.documents : inFlight
}

/** Drops the cache so the next search refetches. Used by the reindex endpoint. */
export function invalidateDirectusDocuments(): void {
  cache = null
}
