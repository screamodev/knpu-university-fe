<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.inclusive'),
  meta: [{ name: 'description', content: () => t('university.inclusive.subtitle') }],
})

const featureKeys = ['barrierFree', 'assistive', 'signLanguage', 'adapted', 'individual', 'transport'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.inclusive.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.inclusive.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.inclusive.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.inclusive.intro') }}
      </p>
    </div>

    <!-- Features grid: 2x3 cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.inclusive.featuresTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="key in featureKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`university.inclusive.features.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`university.inclusive.features.${key}.text`) }}
          </p>
        </article>
      </div>
    </div>

    <!-- Support section: 2-col text + placeholder image -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.inclusive.supportTitle') }}
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <p class="text-body text-text-muted">
            {{ t('university.inclusive.supportText') }}
          </p>
          <div
            class="w-full aspect-video max-h-72 rounded-16 bg-gradient-to-br from-slate-100 to-slate-200 border border-border flex items-center justify-center shrink-0"
            aria-hidden
          >
            <svg class="w-16 h-16 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact block: callout card -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('university.inclusive.contactTitle') }}
      </h2>
      <article class="bg-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold max-w-xl">
        <h3 class="font-playfair text-xl font-semibold text-navy mb-2">
          {{ t('university.inclusive.contact.name') }}
        </h3>
        <p class="text-body-sm text-text-muted mb-4">
          {{ t('university.inclusive.contact.position') }}
        </p>
        <p class="text-body-sm text-text-muted">
          {{ t('university.inclusive.contact.phone') }}: {{ t('utility.phone') }}
        </p>
        <p class="text-body-sm text-text-muted">
          {{ t('university.inclusive.contact.email') }}: {{ t('utility.email') }}
        </p>
      </article>
    </div>
  </div>
</template>
