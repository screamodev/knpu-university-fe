<script setup lang="ts">
/**
 * Центр цифровізації освіти.
 *
 * The centre runs Moodle, the corporate Google workspace and the university's online-course
 * access; its legacy page mixed the description with ~40 links to instructions and forms. The
 * description is static content, the links are `documents` rows the centre can maintain.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.digitalCenter'),
  meta: [{ name: 'description', content: () => t('education.digitalCenter.subtitle') }],
})

// `SharedLinkTileGrid` prints the label as given, so translate here.
const tiles = computed<LinkTile[]>(() => [
  { label: t('education.digitalCenter.tiles.moodle'), url: MOODLE_EXTERNAL_URL, icon: 'book' },
  { label: t('education.digitalCenter.tiles.support'), url: 'mailto:support@hnpu.edu.ua', icon: 'link' },
  { label: t('education.digitalCenter.tiles.centre'), url: 'mailto:cdo@hnpu.edu.ua', icon: 'link' },
])
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.digitalCenter.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.digitalCenter.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.digitalCenter.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedLinkTileGrid :tiles="tiles" :columns="3" />

      <div class="mt-12">
        <SharedStaticPageBody slug="digital-center" />
      </div>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('education.digitalCenter.documentsTitle') }}
      </h2>
      <SharedDocumentList section="digital-center" />
    </div>
  </div>
</template>
