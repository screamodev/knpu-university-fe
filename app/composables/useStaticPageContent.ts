import { readItems } from '@directus/sdk'
import type { DirectusStaticPage } from '~/types/directus'
import { loadStaticPage, type StaticPageContent } from '~/utils/staticPages'

/**
 * Body of one standalone page — from Directus where an editor has written one, otherwise from
 * the content migrated off the old site.
 *
 * Same arrangement as `useStructureTabContent`, for the same reason: the спеціалізовані вчені
 * ради publish new захисти every few weeks, and each one used to mean a commit and a rebuild.
 * A page switches over to the CMS the moment its row appears, and deleting the row switches it
 * back. The migrated copy also stands in when Directus is unreachable — a page must not go blank
 * because the CMS is restarting.
 */
export interface StaticPageResult {
  content: StaticPageContent
  /** Locale the body is actually in; `uk` for an English page with no translation yet. */
  locale: string
}

export function useStaticPageContent() {
  const { client } = useDirectus()

  async function fetchRow(slug: string): Promise<DirectusStaticPage | null> {
    const rows = await client.request(
      readItems('static_pages', {
        fields: ['body', 'bodyEn'],
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' },
        },
        limit: 1,
      }),
    )
    return (rows as DirectusStaticPage[])[0] ?? null
  }

  async function fetchStaticPage(slug: string, locale: string): Promise<StaticPageResult | null> {
    const fallback = await loadStaticPage(slug, locale)

    let row: DirectusStaticPage | null = null
    try {
      row = await fetchRow(slug)
    } catch {
      // Directus down, or the collection not yet created on this environment. The migrated copy
      // is still what the page showed before it moved to the CMS.
      return fallback
    }

    const english = locale !== 'uk' && (row?.bodyEn ?? '').trim()
    const body = english || (row?.body ?? '').trim()
    if (!body) return fallback

    return {
      // Один рядок — одна секція без заголовка: заголовки вже в тілі як `<h2>`.
      content: {
        ...(fallback?.content ?? {}),
        sections: [{ html: body }],
      },
      locale: english ? locale : 'uk',
    }
  }

  return { fetchStaticPage }
}
