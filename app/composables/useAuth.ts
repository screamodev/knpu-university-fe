import {
  STRAPI_AUTH_USER_SESSION_KEY,
  STRAPI_JWT_COOKIE_NAME,
  STRAPI_JWT_LS_KEY,
  getStrapiJwtCookieOptions,
  type StrapiLocalLoginResponse,
  type StrapiUser,
} from '~/types/auth'

function persistJwtToLocalStorage(token: string | null): void {
  if (!import.meta.client) return
  if (token && token.length > 0) {
    localStorage.setItem(STRAPI_JWT_LS_KEY, token)
  } else {
    localStorage.removeItem(STRAPI_JWT_LS_KEY)
  }
}

function isValidStrapiUserSnapshot(value: unknown): value is StrapiUser {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'number' &&
    (typeof record.username === 'string' || typeof record.email === 'string')
  )
}

function readUserSnapshotFromSessionStorage(): StrapiUser | null {
  if (!import.meta.client) {
    return null
  }
  try {
    const raw = sessionStorage.getItem(STRAPI_AUTH_USER_SESSION_KEY)
    if (!raw || raw.length === 0) {
      return null
    }
    const parsed: unknown = JSON.parse(raw)
    return isValidStrapiUserSnapshot(parsed) ? parsed : null
  } catch {
    return null
  }
}

function persistUserSnapshotToSessionStorage(userRecord: StrapiUser): void {
  if (!import.meta.client) {
    return
  }
  try {
    sessionStorage.setItem(STRAPI_AUTH_USER_SESSION_KEY, JSON.stringify(userRecord))
  } catch {
    // Quota or private mode — session still works via /users/me when possible.
  }
}

function clearUserSnapshotFromSessionStorage(): void {
  if (!import.meta.client) {
    return
  }
  sessionStorage.removeItem(STRAPI_AUTH_USER_SESSION_KEY)
}

function extractLoginToken(response: StrapiLocalLoginResponse & { accessToken?: string }): string | null {
  if (typeof response.jwt === 'string' && response.jwt.length > 0) {
    return response.jwt
  }
  if (typeof response.accessToken === 'string' && response.accessToken.length > 0) {
    return response.accessToken
  }
  return null
}

const MAX_FETCH_ERROR_CAUSE_DEPTH = 5

/** Normalize `$fetch` / ofetch / nested `cause` HTTP status values. */
function coerceFetchHttpStatus(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.trunc(value)
  }
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (/^[1-5]\d{2}$/.test(trimmed)) {
      return Number.parseInt(trimmed, 10)
    }
  }
  return undefined
}

function statusFromFetchLikeRecord(record: Record<string, unknown>): number | undefined {
  const fromStatusCode = coerceFetchHttpStatus(record.statusCode)
  if (fromStatusCode !== undefined) {
    return fromStatusCode
  }
  const fromStatus = coerceFetchHttpStatus(record.status)
  if (fromStatus !== undefined) {
    return fromStatus
  }
  const response = record.response
  if (typeof response === 'object' && response !== null) {
    const status = coerceFetchHttpStatus((response as { status?: unknown }).status)
    if (status !== undefined) {
      return status
    }
  }
  return undefined
}

/**
 * HTTP status from `$fetch` / ofetch errors (getters on `FetchError`, `response.status`, h3 `statusCode`) and optional `cause` chain.
 */
function getFetchErrorStatus(error: unknown): number | undefined {
  let current: unknown = error
  for (let depth = 0; depth < MAX_FETCH_ERROR_CAUSE_DEPTH; depth += 1) {
    if (typeof current !== 'object' || current === null) {
      return undefined
    }
    const record = current as Record<string, unknown>
    const status = statusFromFetchLikeRecord(record)
    if (status !== undefined) {
      return status
    }
    current = record.cause
  }
  return undefined
}

/** Deduplicates concurrent `GET /users/me` calls (same trimmed JWT) to avoid parallel 403s / rate limits. */
let sharedUsersMePromise: Promise<StrapiUser> | null = null
let sharedUsersMeToken: string | null = null

function clearSharedUsersMeFetch(): void {
  sharedUsersMePromise = null
  sharedUsersMeToken = null
}

export type FetchMeOptions = {
  /**
   * When true, do not toggle `mePending` (keeps header/profile stable while refreshing in the background).
   */
  silent?: boolean
}

function extractStrapiErrorMessage(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'Request failed'
  }
  const record = error as Record<string, unknown>
  const data = record.data
  if (typeof data === 'object' && data !== null && 'error' in data) {
    const errObj = (data as { error?: { message?: string } }).error
    if (typeof errObj?.message === 'string' && errObj.message.length > 0) {
      return errObj.message
    }
  }
  if (typeof record.message === 'string' && record.message.length > 0) {
    return record.message
  }
  return 'Request failed'
}

/**
 * Strapi Users & Permissions session: JWT cookie, user state, login / me / logout.
 */
export function useAuth() {
  const strapi = useStrapi()

  const jwt = useCookie<string | null>(STRAPI_JWT_COOKIE_NAME, getStrapiJwtCookieOptions())

  const user = useState<StrapiUser | null>('auth-user', () => null)

  const mePending = ref(false)
  /** Set to true after `fetchMe` finishes (or bails with no token). Used to avoid flashing `sessionMeError` before the client plugin runs. */
  const meRestoreCompleted = ref(false)
  const loginPending = ref(false)
  const loginError = ref<string | null>(null)

  const hasSessionToken = computed(() => Boolean(jwt.value && jwt.value.length > 0))

  const isAuthenticated = computed(() => Boolean(jwt.value && user.value))

  const isAdmin = computed(() => user.value?.role?.type === 'admin')

  function restoreUserSnapshotFromSession(): void {
    if (user.value) {
      return
    }
    const snapshot = readUserSnapshotFromSessionStorage()
    if (snapshot) {
      user.value = snapshot
    }
  }

  async function fetchMe(options?: FetchMeOptions): Promise<void> {
    const raw = jwt.value
    const token = typeof raw === 'string' ? raw.trim() : ''
    if (!token) {
      user.value = null
      meRestoreCompleted.value = true
      clearSharedUsersMeFetch()
      return
    }

    const silent = options?.silent === true
    if (!silent) {
      mePending.value = true
    }

    try {
      let request = sharedUsersMePromise
      if (!request || sharedUsersMeToken !== token) {
        sharedUsersMeToken = token
        const httpPromise = strapi.strapiFetch<StrapiUser>('/users/me?populate=role', {
          method: 'GET',
          bearerToken: token,
        })
        request = httpPromise.finally(() => {
          if (sharedUsersMeToken === token) {
            clearSharedUsersMeFetch()
          }
        })
        sharedUsersMePromise = request
      }

      const me = await request
      user.value = me
      persistUserSnapshotToSessionStorage(me)
    } catch (error: unknown) {
      const status = getFetchErrorStatus(error)
      if (status === 401) {
        user.value = null
        jwt.value = null
        persistJwtToLocalStorage(null)
        clearUserSnapshotFromSessionStorage()
        clearSharedUsersMeFetch()
      }
    } finally {
      if (!silent) {
        mePending.value = false
      }
      meRestoreCompleted.value = true
    }
  }

  async function login(identifier: string, password: string): Promise<boolean> {
    loginPending.value = true
    loginError.value = null
    try {
      const response = await strapi.strapiFetch<StrapiLocalLoginResponse>('/auth/local', {
        method: 'POST',
        body: { identifier, password },
      })
      const token = extractLoginToken(response)
      if (!token) {
        loginError.value = 'Invalid login response (no token)'
        return false
      }
      clearSharedUsersMeFetch()
      jwt.value = token
      persistJwtToLocalStorage(token)
      user.value = response.user
      persistUserSnapshotToSessionStorage(response.user)
      return true
    } catch (error: unknown) {
      loginError.value = extractStrapiErrorMessage(error)
      return false
    } finally {
      loginPending.value = false
    }
  }

  async function logout(): Promise<void> {
    const token = jwt.value
    if (token) {
      try {
        await strapi.strapiFetch<unknown>('/auth/logout', {
          method: 'POST',
          bearerToken: token,
        })
      } catch {
        // Local session is cleared regardless of Strapi response.
      }
    }
    jwt.value = null
    persistJwtToLocalStorage(null)
    user.value = null
    clearUserSnapshotFromSessionStorage()
    clearSharedUsersMeFetch()
  }

  function clearLoginError(): void {
    loginError.value = null
  }

  return {
    jwt,
    user,
    mePending: readonly(mePending),
    meRestoreCompleted: readonly(meRestoreCompleted),
    loginPending: readonly(loginPending),
    loginError: readonly(loginError),
    hasSessionToken,
    isAuthenticated,
    isAdmin,
    restoreUserSnapshotFromSession,
    login,
    fetchMe,
    logout,
    clearLoginError,
  }
}
