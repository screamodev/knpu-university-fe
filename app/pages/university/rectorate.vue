<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.rectorate'),
  meta: [{ name: 'description', content: () => t('university.rectorate.subtitle') }],
})

const viceRectorIds = ['v1', 'v2', 'v3'] as const
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

    <!-- Rector card: 2-col, gradient portrait left, gold top border -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('university.rectorate.rectorTitle') }}
      </h2>
      <article
        class="bg-white border border-border rounded-16 overflow-hidden border-t-4 border-t-gold flex flex-col md:flex-row"
      >
        <div
          class="w-full md:w-80 shrink-0 h-64 md:h-auto bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
          aria-hidden
        >
          <span class="text-gold/50 font-playfair text-6xl font-bold">
            {{ t('university.rectorate.rector.name').charAt(0) }}
          </span>
        </div>
        <div class="p-6 lg:p-8 flex flex-col justify-center gap-3">
          <h3 class="font-playfair text-xl font-bold text-navy">
            {{ t('university.rectorate.rector.name') }}
          </h3>
          <p class="text-body font-medium text-navy">
            {{ t('university.rectorate.rector.title') }}
          </p>
          <p class="text-body-sm text-text-muted">
            {{ t('university.rectorate.rector.degree') }}
          </p>
          <p class="text-body-sm text-text-muted">
            {{ t('university.rectorate.rector.reception') }}
          </p>
          <p class="text-body-sm text-text-muted">
            {{ t('university.rectorate.rector.phone') }}: {{ t('utility.phone') }}
          </p>
          <p class="text-body-sm text-text-muted">
            {{ t('university.rectorate.rector.email') }}: {{ t('utility.email') }}
          </p>
        </div>
      </article>
    </div>

    <!-- Vice-rectors: 3-column grid -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.rectorate.viceRectorsTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="id in viceRectorIds"
            :key="id"
            class="bg-white border border-border rounded-16 p-6 flex flex-col items-center text-center"
          >
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center mb-4 shrink-0"
              aria-hidden
            >
              <span class="text-gold/60 font-playfair text-xl font-bold">
                {{ t(`university.rectorate.viceRectors.${id}.name`).charAt(0) }}
              </span>
            </div>
            <h3 class="font-playfair text-base font-semibold text-navy mb-1">
              {{ t(`university.rectorate.viceRectors.${id}.name`) }}
            </h3>
            <p class="text-body-sm font-medium text-navy mb-1">
              {{ t(`university.rectorate.viceRectors.${id}.title`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.rectorate.viceRectors.${id}.area`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
