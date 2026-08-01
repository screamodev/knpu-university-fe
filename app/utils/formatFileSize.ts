/**
 * Human-readable file size. Newspaper PDFs run from 0.6 MB to 30 MB, so the number belongs next
 * to the download link — a visitor on mobile data should know before tapping.
 */
export function formatFileSize(input: number | string | null | undefined): string {
  // Directus returns `filesize` as a string on bigint columns.
  const bytes = typeof input === 'string' ? Number(input) : input
  if (typeof bytes !== 'number' || !Number.isFinite(bytes) || bytes <= 0) return ''
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let value = bytes / 1024
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`
}
