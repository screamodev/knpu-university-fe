<script setup lang="ts">
/**
 * Навчальний відділ.
 *
 * Prose and the staff table come from `app/content/pages/academic-office.uk.json` (migrated from
 * `/uk/division/navchalnyy-viddil`); the графіки освітнього процесу the відділ publishes are
 * shown on their own page, so this one only links there.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const localePath = useLocalePath()

useHead({
  title: () => t('nav.links.academicOffice'),
  meta: [{ name: 'description', content: () => t('education.academicOffice.subtitle') }],
})

const relatedLinks = [
  { path: '/education/schedule', labelKey: 'nav.links.processSchedule', noteKey: 'education.academicOffice.scheduleLink' },
  { path: '/education/students', labelKey: 'nav.links.studentContingent', noteKey: 'education.academicOffice.contingentLink' },
  { path: '/education/programs', labelKey: 'nav.links.programs', noteKey: 'education.academicOffice.programsLink' },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.academicOffice.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.academicOffice.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.academicOffice.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="academic-office" />

      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('education.academicOffice.documentsTitle') }}
      </h2>
      <SharedDocumentList section="academic-office" />

      <div class="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NuxtLink
          v-for="link in relatedLinks"
          :key="link.path"
          :to="localePath(link.path)"
          class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
        >
          <span class="block font-playfair text-lg font-semibold text-navy">{{ t(link.labelKey) }}</span>
          <span class="block text-body-sm text-text-muted mt-1">{{ t(link.noteKey) }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
