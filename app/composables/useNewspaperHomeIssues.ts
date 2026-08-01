import { readItems } from '@directus/sdk'
import type { DirectusNewspaperIssue } from '~/types/directus'
import type { NewspaperIssuePreview } from '~/types/newspaper'

const HOME_PREVIEW_LIMIT = 3

/**
 * Latest newspaper issues for the home widget, from the `newspaper_issues` collection.
 *
 * Returns the same `NewspaperIssuePreview` shape the widget has always consumed; `href` and
 * `cover` are filled in now that real files exist.
 */
export function useNewspaperHomeIssues() {
  const { locale } = useSafeI18nWithRouter()
  const { client, assetUrl } = useDirectus()
  const { localized } = useLocalizedField()

  const { data } = useAsyncData('home-newspaper-issues', () =>
    client.request(
      readItems('newspaper_issues', {
        fields: ['id', 'number', 'serial', 'issueDate', 'title', 'titleEn',
          { pdfFile: ['id'] }, { cover: ['id'] }],
        sort: ['-issueDate', '-order'],
        filter: { status: { _eq: 'published' } },
        limit: HOME_PREVIEW_LIMIT,
      }),
    ),
  )

  function monthLabel(value: unknown): string {
    const date = new Date(String(value))
    if (Number.isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'uk-UA', {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(date)
  }

  return computed<NewspaperIssuePreview[]>(() =>
    ((data.value as DirectusNewspaperIssue[] | null) ?? []).map(issue => ({
      id: issue.id,
      issueLabel: `№ ${issue.number} (${issue.serial})`,
      dateLabel: monthLabel(issue.issueDate),
      description: localized(issue, 'title'),
      href: assetUrl(issue.pdfFile as never) ?? undefined,
      cover: issue.cover ? (assetUrl(issue.cover as never) ?? undefined) : undefined,
    })),
  )
}
