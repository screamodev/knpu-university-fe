<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.repository'),
  meta: [{ name: 'description', content: () => t('science.repository.subtitle') }],
})

const featureIds = ['openAccess', 'fullText', 'citation', 'doi'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.repository.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.repository.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.repository.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.repository.intro') }}
      </p>

      <!-- Features grid: 2x2 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <article
          v-for="id in featureIds"
          :key="id"
          class="bg-white border border-border rounded-14 p-6 transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg
              class="w-6 h-6 text-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`science.repository.features.${id}.title`) }}
          </h2>
          <p class="text-body-sm text-text-muted">
            {{ t(`science.repository.features.${id}.description`) }}
          </p>
        </article>
      </div>

      <!-- Recent deposits: real ones come from the repository, not from a hardcoded list. -->
      <section class="bg-off-white rounded-16 border border-border p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('science.repository.recentTitle') }}
        </h2>
        <SharedSectionPending />
      </section>
    </div>
  </div>
</template>
