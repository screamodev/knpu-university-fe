<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

const route = useRoute()
const { t, locale, localePath } = useSafeI18nWithRouter()
const { user, jwt, fetchMe, mePending, meRestoreCompleted, logout } = useAuth()

const showLogoutModal = ref(false)

async function onLogoutConfirmed(): Promise<void> {
  await logout()
  showLogoutModal.value = false
  await navigateTo(localePath('/'))
}

useSeoMeta({
  title: () => t('seo.profile.title'),
  description: () => t('seo.profile.description'),
})
useHead({
  htmlAttrs: { lang: locale },
})

onMounted(async () => {
  if (import.meta.client && jwt.value && !user.value) {
    await fetchMe()
  }
  if (!jwt.value) {
    await navigateTo({
      path: localePath('/login'),
      query: { redirect: route.fullPath },
    })
  }
})

const showLoader = computed(
  () => Boolean(jwt.value) && !user.value && mePending.value,
)

const loadFailed = computed(
  () =>
    meRestoreCompleted.value &&
    !mePending.value &&
    Boolean(jwt.value) &&
    !user.value,
)

function formatMemberSince(dateStr: string | undefined): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat(locale.value === 'uk' ? 'uk-UA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

const initials = computed(() => {
  const name = user.value?.username || user.value?.email || '?'
  const cleaned = name.replace(/[^\p{L}\s']/gu, ' ').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    const a = parts[0]?.[0]
    const b = parts[1]?.[0]
    if (a && b) return (a + b).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
})
</script>

<template>
  <div class="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 bg-off-white">
    <div class="max-w-container mx-auto max-w-[560px]">
      <h1 class="font-playfair text-3xl text-navy-deep mb-8 text-center sm:text-left">
        {{ t('auth.profileTitle') }}
      </h1>

      <div
        v-if="showLoader"
        class="rounded-16 border border-border bg-white p-10 flex flex-col items-center justify-center gap-4 shadow-header min-h-[240px]"
      >
        <span
          class="inline-block size-10 rounded-full border-2 border-border border-t-gold animate-spin"
          aria-hidden="true"
        />
        <span class="text-sm text-text-muted font-geologica">{{ t('auth.profileLoading') }}</span>
      </div>

      <div
        v-else-if="loadFailed"
        class="rounded-16 border border-border bg-white p-8 shadow-header text-center"
      >
        <p class="text-navy font-geologica mb-4">{{ t('auth.profileLoadError') }}</p>
        <button
          type="button"
          class="inline-flex bg-gold text-navy-deep border-none py-2.5 px-5 rounded-lg text-sm font-semibold font-geologica transition-all duration-280 hover:bg-gold-light"
          @click="fetchMe()"
        >
          {{ t('auth.retry') }}
        </button>
      </div>

      <div
        v-else-if="user"
        class="rounded-16 border border-border bg-white p-8 sm:p-10 shadow-header flex flex-col sm:flex-row sm:items-start gap-8"
      >
        <div
          class="shrink-0 size-24 rounded-full bg-gold-pale border-2 border-gold/40 flex items-center justify-center text-xl font-semibold text-navy-deep font-geologica mx-auto sm:mx-0"
          aria-hidden="true"
        >
          {{ initials }}
        </div>
        <div class="flex-1 min-w-0 flex flex-col w-full">
          <dl class="space-y-4 font-geologica">
            <div>
              <dt class="text-xs uppercase tracking-wide text-text-muted mb-1">
                {{ t('auth.profileUsername') }}
              </dt>
              <dd class="text-lg text-navy-deep font-medium break-words">{{ user.username }}</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-wide text-text-muted mb-1">
                {{ t('auth.profileEmail') }}
              </dt>
              <dd class="text-lg text-navy-deep break-all">{{ user.email }}</dd>
            </div>
            <div v-if="user.createdAt">
              <dt class="text-xs uppercase tracking-wide text-text-muted mb-1">
                {{ t('auth.profileMemberSince') }}
              </dt>
              <dd class="text-navy">{{ formatMemberSince(user.createdAt) }}</dd>
            </div>
          </dl>
          <div class="mt-8 pt-6 border-t border-border">
            <button
              type="button"
              class="w-full sm:w-auto py-2.5 px-5 rounded-lg text-sm font-semibold font-geologica border border-border text-navy-deep bg-white transition-all duration-280 hover:border-danger hover:text-danger"
              @click="showLogoutModal = true"
            >
              {{ t('auth.logout') }}
            </button>
          </div>
          <AuthLogoutConfirmModal v-model:open="showLogoutModal" @confirm="onLogoutConfirmed" />
        </div>
      </div>
    </div>
  </div>
</template>
