<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.canteens'),
  meta: [{ name: 'description', content: () => t('student.canteens.subtitle') }],
})

const canteenKeys = ['canteen1', 'canteen2', 'canteen3'] as const
const menuCategories = ['breakfast', 'lunch', 'dinner'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.canteens.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.canteens.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.canteens.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('student.canteens.intro') }}
      </p>
    </div>

    <!-- Canteen cards: 3-column grid -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('student.canteens.cardsTitle') }}
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            v-for="key in canteenKeys"
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
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
            </div>
            <div class="p-6 flex flex-col gap-4 flex-1">
              <h3 class="font-playfair text-xl font-semibold text-navy">
                {{ t(`student.canteens.${key}.name`) }}
              </h3>
              <p class="text-body-sm text-text-muted flex items-center gap-2">
                <span class="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                {{ t(`student.canteens.${key}.building`) }}
              </p>
              <p class="text-body-sm text-navy font-medium">
                {{ t(`student.canteens.${key}.hours`) }}
              </p>
              <p class="text-body-sm text-text-muted">
                {{ t(`student.canteens.${key}.capacity`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sample menu: bg-off-white band, 3-column meal categories -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('student.canteens.menuTitle') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="cat in menuCategories"
            :key="cat"
            class="bg-white border border-border rounded-16 p-6"
          >
            <h3 class="font-playfair text-lg font-semibold text-navy mb-4">
              {{ t(`student.canteens.menu.${cat}.title`) }}
            </h3>
            <ul class="space-y-3">
              <li
                v-for="i in 4"
                :key="i"
                class="flex justify-between items-baseline gap-2 text-body-sm"
              >
                <span class="text-text-muted">{{ t(`student.canteens.menu.${cat}.dish${i}`) }}</span>
                <span class="text-navy font-medium shrink-0">{{ t(`student.canteens.menu.${cat}.price${i}`) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
