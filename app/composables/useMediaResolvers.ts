import type { MediaUrlResolvers } from '~/utils/directusMedia'

/**
 * Resolvers for the two kinds of image the site serves: files stored in Directus, and images
 * still hosted on the legacy Drupal site (imported news bodies reference them by absolute URL).
 *
 * Every page that renders CMS media used to define this pair inline; keep it here so a change
 * to asset URL handling lands in one place.
 */
export function useMediaResolvers() {
  const { assetUrl, publicUrl } = useDirectus()

  /** Legacy media path: absolute URLs pass through, relative ones resolve against Directus. */
  function legacyImageUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    return `${publicUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
  }

  const mediaResolvers: MediaUrlResolvers = { assetUrl, legacyImageUrl }

  return { assetUrl, legacyImageUrl, mediaResolvers, publicUrl }
}
