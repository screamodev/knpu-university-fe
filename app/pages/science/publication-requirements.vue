<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.publicationRequirements'),
  meta: [{ name: 'description', content: () => t('science.publicationRequirements.subtitle') }],
})

const sectionKeys = ['general', 'formatting', 'citation', 'submission'] as const

const sectionItemKeys: Record<(typeof sectionKeys)[number], readonly string[]> = {
  general: ['item1', 'item2', 'item3', 'item4', 'item5'],
  formatting: ['fmt1', 'fmt2', 'fmt3', 'fmt4', 'fmt5'],
  citation: ['cit1', 'cit2', 'cit3', 'cit4', 'cit5'],
  submission: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'],
}

const sectionItemsKey: Record<(typeof sectionKeys)[number], string> = {
  general: 'generalItems',
  formatting: 'formattingItems',
  citation: 'citationItems',
  submission: 'submissionItems',
}

function getItemPath(sectionKey: (typeof sectionKeys)[number], itemKey: string): string {
  return `science.publicationRequirements.${sectionItemsKey[sectionKey]}.${itemKey}`
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.publicationRequirements.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.publicationRequirements.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.publicationRequirements.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + requirement sections -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.publicationRequirements.intro') }}
      </p>

      <!-- Requirement sections (heading + list with gold checkmark) -->
      <div class="space-y-10">
        <section
          v-for="sectionKey in sectionKeys"
          :key="sectionKey"
          class="border border-border rounded-12 p-6 lg:p-8 bg-slate-50"
        >
          <h2 class="font-playfair text-xl font-semibold text-navy mb-4">
            {{ t(`science.publicationRequirements.sections.${sectionKey}.title`) }}
          </h2>
          <ul class="space-y-3 list-none pl-0">
            <li
              v-for="itemKey in sectionItemKeys[sectionKey]"
              :key="itemKey"
              class="flex gap-3 items-start"
            >
              <span
                class="w-6 h-6 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5"
                aria-hidden
              >
                <svg class="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="text-body text-text-muted">
                {{ t(getItemPath(sectionKey, itemKey)) }}
              </span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Template download card -->
      <div class="mt-12 bg-off-white border border-border rounded-16 p-6 lg:p-8 flex flex-col sm:flex-row gap-6 items-start">
        <div
          class="w-14 h-14 rounded-12 bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0"
          aria-hidden
        >
          <svg class="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625a2.25 2.25 0 00-2.25 2.25v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div class="min-w-0">
          <h3 class="font-playfair text-lg font-semibold text-navy mb-1">
            {{ t('science.publicationRequirements.templateTitle') }}
          </h3>
          <p class="text-body-sm text-text-muted mb-4">
            {{ t('science.publicationRequirements.templateDescription') }}
          </p>
          <!-- The template file itself has not been supplied yet; a dead link is worse. -->
          <SharedSectionPending />
        </div>
      </div>
    </div>
  </div>
</template>
