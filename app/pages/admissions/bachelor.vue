<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.bachelor'),
  meta: [{ name: 'description', content: () => t('admissions.bachelor.subtitle') }],
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
          {{ t('admissions.bachelor.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.bachelor.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.bachelor.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-col text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <p class="text-body text-text-muted">
          {{ t('admissions.bachelor.intro') }}
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

    <!-- Key facts row: 4 cards -->
    <div class="bg-off-white border-t border-border py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white border border-border rounded-12 p-6 text-center">
            <div class="text-2xl font-playfair font-bold text-gold mb-1">4</div>
            <p class="text-body-sm text-text-muted">{{ t('admissions.bachelor.facts.durationLabel') }}</p>
            <p class="text-body font-medium text-navy mt-1">{{ t('admissions.bachelor.facts.duration') }}</p>
          </div>
          <div class="bg-white border border-border rounded-12 p-6 text-center">
            <div class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center mx-auto mb-2 text-gold">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <p class="text-body-sm text-text-muted">{{ t('admissions.bachelor.facts.formLabel') }}</p>
            <p class="text-body font-medium text-navy mt-1">{{ t('admissions.bachelor.facts.form') }}</p>
          </div>
          <div class="bg-white border border-border rounded-12 p-6 text-center">
            <div class="text-2xl font-playfair font-bold text-gold mb-1">240</div>
            <p class="text-body-sm text-text-muted">{{ t('admissions.bachelor.facts.creditsLabel') }}</p>
            <p class="text-body font-medium text-navy mt-1">{{ t('admissions.bachelor.facts.credits') }}</p>
          </div>
          <div class="bg-white border border-border rounded-12 p-6 text-center">
            <div class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center mx-auto mb-2 text-gold">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <p class="text-body-sm text-text-muted">{{ t('admissions.bachelor.facts.diplomaLabel') }}</p>
            <p class="text-body font-medium text-navy mt-1">{{ t('admissions.bachelor.facts.diploma') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- What you'll study: 2x3 subject grid -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('admissions.bachelor.whatYouStudy') }}
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
            {{ t(`admissions.bachelor.subjects.${key}`) }}
          </h3>
        </div>
      </div>
    </div>

    <!-- Specialties preview -->
    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('admissions.bachelor.specialtiesPreview') }}
        </h2>
        <div class="bg-white border border-border rounded-12 overflow-hidden">
          <ul class="divide-y divide-border">
            <li
              v-for="item in specialties"
              :key="item.code"
              class="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              <span class="text-body-sm text-text-muted w-12 shrink-0">{{ item.code }}</span>
              <span class="font-medium text-navy flex-1">{{ t(`admissions.bachelor.${item.nameKey}`) }}</span>
            </li>
          </ul>
        </div>
        <NuxtLink
          :to="localePath('/admissions/specialties')"
          class="inline-flex items-center gap-2 mt-6 text-gold font-semibold text-body hover:text-gold-light transition-colors no-underline"
        >
          {{ t('admissions.bachelor.viewAllSpecialties') }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
