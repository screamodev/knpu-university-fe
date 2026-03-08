<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.master'),
  meta: [{ name: 'description', content: () => t('admissions.master.subtitle') }],
})

const subjectKeys = ['pedagogy', 'psychology', 'languages', 'sciences', 'arts', 'it'] as const

const specialties = [
  { code: '011', nameKey: 'specialty1' },
  { code: '012', nameKey: 'specialty2' },
  { code: '013', nameKey: 'specialty3' },
  { code: '014', nameKey: 'specialty4' },
  { code: '015', nameKey: 'specialty5' },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.master.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.master.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.master.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-col text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <p class="text-body text-text-muted">
          {{ t('admissions.master.intro') }}
        </p>
        <div
          class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] flex items-center justify-center shrink-0"
        >
          <svg
            class="w-16 h-16 text-gold/20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Key facts row: 4 cards (2 years, 120 ECTS) -->
    <div class="bg-off-white border-t border-border py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white border border-border rounded-12 p-6 text-center">
            <div class="text-2xl font-playfair font-bold text-gold mb-1">2</div>
            <p class="text-body-sm text-text-muted">{{ t('admissions.master.facts.durationLabel') }}</p>
            <p class="text-body font-medium text-navy mt-1">{{ t('admissions.master.facts.duration') }}</p>
          </div>
          <div class="bg-white border border-border rounded-12 p-6 text-center">
            <div class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center mx-auto mb-2 text-gold">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <p class="text-body-sm text-text-muted">{{ t('admissions.master.facts.formLabel') }}</p>
            <p class="text-body font-medium text-navy mt-1">{{ t('admissions.master.facts.form') }}</p>
          </div>
          <div class="bg-white border border-border rounded-12 p-6 text-center">
            <div class="text-2xl font-playfair font-bold text-gold mb-1">120</div>
            <p class="text-body-sm text-text-muted">{{ t('admissions.master.facts.creditsLabel') }}</p>
            <p class="text-body font-medium text-navy mt-1">{{ t('admissions.master.facts.credits') }}</p>
          </div>
          <div class="bg-white border border-border rounded-12 p-6 text-center">
            <div class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center mx-auto mb-2 text-gold">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <p class="text-body-sm text-text-muted">{{ t('admissions.master.facts.diplomaLabel') }}</p>
            <p class="text-body font-medium text-navy mt-1">{{ t('admissions.master.facts.diploma') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- What you'll study: 2x3 subject grid -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('admissions.master.whatYouStudy') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="key in subjectKeys"
          :key="key"
          class="bg-off-white border border-border rounded-16 p-6 flex flex-col gap-3"
        >
          <div class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center text-gold shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy">
            {{ t(`admissions.master.subjects.${key}`) }}
          </h3>
        </div>
      </div>
    </div>

    <!-- Research focus: 2-column placeholder image + text -->
    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-10">
          {{ t('admissions.master.researchFocus') }}
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div
            class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] flex items-center justify-center shrink-0 order-2 lg:order-1"
          >
            <svg
              class="w-16 h-16 text-gold/20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div class="order-1 lg:order-2">
            <p class="text-body text-text-muted">
              {{ t('admissions.master.researchText') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Specialties preview -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('admissions.master.specialtiesPreview') }}
      </h2>
      <div class="bg-white border border-border rounded-12 overflow-hidden">
        <ul class="divide-y divide-border">
          <li
            v-for="item in specialties"
            :key="item.code"
            class="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
          >
            <span class="text-body-sm text-text-muted w-12 shrink-0">{{ item.code }}</span>
            <span class="font-medium text-navy flex-1">{{ t(`admissions.master.${item.nameKey}`) }}</span>
          </li>
        </ul>
      </div>
      <NuxtLink
        :to="localePath('/admissions/specialties')"
        class="inline-flex items-center gap-2 mt-6 text-gold font-semibold text-body hover:text-gold-light transition-colors no-underline"
      >
        {{ t('admissions.master.viewAllSpecialties') }}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>
