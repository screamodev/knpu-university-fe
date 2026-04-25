/**
 * Directus authentication: JSON auth mode, `/users/me`, and session persistence.
 */

/** Cookie name for Directus refresh token payload (SDK + app sync). */
export const DIRECTUS_SESSION_COOKIE_NAME = 'directus_session'

/** Client `localStorage` backup when the HTTP cookie is missing or not yet synced. */
export const DIRECTUS_SESSION_LS_KEY = 'knpu:directus-session'

/** Non-secret user snapshot in `sessionStorage` for immediate UI after reload. */
export const DIRECTUS_AUTH_USER_SESSION_KEY = 'knpu:auth-user'

/** `useCookie` max-age in seconds (aligned with refresh token TTL where applicable). */
export const DIRECTUS_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7

/** Shared options for `useCookie(DIRECTUS_SESSION_COOKIE_NAME, …)`. */
export function getDirectusSessionCookieOptions() {
  return {
    path: '/' as const,
    sameSite: 'lax' as const,
    maxAge: DIRECTUS_SESSION_MAX_AGE_SEC,
    secure: import.meta.env.PROD,
    default: () => null as string | null,
  }
}

/** Directus role (e.g. from `readMe({ fields: ['*', 'role.*'] })`). */
export interface DirectusRole {
  id: string
  name: string
  /** When `true`, user has admin app access (Directus admin). */
  admin_access: boolean
  app_access: boolean
  /** Legacy field kept for compatibility; prefer `admin_access`. */
  type?: string
  icon?: string | null
  description?: string | null
}

/** Authenticated Directus user (`/users/me` / `readMe`). */
export interface DirectusUser {
  id: string
  email?: string | null
  first_name?: string | null
  last_name?: string | null
  status?: string
  role?: string | DirectusRole | null
  token?: string
  last_access?: string | null
  /** Legacy field from old auth model; not present on Directus users. */
  username?: string
  createdAt?: string
  updatedAt?: string
  provider?: string
  documentId?: string
  confirmed?: boolean
  blocked?: boolean
}

/** Successful password login body when using custom `$fetch` (SDK uses its own storage). */
export interface DirectusLocalLoginResponse {
  access_token?: string
  refresh_token?: string
  expires?: number
  user?: DirectusUser
}

/** Typical Directus error JSON shape during migration. */
export interface DirectusErrorPayload {
  errors?: Array<{ message?: string; extensions?: Record<string, unknown> }>
  message?: string
}

