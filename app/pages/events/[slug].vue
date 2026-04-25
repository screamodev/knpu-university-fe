<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusEvent, RichTextBlock } from '~/types/directus'
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

const route = useRoute()
const slug = route.params.slug as string

const { data } = await useAsyncData(
  `directus-event-${locale.value}-${slug}`,
  () =>
    client.request(
      readItems('events', {
        filter: { slug: { _eq: slug } },
        fields: ['*', { cover: ['*'] }],
        limit: 1,
      }),
    ),
)

const event = computed(() => data.value?.[0] ?? null)

if (!event.value) {
  throw createError({ statusCode: 404, statusMessage: 'Event not found' })
}

useHead({
  title: () =>
    (event.value ? localized(event.value, 'title') : '') ||
    t('sections.events.title'),
  meta: [
    {
      name: 'description',
      content: () =>
        event.value
          ? localized(event.value, 'description') ||
            localized(event.value, 'title')
          : '',
    },
  ],
})

const dateLocale = computed(() => (locale.value === 'uk' ? 'uk-UA' : 'en-US'))

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function formatTime(dateStr: string): string {
  return new Intl.DateTimeFormat(dateLocale.value, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr))
}

const localizedBody = computed(() => {
  const e = event.value
  if (!e) {
    return { kind: 'blocks' as const, blocks: [] as RichTextBlock[] }
  }
  return normalizedLocalizedBody(e.content, e.contentEn, locale.value)
})

function eventCoverSrc(cover: DirectusEvent['cover']): string {
  return resolveMediaSrc(cover, mediaResolvers)
}

function eventCoverAlt(cover: DirectusEvent['cover'], titleFallback: string): string {
  return resolveMediaAlt(cover, titleFallback)
}
</script>

<template>
  <div v-if="event" class="bg-white min-h-screen">
    <!-- Hero cover -->
    <div class="relative h-72 md:h-96 bg-navy overflow-hidden">
      <img
        v-if="event.cover && eventCoverSrc(event.cover)"
        :src="eventCoverSrc(event.cover)"
        :alt="eventCoverAlt(event.cover, localized(event, 'title'))"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-navy-mid to-navy-deep"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

      <!-- Overlay content -->
      <div
        class="absolute bottom-0 left-0 right-0 max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-8"
      >
        <span
          v-if="localized(event, 'tag')"
          class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold mb-3"
        >
          {{ localized(event, 'tag') }}
        </span>
        <h1
          class="font-playfair text-2xl md:text-4xl font-bold text-white leading-snug max-w-3xl"
        >
          {{ localized(event, 'title') }}
        </h1>
      </div>
    </div>

    <!-- Event body -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="max-w-3xl">
        <!-- Back link -->
        <NuxtLink
          :to="localePath('/events')"
          class="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-navy transition-colors mb-8 no-underline"
        >
          <span>←</span>
          {{ t('events.backToEvents') }}
        </NuxtLink>

        <!-- Metadata row -->
        <div
          class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted mb-8 pb-8 border-b border-border"
        >
          <span v-if="event.date">
            <span class="font-medium text-slate-600">{{ t('events.metaDate') }}:</span>
            {{ formatDate(event.date) }}
          </span>
          <span v-if="event.date">
            <span class="font-medium text-slate-600">{{ t('events.metaTime') }}:</span>
            {{ formatTime(event.date) }}
          </span>
          <span v-if="event.endDate">
            <span class="font-medium text-slate-600">{{ t('events.metaEndDate') }}:</span>
            {{ formatDate(event.endDate) }}
          </span>
          <span v-if="localized(event, 'location')">
            <span class="font-medium text-slate-600">{{ t('events.metaLocation') }}:</span>
            {{ localized(event, 'location') }}
          </span>
        </div>

        <!-- Description excerpt -->
        <p
          v-if="localized(event, 'description')"
          class="text-lead font-medium text-slate-700 mb-8 leading-relaxed"
        >
          {{ localized(event, 'description') }}
        </p>

        <!-- Rich-text body -->
        <NewsMarkdownBody
          v-if="localizedBody.kind === 'markdown'"
          :markdown="localizedBody.source"
        />
        <NewsRichText
          v-else-if="localizedBody.blocks.length"
          :blocks="localizedBody.blocks"
        />

        <!-- Back to events (bottom) -->
        <div class="mt-12 pt-8 border-t border-border">
          <NuxtLink
            :to="localePath('/events')"
            class="inline-flex items-center gap-2 px-5 py-2.5 border border-navy rounded-10 text-sm font-medium text-navy hover:bg-navy hover:text-white transition-colors duration-280 no-underline"
          >
            <span>←</span>
            {{ t('events.backToEvents') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
