<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.grades'),
  meta: [{ name: 'description', content: () => t('student.grades.subtitle') }],
})

const featureKeys = ['view', 'progress', 'transcripts', 'appeal'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.grades.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.grades.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.grades.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + viewer placeholder + 4 feature cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('student.grades.intro') }}
      </p>

      <!-- Large viewer placeholder: 16:9 with table/spreadsheet icon -->
      <div
        class="relative aspect-video w-full rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center mb-14"
      >
        <div
          class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/90 flex items-center justify-center text-navy-deep shadow-lg pointer-events-none"
          aria-hidden
        >
          <svg
            class="w-10 h-10 md:w-12 md:h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M3 3v18h18" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Features list: 4 horizontal cards in a row -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.grades.featuresTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="key in featureKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 11l3 3L22 4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`student.grades.features.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`student.grades.features.${key}.text`) }}
          </p>
        </article>
      </div>
    </div>
  </div>
</template>
