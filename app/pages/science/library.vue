<script setup lang="ts">
import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'

definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.library'),
  meta: [{ name: 'description', content: () => t('science.library.subtitle') }],
})

/** Категорія новин бібліотеки — бібліотека веде свою стрічку сама, як факультети. */
const NEWS_CATEGORY = 'naukova-biblioteka'

/**
 * Ресурси бібліотеки — перелік і адреси надані клієнтом. Кілька з них ще ведуть на сторінки
 * старого сайту: після його виведення ці адреси доведеться замінити.
 */
const links = computed<LinkTile[]>(() => [
  { label: t('science.library.links.integrity'), url: 'https://sites.google.com/hnpu.edu.ua/akdob/', icon: 'shield' },
  { label: t('science.library.links.skViki'), url: 'https://old.hnpu.edu.ua/sites/default/files/files/Nauka/SK_Viki.pdf', icon: 'book' },
  { label: t('science.library.links.catalog'), url: 'https://catalog.hnpu.edu.ua', icon: 'book' },
  { label: t('science.library.links.archive'), url: 'https://dspace.hnpu.edu.ua/?locale=uk', icon: 'document' },
  { label: t('science.library.links.plagiarism'), path: '/science/plagiarism', icon: 'shield' },
  { label: t('science.library.links.scientists'), url: 'https://old.hnpu.edu.ua/uk/naukovi-praci-profesoriv-hnpu-imeni-g-s-skovorody', icon: 'award' },
  { label: t('science.library.links.projects'), url: 'https://old.hnpu.edu.ua/uk/proyekty-naukovoyi-biblioteky-hnpu-imeni-gsskovorody', icon: 'council' },
  { label: t('science.library.links.databases'), url: 'https://old.hnpu.edu.ua/uk/division/dostup-do-mizhnarodnyh-naukometrychnyh-baz', icon: 'globe' },
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

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('science.library.intro') }}
      </p>

      <!-- Розділи бібліотеки: тексти й зображення від бібліотеки (правка 25.09, п. 1) -->
      <SharedStaticPageBody slug="science-library" class="mb-12" />

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
