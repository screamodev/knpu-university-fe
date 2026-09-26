<script setup lang="ts">
import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'
import { ACADEMIC_MOBILITY_EXTERNAL_URL, JOURNALS_EXTERNAL_URL } from '~/utils/externalSites'

definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const { tm, rt } = useI18n()

useHead({
  title: () => t('science.activity.title'),
  meta: [{ name: 'description', content: () => t('science.activity.subtitle') }],
})

/**
 * Розділи, які веде відділ: клієнт просив замість переліку підрозділів (правка 25.09, п. 15)
 * показати ці «активні кнопки» — частина з них живе на сайті, частина на Google-сайтах.
 */
const UNIT_LINKS = [
  { key: 'rankings', path: '/science/rankings', icon: 'award' },
  { key: 'schools', url: 'https://sites.google.com/hnpu.edu.ua/scienceschools/%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0', icon: 'book' },
  { key: 'events', path: '/science/conferences', icon: 'council' },
  { key: 'international', url: 'https://docs.google.com/document/d/1Cq1Dk_NUbpmL24siq8eDi0LU0c-RZNay/edit', icon: 'globe' },
  { key: 'mobility', url: ACADEMIC_MOBILITY_EXTERNAL_URL, icon: 'globe' },
  { key: 'agreements', path: '/university/agreements', icon: 'document' },
  { key: 'grants', path: '/science/grants', icon: 'award' },
  { key: 'topics', url: 'https://docs.google.com/document/d/1mtLHulwqWn-40zUcYzTstsd0Ngz1X2D5/edit', icon: 'document' },
  { key: 'researchUnits', path: '/science/research-units', icon: 'council' },
  { key: 'council', path: '/science/council', icon: 'council' },
  { key: 'youngScientists', path: '/science/young-scientists', icon: 'students' },
  { key: 'studentSociety', url: 'https://sites.google.com/hnpu.edu.ua/studentskenaukovetovarystvo', icon: 'students' },
  { key: 'uris', url: 'https://nauka.gov.ua/infrastructure/r.LcDEsoM3/', icon: 'globe' },
] as const

const unitTiles = computed<LinkTile[]>(() => UNIT_LINKS.map(item => ({
  label: t(`science.activity.unitLinks.${item.key}`),
  ...('path' in item ? { path: item.path } : { url: item.url }),
  icon: item.icon,
})))

/** Інспектори відділу — список у перекладах, щоб редагувати його разом з рештою тексту. */
const inspectors = computed(() => (tm('science.activity.staffInspectors') as unknown[]).map(v => rt(v as never)))
const tasks = computed(() => (tm('science.activity.tasks') as unknown[]).map(v => rt(v as never)))
const functions = computed(() => (tm('science.activity.functions') as unknown[]).map(v => rt(v as never)))

const NEWS_CATEGORY = 'science-and-research'

/** Міжнародні проєкти університету, про які просили написати на цій сторінці. */
const GRANT_PROJECTS = [
  {
    titleKey: 'science.activity.grants.norway',
    url: 'https://www.hiof.no/lusp/forskning/prosjekter/ukraina-i-norge/',
  },
] as const

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

    <!-- Про відділ: місія, завдання, функції, склад і контакти (правка 25.09, п. 15) -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-3xl space-y-4">
        <p v-for="n in 5" :key="n" class="text-body text-text-muted">
          {{ t(`science.activity.intro${n}`) }}
        </p>
      </div>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-10 mb-4">
        {{ t('science.activity.tasksTitle') }}
      </h2>
      <ul class="max-w-3xl space-y-3">
        <li v-for="(task, index) in tasks" :key="index" class="flex gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2.5" aria-hidden />
          <span class="text-body text-text-muted">{{ task }}</span>
        </li>
      </ul>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-10 mb-4">
        {{ t('science.activity.functionsTitle') }}
      </h2>
      <ul class="max-w-3xl space-y-3">
        <li v-for="(item, index) in functions" :key="index" class="flex gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2.5" aria-hidden />
          <span class="text-body text-text-muted">{{ item }}</span>
        </li>
      </ul>
      <p class="text-body text-text-muted max-w-3xl mt-4">
        {{ t('science.activity.functionsNote') }}
      </p>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-10 mb-4">
        {{ t('science.activity.staffTitle') }}
      </h2>
      <div class="max-w-3xl">
        <p class="text-body-sm font-semibold text-navy">
          {{ t('science.activity.staffHeadRole') }}
        </p>
        <p class="text-body text-text-muted">{{ t('science.activity.staffHead') }}</p>
        <p class="text-body-sm font-semibold text-navy mt-4">
          {{ t('science.activity.staffInspectorsRole') }}
        </p>
        <ul class="mt-1 space-y-1">
          <li v-for="person in inspectors" :key="person" class="text-body text-text-muted">
            {{ person }}
          </li>
        </ul>
      </div>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-10 mb-4">
        {{ t('science.activity.contactsTitle') }}
      </h2>
      <div class="max-w-3xl space-y-1">
        <p class="text-body text-text-muted">{{ t('science.activity.contactsAddress') }}</p>
        <p class="text-body text-text-muted">
          <a href="mailto:science@hnpu.edu.ua" class="text-navy underline hover:text-gold">science@hnpu.edu.ua</a>,
          <a href="mailto:nauka@hnpu.edu.ua" class="text-navy underline hover:text-gold">nauka@hnpu.edu.ua</a>
        </p>
      </div>
    </div>

    <!-- Розділи відділу «активними кнопками», без назви блоку (правка 25.09, п. 15) -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SharedLinkTileGrid :tiles="unitTiles" />
      </div>
    </div>

    <!-- Related links -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.activity.linksTitle') }}
      </h2>
      <SharedLinkTileGrid :tiles="links" />
    </div>

    <!-- Грантова і проєктна діяльність (правка 11.09) -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('science.activity.grantsTitle') }}
      </h2>
      <ul class="space-y-3 max-w-3xl">
        <li v-for="grant in GRANT_PROJECTS" :key="grant.url">
          <a
            :href="grant.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-body text-navy underline hover:text-gold"
          >
            {{ t(grant.titleKey) }}
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
        </li>
      </ul>
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
