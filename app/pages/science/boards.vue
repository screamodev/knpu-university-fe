<script setup lang="ts">
/**
 * Спеціалізовані вчені ради університету.
 *
 * Three councils, each a long page on the old site (склад ради, профіль, оголошення про захисти).
 * Each one is migrated into its own static content file and shown here as a collapsible section,
 * so the profiles stay together instead of becoming three near-empty routes.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.boards'),
  meta: [{ name: 'description', content: () => t('science.boards.subtitle') }],
})

const councils = [
  { slug: 'council-d-64-053-01', code: 'Д 64.053.01', fieldKey: 'science.boards.councils.pedagogy' },
  // Раду К 64.053.05 (філологічні науки) клієнт попросив поки сховати (правка 11.09); сторінка
  // ради лишається в `static_pages`, повернути — розкоментувати рядок.
  // { slug: 'council-k-64-053-05', code: 'К 64.053.05', fieldKey: 'science.boards.councils.philology' },
  { slug: 'council-d-64-053-08', code: 'Д 64.053.08', fieldKey: 'science.boards.councils.psychology' },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.boards.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.boards.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.boards.subtitle') }}
        </p>
      </div>
    </div>

    <SharedSectionTabs :tabs="COUNCIL_TABS" />

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.boards.intro') }}
      </p>

      <div class="space-y-4">
        <SharedAccordion
          v-for="council in councils"
          :key="council.slug"
          :title="`${t('science.boards.councilLabel')} ${council.code}`"
          :hint="t(council.fieldKey)"
        >
          <div class="pt-4">
            <SharedStaticPageBody :slug="council.slug" />
          </div>
        </SharedAccordion>
      </div>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-16 mb-6">
        {{ t('science.boards.documentsTitle') }}
      </h2>
      <SharedDocumentList section="specialized-councils" />

    </div>
  </div>
</template>
