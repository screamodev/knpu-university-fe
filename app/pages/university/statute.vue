<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.statute'),
  meta: [{ name: 'description', content: () => t('university.statute.subtitle') }],
})

const documentIds = ['d1', 'd2', 'd3', 'd4', 'd5'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.statute.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.statute.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.statute.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.statute.intro') }}
      </p>
    </div>

    <!-- Documents list: stacked cards, gold left border, View PDF link -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.statute.documentsTitle') }}
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
                {{ t(`university.statute.documents.${id}.name`) }}
              </h3>
              <p class="text-body-sm text-text-muted mb-1">
                {{ t(`university.statute.documents.${id}.date`) }} · {{ t(`university.statute.documents.${id}.authority`) }}
              </p>
            </div>
            <a
              href="#"
              class="inline-flex items-center gap-2 text-body-sm font-medium text-gold no-underline hover:text-gold-light transition-colors shrink-0"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="14 2 14 8 20 8" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="16" y1="13" x2="8" y2="13" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="16" y1="17" x2="8" y2="17" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="10 9 9 9 8 9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ t('university.statute.viewPdf') }}
            </a>
          </div>
        </article>
      </div>

      <p class="mt-10 text-body-sm text-text-muted max-w-3xl">
        {{ t('university.statute.regulatoryNote') }}
      </p>
    </div>
  </div>
</template>
