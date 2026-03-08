<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.studentCouncil'),
  meta: [{ name: 'description', content: () => t('student.council.subtitle') }],
})

const teamIds = ['t1', 't2', 't3', 't4'] as const
const areaKeys = ['rights', 'academic', 'events', 'international'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.council.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.council.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.council.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('student.council.intro') }}
      </p>
    </div>

    <!-- Leadership team: 3-4 member cards -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('student.council.teamTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="id in teamIds"
            :key="id"
            class="bg-white border border-border rounded-16 p-6 flex flex-col items-center text-center"
          >
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center mb-4 shrink-0"
              aria-hidden
            >
              <span class="text-gold/60 font-playfair text-xl font-bold">
                {{ t(`student.council.team.${id}.name`).charAt(0) }}
              </span>
            </div>
            <h3 class="font-playfair text-base font-semibold text-navy mb-1">
              {{ t(`student.council.team.${id}.name`) }}
            </h3>
            <p class="text-body-sm text-text-muted mb-1">
              {{ t(`student.council.team.${id}.role`) }}
            </p>
            <p class="text-body-sm text-text-muted">
              {{ t(`student.council.team.${id}.faculty`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity areas: 2x2 grid -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.council.areasTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <article
          v-for="key in areaKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`student.council.areas.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`student.council.areas.${key}.text`) }}
          </p>
        </article>
      </div>
    </div>
  </div>
</template>
