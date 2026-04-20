<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusArticle } from '~/types/news'
import { resolveMediaSrc } from '~/utils/directusMedia'

const { t, localePath, locale } = useSafeI18nWithRouter()
const { client, assetUrl, publicUrl } = useDirectus()
const mediaResolvers = {
  assetUrl,
  strapiImageUrl: (path: string) =>
    path.startsWith('http://') || path.startsWith('https://')
      ? path
      : `${publicUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`,
}
const { localized } = useLocalizedField()

const { data, pending, error } = useAsyncData('home-news-articles', () =>
  client.request(
    readItems('articles', {
      fields: ['*', { cover: ['*'] }, { category: ['*'] }],
      sort: ['-date_published'],
      limit: 4,
    }),
  ),
)

const articles = computed(() => data.value ?? [])
const mainArticle = computed(() => articles.value[0] ?? null)
const sideArticles = computed(() => articles.value.slice(1, 4))

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat(locale.value === 'uk' ? 'uk-UA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function articlePublishedAt(article: DirectusArticle): string {
  return article.date_published ?? article.publishedAt ?? article.date_created ?? ''
}

function articleCoverSrc(cover: DirectusArticle['cover']): string {
  return resolveMediaSrc(cover, mediaResolvers)
}

function articleCoverAlt(cover: DirectusArticle['cover'], titleFallback: string): string {
  if (cover != null && typeof cover === 'object' && cover.alternativeText) {
    return cover.alternativeText
  }
  return titleFallback
}
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-end justify-between mb-10">
        <SharedSectionHeader :tag="t('sections.news.tag')" :title="t('sections.news.title')" />
        <NuxtLink
          :to="localePath('/news')"
          class="text-sm text-navy no-underline flex items-center gap-1.5 border-b-[1.5px] border-gold pb-0.5 font-medium"
        >
          {{ t('sections.news.all') }}
          <span>→</span>
        </NuxtLink>
      </div>

      <!-- Loading skeleton -->
      <div v-if="pending" class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div class="bg-navy rounded-16 overflow-hidden animate-pulse">
          <div class="h-60 bg-navy-mid" />
          <div class="p-6 space-y-3">
            <div class="h-3 bg-white/20 rounded w-1/4" />
            <div class="h-6 bg-white/20 rounded w-3/4" />
            <div class="h-3 bg-white/10 rounded w-1/5" />
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-off-white border border-border rounded-12 p-4 animate-pulse space-y-2"
          >
            <div class="h-3 bg-border rounded w-1/3" />
            <div class="h-4 bg-border rounded w-4/5" />
            <div class="h-3 bg-border rounded w-1/4" />
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="w-14 h-14 rounded-full bg-danger/10 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p class="text-body-sm text-text-muted max-w-xs">{{ t('sections.news.error') }}</p>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="articles.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V9a2 2 0 012-2h2a2 2 0 012 2v9a2 2 0 01-2 2h-2z" />
          </svg>
        </div>
        <p class="text-body-sm text-text-muted max-w-xs">{{ t('sections.news.empty') }}</p>
      </div>

      <!-- Articles grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <!-- Main article -->
        <NuxtLink
          v-if="mainArticle"
          :to="localePath(`/news/${mainArticle.slug}`)"
          class="bg-navy rounded-16 overflow-hidden flex flex-col no-underline transition-transform duration-280 hover:-translate-y-1"
        >
          <div class="h-60 relative overflow-hidden">
            <img
              v-if="mainArticle.cover && articleCoverSrc(mainArticle.cover)"
              :src="articleCoverSrc(mainArticle.cover)"
              :alt="articleCoverAlt(mainArticle.cover, localized(mainArticle, 'title'))"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
            >
              <svg class="w-16 h-16 text-gold/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-2.5">
              {{ mainArticle.category ? localized(mainArticle.category, 'name') : '' }}
            </div>
            <div class="font-playfair text-xl font-semibold text-white leading-snug flex-1 mb-4">
              {{ localized(mainArticle, 'title') }}
            </div>
            <div class="text-xs text-white/40">{{ formatDate(articlePublishedAt(mainArticle)) }}</div>
          </div>
        </NuxtLink>

        <!-- Fallback when no articles yet -->
        <div
          v-else
          class="bg-navy rounded-16 overflow-hidden flex flex-col items-center justify-center h-72 text-white/40 text-sm"
        >
          {{ t('sections.news.title') }}
        </div>

        <!-- Side articles -->
        <div class="flex flex-col gap-3">
          <NuxtLink
            v-for="article in sideArticles"
            :key="article.id"
            :to="localePath(`/news/${article.slug}`)"
            class="block bg-off-white border border-border rounded-12 p-4 no-underline transition-all duration-280 hover:border-gold hover:bg-gold-pale hover:translate-x-1"
          >
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold">
              {{ article.category ? localized(article.category, 'name') : '' }}
            </div>
            <div class="font-playfair text-[15px] text-navy mb-2 leading-snug">{{ localized(article, 'title') }}</div>
            <div class="text-xs text-text-muted">{{ formatDate(articlePublishedAt(article)) }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
