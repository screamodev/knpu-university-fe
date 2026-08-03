<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.veteransCenter'),
  meta: [{ name: 'description', content: () => t('student.veteransCenter.subtitle') }],
})

const serviceKeys = ['psychological', 'career', 'educational', 'peer'] as const
const supportIds = ['tuition', 'mentorship', 'sports'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero: respectful darker tone -->
    <div class="bg-gradient-to-b from-navy-deep to-navy-deep py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.veteransCenter.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.veteransCenter.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.veteransCenter.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro 2-col -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-14">
        <p class="text-body text-text-muted">
          {{ t('student.veteransCenter.intro') }}
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
            <path
              d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.343A2 2 0 0 1 6 18H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h.174a60.37 60.37 0 0 0 1.086-.174"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.74 10.147a60.436 60.436 0 0 1 .491 6.343A2 2 0 0 0 18 18h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-.174a60.37 60.37 0 0 1-1.086-.174"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 2v4m0 12v4M2 12h4m12 0h4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <!-- Services grid: 2x2 -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.veteransCenter.servicesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
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
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`student.veteransCenter.services.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`student.veteransCenter.services.${key}.text`) }}
          </p>
        </article>
      </div>

      <!-- Support programmes: stacked cards with gold left border -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.veteransCenter.supportTitle') }}
      </h2>
      <div class="flex flex-col gap-6 mb-14">
        <div
          v-for="id in supportIds"
          :key="id"
          class="bg-white border border-border border-l-4 border-l-gold rounded-r-16 p-6 transition-all duration-280 hover:border-gold/40"
        >
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`student.veteransCenter.support.${id}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`student.veteransCenter.support.${id}.text`) }}
          </p>
        </div>
      </div>

      <!-- Contact block: prominent callout -->
      <div class="bg-off-white border border-border rounded-16 p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('student.veteransCenter.contactTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-body text-text-muted">
          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
              {{ t('student.veteransCenter.contactPhone') }}
            </span>
            <a href="tel:+380577000238" class="text-navy no-underline hover:text-gold transition-colors">
              +38 (057) 700-02-38
            </a>
          </div>
          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
              {{ t('student.veteransCenter.contactEmail') }}
            </span>
            <a href="mailto:veterans@KhNPU.edu.ua" class="text-navy no-underline hover:text-gold transition-colors">
              veterans&#64;KhNPU.edu.ua
            </a>
          </div>
          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
              {{ t('student.veteransCenter.contactHours') }}
            </span>
            <span>Пн–Пт 9:00–17:00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
