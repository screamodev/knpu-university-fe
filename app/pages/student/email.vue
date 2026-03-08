<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.email'),
  meta: [{ name: 'description', content: () => t('student.email.subtitle') }],
})

const stepKeys = ['credentials', 'configure', 'webmail'] as const
const faqKeys = ['storage', 'password', 'mobile', 'forwarding'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.email.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.email.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.email.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro 2-col: text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-14">
        <p class="text-body text-text-muted">
          {{ t('student.email.intro') }}
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
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M22 6l-10 7L2 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Setup instructions: 3-step process with gold badges -->
      <section class="bg-off-white rounded-16 border border-border p-8 lg:p-10 mb-14">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('student.email.setupTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="(key, i) in stepKeys"
            :key="key"
            class="flex gap-4 items-start"
          >
            <div
              class="w-14 h-14 rounded-14 bg-gold/15 text-gold font-playfair text-xl font-bold flex items-center justify-center shrink-0"
            >
              {{ i + 1 }}
            </div>
            <div>
              <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
                {{ t(`student.email.steps.${key}.title`) }}
              </h3>
              <p class="text-body-sm text-text-muted">
                {{ t(`student.email.steps.${key}.text`) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ section: 4 stacked cards with gold left border -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.email.faqTitle') }}
      </h2>
      <div class="space-y-0">
        <div
          v-for="key in faqKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 lg:p-8 border-l-4 border-l-gold mb-6 last:mb-0"
        >
          <h3 class="font-playfair text-xl font-semibold text-navy mb-2">
            {{ t(`student.email.faq.${key}.title`) }}
          </h3>
          <p class="text-body text-text-muted">
            {{ t(`student.email.faq.${key}.text`) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
