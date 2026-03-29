/**
 * Options for `strapiFetch`, aligned with `$fetch` JSON calls to Strapi `/api/*`.
 */
export interface StrapiFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD'
  query?: Record<string, unknown>
  body?: Record<string, unknown> | null
  headers?: HeadersInit
  /** When set, sends `Authorization: Bearer <token>`. */
  bearerToken?: string | null
}

/**
 * Thin wrapper around Strapi REST API.
 * Provides URL builders and image URL resolution so Strapi-specific
 * logic stays in one place and components use plain `useFetch`/`$fetch`.
 */
function resolveStrapiApiBaseUrl(
  config: ReturnType<typeof useRuntimeConfig>,
  publicBaseUrl: string,
): string {
  if (!import.meta.server) {
    return publicBaseUrl
  }
  const internal = (config as unknown as { strapiServerUrl?: string }).strapiServerUrl
  if (typeof internal === 'string' && internal.length > 0) {
    return internal
  }
  return publicBaseUrl
}

export function useStrapi() {
  const config = useRuntimeConfig()
  const publicBaseUrl = config.public.strapiUrl as string
  const apiBaseUrl = resolveStrapiApiBaseUrl(config, publicBaseUrl)

  /** Build a full URL for a Strapi REST endpoint, e.g. `/articles?populate=cover` */
  function apiUrl(path: string): string {
    return `${apiBaseUrl}/api${path}`
  }

  /**
   * `$fetch` against Strapi `/api/*` using the same server vs public base URL as `apiUrl`.
   * Optionally attaches a Bearer token for authenticated routes.
   */
  function strapiFetch<TResponse>(
    path: string,
    options?: StrapiFetchOptions,
  ): Promise<TResponse> {
    const { bearerToken, headers: incomingHeaders, ...rest } = options ?? {}
    const headers = new Headers(incomingHeaders as HeadersInit | undefined)
    if (bearerToken) {
      headers.set('Authorization', `Bearer ${bearerToken}`)
    }
    return $fetch<TResponse>(apiUrl(path), {
      ...rest,
      headers,
    })
  }

  /**
   * Resolve a Strapi media URL to an absolute URL.
   * Strapi returns relative paths (e.g. `/uploads/cover.jpg`) for local uploads
   * and absolute URLs for cloud providers.
   * Always uses the public base URL so `<img src>` resolves in the browser.
   */
  function imageUrl(imagePath: string | null | undefined): string | null {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `${publicBaseUrl}${imagePath}`
  }

  return { apiUrl, imageUrl, strapiFetch }
}
