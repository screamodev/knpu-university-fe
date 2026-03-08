<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.dual'),
  meta: [{ name: 'description', content: () => t('education.dual.subtitle') }],
})

const benefitIds = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'] as const
const partnerCount = 8
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.dual.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.dual.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.dual.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro 2-col: text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <p class="text-body text-text-muted">
          {{ t('education.dual.intro') }}
        </p>
        <div
          class="rounded-16 bg-gradient-to-br from-navy-mid/20 to-gold/10 aspect-[4/3] max-h-64 lg:max-h-none"
          aria-hidden
        />
      </div>

      <!-- Benefits grid: 2x3 -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.dual.benefitsTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        <article
          v-for="id in benefitIds"
          :key="id"
          class="bg-off-white border border-border rounded-12 p-5 flex gap-4 items-start"
        >
          <span
            class="w-10 h-10 shrink-0 rounded-full bg-gold/15 flex items-center justify-center"
            aria-hidden
          >
            <span class="w-2 h-2 rounded-full bg-gold" />
          </span>
          <div>
            <h3 class="font-playfair text-base font-semibold text-navy mb-1">
              {{ t(`education.dual.benefits.${id}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`education.dual.benefits.${id}.text`) }}
            </p>
          </div>
        </article>
      </div>

      <!-- Partner employers section -->
      <section class="bg-off-white border border-border rounded-16 p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
          {{ t('education.dual.partnersTitle') }}
        </h2>
        <p class="text-body text-text-muted mb-8 max-w-2xl">
          {{ t('education.dual.partnersIntro') }}
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            v-for="i in partnerCount"
            :key="i"
            class="aspect-square rounded-12 bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center text-slate-400 text-body-sm"
            aria-hidden
          >
            Partner {{ i }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
