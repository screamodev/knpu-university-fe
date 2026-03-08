<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.volunteering'),
  meta: [{ name: 'description', content: () => t('university.volunteering.subtitle') }],
})

const activityKeys = ['humanitarian', 'education', 'environment', 'culture'] as const
const statKeys = ['volunteers', 'hours', 'projects'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.volunteering.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.volunteering.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.volunteering.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="max-w-3xl text-body text-text-muted">
        {{ t('university.volunteering.intro') }}
      </p>
    </div>

    <!-- Activity cards 2x2 -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-for="key in activityKeys"
          :key="key"
          class="group bg-off-white border border-border rounded-16 overflow-hidden flex flex-col transition-all duration-280 hover:border-gold hover:-translate-y-1 hover:shadow-gold"
        >
          <div
            class="h-48 bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
          >
            <svg
              class="w-12 h-12 text-gold/30 transition-transform duration-280 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div class="p-5 flex flex-col flex-1">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-2">
              {{ t(`university.volunteering.activities.${key}.tag`) }}
            </div>
            <h3 class="font-playfair text-[16px] font-semibold text-navy leading-snug mb-2">
              {{ t(`university.volunteering.activities.${key}.title`) }}
            </h3>
            <p class="text-sm text-text-muted line-clamp-3 flex-1">
              {{ t(`university.volunteering.activities.${key}.text`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div v-for="key in statKeys" :key="key" class="flex flex-col items-center">
            <div class="font-playfair text-4xl md:text-5xl font-bold text-gold leading-none mb-2">
              {{ t(`university.volunteering.stats.${key}.num`) }}
            </div>
            <div class="text-[15px] text-text-muted">
              {{ t(`university.volunteering.stats.${key}.label`) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA banner (AnnouncementBanner pattern) -->
    <div class="bg-gradient-to-br from-navy-mid to-navy-deep py-14">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div>
          <h2 class="font-playfair text-3xl text-white font-bold leading-tight mb-2">
            {{ t('university.volunteering.cta.title') }}
          </h2>
          <p class="text-[15px] text-white/60">
            {{ t('university.volunteering.cta.subtitle') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/contacts')"
          class="shrink-0 py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
        >
          {{ t('university.volunteering.cta.button') }} →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
