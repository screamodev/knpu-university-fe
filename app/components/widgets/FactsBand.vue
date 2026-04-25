<script setup lang="ts">
const { t } = useSafeI18nWithRouter()
</script>

<template>
  <section class="bg-navy py-10 lg:py-12">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-16 border border-white/12 bg-navy-mid/50 p-5 sm:p-6 lg:p-8">
        <h2 class="font-playfair text-2xl sm:text-[30px] font-bold text-white">
          {{ t('university.mission.title') }}
        </h2>

        <div class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <article class="rounded-12 border border-white/12 bg-navy/35 p-4 sm:p-5">
            <h3 class="text-[11px] font-semibold tracking-wider uppercase text-gold">
              {{ t('university.mission.missionTitle') }}
            </h3>
            <p class="mission-vision-excerpt mt-2 text-body-sm text-white/80">
              {{ t('university.mission.missionText1') }}
            </p>
          </article>

          <article class="rounded-12 border border-white/12 bg-navy/35 p-4 sm:p-5">
            <h3 class="text-[11px] font-semibold tracking-wider uppercase text-gold">
              {{ t('university.mission.visionTitle') }}
            </h3>
            <p class="mission-vision-excerpt mt-2 text-body-sm text-white/80">
              {{ t('university.mission.visionText1') }}
            </p>
          </article>
        </div>

        <div class="mt-5 border-t border-white/12 pt-4">
          <NuxtLink
            to="/university/mission"
            class="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors duration-280 hover:text-gold-light"
          >
            {{ t('facts.readFullMissionAndValues') }}
            <span aria-hidden="true">-></span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mission-vision-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
