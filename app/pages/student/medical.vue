<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.medical'),
  meta: [{ name: 'description', content: () => t('student.medical.subtitle') }],
})

const serviceKeys = ['checkups', 'vaccinations', 'dental', 'firstAid', 'referrals', 'certificates'] as const
const locationKeys = ['location1', 'location2'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.medical.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.medical.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.medical.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro 2-col: text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-14">
        <p class="text-body text-text-muted">
          {{ t('student.medical.intro') }}
        </p>
        <div
          class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] flex items-center justify-center shrink-0"
        >
          <svg
            class="w-16 h-16 text-gold/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Services grid: 2x3 -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.medical.servicesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        <article
          v-for="key in serviceKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`student.medical.services.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`student.medical.services.${key}.text`) }}
          </p>
        </article>
      </div>

      <!-- Locations: stacked cards with gold left border -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('student.medical.locationsTitle') }}
      </h2>
      <div class="space-y-4">
        <div
          v-for="key in locationKeys"
          :key="key"
          class="bg-off-white border border-border rounded-16 pl-6 border-l-4 border-l-gold pr-6 py-6"
        >
          <h3 class="font-playfair text-lg font-semibold text-navy mb-3">
            {{ t(`student.medical.locations.${key}.name`) }}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-body-sm text-text-muted">
            <div>
              <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
                {{ t('student.medical.locationAddress') }}
              </span>
              <span>{{ t(`student.medical.locations.${key}.address`) }}</span>
            </div>
            <div>
              <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
                {{ t('student.medical.locationPhone') }}
              </span>
              <a :href="`tel:${t(`student.medical.locations.${key}.phone`)}`" class="text-navy no-underline hover:text-gold transition-colors">
                {{ t(`student.medical.locations.${key}.phone`) }}
              </a>
            </div>
            <div>
              <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
                {{ t('student.medical.locationHours') }}
              </span>
              <span>{{ t(`student.medical.locations.${key}.hours`) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
