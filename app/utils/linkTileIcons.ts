/**
 * Inline icon set shared by the section-link tiles (`SharedLinkTileGrid`) and the home page's
 * «Корисні покликання» pills. Eight shapes cover everything the client asked for, so there is no
 * icon library involved.
 */
export type LinkTileIcon =
  | 'document'
  | 'council'
  | 'students'
  | 'shield'
  | 'globe'
  | 'award'
  | 'book'
  | 'link'

const ICON_PATHS: Record<LinkTileIcon, string[]> = {
  document: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h8', 'M8 17h8'],
  council: ['M3 21h18', 'M5 21V10l7-5 7 5v11', 'M9 21v-6h6v6'],
  students: ['M12 3L2 8l10 5 10-5-10-5z', 'M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5'],
  shield: ['M12 3l8 3v6c0 4.4-3.4 8.4-8 9-4.6-.6-8-4.6-8-9V6l8-3z', 'M9 12l2 2 4-4'],
  globe: ['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M3 12h18', 'M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9z'],
  award: ['M12 3a5 5 0 100 10 5 5 0 000-10z', 'M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5'],
  book: ['M4 4h7a2 2 0 012 2v14a2 2 0 00-2-2H4z', 'M20 4h-7a2 2 0 00-2 2v14a2 2 0 012-2h7z'],
  link: ['M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.5 1.5', 'M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7L12 19'],
}

export function linkTileIconPaths(icon: LinkTileIcon | undefined): string[] {
  return ICON_PATHS[icon ?? 'link']
}
