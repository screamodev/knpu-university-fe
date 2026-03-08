/**
 * Thin wrapper around Strapi REST API.
 * Provides URL builders and image URL resolution so Strapi-specific
 * logic stays in one place and components use plain `useFetch`/`$fetch`.
 */
export function useStrapi() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.strapiUrl as string

  /** Build a full URL for a Strapi REST endpoint, e.g. `/articles?populate=cover` */
  function apiUrl(path: string): string {
    return `${baseUrl}/api${path}`
  }

  /**
   * Resolve a Strapi media URL to an absolute URL.
   * Strapi returns relative paths (e.g. `/uploads/cover.jpg`) for local uploads
   * and absolute URLs for cloud providers.
   */
  function imageUrl(imagePath: string | null | undefined): string | null {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `${baseUrl}${imagePath}`
  }

  return { apiUrl, imageUrl }
}
