<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const localePath = useLocalePath()

useHead({
  title: () => t('nav.links.wartime'),
  meta: [{ name: 'description', content: () => t('university.wartime.subtitle') }],
})

type SafetyEntry =
  | { kind: 'external'; href: string; labelKey: string }
  | { kind: 'internal'; path: string; labelKey: string }

const safetyLinks: readonly SafetyEntry[] = [
  {
    kind: 'external',
    href: 'https://mon.gov.ua/npa/pro-zatverdzhennya-derzhavnogo-kodeksu-bezpechnogo-osvitnogo-seredovishcha',
    labelKey: 'university.wartime.safetyLinkCode',
  },
  {
    kind: 'internal',
    path: '/student/psychology',
    labelKey: 'university.wartime.safetyLinkPsych',
  },
  {
    kind: 'external',
    href: 'https://hnpu.edu.ua/uk/viyna-ochyma-studentiv-vypusknykiv-vykladachiv-ta-spivrobitnykiv-hnpu-imeni-g-s-skovorody',
    labelKey: 'university.wartime.safetyLinkLetters',
  },
  {
    kind: 'external',
    href: 'https://zakon.rada.gov.ua/laws/show/2136-IX',
    labelKey: 'university.wartime.safetyLinkLabor',
  },
]

const orders: ReadonlyArray<{
  href: string
  titleKey: string
  textKey: string
}> = [
  {
    href: 'https://hnpu.edu.ua/sites/default/files/files/Normat_dokum/nakazy/2022/76_28_06_22.pdf',
    titleKey: 'university.wartime.order1Title',
    textKey: 'university.wartime.order1Text',
  },
  {
    href: 'https://hnpu.edu.ua/sites/default/files/files/Normat_dokum/nakazy/2022/photo1645795654.jpeg',
    titleKey: 'university.wartime.order2Title',
    textKey: 'university.wartime.order2Text',
  },
]

const addressItems: ReadonlyArray<{ textKey: string; href: string }> = [
  {
    textKey: 'university.wartime.addr1',
    href: 'https://hnpu.edu.ua/uk/news/oficiyna-zayava-rektora-hnpu-imeni-gs-skovorody-prof-yuriya-boychuka',
  },
  {
    textKey: 'university.wartime.addr2',
    href: 'https://hnpu.edu.ua/uk/news/informaciyne-povidomlennya-vid-rektora-yuriya-boychuka',
  },
  {
    textKey: 'university.wartime.addr3',
    href: 'https://hnpu.edu.ua/uk/news/zvernennya-yuriya-boychuka-rektora-hnpu-imeni-gs-skovorody',
  },
  {
    textKey: 'university.wartime.addr4',
    href: 'https://hnpu.edu.ua/uk/news/zvernennya-yuriya-boychukarektora-hnpu-imeni-gs-skovorody',
  },
  {
    textKey: 'university.wartime.addr5',
    href: 'https://hnpu.edu.ua/uk/news/informaciyno-rozyasnyuvalne-zanyatya-z-pytan-zahodiv-bezpeky',
  },
]

const mobilityUrl =
  'https://hnpu.edu.ua/uk/news/ternopilskyy-nacionalnyy-pedagogichnyy-universytet-imeni-volodymyra-gnatyuka-zaproshuye'

const recruitingUrl = 'https://hnpu.edu.ua/uk/news/informaciyna-kampaniya-shchodo-viyskovogo-rekrutyngu'
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('university.wartime.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.wartime.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.wartime.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="rounded-16 border border-border bg-white p-6 lg:p-8 shadow-sm">
        <h2 class="font-playfair text-xl font-bold text-navy mb-3">
          {{ t('university.wartime.silenceTitle') }}
        </h2>
        <p class="text-body text-text-muted max-w-3xl">
          {{ t('university.wartime.silenceBody') }}
        </p>
      </div>
    </div>

    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('university.wartime.safetyTitle') }}
        </h2>
        <ul class="space-y-3 list-none p-0">
          <li v-for="(item, index) in safetyLinks" :key="index">
            <a
              v-if="item.kind === 'external'"
              :href="item.href"
              class="text-body text-primary underline hover:text-primary-dark inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t(item.labelKey) }}
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <NuxtLink
              v-else
              :to="localePath(item.path)"
              class="text-body text-primary underline hover:text-primary-dark"
            >
              {{ t(item.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.wartime.ordersTitle') }}
      </h2>
      <ul class="space-y-8 list-none p-0">
        <li
          v-for="(order, index) in orders"
          :key="order.href"
          class="flex gap-4"
        >
          <div
            class="w-10 h-10 rounded-10 bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-playfair font-bold shrink-0"
          >
            {{ index + 1 }}
          </div>
          <div class="max-w-3xl">
            <a
              :href="order.href"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-navy text-body underline hover:text-primary transition-colors"
            >
              {{ t(order.titleKey) }}
            </a>
            <p class="text-body text-text-muted mt-1">
              {{ t(order.textKey) }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('university.wartime.addressesTitle') }}
        </h2>
        <ul class="space-y-4 list-disc list-outside pl-5 marker:text-gold">
          <li v-for="item in addressItems" :key="item.textKey" class="text-body text-text-muted pl-1">
            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-body text-text-muted underline hover:text-primary"
            >
              {{ t(item.textKey) }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-4">
        {{ t('university.wartime.mobilityTitle') }}
      </h2>
      <p class="text-body text-text-muted max-w-3xl mb-4">
        {{ t('university.wartime.mobilityText') }}
      </p>
      <a
        :href="mobilityUrl"
        class="text-body text-primary underline hover:text-primary-dark inline-flex items-center gap-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('university.wartime.mobilityLinkLabel') }}
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <path d="M15 3h6v6M10 14L21 3" />
        </svg>
      </a>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-20">
      <div class="rounded-16 border border-border bg-white p-6 lg:p-8 shadow-sm">
        <h2 class="font-playfair text-xl font-bold text-navy mb-3">
          {{ t('university.wartime.recruitingTitle') }}
        </h2>
        <p class="text-body text-text-muted mb-4">
          {{ t('university.wartime.recruitingText') }}
        </p>
        <a
          :href="recruitingUrl"
          class="text-body text-primary font-semibold underline hover:text-primary-dark inline-flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('university.wartime.recruitingLinkLabel') }}
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>
    </div>

    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="flex justify-center mb-6">
          <svg
            class="w-10 h-10 text-gold/70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M12 22c0-4-2-6-2-10 0-2 1-4 2-4s2 2 2 4c0 4-2 6-2 10" />
            <path d="M12 8v14" />
            <path d="M8 22h8" />
          </svg>
        </div>
        <p class="font-playfair text-xl text-navy max-w-xl mx-auto">
          {{ t('university.wartime.closing') }}
        </p>
      </div>
    </div>
  </div>
</template>
