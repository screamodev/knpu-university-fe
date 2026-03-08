<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.veterans'),
  meta: [{ name: 'description', content: () => t('admissions.veterans.subtitle') }],
})

const programKeys = ['program1', 'program2', 'program3', 'program4'] as const

const benefitCards = [
  { titleKey: 'benefit1Title' as const, textKey: 'benefit1Text' as const },
  { titleKey: 'benefit2Title' as const, textKey: 'benefit2Text' as const },
  { titleKey: 'benefit3Title' as const, textKey: 'benefit3Text' as const },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero (respectful tone) -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.veterans.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.veterans.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.veterans.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('admissions.veterans.intro') }}
      </p>
    </div>

    <!-- 2-column: placeholder image + support programs list -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div
            class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] flex items-center justify-center shrink-0 order-2 lg:order-1"
          >
            <svg
              class="w-16 h-16 text-gold/20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v6M9 11h6" />
            </svg>
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
              {{ t('admissions.veterans.programsTitle') }}
            </h2>
            <ul class="space-y-4">
              <li
                v-for="key in programKeys"
                :key="key"
                class="flex gap-3 items-start"
              >
                <span class="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span class="text-gold text-xs font-bold">✓</span>
                </span>
                <span class="text-body text-navy font-medium">
                  {{ t(`admissions.veterans.${key}`) }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits grid: 3 cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('admissions.veterans.benefitsTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="card in benefitCards"
          :key="card.titleKey"
          class="bg-off-white border border-border rounded-16 p-6 border-l-4 border-l-gold"
        >
          <h3 class="font-playfair text-lg font-semibold text-navy mb-3">
            {{ t(`admissions.veterans.${card.titleKey}`) }}
          </h3>
          <p class="text-body text-text-muted">
            {{ t(`admissions.veterans.${card.textKey}`) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contact block -->
    <div
      id="contact"
      class="bg-off-white border-t border-border py-14 lg:py-20"
    >
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('admissions.veterans.contactTitle') }}
        </h2>
        <p class="text-body text-text-muted mb-8 max-w-xl">
          {{ t('admissions.veterans.contactText') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-6">
          <a
            href="tel:+380577000238"
            class="inline-flex items-center gap-3 text-body font-medium text-navy hover:text-gold transition-colors"
          >
            <span class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center text-gold">
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span>{{ t('admissions.veterans.contactPhone') }}: +38 (057) 700-02-38</span>
          </a>
          <a
            href="mailto:rector@KhNPU.edu.ua"
            class="inline-flex items-center gap-3 text-body font-medium text-navy hover:text-gold transition-colors"
          >
            <span class="w-10 h-10 rounded-10 bg-gold/15 flex items-center justify-center text-gold">
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </span>
            <span>{{ t('admissions.veterans.contactEmail') }}: rector@KhNPU.edu.ua</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
