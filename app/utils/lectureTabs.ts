import type { SectionTab } from '~/components/shared/SectionTabs.vue'

/**
 * Сторінки проєкту Еразмус+ LECTURE: головна й п'ять підсторінок, про які просила координаторка
 * (лист «Оновлення сторінки Lecture», 03.11). Кожна — окремий маршрут, тож вкладки — посилання.
 */
export const LECTURE_TABS: SectionTab[] = [
  { path: '/university/erasmus/lecture', labelKey: 'university.erasmus.projects.lecture.tabs.home', exact: true },
  { path: '/university/erasmus/lecture/partners', labelKey: 'university.erasmus.projects.lecture.tabs.partners' },
  { path: '/university/erasmus/lecture/documents', labelKey: 'university.erasmus.projects.lecture.tabs.documents' },
  { path: '/university/erasmus/lecture/team', labelKey: 'university.erasmus.projects.lecture.tabs.team' },
  { path: '/university/erasmus/lecture/contacts', labelKey: 'university.erasmus.projects.lecture.tabs.contacts' },
  { path: '/university/erasmus/lecture/news', labelKey: 'university.erasmus.projects.lecture.tabs.news' },
]
