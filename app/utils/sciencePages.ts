/**
 * Сторінки розділу «Наука», перенесені зі старого сайту або створені за текстом правок 16.09
 * (п. 2, нове меню «Наука»). Тіло кожної — `static_pages` в адмінці (slug `science-<slug>`), а
 * `app/content/pages/science-<slug>.uk.json` — перша версія й запасний варіант.
 *
 * `research-units` — перелік НДІ, центрів і лабораторій, його малює сама сторінка.
 */
export type ScienceParent = 'library' | 'research' | 'publishing'

export interface SciencePage {
  slug: string
  title: { uk: string; en: string }
  parent: ScienceParent
}

export const SCIENCE_PAGES: SciencePage[] = [
  { slug: 'bibliographic-indexes', title: { uk: 'Бібліографічні покажчики', en: 'Bibliographic indexes' }, parent: 'library' },
  { slug: 'notable-scientists', title: { uk: 'Видатні вчені ХНПУ імені Г. С. Сковороди', en: 'Distinguished scholars of the university' }, parent: 'library' },
  { slug: 'inexhaustible-treasure', title: { uk: 'Невичерпний скарб', en: 'The Inexhaustible Treasure' }, parent: 'library' },
  { slug: 'library-projects', title: { uk: 'Проєкти наукової бібліотеки', en: 'Library projects' }, parent: 'library' },
  { slug: 'scientometric-databases', title: { uk: 'Доступ до наукометричних баз', en: 'Access to scientometric databases' }, parent: 'library' },
  { slug: 'rankings', title: { uk: 'Університет у рейтингах', en: 'The university in rankings' }, parent: 'research' },
  { slug: 'grants', title: { uk: 'Грантова і проєктна діяльність', en: 'Grants and projects' }, parent: 'research' },
  { slug: 'publication-activity', title: { uk: 'Публікаційна активність', en: 'Publication activity' }, parent: 'publishing' },
  { slug: 'publishing-regulations', title: { uk: 'Нормативна документація редакційно-видавничого відділу', en: 'Regulations of the publishing department' }, parent: 'publishing' },
  { slug: 'publishing-about', title: { uk: 'Про редакційно-видавничий відділ', en: 'About the publishing department' }, parent: 'publishing' },
  { slug: 'publishing-recommendation', title: { uk: 'Порядок рекомендації видань', en: 'Publication approval procedures' }, parent: 'publishing' },
  { slug: 'publishing-accompanying', title: { uk: 'Супровідна документація щодо затвердження до друку видань', en: 'Documents for publication approval' }, parent: 'publishing' },
  { slug: 'publishing-useful-links', title: { uk: 'Корисні посилання', en: 'Useful links' }, parent: 'publishing' },
  { slug: 'research-units', title: { uk: 'НДІ, центри, лабораторії', en: 'Research institutes, centres and laboratories' }, parent: 'research' },
]

/** Положення про редакційно-видавничий відділ — документ зі старого сайту в медіатеці. */
export const PUBLISHING_REGULATION_ASSET = '024e05f9-426b-522a-8c4e-930d809d6700'

export function findSciencePage(slug: string): SciencePage | undefined {
  return SCIENCE_PAGES.find(page => page.slug === slug)
}
