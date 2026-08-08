import { searchSite } from '~~/server/utils/search/engine'
import { SEARCH_TYPES, type SearchLocale, type SearchType } from '~~/server/utils/search/types'

/**
 * Site-wide search.
 *
 * `GET /api/search?q=гуртожиток&type=page&locale=uk&limit=10&offset=0`
 *
 * Covers Directus content, the migrated faculty and prose pages, and the copy of the template
 * pages that lives in the locale files — see `server/utils/search/engine.ts`.
 */

const MAX_LIMIT = 50

function asNumber(value: unknown, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = String(query.q ?? '').slice(0, 200)

  const typeParam = String(query.type ?? '')
  const type = (SEARCH_TYPES as readonly string[]).includes(typeParam)
    ? (typeParam as SearchType)
    : null

  const locale: SearchLocale = query.locale === 'en' ? 'en' : 'uk'

  // Results depend only on the query string, so they are safe to cache briefly at the edge.
  setHeader(event, 'Cache-Control', 'public, max-age=60')

  return searchSite({
    query: q,
    locale,
    type,
    limit: Math.min(asNumber(query.limit, 10), MAX_LIMIT),
    offset: asNumber(query.offset, 0),
  })
})
