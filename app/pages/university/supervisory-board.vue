<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.supervisoryBoard'),
  meta: [{ name: 'description', content: () => t('university.supervisoryBoard.subtitle') }],
})

const memberIds = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'] as const
const functionKeys = ['strategic', 'financial', 'development'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.supervisoryBoard.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.supervisoryBoard.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.supervisoryBoard.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('university.supervisoryBoard.intro') }}
      </p>
    </div>

    <!-- Board members grid: 2x3 -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.supervisoryBoard.membersTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="id in memberIds"
          :key="id"
          class="bg-white border border-border rounded-16 p-6 flex flex-col items-center text-center"
        >
          <div
            class="w-20 h-20 rounded-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center mb-4 shrink-0"
            aria-hidden
          >
            <span class="text-gold/60 font-playfair text-xl font-bold">
              {{ t(`university.supervisoryBoard.members.${id}.name`).charAt(0) }}
            </span>
          </div>
          <h3 class="font-playfair text-base font-semibold text-navy mb-1">
            {{ t(`university.supervisoryBoard.members.${id}.name`) }}
          </h3>
          <p class="text-body-sm font-medium text-navy mb-1">
            {{ t(`university.supervisoryBoard.members.${id}.position`) }}
          </p>
          <p class="text-body-sm text-text-muted">
            {{ t(`university.supervisoryBoard.members.${id}.organisation`) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Functions block: 3 cards in a row -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.supervisoryBoard.functionsTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="key in functionKeys"
            :key="key"
            class="bg-white border border-border rounded-16 p-6 flex flex-col gap-3"
          >
            <div
              class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center text-gold shrink-0"
              aria-hidden
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-playfair text-lg font-semibold text-navy">
              {{ t(`university.supervisoryBoard.functions.${key}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.supervisoryBoard.functions.${key}.text`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
