<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const { assetUrl } = useDirectus()

/** Фото асоціації випускників, надіслане пресслужбою 09.09; лежить у медіатеці Directus. */
const ALUMNI_PHOTO = 'c72d0c6d-b854-5286-ac0b-27bb279aa85b'

useHead({
  title: () => t('nav.links.alumni'),
  meta: [{ name: 'description', content: () => t('student.alumni.subtitle') }],
})

const benefitKeys = ['networking', 'mentorship', 'careerSupport', 'discounts'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.alumni.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.alumni.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.alumni.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro 2-col: text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-14">
        <p class="text-body text-text-muted">
          {{ t('student.alumni.intro') }}
        </p>
        <img
          :src="assetUrl(ALUMNI_PHOTO, { width: 900, quality: 82 }) ?? undefined"
          :alt="t('student.alumni.title')"
          class="rounded-16 aspect-[4/3] object-cover shrink-0 w-full"
          loading="lazy"
        >
      </div>

      <!-- Benefits grid: 2x2 -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.alumni.benefitsTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
        <article
          v-for="key in benefitKeys"
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
            {{ t(`student.alumni.benefits.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`student.alumni.benefits.${key}.text`) }}
          </p>
        </article>
      </div>

      <!-- Notable alumni: the three previous entries were invented people. -->
      <div class="bg-off-white border border-gold/20 rounded-16 p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('student.alumni.notableTitle') }}
        </h2>
        <SharedSectionPending />
      </div>
    </div>
  </div>
</template>
