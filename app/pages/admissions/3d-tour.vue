<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.3dTour'),
  meta: [{ name: 'description', content: () => t('admissions.3dTour.subtitle') }],
})

const buildingKeys = ['building1', 'building2', 'building3', 'building4', 'building5', 'building6'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.3dTour.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.3dTour.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.3dTour.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Viewer placeholder: 16:9 with play overlay -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div
        class="relative aspect-video w-full rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
      >
        <div
          class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/90 flex items-center justify-center text-navy-deep shadow-lg cursor-pointer transition-transform hover:scale-110"
          aria-hidden
        >
          <svg
            class="w-10 h-10 md:w-12 md:h-12 ml-1"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Building cards: 2x3 grid -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('admissions.3dTour.buildingsTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="key in buildingKeys"
            :key="key"
            class="bg-white border border-border rounded-16 overflow-hidden flex flex-col"
          >
            <div
              class="aspect-[4/3] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
            >
              <svg
                class="w-14 h-14 text-gold/20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                />
                <path d="M9 22V12h6v10" />
              </svg>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <h3 class="font-playfair text-lg font-semibold text-navy mb-3">
                {{ t(`admissions.3dTour.buildings.${key}.name`) }}
              </h3>
              <p class="text-body-sm text-text-muted mt-auto">
                {{ t(`admissions.3dTour.buildings.${key}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
