<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.publicInfo'),
  meta: [{ name: 'description', content: () => t('university.publicInfo.subtitle') }],
})

const categoryKeys = ['general', 'financial', 'personnel', 'students', 'infrastructure', 'international'] as const
const reportingKeys = ['annual', 'selfAssessment', 'audit'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.publicInfo.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.publicInfo.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.publicInfo.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.publicInfo.intro') }}
      </p>
    </div>

    <!-- Info categories grid: 2x3 -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.publicInfo.categoriesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="key in categoryKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round" />
              <polyline points="14 2 14 8 20 8" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="16" y1="13" x2="8" y2="13" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="16" y1="17" x2="8" y2="17" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`university.publicInfo.categories.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`university.publicInfo.categories.${key}.text`) }}
          </p>
        </article>
      </div>
    </div>

    <!-- Reporting section: bg-off-white -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.publicInfo.reportingTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <article
            v-for="key in reportingKeys"
            :key="key"
            class="bg-white border border-border rounded-16 p-6 flex flex-col"
          >
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`university.publicInfo.reporting.${key}.title`) }}
            </h3>
            <p class="text-body-sm text-gold font-medium mb-4">
              {{ t(`university.publicInfo.reporting.${key}.year`) }}
            </p>
            <a
              href="#"
              class="inline-flex items-center gap-2 text-body-sm font-medium text-gold no-underline hover:text-gold-light transition-colors mt-auto"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="7 10 12 15 17 10" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="12" y1="15" x2="12" y2="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ t('university.publicInfo.download') }}
            </a>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
