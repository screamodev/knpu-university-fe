<script setup lang="ts">
/**
 * Результати рейтингового оцінювання науково-педагогічних працівників.
 *
 * Окрема сторінка при моніторингу: звіти за навчальні роки, які раніше лежали на старому сайті
 * (2021–2024) або надходили текою Google Drive (2024/2025). Наповнює її розділ `staff-rating`
 * колекції `documents`, тож нові рейтинги додає відділ моніторингу з адмінки.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('education.staffRating.title'),
  meta: [{ name: 'description', content: () => t('education.staffRating.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.staffRating.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.staffRating.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.staffRating.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedDocumentList section="staff-rating" />

      <NuxtLink
        :to="localePath('/education/monitoring')"
        class="mt-12 inline-flex items-center gap-2 text-navy font-medium hover:underline"
      >
        {{ t('education.staffRating.backLink') }}
      </NuxtLink>
    </div>
  </div>
</template>
