<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.curriculum'),
  meta: [{ name: 'description', content: () => t('education.curriculum.subtitle') }],
})

const yearIds = ['y1', 'y2', 'y3', 'y4'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.curriculum.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.curriculum.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.curriculum.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-col text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <p class="text-body text-text-muted max-w-xl">
          {{ t('education.curriculum.intro') }}
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
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Academic year cards (gold left border) -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-10">
          {{ t('education.curriculum.yearsTitle') }}
        </h2>
        <div class="space-y-6">
          <div
            v-for="id in yearIds"
            :key="id"
            class="bg-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold"
          >
            <div class="flex flex-wrap items-start gap-6">
              <div
                class="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center shrink-0 border-2 border-gold/40"
              >
                <span class="font-playfair text-xl font-bold text-gold">
                  {{ t(`education.curriculum.years.${id}.num`) }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-playfair text-lg font-semibold text-navy mb-3">
                  {{ t(`education.curriculum.years.${id}.title`) }}
                </h3>
                <ul class="space-y-1.5 text-body-sm text-text-muted mb-4">
                  <li v-for="courseKey in (['c1', 'c2', 'c3', 'c4', 'c5'] as const)" :key="courseKey">
                    {{ t(`education.curriculum.years.${id}.courses.${courseKey}`) }}
                  </li>
                </ul>
                <p class="text-body-sm font-medium text-gold">
                  {{ t('education.curriculum.creditsLabel') }}:
                  {{ t(`education.curriculum.years.${id}.credits`) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
