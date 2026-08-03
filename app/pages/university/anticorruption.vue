<script setup lang="ts">
import { ANTICORRUPTION_EXTERNAL_URL } from '~/utils/memorialUrl'

definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.anticorruption'),
  meta: [{ name: 'description', content: () => t('university.anticorruption.subtitle') }],
})

const documentIds = ['d1', 'd2', 'd3', 'd4'] as const
const channelKeys = ['online', 'email', 'hotline'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.anticorruption.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.anticorruption.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.anticorruption.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + the unit's own site, which the menu now points at directly -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.anticorruption.intro') }}
      </p>
      <a
        :href="ANTICORRUPTION_EXTERNAL_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-12 no-underline hover:bg-gold-light transition-colors"
      >
        {{ t('university.anticorruption.externalSite') }}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
          <path d="M7 17L17 7M17 7H8m9 0v9" />
        </svg>
      </a>
    </div>

    <!-- Policy documents: 3–4 stacked cards, gold left border -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.anticorruption.documentsTitle') }}
      </h2>
      <div class="space-y-4">
        <article
          v-for="id in documentIds"
          :key="id"
          class="bg-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div class="flex-1">
              <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
                {{ t(`university.anticorruption.documents.${id}.title`) }}
              </h3>
              <p class="text-body-sm text-text-muted mb-1">
                {{ t(`university.anticorruption.documents.${id}.date`) }}
              </p>
            </div>
            <!--
              The files themselves live on the unit's own site; there is no upload here, so this
              is deliberately not a link (it used to be a dead `href="#"`).
            -->
            <span class="inline-flex items-center gap-2 text-body-sm text-text-muted shrink-0">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="14 2 14 8 20 8" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="16" y1="13" x2="8" y2="13" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="16" y1="17" x2="8" y2="17" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="10 9 9 9 8 9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ t('university.anticorruption.onExternalSite') }}
            </span>
          </div>
        </article>
      </div>
    </div>

    <!-- Reporting channels: 3 cards in a row -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.anticorruption.channelsTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <article
          v-for="key in channelKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4 text-gold shrink-0"
            aria-hidden
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`university.anticorruption.channels.${key}.name`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`university.anticorruption.channels.${key}.contact`) }}
          </p>
        </article>
      </div>
    </div>

  </div>
</template>
