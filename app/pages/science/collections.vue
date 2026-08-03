<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.collections'),
  meta: [{ name: 'description', content: () => t('science.collections.subtitle') }],
})

const collectionIds = ['c1', 'c2', 'c3', 'c4', 'c5'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.collections.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.collections.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.collections.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.collections.intro') }}
      </p>

      <!-- Proceedings list (gold left border) -->
      <div class="space-y-0">
        <div
          v-for="id in collectionIds"
          :key="id"
          class="bg-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold mb-6 last:mb-0"
        >
          <h2 class="font-playfair text-xl font-semibold text-navy mb-2">
            {{ t(`science.collections.items.${id}.title`) }}
          </h2>
          <p class="text-body-sm text-gold font-medium mb-2">
            {{ t(`science.collections.items.${id}.year`) }}
          </p>
          <p class="text-body-sm text-text-muted mb-2">
            {{ t(`science.collections.items.${id}.articles`) }}
          </p>
          <p class="text-body text-text-muted">
            {{ t(`science.collections.items.${id}.description`) }}
          </p>
        </div>
      </div>

      <!-- Submission guidelines callout -->
      <div class="mt-12 border-l-4 border-gold bg-off-white border border-border rounded-12 p-6 lg:p-8">
        <h3 class="font-playfair text-xl font-semibold text-navy mb-2">
          {{ t('science.collections.submissionTitle') }}
        </h3>
        <p class="text-body text-text-muted mb-4">
          {{ t('science.collections.submissionText') }}
        </p>
        <NuxtLink
          :to="localePath('/science/publication-requirements')"
          class="inline-flex items-center gap-2 text-gold font-semibold text-body no-underline transition-colors hover:text-gold-light"
        >
          {{ t('science.collections.submissionLink') }} →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
