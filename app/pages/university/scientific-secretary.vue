<script setup lang="ts">
/**
 * Служба вченого секретаря.
 *
 * Prose migrated from `/uk/division/sluzhba-vchenogo-sekretarya` into
 * `app/content/pages/scientific-secretary.uk.json`; its documents (план роботи Вченої ради,
 * положення, склад ради) come from the `documents` collection so the office can maintain them.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const localePath = useLocalePath()

useHead({
  title: () => t('university.scientificSecretary.title'),
  meta: [{ name: 'description', content: () => t('university.scientificSecretary.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.scientificSecretary.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.scientificSecretary.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.scientificSecretary.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="scientific-secretary" />

      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('university.scientificSecretary.documentsTitle') }}
      </h2>
      <SharedDocumentList section="scientific-secretary" />

      <div class="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NuxtLink
          :to="localePath('/university/council')"
          class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="block font-playfair text-lg font-semibold text-navy">
            {{ t('nav.links.academicCouncil') }}
          </span>
          <span class="block text-body-sm text-text-muted mt-1">
            {{ t('university.scientificSecretary.councilLink') }}
          </span>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/science/boards')"
          class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="block font-playfair text-lg font-semibold text-navy">
            {{ t('nav.links.boards') }}
          </span>
          <span class="block text-body-sm text-text-muted mt-1">
            {{ t('university.scientificSecretary.boardsLink') }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
