import {
  authentication,
  createDirectus,
  rest,
  type AuthenticationClient,
  type AuthenticationStorage,
  type DirectusClient,
  type RestClient,
} from '@directus/sdk'

import type { DirectusSchema } from '~/types/directus'
import { assetTransformQuery, type AssetTransform } from '~/utils/imageTransform'

/**
 * Fully-composed Directus client used throughout the app: typed access to
 * collections via REST + authentication helpers (`login`, `logout`, `refresh`, …).
 */
export type DirectusAppClient = DirectusClient<DirectusSchema> &
  AuthenticationClient<DirectusSchema> &
  RestClient<DirectusSchema>

/** Minimum shape required to resolve an asset URL from a populated file field. */
export type DirectusFileRef = { id: string; filename_download?: string | null }

/**
 * Choose the base URL for Directus HTTP requests.
 *
 * - Browser: always the public URL (what `<img src>` / fetch can reach).
 * - Server (SSR / server routes): prefer `NUXT_DIRECTUS_SERVER_URL` when set
 *   (e.g. `http://host.docker.internal:8055` when Nuxt runs in Docker and
 *   Directus is on the host). Fall back to the public URL.
 */
function resolveDirectusBaseUrl(
  config: ReturnType<typeof useRuntimeConfig>,
  publicUrl: string,
): string {
  if (!import.meta.server) {
    return publicUrl
  }
  const internal = (config as unknown as { directusServerUrl?: string }).directusServerUrl
  if (typeof internal === 'string' && internal.length > 0) {
    return internal
  }
  return publicUrl
}

interface DirectusClientCache {
  baseUrl: string
  client: DirectusAppClient
}

/**
 * Cache the client on the current NuxtApp so repeated `useDirectus()` calls
 * within the same request share the same instance (and, crucially, the same
 * in-memory auth state). A fresh Nuxt app instance per SSR request means no
 * state leaks between concurrent users.
 */
function getDirectusStorageSingleton(): AuthenticationStorage {
  const nuxtApp = useNuxtApp() as unknown as { __directusAuthStorage?: AuthenticationStorage }
  if (!nuxtApp.__directusAuthStorage) {
    nuxtApp.__directusAuthStorage = useDirectusStorage()
  }
  return nuxtApp.__directusAuthStorage
}

function getOrCreateDirectusClient(baseUrl: string, storage: AuthenticationStorage): DirectusAppClient {
  const nuxtApp = useNuxtApp() as unknown as { __directusClient?: DirectusClientCache }
  const cached = nuxtApp.__directusClient
  if (cached && cached.baseUrl === baseUrl) {
    return cached.client
  }

  const client = createDirectus<DirectusSchema>(baseUrl)
    .with(authentication('json', { autoRefresh: true, storage }))
    .with(rest()) as DirectusAppClient

  nuxtApp.__directusClient = { baseUrl, client }
  return client
}

/**
 * Thin wrapper around the Directus SDK. Centralizes base-URL resolution and
 * asset URL building so components just call `useDirectus()` and go.
 *
 * Example:
 * ```ts
 * const { client, assetUrl } = useDirectus()
 * const articles = await client.request(readItems('articles', { fields: ['*', 'cover.*'] }))
 * const coverSrc = assetUrl(articles[0]?.cover)
 * ```
 */
export function useDirectus() {
  const config = useRuntimeConfig()
  const publicUrl = config.public.directusUrl as string
  const baseUrl = resolveDirectusBaseUrl(config, publicUrl)

  const storage = getDirectusStorageSingleton()
  const client = getOrCreateDirectusClient(baseUrl, storage)

  /**
   * Build an absolute URL for a Directus file asset.
   *
   * Accepts either a raw file UUID (unexpanded M2O), a populated file object
   * (from `fields: ['cover.*']`), or `null`/`undefined` — returning `null`
   * when no valid id is available so callers can use `<img v-if="src">`.
   * Always uses the public URL so the URL works in the browser regardless of
   * whether it was produced on the server during SSR.
   *
   * Pass `transform` to have Directus resize/convert the image instead of serving the
   * original — covers are multi-megabyte photos straight off a camera.
   */
  function assetUrl(
    fileOrId: string | DirectusFileRef | null | undefined,
    transform?: AssetTransform,
  ): string | null {
    if (fileOrId === null || fileOrId === undefined) {
      return null
    }
    const id = typeof fileOrId === 'string' ? fileOrId : fileOrId.id
    if (typeof id !== 'string' || id.length === 0) {
      return null
    }
    const query = assetTransformQuery(transform)
    // Directus serves the same file at /assets/:id/:filename. Keeping the name in the address
    // means a document opens in a tab titled «Pro_naykovi_shkolu_20.pdf» rather than a bare uuid,
    // and saves under that name — the uuid link looked broken to editors.
    const name = typeof fileOrId === 'object' ? fileOrId.filename_download : null
    const suffix = name && !query ? `/${encodeURIComponent(name)}` : ''
    return `${publicUrl}/assets/${id}${suffix}${query ? `?${query}` : ''}`
  }

  return { client, assetUrl, publicUrl, baseUrl }
}
