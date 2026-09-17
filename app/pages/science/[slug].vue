<script setup lang="ts">
import { findSciencePage } from '~/utils/sciencePages'
import { SCIENCE_UNITS } from '~/utils/scienceUnits'

/**
 * Сторінки меню «Наука», перенесені зі старого сайту або створені за правками 16.09 — див.
 * `~/utils/sciencePages`. Статичні сторінки розділу (`library.vue`, `publishing.vue` …) мають
 * пріоритет над цим маршрутом, а невідомий slug дає 404.
 */
definePageMeta({
  layout: 'default',
  validate: route => Boolean(findSciencePage(String(route.params.slug))),
})

const route = useRoute()
const { t, locale, localePath } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

const page = computed(() => findSciencePage(String(route.params.slug))!)
const title = computed(() => (locale.value === 'en' ? page.value.title.en : page.value.title.uk))

const PARENTS = {
  library: { path: '/science/library', key: 'nav.links.library' },
  research: { path: '/science/activity', key: 'nav.links.scienceDepartment' },
  publishing: { path: '/science/publishing', key: 'nav.links.publishing' },
} as const
const parent = computed(() => PARENTS[page.value.parent])

useHead({
  title: () => title.value,
  meta: [{ name: 'description', content: () => title.value }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink
          :to="localePath(parent.path)"
          class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3 no-underline hover:text-gold-light"
        >
          {{ t(parent.key) }}
        </NuxtLink>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ title }}
        </h1>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ul v-if="page.slug === 'research-units'" class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none m-0 p-0">
        <li
          v-for="unit in SCIENCE_UNITS"
          :key="unit.name"
          class="rounded-12 border border-border px-5 py-4 text-body-sm text-navy"
        >
          <NuxtLink v-if="unit.path" :to="localePath(unit.path)" class="font-medium text-navy no-underline hover:text-gold">
            {{ localized(unit, 'name') }}
          </NuxtLink>
          <a
            v-else-if="unit.url"
            :href="unit.url"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-navy no-underline hover:text-gold"
          >
            {{ localized(unit, 'name') }} <span aria-hidden>↗</span>
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
          <span v-else>{{ localized(unit, 'name') }}</span>
        </li>
      </ul>
      <SharedStaticPageBody v-else :slug="`science-${page.slug}`" />
    </div>
  </div>
</template>
