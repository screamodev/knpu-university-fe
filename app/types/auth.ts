/**
 * Strapi Users & Permissions: local login and `/users/me` payloads.
 * @see https://docs.strapi.io/dev-docs/plugins/users-permissions#authentication
 */

/** Cookie name for Strapi JWT; keep in sync with `useAuth`, middleware, and plugins. */
export const STRAPI_JWT_COOKIE_NAME = 'strapi_jwt'

/** Client `localStorage` backup when the HTTP cookie is missing or not yet synced (e.g. after reload). */
export const STRAPI_JWT_LS_KEY = 'knpu:strapi-jwt'

/** Non-secret user snapshot in `sessionStorage` for immediate UI after reload; reconciled via `GET /users/me`. */
export const STRAPI_AUTH_USER_SESSION_KEY = 'knpu:auth-user'

/** `useCookie` max-age in seconds (30 days). */
export const STRAPI_JWT_MAX_AGE_SEC = 60 * 60 * 24 * 30

/** Shared options for every `useCookie(STRAPI_JWT_COOKIE_NAME, …)` call so SSR/client stay aligned. */
export function getStrapiJwtCookieOptions() {
  return {
    path: '/' as const,
    sameSite: 'lax' as const,
    maxAge: STRAPI_JWT_MAX_AGE_SEC,
    secure: import.meta.env.PROD,
    default: () => null as string | null,
  }
}

/** Users & Permissions role returned by `GET /users/me?populate=role`. */
export interface StrapiUserRole {
  id: number
  name: string
  type: string
}

/** Authenticated end-user from `POST /api/auth/local` or `GET /api/users/me`. */
export interface StrapiUser {
  id: number
  username: string
  email: string
  /** Present on `GET /users/me`; may be omitted on login payload depending on Strapi version. */
  createdAt?: string
  provider?: string
  updatedAt?: string
  documentId?: string
  confirmed?: boolean
  blocked?: boolean
  /** Populated when fetched with `?populate=role`. */
  role?: StrapiUserRole
}

/** Successful `POST /api/auth/local` body (default JWT mode). */
export interface StrapiLocalLoginResponse {
  jwt: string
  user: StrapiUser
}

/** Typical Strapi error JSON shape (validation and auth failures). */
export interface StrapiErrorPayload {
  error: {
    status?: number
    name?: string
    message?: string
    details?: unknown
  }
}
