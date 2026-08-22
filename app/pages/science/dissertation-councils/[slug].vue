<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusDissertationCouncil, DirectusDissertationCouncilFile } from '~/types/directus'

/**
 * One разова спеціалізована вчена рада.
 *
 * The route slug is the old site's path segment on purpose — `/uk/<slug>` 301s here, and those
 * links are in the state dissertation register, so the two must stay in step.
 */
definePageMeta({ layout: 'default' })

const route = useRoute()
const { t, locale } = useSafeI18nWithRouter()
const { client, assetUrl } = useDirectus()
const { localized } = useLocalizedField()
const localePath = useLocalePath()

const slug = computed(() => String(route.params.slug ?? ''))

const { data } = await useAsyncData(
  () => `dissertation-council-${slug.value}`,
  async () => {
    const rows = await client.request(
      readItems('dissertation_councils', {
        fields: [
          'id',
          'legacySlug',
          'councilCode',
          'candidateName',
          'candidateNameEn',
          'dissertationTitle',
          'dissertationTitleEn',
          'specialty',
          'branch',
          'defenseDate',
          'defenseTime',
          'year',
          'contentHtml',
          'streamUrl',
          {
            files: [
              'id',
              'kind',
              'title',
              'externalUrl',
              'order',
              { file: ['id', 'filename_download', 'filesize', 'type'] },
            ],
          },
        ],
        filter: { status: { _eq: 'published' }, legacySlug: { _eq: slug.value } },
        limit: 1,
      }),
    )
    return (rows as DirectusDissertationCouncil[])[0] ?? null
  },
  { watch: [slug] },
)

const council = computed<DirectusDissertationCouncil | null>(() => data.value ?? null)

if (!council.value) {
  throw createError({ statusCode: 404, statusMessage: 'Council not found' })
}

const heading = computed(() => {
  const item = council.value
  if (!item) return ''
  const name = localized(item, 'candidateName')
  return item.councilCode ? `${item.councilCode} — ${name}` : name
})

useHead({
  title: () => heading.value,
  meta: [
    {
      name: 'description',
      content: () => localized(council.value ?? {}, 'dissertationTitle') || heading.value,
    },
  ],
})

const files = computed<DirectusDissertationCouncilFile[]>(() =>
  [...(council.value?.files ?? [])].sort((left, right) => (left.order ?? 0) - (right.order ?? 0)),
)

function formatDate(value: DirectusDissertationCouncil['defenseDate']): string {
  if (!value) return ''
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

/** Header facts, skipping whatever the old page did not state. */
const facts = computed(() => {
  const item = council.value
  if (!item) return []
  const defense = [formatDate(item.defenseDate), item.defenseTime].filter(Boolean).join(', ')
  return [
    { label: t('science.dissertationCouncils.fieldBranch'), value: item.branch },
    { label: t('science.dissertationCouncils.fieldSpecialty'), value: item.specialty },
    { label: t('science.dissertationCouncils.fieldDefense'), value: defense },
  ].filter(fact => Boolean(fact.value))
})

function href(item: DirectusDissertationCouncilFile): string {
  if (item.file) return assetUrl(item.file as never) ?? '#'
  return item.externalUrl || '#'
}

function meta(item: DirectusDissertationCouncilFile): string {
  const file = item.file
  if (file && typeof file === 'object') {
    const size = formatFileSize(file.filesize)
    const kind = fileKindLabel(file)
    return [kind, size].filter(Boolean).join(' · ')
  }
  return item.externalUrl ? t('documents.externalLink') : ''
}

function kindLabel(item: DirectusDissertationCouncilFile): string {
  return item.kind ? t(`science.dissertationCouncils.kinds.${item.kind}`) : ''
}

/**
 * The old site labels a link either with the document's name («Дисертація») or with the reviewer's
 * full title; the first duplicates the kind column, so only the second earns its own line.
 */
function fileTitle(item: DirectusDissertationCouncilFile): string {
  const title = (item.title ?? '').trim()
  return title && title !== kindLabel(item) ? title : kindLabel(item)
}

function showKindColumn(item: DirectusDissertationCouncilFile): boolean {
  return fileTitle(item) !== kindLabel(item)
}
</script>

<template>
  <div v-if="council" class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-14">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink
          :to="localePath('/science/dissertation-councils')"
          class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3 no-underline hover:text-gold"
        >
          ← {{ t('science.dissertationCouncils.title') }}
        </NuxtLink>
        <h1 class="font-playfair text-2xl md:text-3xl font-bold text-white">
          {{ heading }}
        </h1>
        <p v-if="localized(council, 'dissertationTitle')" class="mt-4 text-white/70 max-w-3xl">
          {{ localized(council, 'dissertationTitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Facts -->
      <dl v-if="facts.length" class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div v-for="fact in facts" :key="fact.label" class="rounded-12 border border-border p-4">
          <dt class="text-[11px] font-semibold tracking-wider uppercase text-text-muted">
            {{ fact.label }}
          </dt>
          <dd class="mt-1 text-body text-navy m-0">{{ fact.value }}</dd>
        </div>
      </dl>

      <!-- Documents submitted for the defense -->
      <section v-if="files.length" class="mb-12">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('science.dissertationCouncils.documentsTitle') }}
        </h2>
        <div class="space-y-3">
          <div
            v-for="(item, index) in files"
            :key="item.id"
            class="rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-1.5 border border-border"
            :class="index % 2 === 0 ? 'bg-off-white' : 'bg-white'"
            style="grid-template-columns: 190px 1fr auto"
          >
            <span class="text-body-sm text-text-muted">
              {{ showKindColumn(item) ? kindLabel(item) : '' }}
            </span>

            <span class="min-w-0">
              <a
                :href="href(item)"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-navy hover:text-gold transition-colors no-underline"
              >
                {{ fileTitle(item) }}
                <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
              </a>
            </span>

            <span v-if="meta(item)" class="text-body-sm">
              <span class="inline-block px-2.5 py-0.5 rounded bg-gold/15 text-gold font-medium whitespace-nowrap">
                {{ meta(item) }}
              </span>
            </span>
          </div>
        </div>
      </section>

      <!-- The page as it stood on the old site -->
      <NewsMarkdownBody v-if="council.contentHtml" :source="council.contentHtml" kind="html" />
    </div>
  </div>
</template>
