<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.psychology'),
  meta: [{ name: 'description', content: () => t('student.psychology.subtitle') }],
})

const serviceKeys = ['individual', 'group', 'crisis', 'workshops'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.psychology.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.psychology.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.psychology.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro 2-col: text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-14">
        <p class="text-body text-text-muted">
          {{ t('student.psychology.intro') }}
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
              d="M12 2a4 4 0 0 0-4 4c0 2 2 4 4 6 2-2 4-4 4-6a4 4 0 0 0-4-4z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 12c-3 0-5 2-5 5v3h10v-3c0-3-2-5-5-5z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <!-- Services grid: 2x2 -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.psychology.servicesTitle') }}
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
              <path d="M12 2a4 4 0 0 0-4 4c0 2 2 4 4 6 2-2 4-4 4-6a4 4 0 0 0-4-4z" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 12c-3 0-5 2-5 5v3h10v-3c0-3-2-5-5-5z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`student.psychology.services.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`student.psychology.services.${key}.text`) }}
          </p>
        </article>
      </div>

      <!-- Contact block: bg-off-white band -->
      <div class="bg-off-white border border-border rounded-16 p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('student.psychology.contactTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-body text-text-muted">
          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
              {{ t('student.psychology.contactPhone') }}
            </span>
            <a href="tel:+380577000238" class="text-navy no-underline hover:text-gold transition-colors">
              +38 (057) 700-02-38
            </a>
          </div>
          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
              {{ t('student.psychology.contactEmail') }}
            </span>
            <a href="mailto:psychology@KhNPU.edu.ua" class="text-navy no-underline hover:text-gold transition-colors">
              psychology&#64;KhNPU.edu.ua
            </a>
          </div>
          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
              {{ t('student.psychology.contactHours') }}
            </span>
            <span>Mon–Fri 9:00 AM–5:00 PM</span>
          </div>
          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
              {{ t('student.psychology.contactLocation') }}
            </span>
            <span>Main building, room 215</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
