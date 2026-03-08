<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.tuition'),
  meta: [{ name: 'description', content: () => t('admissions.tuition.subtitle') }],
})

const pricingCards = [
  { level: 'levelBachelor' as const, amount: '25 000', featured: false },
  { level: 'levelMaster' as const, amount: '28 000', featured: true },
  { level: 'levelGraduate' as const, amount: '30 000', featured: false },
] as const

const includedKeys = ['included1', 'included2', 'included3', 'included4', 'included5'] as const
const paymentBlocks = [
  { titleKey: 'payment1Title' as const, textKey: 'payment1Text' as const },
  { titleKey: 'payment2Title' as const, textKey: 'payment2Text' as const },
  { titleKey: 'payment3Title' as const, textKey: 'payment3Text' as const },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.tuition.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.tuition.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.tuition.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Pricing cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="card in pricingCards"
          :key="card.level"
          class="rounded-16 border overflow-hidden flex flex-col"
          :class="card.featured ? 'border-gold bg-gold/5 shadow-lg' : 'border-border bg-white'"
        >
          <div
            class="px-6 py-4 text-center font-playfair text-lg font-semibold"
            :class="card.featured ? 'bg-gold/15 text-gold' : 'bg-off-white text-navy'"
          >
            {{ t(`admissions.tuition.${card.level}`) }}
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <p class="text-2xl font-playfair font-bold text-navy mb-4">
              {{ t('admissions.tuition.fromPerYear', { amount: card.amount }) }}
            </p>
            <ul class="space-y-2 text-body text-text-muted flex-1">
              <li
                v-for="key in includedKeys"
                :key="key"
                class="flex gap-2"
              >
                <span class="text-gold shrink-0">•</span>
                {{ t(`admissions.tuition.${key}`) }}
              </li>
            </ul>
            <a
              href="#contact"
              class="mt-6 inline-flex justify-center items-center px-5 py-3 rounded-10 font-semibold text-body transition-colors"
              :class="card.featured ? 'bg-gold text-navy hover:bg-gold-light' : 'bg-navy text-white hover:bg-navy-deep'"
            >
              {{ t('admissions.tuition.ctaButton') }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment options -->
    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('admissions.tuition.paymentTitle') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="block in paymentBlocks"
            :key="block.titleKey"
            class="bg-white border border-border rounded-12 p-6"
          >
            <h3 class="font-playfair text-lg font-semibold text-navy mb-3">
              {{ t(`admissions.tuition.${block.titleKey}`) }}
            </h3>
            <p class="text-body text-text-muted">
              {{ t(`admissions.tuition.${block.textKey}`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
