<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.sports'),
  meta: [{ name: 'description', content: () => t('student.sports.subtitle') }],
})

const sectionKeys = ['football', 'basketball', 'swimming', 'athletics', 'volleyball', 'martial'] as const
const achievementIds = ['a1', 'a2', 'a3', 'a4'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.sports.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.sports.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.sports.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('student.sports.intro') }}
      </p>
    </div>

    <!-- Sports sections: 3-column grid of cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.sports.sectionsTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="key in sectionKeys"
          :key="key"
          class="bg-white border border-border rounded-16 overflow-hidden flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="aspect-[4/3] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
            aria-hidden
          >
            <svg class="w-14 h-14 text-gold/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke-linecap="round" />
              <circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`student.sports.sections.${key}.name`) }}
            </h3>
            <p class="text-body-sm text-text-muted mb-1">
              {{ t(`student.sports.sections.${key}.schedule`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`student.sports.sections.${key}.coach`) }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <!-- Achievements: bg-off-white band, gold accent -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('student.sports.achievementsTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="id in achievementIds"
            :key="id"
            class="bg-white border border-border rounded-16 p-6 flex flex-col border-l-4 border-l-gold"
          >
            <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-2">
              {{ t(`student.sports.achievements.${id}.year`) }}
            </span>
            <h3 class="font-playfair text-base font-semibold text-navy mb-2">
              {{ t(`student.sports.achievements.${id}.name`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`student.sports.achievements.${id}.result`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
