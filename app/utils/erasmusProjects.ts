import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'

/**
 * Проєкти Еразмус+. AMUSE веде на власний сайт; PERFECT, LECTURE і HARMONY описані на сторінках
 * тут — матеріали надіслали координатори, тож покликань на теки Google Drive більше немає.
 *
 * Плитки показують і `/university/erasmus`, і вкладка «Еразмус+ (КА2)» на `/science/grants`
 * (правка 05.11), тому перелік живе в одному місці.
 */
export const ERASMUS_PROJECTS: LinkTile[] = [
  { label: 'AMUSE', url: 'https://amuse.hnpu.edu.ua/', icon: 'globe' },
  { label: 'PERFECT', path: '/university/erasmus/perfect', icon: 'globe' },
  { label: 'LECTURE', path: '/university/erasmus/lecture', icon: 'globe' },
  { label: 'HARMONY', path: '/university/erasmus/harmony', icon: 'globe' },
]
