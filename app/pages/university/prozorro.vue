<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.prozorro'),
  meta: [{ name: 'description', content: () => t('university.prozorro.subtitle') }],
})

const procurementIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const
const statKeys = ['totalTenders', 'completed', 'totalValue'] as const

type ProcurementStatus = 'completed' | 'active' | 'planned'
const procurementStatusType: Record<(typeof procurementIds)[number], ProcurementStatus> = {
  p1: 'completed',
  p2: 'active',
  p3: 'completed',
  p4: 'planned',
  p5: 'completed',
  p6: 'completed',
}

const PROZORRO_PORTAL_URL = 'https://prozorro.gov.ua'
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.prozorro.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.prozorro.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.prozorro.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.prozorro.intro') }}
      </p>
    </div>

    <!-- Stats band: 3 gold numbers -->
    <div class="bg-off-white py-10 lg:py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.prozorro.statsTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div
            v-for="key in statKeys"
            :key="key"
            class="text-center"
          >
            <p class="font-playfair text-3xl md:text-4xl font-bold text-gold mb-2">
              {{ t(`university.prozorro.stats.${key}.value`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.prozorro.stats.${key}.label`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Procurements list: 5–6 card-rows -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.prozorro.procurementsTitle') }}
      </h2>
      <div class="space-y-4">
        <article
          v-for="id in procurementIds"
          :key="id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div class="flex-1 min-w-0">
            <p class="text-body-sm font-mono text-gold mb-1">
              {{ t(`university.prozorro.procurements.${id}.number`) }}
            </p>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`university.prozorro.procurements.${id}.title`) }}
            </h3>
            <div class="flex flex-wrap items-center gap-3 text-body-sm text-text-muted">
              <span>{{ t(`university.prozorro.procurements.${id}.amount`) }}</span>
              <span>·</span>
              <span>{{ t(`university.prozorro.procurements.${id}.date`) }}</span>
            </div>
          </div>
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-body-sm font-medium shrink-0"
            :class="{
              'bg-gold/15 text-gold': procurementStatusType[id] === 'completed',
              'bg-slate-100 text-slate-600': procurementStatusType[id] === 'active',
              'bg-slate-100 text-slate-500': procurementStatusType[id] === 'planned',
            }"
          >
            <template v-if="procurementStatusType[id] === 'completed'">
              {{ t('university.prozorro.statusCompleted') }}
            </template>
            <template v-else-if="procurementStatusType[id] === 'active'">
              {{ t('university.prozorro.statusActive') }}
            </template>
            <template v-else>
              {{ t('university.prozorro.statusPlanned') }}
            </template>
          </span>
        </article>
      </div>
    </div>

    <!-- CTA: external Prozorro -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <article class="bg-white border border-border rounded-16 p-8 lg:p-10 border-l-4 border-l-gold max-w-2xl">
          <h2 class="font-playfair text-2xl font-bold text-navy mb-3">
            {{ t('university.prozorro.ctaTitle') }}
          </h2>
          <p class="text-body text-text-muted mb-6">
            {{ t('university.prozorro.ctaSubtitle') }}
          </p>
          <a
            :href="PROZORRO_PORTAL_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-12 no-underline hover:bg-gold-light transition-colors"
          >
            {{ t('university.prozorro.ctaButton') }}
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>
