<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.arts'),
  meta: [{ name: 'description', content: () => t('student.arts.subtitle') }],
})

const ensembleKeys = ['choir', 'dance', 'theatre', 'instrumental'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.arts.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.arts.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.arts.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('student.arts.intro') }}
      </p>
    </div>

    <!-- Ensemble cards: 2x2 grid, large gradient image, name, director, members, description -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.arts.ensemblesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <article
          v-for="key in ensembleKeys"
          :key="key"
          class="bg-white border border-border rounded-16 overflow-hidden flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="aspect-[4/3] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
            aria-hidden
          >
            <svg
              class="w-14 h-14 text-gold/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`student.arts.ensembles.${key}.name`) }}
            </h3>
            <p class="text-body-sm text-text-muted mb-3">
              {{ t(`student.arts.ensembles.${key}.members`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`student.arts.ensembles.${key}.text`) }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <!-- Upcoming performances: the three dated events listed here were invented. -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('student.arts.eventsTitle') }}
        </h2>
        <SharedSectionPending />
      </div>
    </div>
  </div>
</template>
