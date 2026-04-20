<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusProgramme, ProgrammeLevel, RichTextBlock } from '~/types/directus'
import { resolveMediaSrc } from '~/utils/directusMedia'

definePageMeta({ layout: 'default' })

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
const route = useRoute()
const slug = route.params.slug as string

const { data } = await useAsyncData(
  `directus-programme-${locale.value}-${slug}`,
  () =>
    client.request(
      readItems('programmes', {
        filter: { slug: { _eq: slug } },
        fields: ['*', { cover: ['*'] }],
        limit: 1,
      }),
    ),
)

const programme = computed(() => data.value?.[0] ?? null)

if (!programme.value) {
  throw createError({ statusCode: 404, statusMessage: 'Programme not found' })
}

useHead({
  title: () =>
    (programme.value ? localized(programme.value, 'title') : '') ||
    t('sections.programs.title'),
  meta: [
    {
      name: 'description',
      content: () =>
        programme.value
          ? localized(programme.value, 'description') ||
            localized(programme.value, 'title')
          : '',
    },
  ],
})

const levelLabelKey: Record<ProgrammeLevel, string> = {
  bachelor: 'programs.levels.bachelor',
  master: 'programs.levels.master',
  graduate: 'programs.levels.graduate',
}

function programmeCoverSrc(cover: DirectusProgramme['cover']): string {
  return resolveMediaSrc(cover, mediaResolvers)
}

function programmeCoverAlt(cover: DirectusProgramme['cover'], titleFallback: string): string {
  if (cover != null && typeof cover === 'object' && cover.alternativeText) {
    return cover.alternativeText
  }
  return titleFallback
}

const localizedBody = computed(() => {
  const p = programme.value
  if (!p) {
    return { kind: 'blocks' as const, blocks: [] as RichTextBlock[] }
  }
  return normalizedLocalizedBody(p.content, p.contentEn, locale.value)
})
</script>

<template>
  <div v-if="programme" class="bg-white min-h-screen">
    <!-- Hero cover -->
    <div class="relative h-72 md:h-96 bg-navy overflow-hidden">
      <img
        v-if="programme.cover && programmeCoverSrc(programme.cover)"
        :src="programmeCoverSrc(programme.cover)"
        :alt="programmeCoverAlt(programme.cover, localized(programme, 'title'))"
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
          class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold mb-3"
        >
          {{ t(levelLabelKey[programme.level]) }}
        </span>
        <h1 class="font-playfair text-2xl md:text-4xl font-bold text-white leading-snug max-w-3xl">
          {{ localized(programme, 'title') }}
        </h1>
      </div>
    </div>

    <!-- Programme body -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="max-w-3xl">
        <!-- Back link -->
        <NuxtLink
          :to="localePath('/programs')"
          class="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-navy transition-colors mb-8 no-underline"
        >
          <span>←</span>
          {{ t('programs.backToPrograms') }}
        </NuxtLink>

        <!-- Metadata row -->
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted mb-8 pb-8 border-b border-border">
          <span v-if="programme.level">
            <span class="font-medium text-slate-600">{{ t('programs.metaLevel') }}:</span>
            {{ t(levelLabelKey[programme.level]) }}
          </span>
          <span v-if="localized(programme, 'faculty')">
            <span class="font-medium text-slate-600">{{ t('programs.metaFaculty') }}:</span>
            {{ localized(programme, 'faculty') }}
          </span>
          <span v-if="programme.duration">
            <span class="font-medium text-slate-600">{{ t('programs.metaDuration') }}:</span>
            {{ programme.duration }}
          </span>
          <span v-if="programme.formOfStudy">
            <span class="font-medium text-slate-600">{{ t('programs.metaForm') }}:</span>
            {{ programme.formOfStudy }}
          </span>
        </div>

        <!-- Description excerpt -->
        <p
          v-if="localized(programme, 'description')"
          class="text-lead font-medium text-slate-700 mb-8 leading-relaxed"
        >
          {{ localized(programme, 'description') }}
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

        <!-- Back to programmes (bottom) -->
        <div class="mt-12 pt-8 border-t border-border">
          <NuxtLink
            :to="localePath('/programs')"
            class="inline-flex items-center gap-2 px-5 py-2.5 border border-navy rounded-10 text-sm font-medium text-navy hover:bg-navy hover:text-white transition-colors duration-280 no-underline"
          >
            <span>←</span>
            {{ t('programs.backToPrograms') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
