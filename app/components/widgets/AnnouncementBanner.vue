<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusArticle } from '~/types/news'
import { ANNOUNCEMENTS_CATEGORY_SLUG } from '~/utils/announcements'
import { ADMISSIONS_LEGACY_URL } from '~/utils/externalSites'

/**
 * Home page banner.
 *
 * Shows the newest article in «Оголошення» when there is one, so the university can put an
 * announcement on the front page without a deploy. With the category empty it falls back to the
 * standing admissions call to action, which is what this banner was before.
 */
const { t, localePath } = useSafeI18nWithRouter()
const { client } = useDirectus()
const { localized } = useLocalizedField()

const { data } = await useAsyncData('home-announcement', () =>
  client.request(
    readItems('articles', {
      fields: ['id', 'slug', 'title', 'titleEn', 'excerpt', 'excerptEn', 'publishedAt'],
      filter: {
        status: { _eq: 'published' },
        categories: { categories_id: { slug: { _eq: ANNOUNCEMENTS_CATEGORY_SLUG } } },
      },
      sort: ['-publishedAt'],
      limit: 1,
    }),
  ),
)

const announcement = computed<DirectusArticle | null>(
  () => ((data.value as DirectusArticle[] | null) ?? [])[0] ?? null,
)

const tag = computed(() =>
  announcement.value ? t('sections.announcement.tagLive') : t('sections.announcement.tag'),
)
const title = computed(() =>
  announcement.value ? localized(announcement.value, 'title') : t('sections.announcement.title'),
)
const subtitle = computed(() =>
  announcement.value ? localized(announcement.value, 'excerpt') : t('sections.announcement.subtitle'),
)
const cta = computed(() =>
  announcement.value ? t('sections.announcement.ctaLive') : t('sections.announcement.cta'),
)
/** Без оголошення банер лишається закликом до вступу — і веде на приймальну комісію старого сайту. */
const target = computed(() =>
  announcement.value ? `/news/${announcement.value.slug}` : ADMISSIONS_LEGACY_URL,
)
const targetIsExternal = computed(() => !announcement.value)
</script>

<template>
  <div class="bg-gradient-to-br from-navy-mid to-navy-deep py-14">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
      <div>
        <div class="text-[11px] font-semibold tracking-[0.12em] uppercase text-gold mb-2.5">
          {{ tag }}
        </div>
        <h2 class="font-playfair text-3xl text-white font-bold leading-tight mb-2 whitespace-pre-line">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-[15px] text-white/60">
          {{ subtitle }}
        </p>
      </div>
      <a
        v-if="targetIsExternal"
        :href="target"
        target="_blank"
        rel="noopener noreferrer"
        class="shrink-0 py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
      >
        {{ cta }} →
      </a>
      <NuxtLink
        v-else
        :to="localePath(target)"
        class="shrink-0 py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
      >
        {{ cta }} →
      </NuxtLink>
    </div>
  </div>
</template>
