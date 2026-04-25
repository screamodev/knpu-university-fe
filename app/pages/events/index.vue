<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusEvent } from '~/types/directus'
import { resolveMediaAlt, resolveMediaSrc } from '~/utils/directusMedia'

definePageMeta({ layout: 'default' })

const { t, localePath, locale } = useSafeI18nWithRouter()
const { client, assetUrl, publicUrl } = useDirectus()
const mediaResolvers = {
  assetUrl,
  legacyImageUrl: (path: string) =>
    path.startsWith('http://') || path.startsWith('https://')
      ? path
      : `${publicUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`,
}
const { localized } = useLocalizedField()

useHead({
  title: () => t('sections.events.title'),
  meta: [{ name: 'description', content: () => t('sections.events.title') }],
})

const { data: eventsData, pending } = useAsyncData('events-listing', () =>
  client.request(
    readItems('events', {
      fields: ['*', { cover: ['*'] }],
      sort: ['date'],
      limit: 24,
    }),
  ),
)

const events = computed(() => eventsData.value ?? [])

const dateLocale = computed(() => (locale.value === 'uk' ? 'uk-UA' : 'en-US'))

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function formatDay(dateStr: string): string {
  return new Intl.DateTimeFormat(dateLocale.value, { day: 'numeric' }).format(
    new Date(dateStr),
  )
}

function formatMonth(dateStr: string): string {
  return new Intl.DateTimeFormat(dateLocale.value, { month: 'short' }).format(
    new Date(dateStr),
  )
}

function eventCoverSrc(cover: DirectusEvent['cover']): string {
  return resolveMediaSrc(cover, mediaResolvers)
}

function eventCoverAlt(cover: DirectusEvent['cover'], titleFallback: string): string {
  return resolveMediaAlt(cover, titleFallback)
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Page header -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('sections.events.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('sections.events.title') }}
        </h1>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading skeleton -->
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-off-white border border-border rounded-16 overflow-hidden animate-pulse"
        >
          <div class="h-48 bg-border" />
          <div class="p-5 space-y-3">
            <div class="h-8 w-16 bg-border rounded" />
            <div class="h-3 bg-border rounded w-1/4" />
            <div class="h-5 bg-border rounded w-4/5" />
            <div class="h-3 bg-border rounded w-3/5" />
          </div>
        </div>
      </div>

      <!-- Events grid -->
      <div
        v-else-if="events.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <NuxtLink
          v-for="ev in events"
          :key="ev.id"
          :to="localePath(`/events/${ev.slug}`)"
          class="group bg-off-white border border-border rounded-16 overflow-hidden no-underline flex flex-col transition-all duration-280 hover:border-gold hover:-translate-y-1 hover:shadow-gold"
        >
          <!-- Cover image -->
          <div class="h-48 bg-navy-mid overflow-hidden relative">
            <img
              v-if="ev.cover && eventCoverSrc(ev.cover)"
              :src="eventCoverSrc(ev.cover)"
              :alt="eventCoverAlt(ev.cover, localized(ev, 'title'))"
              class="w-full h-full object-cover transition-transform duration-280 group-hover:scale-105"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-gold/30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <!-- Date badge overlay -->
            <div
              class="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-10 px-3 py-2 text-center shadow"
            >
              <div class="font-playfair text-xl font-bold text-navy leading-none">
                {{ formatDay(ev.date) }}
              </div>
              <div class="text-[10px] uppercase tracking-wider text-text-muted font-medium">
                {{ formatMonth(ev.date) }}
              </div>
            </div>
          </div>

          <!-- Card body -->
          <div class="p-5 flex flex-col flex-1">
            <div
              v-if="localized(ev, 'tag')"
              class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-2"
            >
              {{ localized(ev, 'tag') }}
            </div>
            <div
              class="font-playfair text-[16px] font-semibold text-navy leading-snug flex-1 mb-3"
            >
              {{ localized(ev, 'title') }}
            </div>
            <p
              v-if="localized(ev, 'location')"
              class="text-sm text-text-muted flex items-center gap-1"
            >
              <svg class="w-3.5 h-3.5 text-gold/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ localized(ev, 'location') }}
            </p>
            <div class="text-xs text-text-muted mt-2">{{ formatDate(ev.date) }}</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="py-24 text-center text-text-muted">
        {{ t('events.noEvents') }}
      </div>
    </div>
  </div>
</template>
