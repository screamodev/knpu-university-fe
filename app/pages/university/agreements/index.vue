<script setup lang="ts">
import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'
import { AGREEMENT_CATEGORIES } from '~/utils/agreementCategories'

definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.agreements.title'),
  meta: [{ name: 'description', content: () => t('university.agreements.subtitle') }],
})

const sections = computed<LinkTile[]>(() =>
  AGREEMENT_CATEGORIES.map(category => ({
    label: t(`university.agreements.categories.${category}.short`),
    path: `/university/agreements/${category}`,
    icon: category === 'international' ? 'globe' : 'document',
  })),
)
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.agreements.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.agreements.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.agreements.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('university.agreements.intro') }}
      </p>

      <!-- The framework agreement with the ministry; the file itself is still to be supplied. -->
      <article class="bg-off-white border border-border rounded-16 p-6 border-l-4 border-l-gold mb-10">
        <h2 class="font-playfair text-lg font-semibold text-navy">
          {{ t('university.agreements.monTitle') }}
        </h2>
      </article>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.agreements.sectionsTitle') }}
      </h2>
      <SharedLinkTileGrid :tiles="sections" :columns="2" />
    </div>
  </div>
</template>
