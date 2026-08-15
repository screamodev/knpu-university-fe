<script setup lang="ts">
import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'

definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.library'),
  meta: [{ name: 'description', content: () => t('science.library.subtitle') }],
})

const serviceIds = [
  'readingRooms',
  'interlibrary',
  'eresources',
  'reference',
  'workshops',
  'exhibitions',
] as const

/** Категорія новин бібліотеки — бібліотека веде свою стрічку сама, як факультети. */
const NEWS_CATEGORY = 'naukova-biblioteka'

/**
 * Ресурси бібліотеки — перелік і адреси надані клієнтом. Кілька з них ще ведуть на сторінки
 * старого сайту: після його виведення ці адреси доведеться замінити.
 */
const links = computed<LinkTile[]>(() => [
  { label: t('science.library.links.integrity'), url: 'https://sites.google.com/hnpu.edu.ua/akdob/', icon: 'shield' },
  { label: t('science.library.links.skViki'), url: 'https://hnpu.edu.ua/sites/default/files/files/Nauka/SK_Viki.pdf', icon: 'book' },
  { label: t('science.library.links.catalog'), url: 'https://catalog.hnpu.edu.ua', icon: 'book' },
  { label: t('science.library.links.archive'), url: 'https://dspace.hnpu.edu.ua/?locale=uk', icon: 'document' },
  { label: t('science.library.links.plagiarism'), path: '/science/plagiarism', icon: 'shield' },
  { label: t('science.library.links.scientists'), url: 'https://hnpu.edu.ua/uk/naukovi-praci-profesoriv-hnpu-imeni-g-s-skovorody', icon: 'award' },
  { label: t('science.library.links.projects'), url: 'https://hnpu.edu.ua/uk/proyekty-naukovoyi-biblioteky-hnpu-imeni-gsskovorody', icon: 'council' },
  { label: t('science.library.links.databases'), url: 'https://hnpu.edu.ua/uk/division/dostup-do-mizhnarodnyh-naukometrychnyh-baz', icon: 'globe' },
  { label: t('science.library.links.profiles'), url: 'https://library.hnpu.edu.ua/Профілі-науковців/', icon: 'students' },
  { label: t('science.library.links.nbuv'), url: 'https://irbis-nbuv.gov.ua/cgi-bin/irbis_nbuv/cgiirbis_64.exe?C21COM=F&I21DBN=UJRN&P21DBN=UJRN', icon: 'book' },
  { label: t('science.library.links.uran'), url: 'https://journals.uran.ua', icon: 'book' },
])
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.library.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.library.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.library.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-col text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-14">
        <div>
          <p class="text-body text-text-muted max-w-xl">
            {{ t('science.library.intro') }}
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

      <!-- Services grid: 2x3 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
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
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`science.library.services.${id}.title`) }}
          </h2>
          <p class="text-body-sm text-text-muted">
            {{ t(`science.library.services.${id}.description`) }}
          </p>
        </article>
      </div>

      <!-- Holdings and visitor counts removed: the invented figures had no source. -->

      <!-- Resources and services, as listed by the client. -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.library.linksTitle') }}
      </h2>
      <SharedLinkTileGrid :tiles="links" />
    </div>

    <!-- News feed, the same block faculties get. -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('science.library.newsTitle') }}
        </h2>
        <SharedStructureUnitNews :category-slug="NEWS_CATEGORY" :limit="6" />
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
