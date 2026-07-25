<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.rectorate'),
  meta: [{ name: 'description', content: () => t('university.rectorate.subtitle') }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.rectorate.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.rectorate.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.rectorate.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.rectorate.intro') }}
      </p>
      <p class="mt-4 text-body-sm text-text-muted">
        <span class="font-medium text-navy">{{ t('university.rectorate.addressTitle') }}:</span>
        {{ t('university.rectorate.address') }}
      </p>
    </div>

    <!-- Leadership: rector featured + vice-rectors (shared with the structure page) -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <SharedLeadershipBoard
        :rector-heading="t('university.rectorate.rectorTitle')"
        :vice-heading="t('university.rectorate.viceRectorsTitle')"
      />
    </div>

    <!-- Other administration entries listed alongside the rectorate -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
      <h2 class="font-playfair text-xl font-bold text-navy mb-4">
        {{ t('university.rectorate.relatedTitle') }}
      </h2>
      <ul class="flex flex-col gap-2 max-w-3xl">
        <li>
          <NuxtLink
            :to="localePath('/university/structure')"
            class="group flex items-center gap-3 py-2 px-4 bg-white border border-border rounded-12 transition-colors duration-280 hover:border-gold/60"
          >
            <span class="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden />
            <span class="flex-1 text-body text-navy group-hover:text-primary">
              {{ t('university.rectorate.headsOfDepartments') }}
            </span>
            <svg class="w-4 h-4 text-text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </li>
        <li class="flex items-center gap-3 py-2 px-4 bg-off-white border border-border rounded-12">
          <span class="w-2 h-2 rounded-full bg-slate-300 shrink-0" aria-hidden />
          <span class="text-body text-navy">{{ t('university.rectorate.languageOfficer') }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
