<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.rankings'),
  meta: [{ name: 'description', content: () => t('education.rankings.subtitle') }],
})

const cardIds = ['r1', 'r2', 'r3', 'r4', 'r5'] as const
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

      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.rankings.cardsTitle') }}
      </h2>
      <div class="space-y-4 mb-12">
        <article
          v-for="id in cardIds"
          :key="id"
          class="border-l-4 border-gold bg-off-white border border-border rounded-12 p-6 lg:p-8 flex gap-6 items-start"
        >
          <div
            class="w-16 h-16 shrink-0 rounded-12 bg-gradient-to-br from-gold/30 to-gold/10"
            aria-hidden
          />
          <div class="min-w-0 flex-1">
            <h3 class="font-playfair text-lg font-semibold text-navy mb-1">
              {{ t(`education.rankings.cards.${id}.name`) }}
            </h3>
            <p class="text-body-sm text-gold font-medium mb-2">
              {{ t(`education.rankings.cards.${id}.position`) }}
              <span v-if="t(`education.rankings.cards.${id}.year`) !== '—'">
                · {{ t(`education.rankings.cards.${id}.year`) }}
              </span>
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`education.rankings.cards.${id}.note`) }}
            </p>
          </div>
        </article>
      </div>

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
