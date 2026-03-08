<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.catalog'),
  meta: [{ name: 'description', content: () => t('science.catalog.subtitle') }],
})

const stepKeys = ['register', 'search', 'order'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.catalog.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.catalog.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.catalog.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.catalog.intro') }}
      </p>

      <!-- Large viewer placeholder: 16:9 with search icon overlay -->
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
            <path
              d="M21 21l-5.2-5.2M11 19a8 8 0 100-16 8 8 0 000 16z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <!-- How-to-search: 3-step horizontal process with gold number badges and connecting lines -->
      <section class="bg-off-white rounded-16 border border-border p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('science.catalog.howToSearchTitle') }}
        </h2>
        <div class="flex flex-col md:flex-row md:items-stretch gap-8 md:gap-4">
          <template v-for="(key, i) in stepKeys" :key="key">
            <div class="flex flex-col md:flex-1 md:items-center md:text-center">
              <div class="flex items-center gap-4 md:flex-col md:gap-4">
                <div
                  class="w-14 h-14 rounded-14 bg-gold/15 text-gold font-playfair text-xl font-bold flex items-center justify-center shrink-0"
                >
                  {{ i + 1 }}
                </div>
                <div
                  v-if="i < stepKeys.length - 1"
                  class="hidden md:block flex-1 h-0.5 min-w-[24px] max-w-[80px] bg-gold/30 rounded-full"
                  aria-hidden
                />
              </div>
              <h3 class="font-playfair text-lg font-semibold text-navy mt-4 mb-2">
                {{ t(`science.catalog.steps.${key}.title`) }}
              </h3>
              <p class="text-body-sm text-text-muted">
                {{ t(`science.catalog.steps.${key}.text`) }}
              </p>
            </div>
            <div
              v-if="i < stepKeys.length - 1"
              class="hidden md:block w-px self-stretch min-h-[60px] bg-gold/20 rounded-full mx-2"
              aria-hidden
            />
          </template>
        </div>
      </section>
    </div>
  </div>
</template>
