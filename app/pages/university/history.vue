<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.history'),
  meta: [{ name: 'description', content: () => t('university.history.subtitle') }],
})

const { assetUrl } = useDirectus()

/**
 * Фотографії до кожної віхи прислала пресслужба 09.09 — до того на їх місці стояли
 * градієнтні заглушки. Файли лежать у медіатеці Directus, тож замінити знімок можна
 * в адмінці, не чіпаючи код: uuid тут — це рядок у «Файли».
 */
const HISTORY_PHOTOS = {
  main: 'e756dd75-eea9-5f12-af22-24b01a7636ed',
  1804: '7b73ec22-f490-5280-bf2c-37512b8e9697',
  1945: 'ce31138f-8d5a-5c35-80d1-56970e7683f0',
  1994: '2b1a0512-b47e-5e17-a65e-f35d31bffabf',
  2004: '257c06e7-a48d-5851-b45f-588cb675bed7',
  now: '00a9b50e-1ce1-53e6-98f3-da418e5eceef',
} as const

const timelineEntries = computed(() => [
  { year: '1804', titleKey: 'university.history.timeline.1804.title', textKey: 'university.history.timeline.1804.text', photo: HISTORY_PHOTOS[1804] },
  { year: '1945', titleKey: 'university.history.timeline.1945.title', textKey: 'university.history.timeline.1945.text', photo: HISTORY_PHOTOS[1945] },
  { year: '1994', titleKey: 'university.history.timeline.1994.title', textKey: 'university.history.timeline.1994.text', photo: HISTORY_PHOTOS[1994] },
  { year: '2004', titleKey: 'university.history.timeline.2004.title', textKey: 'university.history.timeline.2004.text', photo: HISTORY_PHOTOS[2004] },
  { year: t('university.history.timeline.now.year'), titleKey: 'university.history.timeline.now.title', textKey: 'university.history.timeline.now.text', photo: HISTORY_PHOTOS.now },
])
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.history.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.history.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.history.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-column -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div class="space-y-4 text-body text-text-muted">
          <p>{{ t('university.history.intro1') }}</p>
          <p>{{ t('university.history.intro2') }}</p>
        </div>
        <img
          :src="assetUrl(HISTORY_PHOTOS.main, { width: 900, quality: 82 }) ?? undefined"
          :alt="t('university.history.title')"
          class="aspect-[4/5] max-h-[420px] w-full rounded-16 object-cover shrink-0"
          loading="lazy"
        >
      </div>
    </div>

    <!-- Timeline -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="relative">
        <!-- Vertical line -->
        <div
          class="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border hidden md:block"
          aria-hidden="true"
        />

        <div class="space-y-12 md:space-y-16">
          <div
            v-for="(entry, index) in timelineEntries"
            :key="entry.year"
            class="relative flex flex-col md:flex-row md:items-start gap-6"
            :class="index % 2 === 0 ? '' : 'md:flex-row-reverse'"
          >
            <!-- Content side -->
            <div
              class="md:w-[calc(50%-2rem)] flex gap-4"
              :class="index % 2 === 0 ? 'md:flex-row md:pr-8' : 'md:flex-row-reverse md:pl-8'"
            >
              <div
                class="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-navy font-playfair text-lg font-bold shrink-0 z-10"
              >
                {{ entry.year }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-playfair text-xl font-semibold text-navy">
                  {{ t(entry.titleKey) }}
                </h3>
                <p class="mt-2 text-body-sm text-text-muted">
                  {{ t(entry.textKey) }}
                </p>
              </div>
            </div>

            <!-- Image side -->
            <img
              :src="assetUrl(entry.photo, { width: 800, quality: 82 }) ?? undefined"
              :alt="`${entry.year} — ${t(entry.titleKey)}`"
              class="md:w-[calc(50%-2rem)] rounded-16 aspect-video md:aspect-[4/3] object-cover"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Facts band -->
    <WidgetsFactsBand />
  </div>
</template>
