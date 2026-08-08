<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const localePath = useLocalePath()

useHead({
  title: () => t('nav.links.admissionCommittee'),
  meta: [{ name: 'description', content: () => t('admissions.committee.subtitle') }],
})

const roleKeys = ['secretary', 'deputy1', 'deputy2', 'prepCoordinator'] as const

const rulesPath = '/admissions/rules'
const edeboUrl = 'https://vstup.edbo.gov.ua/'

function telHref(phoneLabel: string): string {
  const digits = phoneLabel.replace(/[^\d+]/g, '')
  return `tel:${digits}`
}

/**
 * Ministry pages the committee links to; everything the university itself publishes now lives in
 * the `documents` collection under `admissions-committee`, migrated from the old site.
 */
const externalLinks: ReadonlyArray<{ href: string; labelKey: string }> = [
  {
    href: 'https://mon.gov.ua/osvita-2/vishcha-osvita-ta-osvita-doroslikh/vstupna-kampaniia-do-zvo/vstupna-kampaniia-do-zakladiv-vyshchoi-osvity-2026-roku',
    labelKey: 'admissions.committee.doc4',
  },
]
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.committee.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.committee.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.committee.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <p class="max-w-3xl text-body text-text-muted">
        {{ t('admissions.committee.intro') }}
      </p>
    </div>

    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('admissions.committee.contactsTitle') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="rounded-16 bg-white border border-border p-6">
            <p class="text-body-sm font-semibold text-navy mb-2">
              {{ t('admissions.committee.contacts.email') }}
            </p>
            <a
              class="text-body text-navy underline hover:text-gold break-all"
              :href="`mailto:${t('admissions.committee.contactsEmailValue')}`"
            >
              {{ t('admissions.committee.contactsEmailValue') }}
            </a>
          </div>
          <div class="rounded-16 bg-white border border-border p-6">
            <p class="text-body-sm font-semibold text-navy mb-2">
              {{ t('admissions.committee.contacts.phone') }}
            </p>
            <a
              class="text-body text-navy underline hover:text-gold"
              :href="telHref(t('admissions.committee.contactsPhoneValue'))"
            >
              {{ t('admissions.committee.contactsPhoneValue') }}
            </a>
          </div>
          <div class="rounded-16 bg-white border border-border p-6 md:col-span-1">
            <p class="text-body-sm font-semibold text-navy mb-2">
              {{ t('admissions.committee.contacts.hours') }}
            </p>
            <p class="text-body text-text-muted">
              {{ t('admissions.committee.contactsHoursValue') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('admissions.committee.rosterTitle') }}
      </h2>
      <div class="flex flex-wrap gap-x-8 gap-y-8">
        <div
          v-for="key in roleKeys"
          :key="key"
          class="flex items-start gap-3 flex-1 min-w-[240px] max-w-lg"
        >
          <div
            class="w-4 h-4 rounded-full bg-gold shrink-0 ring-4 ring-gold/20 mt-1"
            aria-hidden="true"
          />
          <div>
            <p class="font-semibold text-navy text-body-sm">
              {{ t(`admissions.committee.roles.${key}.name`) }}
            </p>
            <p class="text-body-sm text-text-muted mt-0.5">
              {{ t(`admissions.committee.roles.${key}.role`) }}
            </p>
            <a
              class="text-body-sm text-navy mt-1 inline-block underline hover:text-gold"
              :href="telHref(t(`admissions.committee.roles.${key}.phone`))"
            >
              {{ t(`admissions.committee.roles.${key}.phone`) }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-off-white border-t border-border py-14 lg:py-20">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('admissions.committee.documentsTitle') }}
        </h2>
        <SharedDocumentList section="admissions-committee" />

        <h3 class="font-playfair text-lg font-semibold text-navy mt-10 mb-4">
          {{ t('admissions.committee.externalTitle') }}
        </h3>
        <ul class="space-y-3 list-none p-0">
          <li v-for="item in externalLinks" :key="item.href">
            <a
              :href="item.href"
              class="text-body text-navy underline hover:text-gold inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t(item.labelKey) }}
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div class="bg-navy rounded-16 p-8 lg:p-10 text-white text-center">
        <h2 class="font-playfair text-2xl font-bold mb-3">
          {{ t('admissions.committee.ctaTitle') }}
        </h2>
        <p class="text-white/80 max-w-xl mx-auto mb-8">
          {{ t('admissions.committee.ctaText') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <NuxtLink
            :to="localePath(rulesPath)"
            class="inline-flex items-center justify-center px-6 py-3 rounded-12 bg-gold text-navy font-semibold no-underline hover:bg-gold-light transition-colors"
          >
            {{ t('admissions.committee.ctaPrimary') }}
          </NuxtLink>
          <a
            :href="edeboUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-6 py-3 rounded-12 border border-white/35 text-white font-semibold no-underline hover:border-gold hover:text-gold transition-colors"
          >
            {{ t('admissions.committee.ctaSecondary') }}
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
