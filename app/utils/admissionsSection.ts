import manifest from '~/content/admissions/manifest.json'

/**
 * Розділ приймальної комісії, перенесений зі старого сайту.
 *
 * `/uk/division/pryymalna-komisiya` був не сторінкою, а розділом на 150 сторінок: поточна
 * кампанія, документація комісії й архіви кампаній 2020–2025. Дерево будує
 * `knpu-university-be/migration/admissions/2_emit.py`; самі тексти лежать у
 * `app/content/pages/pk-*.uk.json` і показуються через `SharedStaticPageBody`.
 */
export interface AdmissionsPage {
  slug: string
  title: string
  /** Адреса сторінки на старому сайті — лишається для звірки. */
  source?: string
}

export interface AdmissionsArchive {
  year: string
  pages: AdmissionsPage[]
}

export interface AdmissionsManifest {
  root: string | null
  campaign: AdmissionsPage[]
  archives: AdmissionsArchive[]
}

const section = manifest as AdmissionsManifest

/** Сторінка-корінь розділу: її текст показує /admissions/committee. */
export const ADMISSIONS_ROOT_SLUG = section.root

/** Сторінки поточної кампанії, без кореневої. */
export const ADMISSIONS_CAMPAIGN: AdmissionsPage[] =
  section.campaign.filter(page => page.slug !== section.root)

export const ADMISSIONS_ARCHIVES: AdmissionsArchive[] = section.archives

export function findAdmissionsPage(slug: string): AdmissionsPage | undefined {
  if (slug === section.root) return section.campaign.find(page => page.slug === slug)
  return [...section.campaign, ...section.archives.flatMap(archive => archive.pages)]
    .find(page => page.slug === slug)
}

/** Архів, до якого належить сторінка — щоб показати «назад до кампанії 2023 року». */
export function admissionsArchiveOf(slug: string): AdmissionsArchive | undefined {
  return section.archives.find(archive => archive.pages.some(page => page.slug === slug))
}
