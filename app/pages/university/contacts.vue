<script setup lang="ts">
/**
 * Контакти університету.
 *
 * The page used to carry a generic three-card block, a decorative "map" and five invented
 * departments. Everything here now comes from the university's own contact page: the services a
 * visitor actually writes to (ректор, антикорупція, телефон довіри, доброчесність, приймальна) and
 * the three buildings with a link to each on the map.
 */
definePageMeta({ layout: 'default' })

const { t, tm } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.contacts'),
  meta: [{ name: 'description', content: () => t('university.contacts.subtitle') }],
})

interface Service {
  name: string
  person?: string
  phone?: string
  email?: string
  room?: string
}

interface Campus {
  name: string
  address: string
  mapUrl: string
}

const SERVICES_KEY = 'university.contacts.services'
const CAMPUSES_KEY = 'university.contacts.campuses'

/**
 * Optional fields are read off the `tm()` message object first: probing a missing key with `t()`
 * makes vue-i18n log a warning on every render. The value itself must still come from `t()` —
 * in a production build `tm()` returns compiled message functions, not strings.
 */
function optional(entry: unknown, name: string, key: string): string | undefined {
  if (!entry || typeof entry !== 'object' || !(name in entry)) return undefined
  const value = t(key)
  return value && value !== key ? value : undefined
}

const services = computed<Service[]>(() => {
  const rows = tm(SERVICES_KEY)
  if (!Array.isArray(rows)) return []
  return rows.map((entry, index) => ({
    name: t(`${SERVICES_KEY}.${index}.name`),
    person: optional(entry, 'person', `${SERVICES_KEY}.${index}.person`),
    phone: optional(entry, 'phone', `${SERVICES_KEY}.${index}.phone`),
    email: optional(entry, 'email', `${SERVICES_KEY}.${index}.email`),
    room: optional(entry, 'room', `${SERVICES_KEY}.${index}.room`),
  }))
})

const campuses = computed<Campus[]>(() => {
  const rows = tm(CAMPUSES_KEY)
  if (!Array.isArray(rows)) return []
  return rows.map((_, index) => ({
    name: t(`${CAMPUSES_KEY}.${index}.name`),
    address: t(`${CAMPUSES_KEY}.${index}.address`),
    mapUrl: t(`${CAMPUSES_KEY}.${index}.mapUrl`),
  }))
})

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.contacts.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.contacts.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.contacts.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Contact grid: 3 cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <article class="bg-white border border-border rounded-16 p-6 flex flex-col">
          <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t('university.contacts.addressTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted">
            {{ t('university.contacts.addressText') }}
          </p>
        </article>
        <article class="bg-white border border-border rounded-16 p-6 flex flex-col">
          <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t('university.contacts.phoneEmailTitle') }}
          </h2>
          <a :href="`tel:${(t('utility.phone') || '').replace(/\s/g, '')}`" class="text-body-sm text-navy no-underline hover:text-gold transition-colors">
            {{ t('utility.phone') }}
          </a>
          <a :href="`mailto:${(t('utility.email') || '').replace(`{'@'}`, '@')}`" class="text-body-sm text-navy no-underline hover:text-gold transition-colors mt-1">
            {{ t('utility.email') }}
          </a>
        </article>
        <article class="bg-white border border-border rounded-16 p-6 flex flex-col">
          <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round" />
              <polyline points="12 6 12 12 16 14" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t('university.contacts.hoursTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted">
            {{ t('university.contacts.hoursText') }}
          </p>
        </article>
      </div>

      <!-- Buildings -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('university.contacts.campusesTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <article
          v-for="campus in campuses"
          :key="campus.address"
          class="bg-off-white border border-border rounded-16 p-6 flex flex-col gap-2"
        >
          <h3 class="font-playfair text-lg font-semibold text-navy">{{ campus.name }}</h3>
          <p class="text-body-sm text-text-muted flex-1">{{ campus.address }}</p>
          <a
            :href="campus.mapUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-body-sm font-medium text-navy underline hover:text-gold"
          >
            {{ t('university.contacts.mapLink') }}
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
        </article>
      </div>

      <!-- Services -->
      <div class="bg-off-white rounded-16 p-6 lg:p-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.contacts.departmentsTitle') }}
        </h2>
        <ul class="list-none p-0 m-0 space-y-4">
          <li
            v-for="service in services"
            :key="service.name"
            class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-4 border-b border-border last:border-b-0"
          >
            <div class="min-w-0">
              <span class="font-medium text-navy">{{ service.name }}</span>
              <span v-if="service.person" class="block text-body-sm text-text-muted">
                {{ service.person }}
              </span>
            </div>
            <div class="flex flex-wrap gap-x-5 gap-y-1 text-body-sm text-text-muted sm:justify-end">
              <a
                v-if="service.phone"
                :href="telHref(service.phone)"
                class="no-underline text-navy hover:text-gold transition-colors"
              >
                {{ service.phone }}
              </a>
              <a
                v-if="service.email"
                :href="`mailto:${service.email.replace(`{'@'}`, '@')}`"
                class="no-underline text-navy hover:text-gold transition-colors break-all"
              >
                {{ service.email }}
              </a>
              <span v-if="service.room">{{ service.room }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Довідники університету -->
      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('university.contacts.referenceTitle') }}
      </h2>
      <SharedDocumentList section="contacts" />
    </div>
  </div>
</template>
