<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { Query } from '@directus/sdk'
import type { DirectusEvent, DirectusSchema } from '~/types/directus'
import { ADMISSIONS_LEGACY_URL } from '~/utils/externalSites'

const { t, localePath, locale } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()
const { client } = useDirectus()
const NuxtLink = resolveComponent('NuxtLink')

const today = new Date().toISOString().slice(0, 10)
const { data, pending, error } = useAsyncData('home-events-upcoming', () =>
  client.request(
    readItems(
      'events',
      {
        fields: ['*', { cover: ['*'] }],
        sort: ['date'],
        filter: { date: { _gte: today } },
        limit: 3,
      } as Query<DirectusSchema, DirectusEvent>,
    ),
  ),
)

const events = computed(() => data.value ?? [])

const dateLocale = computed(() => (locale.value === 'uk' ? 'uk-UA' : 'en-US'))
const eventDay = (dateStr: string): string =>
  new Intl.DateTimeFormat(dateLocale.value, { day: 'numeric' }).format(new Date(dateStr))
const eventMonth = (dateStr: string): string =>
  new Intl.DateTimeFormat(dateLocale.value, { month: 'short' }).format(new Date(dateStr))

interface ResourceCard {
  titleKey: string
  subKey: string
  icon: string
  gold: boolean
  path?: string
  /** Адреса вже з префіксом локалі — сторінка існує лише однією мовою. */
  rawPath?: string
  url?: string
  disabled?: boolean
}

const EDUHUB_EXTERNAL_URL
  = 'https://sites.google.com/hnpu.edu.ua/khnpu-eduhub/%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80'
const INTEGRITY_EXTERNAL_URL = 'https://sites.google.com/hnpu.edu.ua/akdob'

const resourceList = computed<ResourceCard[]>(() => [
  {
    path: '/education/quality',
    titleKey: 'resources.quality.title',
    subKey: 'resources.quality.sub',
    icon: '🏅',
    gold: false,
  },
  {
    // Вступ веде приймальна комісія на старому сайті.
    url: ADMISSIONS_LEGACY_URL,
    titleKey: 'resources.vstup.title',
    subKey: 'resources.vstup.sub',
    icon: '🎓',
    gold: true,
  },
  {
    // Сторінка для іноземних вступників написана англійською й живе тільки в /en.
    rawPath: '/en/admissions/foreign',
    titleKey: 'resources.abroad.title',
    subKey: 'resources.abroad.sub',
    icon: '🌍',
    gold: false,
  },
  {
    path: '/university/language-exam',
    titleKey: 'resources.languageExam.title',
    subKey: 'resources.languageExam.sub',
    icon: '📝',
    gold: false,
  },
  {
    url: INTEGRITY_EXTERNAL_URL,
    titleKey: 'resources.integrity.title',
    subKey: 'resources.integrity.sub',
    icon: '🛡️',
    gold: false,
  },
  {
    url: EDUHUB_EXTERNAL_URL,
    titleKey: 'resources.eduhub.title',
    subKey: 'resources.eduhub.sub',
    icon: '📅',
    gold: false,
  },
])
</script>

<template>
  <section class="pt-10 pb-20 bg-white">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SharedSectionHeader :tag="t('sections.events.tag')" :title="t('sections.events.title')" />
          <div v-if="pending" class="flex flex-col gap-4">
            <div
              v-for="i in 3"
              :key="i"
              class="grid grid-cols-[80px_1fr] items-center gap-5 py-5 px-6 border border-border rounded-12 animate-pulse"
            >
              <div class="h-12 bg-slate-200 rounded" />
              <div class="space-y-2">
                <div class="h-3 bg-slate-200 rounded w-1/4" />
                <div class="h-4 bg-slate-200 rounded w-3/4" />
                <div class="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          </div>
          <!-- Error state -->
          <div
            v-else-if="error"
            class="flex flex-col items-center justify-center py-12 text-center"
          >
            <div class="w-14 h-14 rounded-full bg-danger/10 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p class="text-body-sm text-text-muted max-w-xs">{{ t('sections.events.error') }}</p>
          </div>

          <!-- Empty state -->
          <div
            v-else-if="events.length === 0"
            class="flex flex-col items-center justify-center py-12 text-center"
          >
            <div class="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p class="text-body-sm text-text-muted max-w-xs">{{ t('sections.events.empty') }}</p>
          </div>

          <!-- Events list -->
          <div v-else class="flex flex-col gap-4">
            <NuxtLink
              v-for="ev in events"
              :key="ev.id"
              :to="localePath(`/events/${ev.slug}`)"
              class="grid grid-cols-1 min-[400px]:grid-cols-[80px_1fr_auto] items-center gap-3 min-[400px]:gap-5 py-4 px-4 min-[400px]:py-5 min-[400px]:px-6 border-[1.5px] border-border rounded-12 no-underline transition-all duration-280 bg-white hover:border-gold hover:translate-x-1"
            >
              <div class="text-center">
                <div class="font-playfair text-3xl font-bold text-navy leading-none">{{ eventDay(ev.date) }}</div>
                <div class="text-[11px] uppercase tracking-wider text-text-muted font-medium">{{ eventMonth(ev.date) }}</div>
              </div>
              <div>
                <div class="text-[11px] font-semibold uppercase tracking-wide text-gold mb-1">
                  {{ localized(ev, 'tag') || '—' }}
                </div>
                <div class="text-[15px] font-medium text-navy leading-snug">{{ localized(ev, 'title') }}</div>
                <div class="text-xs text-text-muted mt-1 flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 text-gold/80 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span>{{ localized(ev, 'location') || '—' }}</span>
                </div>
              </div>
              <div class="text-border text-xl transition-colors duration-280 group-hover:text-gold">›</div>
            </NuxtLink>
          </div>
        </div>
        <div>
          <SharedSectionHeader :tag="t('sections.resources.tag')" :title="t('sections.resources.title')" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <component
              :is="res.disabled ? 'span' : res.url ? 'a' : NuxtLink"
              v-for="(res, i) in resourceList"
              :key="i"
              v-bind="
                res.disabled
                  ? {}
                  : res.url
                    ? { href: res.url, target: '_blank', rel: 'noopener noreferrer' }
                    : { to: res.rawPath ?? localePath(res.path ?? '/') }
              "
              class="flex flex-col gap-3 p-6 rounded-14 no-underline transition-transform duration-200"
              :class="[
                res.gold ? 'bg-gold' : 'bg-navy border border-border',
                res.disabled ? 'opacity-55 cursor-default' : 'hover:-translate-y-0.5',
              ]"
            >
              <div class="text-2xl">{{ res.icon }}</div>
              <div
                class="text-sm font-semibold"
                :class="res.gold ? 'text-navy-deep' : 'text-white'"
              >
                {{ t(res.titleKey) }}
              </div>
              <div
                class="text-xs"
                :class="res.gold ? 'text-navy-deep/65' : 'text-white/50'"
              >
                {{ t(res.subKey) }}
              </div>
              <span v-if="res.url" class="sr-only">{{ t('common.opensInNewTab') }}</span>
            </component>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
