<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.mobility'),
  meta: [{ name: 'description', content: () => t('university.mobility.subtitle') }],
})

const typeKeys = ['incomingStudents', 'outgoingStudents', 'incomingStaff', 'outgoingStaff'] as const
const statKeys = ['sent', 'received', 'countries', 'agreements'] as const
const testimonialIds = ['t1', 't2', 't3'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.mobility.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.mobility.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.mobility.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.mobility.intro') }}
      </p>
    </div>

    <!-- Mobility types: 2x2 cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.mobility.typesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <article
          v-for="key in typeKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`university.mobility.types.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`university.mobility.types.${key}.text`) }}
          </p>
        </article>
      </div>
    </div>

    <!-- Stats band: 4 gold numbers -->
    <div class="bg-off-white py-10 lg:py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.mobility.statsTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="key in statKeys"
            :key="key"
            class="text-center"
          >
            <p class="font-playfair text-3xl md:text-4xl font-bold text-gold mb-2">
              {{ t(`university.mobility.stats.${key}.value`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.mobility.stats.${key}.label`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials: bg-off-white, 2–3 quote cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.mobility.testimonialsTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="id in testimonialIds"
          :key="id"
          class="bg-off-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="w-14 h-14 rounded-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center mb-4 shrink-0"
            aria-hidden
          >
            <span class="text-gold/60 font-playfair text-xl font-bold">
              {{ t(`university.mobility.testimonials.${id}.name`).charAt(0) }}
            </span>
          </div>
          <blockquote class="text-body text-text-muted italic mb-4 flex-1">
            «{{ t(`university.mobility.testimonials.${id}.quote`) }}»
          </blockquote>
          <footer>
            <p class="font-playfair text-base font-semibold text-navy">
              {{ t(`university.mobility.testimonials.${id}.name`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.mobility.testimonials.${id}.programme`) }}
            </p>
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>
