<script setup lang="ts">
/**
 * Вартість навчання.
 *
 * The page used to show made-up per-level prices. The real figures live in the rector's order
 * (№ 82-од від 18.05.2026) and in the fee tables published per degree level — both are documents
 * of the `tuition` section, so the admissions office can replace them each campaign without a
 * developer. The payment details come from the legacy `/uk/2026-vartist-rekvizyty-oplaty`.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.tuition'),
  meta: [{ name: 'description', content: () => t('admissions.tuition.subtitle') }],
})

const requisites = [
  { labelKey: 'requisitesAccount', value: 'UA388201720313201002201003639' },
  { labelKey: 'requisitesBank', value: 'ДКСУ' },
  { labelKey: 'requisitesMfo', value: '820172' },
  { labelKey: 'requisitesEdrpou', value: '02125585' },
] as const

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
        <p class="mt-4 text-white/70 max-w-3xl">
          {{ t('admissions.tuition.subtitle') }}
        </p>
      </div>
    </div>

    <!-- The order and the fee tables per degree level -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
        {{ t('admissions.tuition.documentsTitle') }}
      </h2>
      <p class="text-body-sm text-text-muted max-w-3xl mb-6">
        {{ t('admissions.tuition.documentsIntro') }}
      </p>
      <SharedDocumentList section="tuition" />
    </div>

    <!-- Payment details -->
    <div id="contact" class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-2">
          {{ t('admissions.tuition.requisitesTitle') }}
        </h2>
        <p class="text-body text-text-muted max-w-3xl mb-6">
          {{ t('admissions.tuition.requisitesIntro') }}
        </p>
        <dl class="bg-white border border-border rounded-16 divide-y divide-border max-w-2xl">
          <div
            v-for="row in requisites"
            :key="row.labelKey"
            class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-6 py-4"
          >
            <dt class="text-body-sm text-text-muted sm:w-56 shrink-0">
              {{ t(`admissions.tuition.${row.labelKey}`) }}
            </dt>
            <dd class="font-medium text-navy break-all">{{ row.value }}</dd>
          </div>
        </dl>

        <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-8">
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
