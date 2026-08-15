import type { SectionTab } from '~/components/shared/SectionTabs.vue'

/**
 * The «ради» group: five sibling pages the client asked to tie together with one tab row,
 * the way /education/quality does it. «Ухвали» is not a tab of its own — the ухвали are a
 * document list on the Вчена рада page.
 */
export const COUNCIL_TABS: SectionTab[] = [
  { path: '/university/council', labelKey: 'nav.links.academicCouncil' },
  { path: '/university/scientific-secretary', labelKey: 'nav.links.scientificSecretary' },
  { path: '/science/boards', labelKey: 'nav.links.boards' },
  { path: '/science/dissertation-councils', labelKey: 'nav.links.dissertationCouncils' },
  { path: '/science/candidate-support', labelKey: 'nav.links.candidateSupport' },
]
