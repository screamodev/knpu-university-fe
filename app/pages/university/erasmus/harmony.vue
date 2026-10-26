<script setup lang="ts">
/**
 * Проєкт HARMONY.
 *
 * Це окремий проєкт, не Erasmus+ — тому тут немає ні емблеми ЄС, ні згадок програми. Адреса
 * `/university/erasmus/harmony` тимчасова: сторінку перенесемо, коли стане відомо куди.
 * Тексти розділів — заглушки в `content/pages/harmony.*.json`, поки немає матеріалів.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.harmony.title'),
  meta: [{ name: 'description', content: () => t('university.harmony.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('university.harmony.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.harmony.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.harmony.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="harmony" />

      <NuxtLink
        :to="localePath('/university/erasmus')"
        class="mt-12 inline-flex items-center gap-2 text-navy font-medium hover:underline"
      >
        ← {{ t('university.erasmus.backToErasmus') }}
      </NuxtLink>
    </div>
  </div>
</template>
