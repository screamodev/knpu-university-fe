<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useSeoMeta({
  title: () => t('seo.admissionsEdebo.title'),
  description: () => t('seo.admissionsEdebo.description'),
})

const EDBO_PORTAL = 'https://vstup.edbo.gov.ua/'
const MON_ADMISSIONS = 'https://mon.gov.ua/osvita-2/vishcha-osvita-ta-osvita-doroslikh/vstupna-kampaniia-do-zvo'
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('standalonePages.admissionsEdebo.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('standalonePages.admissionsEdebo.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('standalonePages.admissionsEdebo.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      <p class="text-body text-text-muted max-w-3xl">{{ t('standalonePages.admissionsEdebo.intro') }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article class="border border-border rounded-16 p-6">
          <h2 class="font-playfair text-lg font-semibold text-navy mb-3">
            {{ t('standalonePages.admissionsEdebo.stepSecureTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted">{{ t('standalonePages.admissionsEdebo.stepSecureBody') }}</p>
        </article>
        <article class="border border-border rounded-16 p-6">
          <h2 class="font-playfair text-lg font-semibold text-navy mb-3">
            {{ t('standalonePages.admissionsEdebo.stepDeadlinesTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted">{{ t('standalonePages.admissionsEdebo.stepDeadlinesBody') }}</p>
        </article>
        <article class="border border-border rounded-16 p-6">
          <h2 class="font-playfair text-lg font-semibold text-navy mb-3">
            {{ t('standalonePages.admissionsEdebo.stepDocsTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted">{{ t('standalonePages.admissionsEdebo.stepDocsBody') }}</p>
        </article>
        <article class="border border-border rounded-16 p-6">
          <h2 class="font-playfair text-lg font-semibold text-navy mb-3">
            {{ t('standalonePages.admissionsEdebo.stepSupportTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted">{{ t('standalonePages.admissionsEdebo.stepSupportBody') }}</p>
        </article>
      </div>

      <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
        <a
          :href="EDBO_PORTAL"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center rounded-12 px-5 py-2.5 bg-gold text-navy font-medium text-body-sm no-underline hover:bg-gold-light transition-colors"
        >
          {{ t('standalonePages.admissionsEdebo.openPortal') }}
        </a>
      </div>

      <p class="text-body-sm text-text-muted max-w-3xl">
        {{ t('standalonePages.admissionsEdebo.monHub') }}
        <a
          :href="MON_ADMISSIONS"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-gold hover:text-gold-light no-underline ml-1"
        >
          mon.gov.ua
        </a>
      </p>
    </div>
  </div>
</template>
