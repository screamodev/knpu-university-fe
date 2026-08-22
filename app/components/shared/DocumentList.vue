<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusDocument } from '~/types/directus'
import type { DocumentSection } from '~/utils/documentSections'

/**
 * List of documents for one section of the «Відвідувачу» area.
 *
 * Every such page (Звіт ректора, Вакансії, Нормативна документація…) is this component with a
 * different `section`, so an editor adds a row in one collection and it appears on the right page.
 * A row carries either an uploaded file or an `externalUrl` pointing at another site.
 */
const props = defineProps<{ section: DocumentSection }>()

const { t, locale } = useSafeI18nWithRouter()
const { client, assetUrl } = useDirectus()
const { localized } = useLocalizedField()

const selectedYear = ref<string | null>(null)

const { data, pending } = await useAsyncData(
  () => `documents-${props.section}`,
  () =>
    client.request(
      readItems('documents', {
        fields: [
          'id',
          'title',
          'titleEn',
          'description',
          'descriptionEn',
          'documentDate',
          'externalUrl',
          'order',
          { file: ['id', 'filename_download', 'filesize', 'type'] },
        ],
        // Order first, date second: most of these lists are curated and undated (нормативна
        // документація is 177 items with three dates between them), and sorting by date would
        // put that majority in an arbitrary block. Editors reorder with the drag handle.
        sort: ['order', '-documentDate'],
        filter: { status: { _eq: 'published' }, section: { _eq: props.section } },
        limit: -1,
      }),
    ),
  { watch: [() => props.section] },
)

const documents = computed<DirectusDocument[]>(() => (data.value as DirectusDocument[] | null) ?? [])

function documentYear(item: DirectusDocument): string | null {
  const year = String(item.documentDate ?? '').slice(0, 4)
  return /^\d{4}$/.test(year) ? year : null
}

/** Only offer the year filter when the list actually spans more than one year. */
const yearOptions = computed(() => {
  const years = [...new Set(documents.value.map(documentYear).filter(Boolean) as string[])]
    .sort((left, right) => Number(right) - Number(left))
  if (years.length < 2) return []
  return [{ value: null, label: t('documents.filterAll') }, ...years.map(year => ({ value: year, label: year }))]
})

const visibleDocuments = computed(() =>
  selectedYear.value
    ? documents.value.filter(item => documentYear(item) === selectedYear.value)
    : documents.value,
)

function formatDate(value: DirectusDocument['documentDate']): string {
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date)
}

function href(item: DirectusDocument): string {
  if (item.file) return assetUrl(item.file as never) ?? '#'
  return item.externalUrl || '#'
}

function meta(item: DirectusDocument): string {
  const file = item.file
  if (file && typeof file === 'object') {
    const size = formatFileSize(file.filesize)
    const kind = fileKindLabel(file)
    return [kind, size].filter(Boolean).join(' · ')
  }
  return item.externalUrl ? t('documents.externalLink') : ''
}
</script>

<template>
  <div>
    <div v-if="yearOptions.length" class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="option in yearOptions"
        :key="option.value ?? 'all'"
        type="button"
        class="px-4 py-1.5 rounded-100 text-sm font-medium border transition-colors duration-280"
        :class="
          selectedYear === option.value
            ? 'bg-navy text-white border-navy'
            : 'bg-white text-navy border-border hover:border-navy'
        "
        @click="selectedYear = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div v-if="pending" class="space-y-3">
      <div
        v-for="i in 4"
        :key="i"
        class="animate-pulse rounded-12 p-4 border border-border bg-off-white flex gap-4 items-center"
      >
        <div class="h-4 bg-border rounded w-24" />
        <div class="h-4 bg-border rounded flex-1" />
        <div class="h-4 bg-border rounded w-16" />
      </div>
    </div>

    <div v-else-if="visibleDocuments.length" class="space-y-3">
      <div
        v-for="(item, index) in visibleDocuments"
        :key="item.id"
        class="rounded-12 p-4 sm:px-4 sm:py-3 flex flex-col sm:grid sm:gap-4 sm:items-center gap-1.5 border border-border"
        :class="index % 2 === 0 ? 'bg-off-white' : 'bg-white'"
        style="grid-template-columns: 110px 1fr auto"
      >
        <span class="text-body-sm text-text-muted">{{ formatDate(item.documentDate) }}</span>

        <span class="min-w-0">
          <a
            :href="href(item)"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-navy hover:text-gold transition-colors no-underline"
          >
            {{ localized(item, 'title') }}
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
          <span v-if="localized(item, 'description')" class="block text-body-sm text-text-muted mt-0.5">
            {{ localized(item, 'description') }}
          </span>
        </span>

        <span v-if="meta(item)" class="text-body-sm">
          <span class="inline-block px-2.5 py-0.5 rounded bg-gold/15 text-gold font-medium whitespace-nowrap">
            {{ meta(item) }}
          </span>
        </span>
      </div>
    </div>

    <p v-else class="text-body text-text-muted py-10 text-center">
      {{ t('documents.empty') }}
    </p>
  </div>
</template>
