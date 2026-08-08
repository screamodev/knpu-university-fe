/**
 * The one document shape the search index works with.
 *
 * Everything searchable on the site is flattened into this: a Directus row, a chunk of a migrated
 * faculty page, or the copy of a template page pulled out of the locale files. The producers are
 * `scripts/build-search-index.mjs` (build time) and `server/utils/search/directus.ts` (runtime).
 */

/** Result grouping. Kept coarse — these are the filter chips a visitor actually reasons about. */
export const SEARCH_TYPES = [
  'page',
  'faculty',
  'news',
  'council',
  'document',
  'programme',
  'event',
  'science',
  'other',
] as const

export type SearchType = (typeof SEARCH_TYPES)[number]

export type SearchLocale = 'uk' | 'en'

export interface SearchDocument {
  /** `${type}:${source}:${chunk}` — stable across rebuilds so results do not jump. */
  id: string
  type: SearchType
  locale: SearchLocale
  /** Unprefixed route (`/news/foo`) or absolute URL for a file; the UI runs it through `localePath`. */
  url: string
  title: string
  /** Shown under the title in results. Capped, because it is stored in the index. */
  summary: string
  /** Indexed but never stored — this is what keeps the index small enough for a 384 MB container. */
  body: string
  /** ISO date where the source has one; used to break ties on equally-relevant hits. */
  date?: string | null
}

/** What `scripts/build-search-index.mjs` writes into `server/assets/`. */
export interface StaticSearchIndexFile {
  generatedAt: string
  documents: SearchDocument[]
}

export interface SearchHit {
  id: string
  type: SearchType
  url: string
  title: string
  summary: string
  /** `summary` with the matched terms wrapped in `<mark>`; already HTML-escaped. */
  snippet: string
  date?: string | null
  score: number
}

export interface SearchResponse {
  query: string
  total: number
  /** Counts per type for the whole result set, so filter chips can show numbers. */
  types: { type: SearchType; count: number }[]
  hits: SearchHit[]
}
