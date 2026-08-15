<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.academicCouncil'),
  meta: [{ name: 'description', content: () => t('university.council.subtitle') }],
})

const leadershipKeys = ['chair', 'secretary', 'deputy'] as const

/** The council's full membership is kept as a Google Doc by the academic secretary's office. */
const FULL_COMPOSITION_URL
  = 'https://docs.google.com/document/d/1Hs3LfB_Z4kMdOTaDOnCj0acTPzOBU84Z/edit?usp=sharing'
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.council.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.council.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.council.subtitle') }}
        </p>
      </div>
    </div>

    <SharedSectionTabs :tabs="COUNCIL_TABS" />

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.council.intro') }}
      </p>
    </div>

    <!-- Leadership row: 2-3 cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.council.leadershipTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          v-for="key in leadershipKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col items-center text-center"
        >
          <div
            class="w-20 h-20 rounded-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center mb-4 shrink-0"
            aria-hidden
          >
            <span class="text-gold/60 font-playfair text-xl font-bold">
              {{ t(`university.council.leadership.${key}.name`).charAt(0) }}
            </span>
          </div>
          <h3 class="font-playfair text-base font-semibold text-navy mb-1">
            {{ t(`university.council.leadership.${key}.name`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`university.council.leadership.${key}.role`) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Council composition: bg-off-white, stats + faculties list -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.council.compositionTitle') }}
        </h2>
        <div class="flex flex-wrap gap-8 mb-8">
          <div class="flex flex-col">
            <span class="font-playfair text-3xl font-bold text-gold">42</span>
            <span class="text-body-sm text-text-muted">{{ t('university.council.composition.total') }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-playfair text-3xl font-bold text-gold">35</span>
            <span class="text-body-sm text-text-muted">{{ t('university.council.composition.faculty') }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-playfair text-3xl font-bold text-gold">4</span>
            <span class="text-body-sm text-text-muted">{{ t('university.council.composition.students') }}</span>
          </div>
        </div>
        <p class="text-body text-text-muted max-w-3xl">
          {{ t('university.council.facultiesRepresented') }}
        </p>
        <a
          :href="FULL_COMPOSITION_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-6 inline-flex items-center gap-2 rounded-12 border border-border bg-white px-5 py-3 font-medium text-navy no-underline transition-colors duration-280 hover:border-gold"
        >
          {{ t('university.council.fullCompositionLink') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6M10 14L21 3" />
          </svg>
          <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
        </a>
      </div>
    </div>

    <!-- Ухвали вченої ради, migrated from /uk/uhvaly-vchenoyi-rady -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
        {{ t('university.council.decisionsTitle') }}
      </h2>
      <p class="text-body-sm text-text-muted max-w-3xl mb-6">
        {{ t('university.council.decisionsIntro') }}
      </p>
      <SharedDocumentList section="academic-council-decisions" />
    </div>
  </div>
</template>
