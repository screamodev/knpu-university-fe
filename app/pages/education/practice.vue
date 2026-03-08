<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.practice'),
  meta: [{ name: 'description', content: () => t('education.practice.subtitle') }],
})

const practiceTypeIds = ['t1', 't2', 't3'] as const
const partnerCount = 8
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.practice.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.practice.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.practice.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + practice types -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('education.practice.intro') }}
      </p>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.practice.typesTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <article
          v-for="id in practiceTypeIds"
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
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`education.practice.types.${id}.title`) }}
            </h3>
            <p class="text-body-sm text-gold font-medium mb-3">
              {{ t(`education.practice.types.${id}.duration`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`education.practice.types.${id}.description`) }}
            </p>
          </div>
        </article>
      </div>

      <!-- Partner companies section -->
      <section class="bg-off-white border border-border rounded-16 p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
          {{ t('education.practice.partnersTitle') }}
        </h2>
        <p class="text-body text-text-muted mb-8 max-w-2xl">
          {{ t('education.practice.partnersIntro') }}
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            v-for="i in partnerCount"
            :key="i"
            class="aspect-square rounded-12 bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center text-slate-400 text-body-sm"
            aria-hidden
          >
            Partner {{ i }}
          </div>
        </div>
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
