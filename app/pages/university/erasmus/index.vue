<script setup lang="ts">
import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'

definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.erasmus'),
  meta: [{ name: 'description', content: () => t('university.erasmus.subtitle') }],
})

const programmeKeys = ['student', 'staff', 'capacity'] as const
const stepKeys = ['step1', 'step2', 'step3', 'step4'] as const
const partnerPlaceholders = 8

/**
 * Проєкти Еразмус+. AMUSE веде на власний сайт; PERFECT і LECTURE описані на сторінках тут —
 * матеріали надіслали координатори, тож покликань на теки Google Drive більше немає.
 */
const projects: LinkTile[] = [
  { label: 'AMUSE', url: 'https://amuse.hnpu.edu.ua/', icon: 'globe' },
  { label: 'PERFECT', path: '/university/erasmus/perfect', icon: 'globe' },
  { label: 'LECTURE', path: '/university/erasmus/lecture', icon: 'globe' },
]
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.erasmus.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.erasmus.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.erasmus.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-col text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <p class="text-body text-text-muted max-w-xl">
          {{ t('university.erasmus.intro') }}
        </p>
        <div
          class="w-full aspect-video max-h-64 rounded-16 bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
          aria-hidden
        >
          <span class="text-gold/40 font-playfair text-4xl font-bold">E+</span>
        </div>
      </div>
    </div>

    <!-- Erasmus+ projects — одразу під вступом, як просив клієнт -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
        {{ t('university.erasmus.projectsTitle') }}
      </h2>
      <p class="text-body text-text-muted mb-8 max-w-2xl">
        {{ t('university.erasmus.projectsNote') }}
      </p>
      <SharedLinkTileGrid :tiles="projects" />
    </div>

    <!-- Programme types: 3 cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.erasmus.programmesTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="key in programmeKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`university.erasmus.programmes.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted mb-4 flex-1">
            {{ t(`university.erasmus.programmes.${key}.text`) }}
          </p>
          <p class="text-body-sm font-medium text-gold">
            {{ t(`university.erasmus.programmes.${key}.duration`) }}
          </p>
        </article>
      </div>
    </div>

    <!-- How to apply: 4 steps with gold number badges -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.erasmus.howToTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <article
            v-for="(step, index) in stepKeys"
            :key="step"
            class="flex flex-col items-start"
          >
            <span
              class="w-10 h-10 rounded-full bg-gold text-navy font-playfair text-lg font-bold flex items-center justify-center mb-4 shrink-0"
              aria-hidden
            >
              {{ index + 1 }}
            </span>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`university.erasmus.steps.${step}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.erasmus.steps.${step}.text`) }}
            </p>
          </article>
        </div>
      </div>
    </div>

    <!-- Partner logos: 4-col placeholder grid -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
        {{ t('university.erasmus.partnersTitle') }}
      </h2>
      <p class="text-body text-text-muted mb-8 max-w-2xl">
        {{ t('university.erasmus.partnersNote') }}
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
        <div
          v-for="i in partnerPlaceholders"
          :key="i"
          class="aspect-[4/3] rounded-16 bg-gradient-to-br from-slate-100 to-slate-200 border border-border flex items-center justify-center"
          aria-hidden
        >
          <span class="text-slate-400 font-playfair text-2xl font-bold">{{ i }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
