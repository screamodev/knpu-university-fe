<script setup lang="ts">
/**
 * На допомогу здобувачу.
 *
 * Two legacy pages folded into one: «На допомогу здобувачеві наукового ступеня» and «…вченого
 * звання». The documents are rows of the `documents` collection, so the academic secretary's
 * office keeps them current; the legislation links and the e-signature explainers are part of
 * the page itself, as on the old site.
 */
definePageMeta({ layout: 'default' })

const { t, tm } = useSafeI18nWithRouter()

useHead({
  title: () => t('science.candidateSupport.title'),
  meta: [{ name: 'description', content: () => t('science.candidateSupport.subtitle') }],
})

/** Legislation the кандидат наук track is governed by; plain links, as on the legacy page. */
const CANDIDATE_LAWS = [
  { key: 'law1', url: 'https://zakon.rada.gov.ua/laws/show/567-2013-%D0%BF#Text' },
  { key: 'law2', url: 'https://zakon.rada.gov.ua/laws/show/z0155-17#Text' },
  { key: 'law3', url: 'https://zakon.rada.gov.ua/laws/show/z1086-19#n10' },
  {
    key: 'law4',
    url: 'https://mon.gov.ua/nauka/nauka-2/atestatsiya-kadriv-vishchoi-kvalifikatsii/instruktivni-listi',
  },
  {
    key: 'law5',
    url: 'https://mon.gov.ua/static-objects/mon/sites/1/atestatsiya-kadriv-vyshchoi-kvalifikatisii/2023/10/04/pro-rozm-povidoml-pro-pryyn-dysert-do-zakhystu-1-5632-23-vid-21-04-2023.pdf',
  },
  {
    key: 'law6',
    url: 'https://mon.gov.ua/static-objects/mon/sites/1/atestatsiya-kadriv-vyshchoi-kvalifikatisii/2022/02/09/Lyst.MON.1-2136-08.02.22-Shchodo.zastos.zak.z.pyt.prysudzh.nauk.stupeniv.pdf',
  },
] as const

/** Видео and slides on the qualified electronic signature, kept from the legacy page. */
const SIGNATURE_VIDEOS = [
  { key: 'video1', embed: 'https://www.youtube.com/embed/wRY_xi4WVO4' },
  { key: 'video2', embed: 'https://www.youtube.com/embed/09NuX02a2wE' },
] as const

const SIGNATURE_LINKS = [
  {
    key: 'kep',
    url: 'https://docs.google.com/presentation/d/1fw1J5CWVMQdGM57uB-VNE5hmx_RwKxoGs5tBrECQEF4/edit?usp=sharing',
  },
  { key: 'czo', url: 'https://czo.gov.ua/sign' },
] as const

const contacts = computed(() => tm('science.candidateSupport.contacts') as unknown as {
  unit: string
  person?: string
  address: string
  email: string
  phone?: string
}[])
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('science.candidateSupport.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.candidateSupport.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.candidateSupport.subtitle') }}
        </p>
      </div>
    </div>

    <SharedSectionTabs :tabs="COUNCIL_TABS" />

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-4">
      <!-- Здобувачу наукового ступеня -->
      <SharedAccordion :title="t('science.candidateSupport.phdTitle')">
        <div class="pt-4 flex flex-col gap-6">
          <SharedDocumentList section="candidate-support" />

          <div>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-3">
              {{ t('science.candidateSupport.signatureTitle') }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <figure v-for="video in SIGNATURE_VIDEOS" :key="video.key" class="m-0">
                <div class="aspect-video overflow-hidden rounded-12 border border-border">
                  <iframe
                    :src="video.embed"
                    :title="t(`science.candidateSupport.${video.key}`)"
                    class="w-full h-full"
                    frameborder="0"
                    allowfullscreen
                    loading="lazy"
                  />
                </div>
                <figcaption class="mt-2 text-body-sm text-text-muted">
                  {{ t(`science.candidateSupport.${video.key}`) }}
                </figcaption>
              </figure>
            </div>
            <ul class="mt-4 list-none p-0 m-0 space-y-2">
              <li v-for="link in SIGNATURE_LINKS" :key="link.key">
                <a
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-body text-navy underline hover:text-gold"
                >
                  {{ t(`science.candidateSupport.${link.key}`) }}
                  <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </SharedAccordion>

      <!-- Здобувачу наукового ступеня кандидата наук -->
      <SharedAccordion :title="t('science.candidateSupport.candidateTitle')">
        <div class="pt-4">
          <p class="text-body text-text-muted max-w-3xl">
            {{ t('science.candidateSupport.candidateIntro') }}
          </p>
          <h3 class="font-playfair text-lg font-semibold text-navy mt-6 mb-3">
            {{ t('science.candidateSupport.lawsTitle') }}
          </h3>
          <ul class="list-none p-0 m-0 space-y-2">
            <li v-for="law in CANDIDATE_LAWS" :key="law.key" class="flex gap-3">
              <span class="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2.5" aria-hidden />
              <a
                :href="law.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-body text-navy underline hover:text-gold"
              >
                {{ t(`science.candidateSupport.${law.key}`) }}
                <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
              </a>
            </li>
          </ul>
        </div>
      </SharedAccordion>

      <!-- Здобувачу вченого звання -->
      <SharedAccordion :title="t('science.candidateSupport.titleTrackTitle')">
        <div class="pt-4">
          <SharedDocumentList section="academic-title-support" />
        </div>
      </SharedAccordion>
    </div>

    <!-- Відповідальні особи -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('science.candidateSupport.contactsTitle') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div
            v-for="contact in contacts"
            :key="contact.unit"
            class="bg-white border border-border rounded-16 p-6"
          >
            <p class="text-body-sm font-semibold text-navy">{{ contact.unit }}</p>
            <p v-if="contact.person" class="font-playfair text-lg font-semibold text-navy mt-1">
              {{ contact.person }}
            </p>
            <p class="text-body-sm text-text-muted mt-2">{{ contact.address }}</p>
            <p v-if="contact.phone" class="text-body-sm text-text-muted">{{ contact.phone }}</p>
            <a
              :href="`mailto:${contact.email}`"
              class="text-body-sm text-navy underline hover:text-gold break-all"
            >
              {{ contact.email }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
