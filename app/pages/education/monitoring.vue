<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.monitoring'),
  meta: [{ name: 'description', content: () => t('education.monitoring.subtitle') }],
})

const methodologyIds = ['m1', 'm2', 'm3', 'm4'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.monitoring.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.monitoring.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.monitoring.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('education.monitoring.intro') }}
      </p>

      <!-- Methodology cards: 2x2 grid -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.monitoring.methodologyTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
        <article
          v-for="id in methodologyIds"
          :key="id"
          class="bg-off-white border border-border rounded-16 p-6 flex gap-4"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center text-gold shrink-0"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`education.monitoring.methodology.${id}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`education.monitoring.methodology.${id}.text`) }}
            </p>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>
