<script setup lang="ts">
/**
 * «Додаткові освітні послуги».
 *
 * Sits next to «Фінансова діяльність» on the public-information hub: the same shape — a list of
 * documents the university has to publish — so it is `SharedDocumentList` over its own section,
 * and editors add files without anyone touching the code.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.extraServices.title'),
  meta: [{ name: 'description', content: () => t('university.extraServices.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.extraServices.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.extraServices.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.extraServices.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('university.extraServices.intro') }}
      </p>

      <SharedDocumentList section="extra-education-services" />
    </div>
  </div>
</template>
