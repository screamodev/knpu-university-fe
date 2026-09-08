<script setup lang="ts">
/**
 * Первинна профспілкова організація студентів.
 *
 * Текст, контакти й фото голови надійшли від самої профспілки 08.09 — до цього сторінка
 * показувала демонстраційний набір «переваг членства» з чернетки макета. Контент статичний:
 * профспілка надсилає правки поштою, окремої колекції в Directus для неї немає.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('student.union.title'),
  meta: [{ name: 'description', content: () => t('student.union.subtitle') }],
})

const CHAIR_PHOTO = '/images/static/sidak.jpg'
const UNION_PHONE = '+380506259461'
const UNION_EMAIL = 'profspilkahnpu@ukr.net'

const areaKeys = ['housing', 'sports', 'organisational', 'cultural', 'social'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.union.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.union.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.union.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Голова: фото, посада, контакти -->
      <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start mb-14">
        <img
          :src="CHAIR_PHOTO"
          :alt="t('student.union.chairName')"
          class="w-full max-w-[280px] rounded-16 object-cover"
          loading="lazy"
        >
        <div>
          <span class="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-2">
            {{ t('student.union.chairTitle') }}
          </span>
          <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
            {{ t('student.union.chairName') }}
          </h2>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-body text-text-muted">
            <div>
              <dt class="text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                {{ t('student.union.contactPhone') }}
              </dt>
              <dd>
                <a
                  :href="`tel:${UNION_PHONE}`"
                  class="text-navy no-underline hover:text-gold transition-colors"
                >
                  +38 (050) 625-94-61
                </a>
              </dd>
            </div>
            <div>
              <dt class="text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                {{ t('student.union.contactEmail') }}
              </dt>
              <dd>
                <a
                  :href="`mailto:${UNION_EMAIL}`"
                  class="text-navy no-underline hover:text-gold transition-colors break-all"
                >
                  {{ UNION_EMAIL }}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Що таке профспілка / про організацію -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-14">
        <section>
          <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
            {{ t('student.union.whatTitle') }}
          </h2>
          <p class="text-body text-text-muted">
            {{ t('student.union.whatText') }}
          </p>
        </section>
        <section>
          <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
            {{ t('student.union.aboutTitle') }}
          </h2>
          <p class="text-body text-text-muted mb-4">
            {{ t('student.union.aboutText') }}
          </p>
          <p class="text-body text-text-muted">
            {{ t('student.union.aboutFaculties') }}
          </p>
        </section>
      </div>

      <!-- Напрями діяльності -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-3">
        {{ t('student.union.areasTitle') }}
      </h2>
      <p class="text-body text-text-muted mb-8">
        {{ t('student.union.areasIntro') }}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        <article
          v-for="key in areaKeys"
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
            {{ t(`student.union.areas.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`student.union.areas.${key}.text`) }}
          </p>
        </article>
      </div>

      <!-- Підсумок -->
      <div class="bg-off-white border border-border rounded-16 p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
          {{ t('student.union.summaryTitle') }}
        </h2>
        <p class="text-body text-text-muted mb-4">
          {{ t('student.union.summaryText') }}
        </p>
        <p class="text-body text-text-muted">
          {{ t('student.union.summaryNote') }}
        </p>
      </div>
    </div>
  </div>
</template>
