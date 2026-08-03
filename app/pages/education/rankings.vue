<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.rankings'),
  meta: [{ name: 'description', content: () => t('education.rankings.subtitle') }],
})

</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.rankings.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.rankings.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.rankings.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + stacked ranking cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('education.rankings.intro') }}
      </p>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
        {{ t('education.rankings.cardsTitle') }}
      </h2>
      <!-- The five placements listed here were invented; real ones need a verifiable source. -->
      <SharedSectionPending />

      <!-- Methodology -->
      <section>
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('education.rankings.methodologyTitle') }}
        </h2>
        <p class="text-body text-text-muted max-w-3xl">
          {{ t('education.rankings.methodologyText') }}
        </p>
      </section>
    </div>
  </div>
</template>
