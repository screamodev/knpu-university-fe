<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.graduate'),
  meta: [{ name: 'description', content: () => t('admissions.graduate.subtitle') }],
})

const schoolKeys = ['school1', 'school2', 'school3'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.graduate.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.graduate.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.graduate.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <p class="max-w-3xl text-body text-text-muted">
        {{ t('admissions.graduate.intro') }}
      </p>
    </div>

    <!-- PhD block -->
    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row gap-8 md:gap-12">
          <div class="w-14 h-14 rounded-14 bg-gold/15 flex items-center justify-center text-gold shrink-0">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
            </svg>
          </div>
          <div class="flex-1">
            <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
              {{ t('admissions.graduate.phd.title') }}
            </h2>
            <div class="flex flex-wrap gap-6 mb-6">
              <div>
                <p class="text-body-sm text-text-muted">{{ t('admissions.graduate.phd.durationLabel') }}</p>
                <p class="font-medium text-navy">{{ t('admissions.graduate.phd.duration') }}</p>
              </div>
              <div>
                <p class="text-body-sm text-text-muted">{{ t('admissions.graduate.phd.formLabel') }}</p>
                <p class="font-medium text-navy">{{ t('admissions.graduate.phd.form') }}</p>
              </div>
            </div>
            <p class="text-body text-text-muted">
              {{ t('admissions.graduate.phd.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Doctoral block -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div class="flex flex-col md:flex-row gap-8 md:gap-12">
        <div class="w-14 h-14 rounded-14 bg-gold/15 flex items-center justify-center text-gold shrink-0">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div class="flex-1">
          <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
            {{ t('admissions.graduate.doctoral.title') }}
          </h2>
          <div class="flex flex-wrap gap-6 mb-6">
            <div>
              <p class="text-body-sm text-text-muted">{{ t('admissions.graduate.doctoral.durationLabel') }}</p>
              <p class="font-medium text-navy">{{ t('admissions.graduate.doctoral.duration') }}</p>
            </div>
            <div>
              <p class="text-body-sm text-text-muted">{{ t('admissions.graduate.doctoral.formLabel') }}</p>
              <p class="font-medium text-navy">{{ t('admissions.graduate.doctoral.form') }}</p>
            </div>
          </div>
          <p class="text-body text-text-muted">
            {{ t('admissions.graduate.doctoral.description') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Scientific schools: 3 cards with placeholder images -->
    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('admissions.graduate.scientificSchools') }}
        </h2>
        <p class="text-body text-text-muted mb-10 max-w-2xl">
          {{ t('admissions.graduate.scientificSchoolsIntro') }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="key in schoolKeys"
            :key="key"
            class="bg-white border border-border rounded-16 overflow-hidden flex flex-col"
          >
            <div
              class="aspect-[4/3] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-gold/20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
              </svg>
            </div>
            <div class="p-6 flex-1">
              <h3 class="font-playfair text-lg font-semibold text-navy">
                {{ t(`admissions.graduate.${key}`) }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
