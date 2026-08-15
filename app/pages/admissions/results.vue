<script setup lang="ts">
/**
 * Результати вступу.
 *
 * The lists a ЗВО must publish during the campaign — рейтингові списки, рішення приймальної
 * комісії про рекомендації, накази про зарахування. Each is a section of the `documents`
 * collection, so the admissions office publishes them itself, without a developer.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('admissions.results.title'),
  meta: [{ name: 'description', content: () => t('admissions.results.subtitle') }],
})

const sections = [
  { section: 'admissions-rating-lists', key: 'ratingLists' },
  { section: 'admissions-recommendations', key: 'recommendations' },
  { section: 'admissions-enrolment-orders', key: 'enrolmentOrders' },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.results.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.results.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-3xl">
          {{ t('admissions.results.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-14">
      <section v-for="block in sections" :key="block.section">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
          {{ t(`admissions.results.${block.key}Title`) }}
        </h2>
        <p class="text-body-sm text-text-muted max-w-3xl mb-6">
          {{ t(`admissions.results.${block.key}Intro`) }}
        </p>
        <SharedDocumentList :section="block.section" />
      </section>
    </div>
  </div>
</template>
