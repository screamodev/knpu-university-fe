<script setup lang="ts">
const { t } = useSafeI18nWithRouter()
const localePath = useLocalePath()

const pillars = [
  { number: '01', titleKey: 'university.mission.missionTitle', textKey: 'university.mission.missionText1', icon: 'target' as const },
  { number: '02', titleKey: 'university.mission.visionTitle',  textKey: 'university.mission.visionText1',  icon: 'eye'    as const },
  { number: '03', titleKey: 'university.mission.valuesTitle',  textKey: 'university.mission.valuesText1',  icon: 'shield' as const },
]
</script>

<template>
  <section class="bg-navy py-14 lg:py-20">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div class="max-w-2xl">
          <h2 class="font-playfair text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-white">
            {{ t('university.mission.title') }}
          </h2>
          <p class="mt-4 text-body-sm sm:text-body text-white/70">
            {{ t('university.mission.subtitle') }}
          </p>
        </div>

        <NuxtLink
          :to="localePath('/university/mission')"
          class="group inline-flex items-center gap-2 self-start rounded-10 border border-gold/40 px-5 py-3 text-sm font-semibold text-gold transition-all duration-280 hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5"
        >
          {{ t('facts.readFullMissionAndValues') }}
          <svg class="w-4 h-4 transition-transform duration-280 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <ul class="mt-10 lg:mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        <li
          v-for="pillar in pillars"
          :key="pillar.number"
          class="group flex h-full flex-col rounded-16 border border-white/10 bg-navy-mid/40 p-6 lg:p-7 transition-all duration-280 hover:border-gold/40 hover:bg-navy-mid/60 hover:-translate-y-1"
        >
          <div class="flex items-start justify-between">
            <div class="flex h-12 w-12 items-center justify-center rounded-12 bg-gold/10 text-gold transition-colors duration-280 group-hover:bg-gold/20">
              <svg v-if="pillar.icon === 'target'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke-linecap="round" />
                <circle cx="12" cy="12" r="5" stroke-linecap="round" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <svg v-else-if="pillar.icon === 'eye'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="12" cy="12" r="3" stroke-linecap="round" />
              </svg>
              <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3z" stroke-linecap="round" stroke-linejoin="round" />
                <path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <span class="font-geologica text-xs font-semibold tracking-[0.2em] text-white/35 tabular-nums">
              {{ pillar.number }}
            </span>
          </div>

          <h3 class="mt-6 font-playfair text-xl lg:text-2xl font-semibold text-white">
            {{ t(pillar.titleKey) }}
          </h3>
          <p class="mission-vision-excerpt mt-3 text-body-sm text-white/75">
            {{ t(pillar.textKey) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.mission-vision-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
