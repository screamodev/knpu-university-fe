<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.academicCouncil'),
  meta: [{ name: 'description', content: () => t('university.council.subtitle') }],
})

const leadershipKeys = ['chair', 'secretary', 'deputy'] as const
const decisionIds = ['d1', 'd2', 'd3', 'd4'] as const
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
      </div>
    </div>

    <!-- Recent decisions: stacked cards with gold left border -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.council.decisionsTitle') }}
      </h2>
      <div class="space-y-4">
        <article
          v-for="id in decisionIds"
          :key="id"
          class="bg-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold"
        >
          <p class="text-body-sm font-medium text-gold mb-1">
            {{ t(`university.council.decisions.${id}.date`) }}
          </p>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`university.council.decisions.${id}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`university.council.decisions.${id}.text`) }}
          </p>
        </article>
      </div>
    </div>
  </div>
</template>
