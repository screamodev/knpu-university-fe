<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.rectorate'),
  meta: [{ name: 'description', content: () => t('university.rectorate.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.rectorate.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.rectorate.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.rectorate.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.rectorate.intro') }}
      </p>
    </div>

    <!-- Leadership: rector featured + vice-rectors (shared with the structure page) -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
      <SharedLeadershipBoard
        :rector-heading="t('university.rectorate.rectorTitle')"
        :vice-heading="t('university.rectorate.viceRectorsTitle')"
      />
    </div>
  </div>
</template>
