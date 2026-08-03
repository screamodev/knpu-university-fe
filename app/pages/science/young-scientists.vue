<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.youngScientists'),
  meta: [{ name: 'description', content: () => t('science.youngScientists.subtitle') }],
})

const goalIds = ['g1', 'g2', 'g3', 'g4'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.youngScientists.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.youngScientists.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.youngScientists.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-col text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <p class="text-body text-text-muted max-w-xl">
            {{ t('science.youngScientists.intro') }}
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

      <!-- Goals grid: 2x2 -->
      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-8">
        {{ t('science.youngScientists.goalsTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <article
          v-for="id in goalIds"
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
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`science.youngScientists.goals.${id}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`science.youngScientists.goals.${id}.text`) }}
          </p>
        </article>
      </div>

      <!-- Council members: awaiting the real list from the university. -->
      <section class="bg-off-white rounded-16 border border-border p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('science.youngScientists.teamTitle') }}
        </h2>
        <SharedSectionPending />
      </section>
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
