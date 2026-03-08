<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.financialReports'),
  meta: [{ name: 'description', content: () => t('university.financialReports.subtitle') }],
})

const yearKeys = ['2025', '2024', '2023'] as const
const keyFigureKeys = ['totalBudget', 'stateShare', 'ownShare', 'capital'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.financialReports.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.financialReports.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.financialReports.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.financialReports.intro') }}
      </p>
    </div>

    <!-- Year cards: 3-column, chart placeholder + summary + download -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.financialReports.yearCardsTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="year in yearKeys"
          :key="year"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <h3 class="font-playfair text-xl font-semibold text-navy mb-4">
            {{ year }}
          </h3>
          <div
            class="w-full aspect-square max-h-40 rounded-12 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-6"
            aria-hidden
          >
            <svg
              class="w-12 h-12 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <line x1="18" y1="20" x2="18" y2="10" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="12" y1="20" x2="12" y2="4" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="6" y1="20" x2="6" y2="14" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <ul class="space-y-2 text-body-sm text-text-muted mb-4">
            <li>
              {{ t(`university.financialReports.years.${year}.revenue`) }}:
              <span class="font-medium text-navy">{{ t(`university.financialReports.yearValues.${year}.revenue`) }}</span>
            </li>
            <li>
              {{ t(`university.financialReports.years.${year}.expenses`) }}:
              <span class="font-medium text-navy">{{ t(`university.financialReports.yearValues.${year}.expenses`) }}</span>
            </li>
            <li>
              {{ t(`university.financialReports.years.${year}.stateFunding`) }}:
              <span class="font-medium text-navy">{{ t(`university.financialReports.yearValues.${year}.stateFunding`) }}</span>
            </li>
            <li>
              {{ t(`university.financialReports.years.${year}.ownRevenue`) }}:
              <span class="font-medium text-navy">{{ t(`university.financialReports.yearValues.${year}.ownRevenue`) }}</span>
            </li>
          </ul>
          <a
            href="#"
            class="inline-flex items-center gap-2 text-body-sm font-medium text-gold no-underline hover:text-gold-light transition-colors mt-auto"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-linecap="round" stroke-linejoin="round" />
              <polyline points="7 10 12 15 17 10" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="12" y1="15" x2="12" y2="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ t('university.financialReports.download') }}
          </a>
        </article>
      </div>
    </div>

    <!-- Key figures: 4 gold numbers -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.financialReports.keyFiguresTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="key in keyFigureKeys"
            :key="key"
            class="text-center"
          >
            <p class="font-playfair text-3xl md:text-4xl font-bold text-gold mb-2">
              {{ t(`university.financialReports.keyFigures.${key}.value`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.financialReports.keyFigures.${key}.label`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
