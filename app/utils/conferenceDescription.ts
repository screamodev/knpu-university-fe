/**
 * Опис конференції з Directus.
 *
 * Поле перевели на WYSIWYG (правка 14.09), тож новий опис — це HTML. Старі записи й ті, що
 * створили до міграції, можуть бути простим текстом із переносами рядків і голими адресами:
 * такий текст перетворюємо на HTML тут, щоб картка виглядала однаково і посилання клікались.
 */
const HTML_TAG = /<(p|br|a|ul|ol|li|strong|em|b|i|div|h[1-6])\b/i
const URL = /https?:\/\/[^\s<>"]+/g

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** HTML for the card body; `null` when there is nothing to show. */
export function conferenceDescriptionHtml(value: string | null | undefined): string | null {
  const source = (value ?? '').trim()
  if (!source) return null
  if (HTML_TAG.test(source)) return source

  return source
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map(block =>
      `<p>${block
        .split('\n')
        .map(line => escapeHtml(line.trim()).replace(URL, url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`))
        .filter(Boolean)
        .join('<br>')}</p>`,
    )
    .join('')
}

/** Plain text for compact places (past-events tiles) where markup would not fit. */
export function conferenceDescriptionText(value: string | null | undefined): string {
  return (value ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}
