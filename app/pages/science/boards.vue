<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.boards'),
  meta: [{ name: 'description', content: () => t('science.boards.subtitle') }],
})

const boardIds = ['b1', 'b2', 'b3', 'b4'] as const
const areaKeys = ['area1', 'area2', 'area3'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.boards.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.boards.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.boards.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + board cards (gold left border) -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.boards.intro') }}
      </p>

      <div class="space-y-0">
        <div
          v-for="id in boardIds"
          :key="id"
          class="bg-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold mb-6 last:mb-0"
        >
          <h2 class="font-playfair text-xl font-semibold text-navy mb-1">
            {{ t(`science.boards.boards.${id}.name`) }}
          </h2>
          <p class="text-body-sm text-gold font-medium mb-3">
            {{ t(`science.boards.boards.${id}.code`) }}
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-body-sm text-text-muted mb-3">
            <p>
              <span class="font-medium text-navy">{{ t('science.boards.chairmanLabel') }}:</span>
              {{ t(`science.boards.boards.${id}.chairman`) }}
            </p>
            <p>
              <span class="font-medium text-navy">{{ t('science.boards.secretaryLabel') }}:</span>
              {{ t(`science.boards.boards.${id}.secretary`) }}
            </p>
          </div>
          <p class="text-body-sm text-text-muted mb-3">
            <span class="font-medium text-navy">{{ t('science.boards.membersLabel') }}:</span>
            {{ t(`science.boards.boards.${id}.members`) }}
          </p>
          <div>
            <p class="text-body-sm font-medium text-navy mb-1">
              {{ t('science.boards.areasLabel') }}:
            </p>
            <ul class="flex flex-wrap gap-x-4 gap-y-1 text-body-sm text-text-muted">
              <li
                v-for="areaKey in areaKeys"
                :key="areaKey"
                class="flex items-center gap-1.5"
              >
                <span class="text-gold">•</span>
                {{ t(`science.boards.${areaKey}`) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
