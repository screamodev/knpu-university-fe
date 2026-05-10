import type { NewspaperIssuePreview } from '~/types/newspaper'

const HOME_PREVIEW_ISSUE_KEYS = ['1', '2', '3'] as const

/**
 * Latest three newspaper issues for the home widget.
 * Today: built from `university.newspaper.issues.{1..3}` translations.
 * Later: replace with `useAsyncData` + Directus while keeping the return shape.
 */
export function useNewspaperHomeIssues() {
  const { t } = useSafeI18nWithRouter()

  return computed<NewspaperIssuePreview[]>(() =>
    HOME_PREVIEW_ISSUE_KEYS.map((key) => {
      const base = `university.newspaper.issues.${key}`
      return {
        id: key,
        issueLabel: t(`${base}.number`),
        dateLabel: t(`${base}.date`),
        description: t(`${base}.description`),
      }
    }),
  )
}
