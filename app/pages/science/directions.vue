<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.directions'),
  meta: [{ name: 'description', content: () => t('science.directions.subtitle') }],
})

const schoolIds = ['pedagogy', 'linguistics', 'psychology', 'mathematics', 'history', 'naturalSciences'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.directions.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.directions.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.directions.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + research school cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.directions.intro') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="id in schoolIds"
          :key="id"
          class="bg-white border border-border rounded-14 overflow-hidden transition-all duration-280 hover:border-gold/40 hover:shadow-gold"
        >
          <div
            class="aspect-[4/3] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
          >
            <div
              class="repeating-diagonal-pattern w-full h-full flex items-center justify-center opacity-30"
              aria-hidden
            />
          </div>
          <div class="p-5">
            <span class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold mb-2">
              {{ t(`science.directions.schools.${id}.est`) }}
            </span>
            <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`science.directions.schools.${id}.name`) }}
            </h2>
            <p class="text-body-sm text-gold font-medium mb-3">
              {{ t(`science.directions.schools.${id}.lead`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`science.directions.schools.${id}.description`) }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.repeating-diagonal-pattern {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(201, 162, 39, 0.06) 0,
    rgba(201, 162, 39, 0.06) 1px,
    transparent 1px,
    transparent 24px
  );
}
</style>
