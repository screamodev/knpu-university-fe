<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const { t, locale, localePath } = useSafeI18nWithRouter()
const { isAuthenticated } = useAuth()

useSeoMeta({
  title: () => t('seo.login.title'),
  description: () => t('seo.login.description'),
})
useHead({
  htmlAttrs: { lang: locale },
})

function safeRedirectPath(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw.length === 0) return null
  if (!raw.startsWith('/') || raw.startsWith('//')) return null
  return raw
}

watch(
  isAuthenticated,
  async (ok) => {
    if (!ok) return
    const redirect = safeRedirectPath(route.query.redirect)
    await navigateTo(redirect ?? localePath('/'))
  },
  { immediate: true },
)
</script>

<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 bg-off-white">
    <div class="w-full max-w-[440px] rounded-16 border border-border bg-white p-8 sm:p-10 shadow-header">
      <h1 class="font-playfair text-2xl sm:text-[1.75rem] text-navy-deep mb-2 text-center">
        {{ t('auth.loginTitle') }}
      </h1>
      <p class="text-sm text-text-muted text-center mb-8 font-geologica">
        {{ t('utility.cabinet') }}
      </p>
      <AuthLoginForm />
    </div>
  </div>
</template>
