<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.publishing'),
  meta: [{ name: 'description', content: () => t('science.publishing.subtitle') }],
})

const serviceIds = ['books', 'journals', 'methodology', 'digital'] as const
const bookIds = ['b1', 'b2', 'b3'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.publishing.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.publishing.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.publishing.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-col text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-14">
        <div>
          <p class="text-body text-text-muted max-w-xl">
            {{ t('science.publishing.intro') }}
          </p>
        </div>
        <div
          class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] flex items-center justify-center"
        >
          <div
            class="repeating-diagonal-pattern w-full h-full flex items-center justify-center opacity-30"
            aria-hidden
          />
        </div>
      </div>

      <!-- Services grid: 2x2 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <article
          v-for="id in serviceIds"
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
              <path d="M12 6.252v8.25m0 0l-3-3m3 3l3-3" />
              <path d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
          </div>
          <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`science.publishing.services.${id}.title`) }}
          </h2>
          <p class="text-body-sm text-text-muted">
            {{ t(`science.publishing.services.${id}.description`) }}
          </p>
        </article>
      </div>

      <!-- Recent publications: 3-col book cards -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.publishing.recentTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="id in bookIds"
          :key="id"
          class="bg-off-white border border-border rounded-16 overflow-hidden transition-all duration-280 hover:border-gold/40 hover:shadow-gold"
        >
          <div
            class="aspect-[3/4] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
          >
            <div
              class="repeating-diagonal-pattern w-full h-full flex items-center justify-center opacity-30"
              aria-hidden
            />
          </div>
          <div class="p-5">
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`science.publishing.books.${id}.title`) }}
            </h3>
            <p class="text-body-sm text-gold font-medium">
              {{ t(`science.publishing.books.${id}.year`) }}
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
