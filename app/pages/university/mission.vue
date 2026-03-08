<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.mission'),
  meta: [{ name: 'description', content: () => t('university.mission.subtitle') }],
})

const valueKeys = ['integrity', 'openness', 'respect', 'innovation', 'partnership', 'heritage'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.mission.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.mission.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.mission.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Three statement blocks: Mission, Vision, Values -->
    <section class="bg-white">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div class="max-w-3xl flex flex-col gap-4">
          <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center text-gold shrink-0">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
            </svg>
          </div>
          <h2 class="font-playfair text-2xl font-bold text-navy">
            {{ t('university.mission.missionTitle') }}
          </h2>
          <p class="text-body text-text-muted">
            {{ t('university.mission.missionText1') }}
          </p>
          <p class="text-body text-text-muted">
            {{ t('university.mission.missionText2') }}
          </p>
        </div>
      </div>
    </section>

    <section class="bg-off-white">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div class="max-w-3xl flex flex-col gap-4">
          <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center text-gold shrink-0">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h2 class="font-playfair text-2xl font-bold text-navy">
            {{ t('university.mission.visionTitle') }}
          </h2>
          <p class="text-body text-text-muted">
            {{ t('university.mission.visionText1') }}
          </p>
          <p class="text-body text-text-muted">
            {{ t('university.mission.visionText2') }}
          </p>
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div class="max-w-3xl flex flex-col gap-4 mb-12">
          <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center text-gold shrink-0">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2 class="font-playfair text-2xl font-bold text-navy">
            {{ t('university.mission.valuesTitle') }}
          </h2>
          <p class="text-body text-text-muted">
            {{ t('university.mission.valuesText1') }}
          </p>
          <p class="text-body text-text-muted">
            {{ t('university.mission.valuesText2') }}
          </p>
        </div>

        <!-- Values grid 2x3 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="key in valueKeys"
            :key="key"
            class="bg-off-white border border-border rounded-16 p-6 flex flex-col gap-3"
          >
            <div class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center text-gold shrink-0">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
              </svg>
            </div>
            <h3 class="font-playfair text-lg font-semibold text-navy">
              {{ t(`university.mission.valuesGrid.${key}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`university.mission.valuesGrid.${key}.text`) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
