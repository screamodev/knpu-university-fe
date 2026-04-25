<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusArticle, RichTextBlock } from '~/types/news'
import { normalizeArticleAttachment, resolveMediaAlt, resolveMediaSrc } from '~/utils/directusMedia'

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
  `directus-article-${locale.value}-${slug}`,
  () =>
    client.request(
      readItems('articles', {
        filter: { slug: { _eq: slug } },
        fields: ['*', { cover: ['*'] }, { category: ['*'] }, { attachments: [{ directus_files_id: ['*'] }] }],
        limit: 1,
      }),
    ),
)

const article = computed(() => data.value?.[0] ?? null)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useHead({
  title: () =>
    (article.value ? localized(article.value, 'title') : '') || t('sections.news.title'),
  meta: [
    {
      name: 'description',
      content: () =>
        article.value
          ? localized(article.value, 'excerpt') || localized(article.value, 'title')
          : '',
    },
  ],
})

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat(locale.value === 'uk' ? 'uk-UA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function articlePublishedAt(a: DirectusArticle): string {
  return a.date_published ?? a.publishedAt ?? a.date_created ?? ''
}

function articleCoverSrc(cover: DirectusArticle['cover']): string {
  return resolveMediaSrc(cover, mediaResolvers)
}

function articleCoverAlt(cover: DirectusArticle['cover'], titleFallback: string): string {
  return resolveMediaAlt(cover, titleFallback)
}

const normalizedAttachments = computed(() => {
  const list = article.value?.attachments
  if (!list?.length) return []
  return list.map((att) => normalizeArticleAttachment(att, mediaResolvers))
})

const localizedBody = computed(() => {
  const a = article.value
  if (!a) {
    return { kind: 'blocks' as const, blocks: [] as RichTextBlock[] }
  }
  return normalizedLocalizedBody(a.content, a.contentEn, locale.value)
})
</script>

<template>
  <div v-if="article" class="bg-white min-h-screen">
    <!-- Hero cover -->
    <div class="relative h-72 md:h-96 bg-navy overflow-hidden">
      <img
        v-if="article.cover && articleCoverSrc(article.cover)"
        :src="articleCoverSrc(article.cover)"
        :alt="articleCoverAlt(article.cover, localized(article, 'title'))"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-navy-mid to-navy-deep"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

      <!-- Overlay content -->
      <div class="absolute bottom-0 left-0 right-0 max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <span
          v-if="article.category"
          class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold mb-3"
        >
          {{ localized(article.category, 'name') }}
        </span>
        <h1 class="font-playfair text-2xl md:text-4xl font-bold text-white leading-snug max-w-3xl">
          {{ localized(article, 'title') }}
        </h1>
      </div>
    </div>

    <!-- Article body -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="max-w-3xl">
        <!-- Back link -->
        <NuxtLink
          :to="localePath('/news')"
          class="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-navy transition-colors mb-8 no-underline"
        >
          <span>←</span>
          {{ t('news.backToNews') }}
        </NuxtLink>

        <!-- Metadata row -->
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted mb-8 pb-8 border-b border-border">
          <span v-if="articlePublishedAt(article)">
            <span class="font-medium text-slate-600">{{ t('news.published') }}:</span>
            {{ formatDate(articlePublishedAt(article)) }}
          </span>
          <span v-if="article.author">
            <span class="font-medium text-slate-600">{{ t('news.author') }}:</span>
            {{ article.author }}
          </span>
        </div>

        <!-- Excerpt -->
        <p
          v-if="localized(article, 'excerpt')"
          class="text-lead font-medium text-slate-700 mb-8 leading-relaxed"
        >
          {{ localized(article, 'excerpt') }}
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

        <!-- Attachments -->
        <div
          v-if="normalizedAttachments.length"
          class="mt-12 pt-8 border-t border-border"
        >
          <h2 class="font-playfair text-xl font-semibold text-navy mb-4">
            {{ t('news.attachments') }}
          </h2>
          <ul class="space-y-2">
            <li v-for="attachment in normalizedAttachments" :key="attachment.key">
              <a
                :href="attachment.href"
                :download="attachment.downloadable ? attachment.label : undefined"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors text-sm underline"
              >
                <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {{ attachment.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Back to news (bottom) -->
        <div class="mt-12 pt-8 border-t border-border">
          <NuxtLink
            :to="localePath('/news')"
            class="inline-flex items-center gap-2 px-5 py-2.5 border border-navy rounded-10 text-sm font-medium text-navy hover:bg-navy hover:text-white transition-colors duration-280 no-underline"
          >
            <span>←</span>
            {{ t('news.backToNews') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
