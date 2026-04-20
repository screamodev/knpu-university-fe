import { readMe } from '@directus/sdk'

import type { DirectusUser } from '~/types/auth'
import {
  DIRECTUS_AUTH_USER_SESSION_KEY,
  DIRECTUS_SESSION_COOKIE_NAME,
  getDirectusSessionCookieOptions,
} from '~/types/auth'

function isValidDirectusUserSnapshot(value: unknown): value is DirectusUser {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  if (typeof record.id !== 'string') {
    return false
  }
  return (
    typeof record.email === 'string' ||
    typeof record.username === 'string' ||
    typeof record.first_name === 'string'
  )
}

function readUserSnapshotFromSessionStorage(): DirectusUser | null {
  if (!import.meta.client) {
    return null
  }
  try {
    const raw = sessionStorage.getItem(DIRECTUS_AUTH_USER_SESSION_KEY)
    if (!raw || raw.length === 0) {
      return null
    }
    const parsed: unknown = JSON.parse(raw)
    return isValidDirectusUserSnapshot(parsed) ? parsed : null
  } catch {
    return null
  }
}

function persistUserSnapshotToSessionStorage(userRecord: DirectusUser): void {
  if (!import.meta.client) {
    return
  }
  try {
    sessionStorage.setItem(DIRECTUS_AUTH_USER_SESSION_KEY, JSON.stringify(userRecord))
  } catch {
    // Quota or private mode — session still works via `readMe` when possible.
  }
}

function clearUserSnapshotFromSessionStorage(): void {
  if (!import.meta.client) {
    return
  }
  sessionStorage.removeItem(DIRECTUS_AUTH_USER_SESSION_KEY)
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

/** Deduplicates concurrent `readMe` calls (same access token) to avoid parallel 403s / rate limits. */
let sharedReadMePromise: Promise<DirectusUser> | null = null
let sharedReadMeToken: string | null = null

function clearSharedReadMeFetch(): void {
  sharedReadMePromise = null
  sharedReadMeToken = null
}

export type FetchMeOptions = {
  /**
   * When true, do not toggle `mePending` (keeps header/profile stable while refreshing in the background).
   */
  silent?: boolean
}

function extractDirectusErrorMessage(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'Request failed'
  }
  const record = error as Record<string, unknown>
  const errors = record.errors
  if (Array.isArray(errors) && errors.length > 0) {
    const first = errors[0] as { message?: string }
    if (typeof first?.message === 'string' && first.message.length > 0) {
      return first.message
    }
  }
  const data = record.data
  if (typeof data === 'object' && data !== null && 'errors' in data) {
    const nested = (data as { errors?: Array<{ message?: string }> }).errors
    if (Array.isArray(nested) && nested.length > 0) {
      const msg = nested[0]?.message
      if (typeof msg === 'string' && msg.length > 0) {
        return msg
      }
    }
  }
  if (typeof record.message === 'string' && record.message.length > 0) {
    return record.message
  }
  return 'Request failed'
}

/**
 * Directus session: JSON auth cookie + `readMe`, login / logout via SDK.
 */
export function useAuth() {
  const { client } = useDirectus()

  const sessionCookie = useCookie<string | null>(DIRECTUS_SESSION_COOKIE_NAME, getDirectusSessionCookieOptions())

  const jwt = computed((): string | null => {
    const raw = sessionCookie.value
    if (raw === null || raw.length === 0) {
      return null
    }
    try {
      const parsed = JSON.parse(raw) as { access_token?: string | null }
      const t = parsed.access_token
      return typeof t === 'string' && t.length > 0 ? t : null
    } catch {
      return null
    }
  })

  const user = useState<DirectusUser | null>('auth-user', () => null)

  const mePending = ref(false)
  /** Set to true after `fetchMe` finishes (or bails with no token). Used to avoid flashing `sessionMeError` before the client plugin runs. */
  const meRestoreCompleted = ref(false)
  const loginPending = ref(false)
  const loginError = ref<string | null>(null)

  const hasSessionToken = computed(() => Boolean(jwt.value && jwt.value.length > 0))

  const isAuthenticated = computed(() => Boolean(jwt.value && user.value))

  const isAdmin = computed(() => {
    const role = user.value?.role
    if (!role || typeof role !== 'object') {
      return false
    }
    return 'admin_access' in role && role.admin_access === true
  })

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
    const token = await client.getToken()
    if (!token || token.length === 0) {
      user.value = null
      meRestoreCompleted.value = true
      clearSharedReadMeFetch()
      return
    }

    const silent = options?.silent === true
    if (!silent) {
      mePending.value = true
    }

    try {
      let request = sharedReadMePromise
      if (!request || sharedReadMeToken !== token) {
        sharedReadMeToken = token
        const httpPromise = client.request(
          readMe({
            fields: ['*', { role: ['id', 'name', 'admin_access', 'app_access'] }],
          }),
        ) as Promise<DirectusUser>
        request = httpPromise.finally(() => {
          if (sharedReadMeToken === token) {
            clearSharedReadMeFetch()
          }
        })
        sharedReadMePromise = request
      }

      const me = await request
      user.value = me
      persistUserSnapshotToSessionStorage(me)
    } catch (error: unknown) {
      const status = getFetchErrorStatus(error)
      if (status === 401) {
        user.value = null
        clearUserSnapshotFromSessionStorage()
        clearSharedReadMeFetch()
        try {
          await client.logout()
        } catch {
          // Session cleared locally regardless of Directus response.
        }
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
      await client.login(identifier.trim(), password)
      clearSharedReadMeFetch()
      const me = (await client.request(
        readMe({
          fields: ['*', { role: ['id', 'name', 'admin_access', 'app_access'] }],
        }),
      )) as DirectusUser
      user.value = me
      persistUserSnapshotToSessionStorage(me)
      return true
    } catch (error: unknown) {
      loginError.value = extractDirectusErrorMessage(error)
      return false
    } finally {
      loginPending.value = false
    }
  }

  async function logout(): Promise<void> {
    try {
      await client.logout()
    } catch {
      // Local session is cleared regardless of Directus response.
    }
    user.value = null
    clearUserSnapshotFromSessionStorage()
    clearSharedReadMeFetch()
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
