<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.remote'),
  meta: [{ name: 'description', content: () => t('education.remote.subtitle') }],
})

const platformIds = ['moodle', 'zoom', 'google'] as const
const stepIds = ['step1', 'step2', 'step3', 'step4'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.remote.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.remote.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.remote.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + platform cards + how-it-works -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('education.remote.intro') }}
      </p>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.remote.platformsTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <article
          v-for="id in platformIds"
          :key="id"
          class="bg-off-white border border-border rounded-16 p-6 flex flex-col gap-4"
        >
          <div
            class="w-14 h-14 rounded-12 bg-gradient-to-br from-navy-mid/30 to-gold/20 flex items-center justify-center shrink-0"
            aria-hidden
          />
          <h3 class="font-playfair text-lg font-semibold text-navy">
            {{ t(`education.remote.platforms.${id}.name`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`education.remote.platforms.${id}.description`) }}
          </p>
        </article>
      </div>

      <!-- How it works: 4-step horizontal process -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.remote.howItWorksTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="(stepId, index) in stepIds"
          :key="stepId"
          class="flex gap-4 items-start"
        >
          <span
            class="w-10 h-10 shrink-0 rounded-full bg-gold/15 flex items-center justify-center font-playfair font-bold text-gold text-body"
            aria-hidden
          >
            {{ index + 1 }}
          </span>
          <div>
            <h3 class="font-playfair text-base font-semibold text-navy mb-1">
              {{ t(`education.remote.steps.${stepId}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`education.remote.steps.${stepId}.text`) }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
