import type { AuthenticationData, AuthenticationStorage } from '@directus/sdk'

import {
  DIRECTUS_SESSION_COOKIE_NAME,
  DIRECTUS_SESSION_LS_KEY,
  getDirectusSessionCookieOptions,
} from '~/types/auth'

function parseSession(raw: string | null): AuthenticationData | null {
  if (raw === null || raw.length === 0) {
    return null
  }
  try {
    return JSON.parse(raw) as AuthenticationData
  } catch {
    return null
  }
}

/**
 * Persists Directus JSON auth (`access_token` / `refresh_token` / expiry) to the
 * Nuxt cookie (SSR-readable) and mirrors it to `localStorage` for client reload edge cases.
 */
export function useDirectusStorage(): AuthenticationStorage {
  const cookie = useCookie<string | null>(DIRECTUS_SESSION_COOKIE_NAME, getDirectusSessionCookieOptions())

  return {
    get: () => {
      if (import.meta.server) {
        return parseSession(cookie.value)
      }
      let data = parseSession(cookie.value)
      if (!data && typeof localStorage !== 'undefined') {
        const fromLs = localStorage.getItem(DIRECTUS_SESSION_LS_KEY)
        if (fromLs !== null && fromLs.length > 0) {
          cookie.value = fromLs
          data = parseSession(fromLs)
        }
      }
      return data
    },
    set: (value) => {
      if (value === null) {
        cookie.value = null
        if (import.meta.client && typeof localStorage !== 'undefined') {
          localStorage.removeItem(DIRECTUS_SESSION_LS_KEY)
        }
        return
      }
      const serialized = JSON.stringify(value)
      cookie.value = serialized
      if (import.meta.client && typeof localStorage !== 'undefined') {
        localStorage.setItem(DIRECTUS_SESSION_LS_KEY, serialized)
      }
    },
  }
}
