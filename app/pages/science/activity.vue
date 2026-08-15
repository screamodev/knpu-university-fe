<script setup lang="ts">
import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'
import { ACADEMIC_MOBILITY_EXTERNAL_URL, JOURNALS_EXTERNAL_URL } from '~/utils/externalSites'
import { STRUCTURE_GROUPS } from '~/utils/structure'

definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('science.activity.title'),
  meta: [{ name: 'description', content: () => t('science.activity.subtitle') }],
})

/**
 * The units listed on the page are exactly the group of the org chart, so the page cannot drift
 * away from `/university/structure` — one source, two renderings.
 */
const units = computed(
  () => STRUCTURE_GROUPS.find(group => group.id === 'vice-rector-research')?.items ?? [],
)

const NEWS_CATEGORY = 'science-and-research'

const links = computed<LinkTile[]>(() => [
  { label: t('science.activity.links.rankings'), path: '/education/rankings', icon: 'award' },
  { label: t('science.activity.links.plagiarism'), path: '/science/plagiarism', icon: 'shield' },
  { label: t('science.activity.links.council'), path: '/science/council', icon: 'council' },
  { label: t('science.activity.links.mobility'), url: ACADEMIC_MOBILITY_EXTERNAL_URL, icon: 'globe' },
  { label: t('science.activity.links.integrity'), url: 'https://sites.google.com/hnpu.edu.ua/akdob', icon: 'shield' },
  { label: t('science.activity.links.journals'), url: JOURNALS_EXTERNAL_URL, icon: 'book' },
])
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('science.activity.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.activity.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.activity.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-3xl space-y-4">
        <p class="text-body text-text-muted">{{ t('science.activity.intro1') }}</p>
        <p class="text-body text-text-muted">{{ t('science.activity.intro2') }}</p>
        <p class="text-body text-text-muted">{{ t('science.activity.intro3') }}</p>
      </div>
    </div>

    <!-- Scientific schools -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
        {{ t('science.activity.schoolsTitle') }}
      </h2>
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('science.activity.schoolsText') }}
      </p>
      <NuxtLink
        :to="localePath('/science/directions')"
        class="mt-4 inline-flex items-center gap-2 text-body-sm font-medium text-navy no-underline hover:text-gold transition-colors duration-280"
      >
        {{ t('science.activity.schoolsLink') }}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Units of the vice-rector for research, the same way a faculty lists its кафедри -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
          {{ t('science.activity.unitsTitle') }}
        </h2>
        <p class="text-body-sm text-text-muted mb-8">
          {{ t('science.activity.unitsNote') }}
        </p>
        <SharedStructureItemList :items="units" />
      </div>
    </div>

    <!-- Related links -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.activity.linksTitle') }}
      </h2>
      <SharedLinkTileGrid :tiles="links" />
    </div>

    <!-- Research events: documents the department publishes itself -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('science.activity.eventsTitle') }}
        </h2>
        <SharedDocumentList section="science-events" />
      </div>
    </div>

    <!-- News -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.activity.newsTitle') }}
      </h2>
      <SharedStructureUnitNews :category-slug="NEWS_CATEGORY" :limit="6" />
    </div>
  </div>
</template>
