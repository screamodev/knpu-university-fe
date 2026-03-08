<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.career'),
  meta: [{ name: 'description', content: () => t('student.career.subtitle') }],
})

const serviceKeys = ['cv', 'interview', 'fairs', 'employers', 'internship', 'counselling'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.career.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.career.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.career.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('student.career.intro') }}
      </p>
    </div>

    <!-- Services grid: 2x3 -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.career.servicesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="key in serviceKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path
                d="M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`student.career.services.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`student.career.services.${key}.text`) }}
          </p>
        </article>
      </div>
    </div>

    <!-- Stats band: 3 gold numbers -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('student.career.statsTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div class="text-center">
            <span class="font-playfair text-4xl md:text-5xl font-bold text-gold block mb-2">1,200+</span>
            <span class="text-body text-text-muted">{{ t('student.career.statPlaced') }}</span>
          </div>
          <div class="text-center">
            <span class="font-playfair text-4xl md:text-5xl font-bold text-gold block mb-2">85</span>
            <span class="text-body text-text-muted">{{ t('student.career.statEmployers') }}</span>
          </div>
          <div class="text-center">
            <span class="font-playfair text-4xl md:text-5xl font-bold text-gold block mb-2">40</span>
            <span class="text-body text-text-muted">{{ t('student.career.statEvents') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA: gradient banner + Book a consultation button -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-playfair text-2xl md:text-3xl font-bold text-white mb-6">
          {{ t('student.career.ctaTitle') }}
        </h2>
        <NuxtLink
          :to="localePath('/university/contacts')"
          class="inline-flex items-center justify-center rounded-12 bg-gold px-8 py-4 font-semibold text-navy transition-colors hover:bg-gold/90"
        >
          {{ t('student.career.ctaButton') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
