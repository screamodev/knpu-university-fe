import { readItems } from '@directus/sdk'
import type { DirectusStructurePage } from '~/types/directus'
import {
  loadStructureTabContent,
  type StructureTabContent,
  type StructureTabId,
} from '~/utils/structureContent'

/**
 * Body of one tab of one structure unit — from Directus where an editor has written one,
 * otherwise from the content migrated off the old site.
 *
 * The migrated JSON lives in the bundle (`~/utils/structureContent`), so a text change used to
 * mean a commit and a rebuild. `structure_pages` moves that text into the admin panel, one unit
 * at a time: a tab switches over the moment its row appears, and deleting the row switches it
 * back. The static copy also stands in when Directus is unreachable — a unit page must not go
 * blank because the CMS is restarting.
 */
export interface StructureTabResult {
  content: StructureTabContent
  /** Locale the body is actually in; `uk` for an English page with no translation yet. */
  locale: string
}

export function useStructureTabContent() {
  const { client } = useDirectus()

  async function fetchRow(unit: string, tab: StructureTabId): Promise<DirectusStructurePage | null> {
    const rows = await client.request(
      readItems('structure_pages', {
        fields: ['body', 'bodyEn'],
        filter: {
          unit_slug: { _eq: unit },
          tab: { _eq: tab },
          status: { _eq: 'published' },
        },
        limit: 1,
      }),
    )
    return (rows as DirectusStructurePage[])[0] ?? null
  }

  async function fetchStructureTabContent(
    unit: string,
    tab: StructureTabId,
    locale: string,
  ): Promise<StructureTabResult | null> {
    const fallback = await loadStructureTabContent(unit, tab, locale)

    let row: DirectusStructurePage | null = null
    try {
      row = await fetchRow(unit, tab)
    } catch {
      // Directus down, or the collection not yet created on this environment. The migrated copy
      // is still correct — it is what the page showed before the tab moved to the CMS.
      return fallback
    }

    const english = locale !== 'uk' && (row?.bodyEn ?? '').trim()
    const body = english || (row?.body ?? '').trim()
    if (!body) return fallback

    return {
      // Один рядок — одна секція без заголовка: заголовки вже в тілі як `<h2>`.
      content: {
        sections: [{ html: body }],
        // Посилання під текстом поки що не редагуються — беремо їх із мігрованого файла, який
        // читає й плитковий список на «Головній» (`StructureUnitTiles`).
        links: fallback?.content.links ?? [],
      },
      locale: english ? locale : 'uk',
    }
  }

  return { fetchStructureTabContent }
}
