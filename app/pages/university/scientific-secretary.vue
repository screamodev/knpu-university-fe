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

    <SharedSectionTabs :tabs="COUNCIL_TABS" />

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
        <div>
          <SharedStaticPageBody slug="scientific-secretary" />
        </div>

        <!-- Contacts of the office, missing until the client pointed it out -->
        <aside class="rounded-16 border border-border bg-off-white p-6">
          <h2 class="font-playfair text-lg font-semibold text-navy mb-3">
            {{ t('university.scientificSecretary.contactsTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted">
            {{ t('university.scientificSecretary.address') }}
          </p>
          <p class="text-body-sm text-text-muted mt-1">
            {{ t('university.scientificSecretary.phone') }}
          </p>
          <a
            :href="`mailto:${t('university.scientificSecretary.email')}`"
            class="text-body-sm text-navy underline hover:text-gold break-all"
          >
            {{ t('university.scientificSecretary.email') }}
          </a>
          <div class="mt-4 pt-4 border-t border-border">
            <p class="text-body-sm text-text-muted">
              {{ t('university.scientificSecretary.secretaryRole') }}
            </p>
            <p class="font-playfair text-base font-semibold text-navy mt-0.5">
              {{ t('university.scientificSecretary.secretaryName') }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t('university.scientificSecretary.secretaryDegree') }}
            </p>
          </div>
        </aside>
      </div>

      <!-- Оголошення вченого секретаря, migrated from the old site -->
      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('university.scientificSecretary.announcementsTitle') }}
      </h2>
      <SharedAccordion :title="t('university.scientificSecretary.announcementsToggle')">
        <div class="pt-4">
          <SharedStaticPageBody slug="secretary-announcements" />
        </div>
      </SharedAccordion>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('university.scientificSecretary.documentsTitle') }}
      </h2>
      <SharedDocumentList section="scientific-secretary" />

    </div>
  </div>
</template>
