<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.graduate'),
  meta: [{ name: 'description', content: () => t('science.graduate.subtitle') }],
})

const programmeKeys = ['phd', 'doctoral'] as const
const admissionStepKeys = ['admissionStep1', 'admissionStep2', 'admissionStep3'] as const
const phdReqKeys = ['req1', 'req2', 'req3'] as const
const doctoralReqKeys = ['req1', 'req2', 'req3'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.graduate.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.graduate.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.graduate.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + programme blocks (PhD / Doctoral) -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('science.graduate.intro') }}
      </p>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.graduate.programmesTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
        <!-- PhD card -->
        <article class="bg-white border border-border rounded-16 p-6 flex flex-col">
          <div class="px-4 py-3 bg-gold/10 rounded-12 mb-5">
            <h3 class="font-playfair text-lg font-semibold text-navy">
              {{ t('science.graduate.phd.title') }}
            </h3>
          </div>
          <p class="text-body-sm text-text-muted mb-2">
            {{ t('science.graduate.phd.duration') }} · {{ t('science.graduate.phd.form') }}
          </p>
          <ul class="space-y-2 mb-4">
            <li
              v-for="key in phdReqKeys"
              :key="key"
              class="flex gap-2 text-body-sm text-text-muted"
            >
              <span class="text-gold shrink-0">•</span>
              {{ t(`science.graduate.phd.${key}`) }}
            </li>
          </ul>
          <p class="text-body-sm text-text-muted mt-auto">
            {{ t('science.graduate.phd.description') }}
          </p>
        </article>
        <!-- Doctoral card -->
        <article class="bg-white border border-border rounded-16 p-6 flex flex-col">
          <div class="px-4 py-3 bg-gold/10 rounded-12 mb-5">
            <h3 class="font-playfair text-lg font-semibold text-navy">
              {{ t('science.graduate.doctoral.title') }}
            </h3>
          </div>
          <p class="text-body-sm text-text-muted mb-2">
            {{ t('science.graduate.doctoral.duration') }} · {{ t('science.graduate.doctoral.form') }}
          </p>
          <ul class="space-y-2 mb-4">
            <li
              v-for="key in doctoralReqKeys"
              :key="key"
              class="flex gap-2 text-body-sm text-text-muted"
            >
              <span class="text-gold shrink-0">•</span>
              {{ t(`science.graduate.doctoral.${key}`) }}
            </li>
          </ul>
          <p class="text-body-sm text-text-muted mt-auto">
            {{ t('science.graduate.doctoral.description') }}
          </p>
        </article>
      </div>

      <!-- Admission info: bg-off-white, 3-step process with gold number badges -->
      <section class="bg-off-white rounded-16 border border-border p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('science.graduate.admissionTitle') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(key, i) in admissionStepKeys"
            :key="key"
            class="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div
              class="w-14 h-14 rounded-14 bg-gold/15 text-gold font-playfair text-xl font-bold flex items-center justify-center shrink-0 mb-4"
            >
              {{ i + 1 }}
            </div>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`science.graduate.${key}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`science.graduate.${key}.text`) }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
