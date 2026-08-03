<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { DirectusNewspaperIssue } from '~/types/directus'

definePageMeta({ layout: 'default' })

/**
 * Archive of the university newspaper «Учитель», backed by the `newspaper_issues` collection —
 * editors publish a new issue from the Directus admin and it appears here without a deploy.
 *
 * The label («№ 7 (360), липень 2026») is composed from `number`, `serial` and `issueDate`, so
 * nobody has to type it consistently 12 times a year.
 */
const { t, locale } = useSafeI18nWithRouter()
const { client, assetUrl } = useDirectus()
const { localized } = useLocalizedField()

useHead({
  title: () => t('nav.links.newspaper'),
  meta: [{ name: 'description', content: () => t('university.newspaper.subtitle') }],
})

const selectedYear = ref<string | null>(null)

const { data, pending } = await useAsyncData('newspaper-issues', () =>
  client.request(
    readItems('newspaper_issues', {
      fields: [
        'id',
        'number',
        'serial',
        'issueDate',
        'title',
        'titleEn',
        { pdfFile: ['id', 'filename_download', 'filesize'] },
        { cover: ['id', 'width', 'height', 'focal_point_x', 'focal_point_y'] },
      ],
      sort: ['-issueDate', '-order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const issues = computed<DirectusNewspaperIssue[]>(
  () => (data.value as DirectusNewspaperIssue[] | null) ?? [],
)

function issueYear(issue: DirectusNewspaperIssue): string {
  return String(issue.issueDate ?? '').slice(0, 4)
}

const yearOptions = computed(() => {
  const years = [...new Set(issues.value.map(issueYear).filter(Boolean))]
    .sort((left, right) => Number(right) - Number(left))
  return [{ value: null, label: t('university.newspaper.filterAll') },
    ...years.map(year => ({ value: year, label: year }))]
})

const visibleIssues = computed(() =>
  selectedYear.value
    ? issues.value.filter(issue => issueYear(issue) === selectedYear.value)
    : issues.value,
)

/** «липень 2026» — month and year only; the day is always the 1st and means nothing. */
function formatIssueMonth(value: DirectusNewspaperIssue['issueDate']): string {
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(date)
}

function issueLabel(issue: DirectusNewspaperIssue): string {
  return `№ ${issue.number} (${issue.serial})`
}

function pdfHref(issue: DirectusNewspaperIssue): string {
  return assetUrl(issue.pdfFile as never) ?? '#'
}

function pdfSize(issue: DirectusNewspaperIssue): string {
  const file = issue.pdfFile
  return file && typeof file === 'object' ? formatFileSize(file.filesize) : ''
}

function coverSrc(issue: DirectusNewspaperIssue): string {
  return issue.cover ? (assetUrl(issue.cover as never, CARD_COVER_TRANSFORM) ?? '') : ''
}

/**
 * Issues whose PDF could not be rendered (encrypted, malformed, missing file) — those cards drop
 * back to the icon instead of keeping an empty tall panel.
 */
const previewFailed = ref(new Set<string>())

function markPreviewFailed(id: string) {
  previewFailed.value = new Set(previewFailed.value).add(id)
}

/** A card reserves cover-sized space only while a preview is still possible. */
function hasPreview(issue: DirectusNewspaperIssue): boolean {
  return Boolean(issue.pdfFile) && !previewFailed.value.has(issue.id)
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.newspaper.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.newspaper.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.newspaper.subtitle') }}
        </p>
      </div>
    </div>

    <!-- About -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="space-y-4 text-body text-text-muted max-w-3xl">
        <p>{{ t('university.newspaper.aboutText1') }}</p>
        <p>{{ t('university.newspaper.aboutText2') }}</p>
      </div>
    </div>

    <!-- Archive -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('university.newspaper.issuesTitle') }}
        </h2>

        <div class="flex flex-wrap gap-2 mb-10">
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

        <!-- Loading -->
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="i in 6"
            :key="i"
            class="animate-pulse bg-white border border-border rounded-16 overflow-hidden"
          >
            <div class="aspect-[3/4] bg-border" />
            <div class="p-5 space-y-3">
              <div class="h-3 bg-border rounded w-1/3" />
              <div class="h-4 bg-border rounded w-2/3" />
            </div>
          </div>
        </div>

        <div v-else-if="visibleIssues.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            v-for="issue in visibleIssues"
            :key="issue.id"
            :href="pdfHref(issue)"
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-white border border-border rounded-16 overflow-hidden no-underline flex flex-col transition-all duration-280 hover:border-gold hover:-translate-y-1 hover:shadow-gold"
          >
            <!--
              An uploaded cover wins. Without one we render page 1 of the PDF itself, and only
              fall back to the flat icon when that fails — so the card is never a bare panel.
            -->
            <div
              class="bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0 overflow-hidden relative"
              :class="coverSrc(issue) || hasPreview(issue) ? 'aspect-[3/4]' : 'h-24'"
            >
              <img
                v-if="coverSrc(issue)"
                :src="coverSrc(issue)"
                :alt="issueLabel(issue)"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-280 group-hover:scale-105"
              />

              <NewsPdfFirstPage
                v-else-if="pdfHref(issue) && !previewFailed.has(issue.id)"
                :src="pdfHref(issue)"
                class="transition-transform duration-280 group-hover:scale-105"
                @failed="markPreviewFailed(issue.id)"
              />

              <svg
                v-else
                class="w-10 h-10 text-gold/30 transition-transform duration-280 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                aria-hidden
              >
                <path d="M4 4h16v16H4z" />
                <path d="M4 8h16M4 12h16M4 16h8" />
              </svg>
            </div>

            <div class="p-5 flex flex-col flex-1">
              <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-1">
                {{ issueLabel(issue) }}
              </div>
              <div class="font-playfair text-[15px] font-semibold text-navy leading-snug">
                {{ formatIssueMonth(issue.issueDate) }}
              </div>
              <p v-if="localized(issue, 'title')" class="text-body-sm text-text-muted mt-2 line-clamp-2">
                {{ localized(issue, 'title') }}
              </p>
              <div class="mt-auto pt-4 flex items-center gap-2 text-body-sm text-navy font-medium">
                <svg class="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
                </svg>
                {{ t('university.newspaper.download') }}
                <span v-if="pdfSize(issue)" class="text-text-muted font-normal">· {{ pdfSize(issue) }}</span>
                <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
              </div>
            </div>
          </a>
        </div>

        <p v-else class="py-16 text-center text-text-muted">
          {{ t('university.newspaper.noIssues') }}
        </p>
      </div>
    </div>
  </div>
</template>
