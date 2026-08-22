/**
 * Тип файла для бейджа поруч із розміром — «PDF», «DOCX», «JPG».
 *
 * Раніше кожен список брав розширення з `filename_download`. Частина файлів приїхала з міграції
 * під іменем-uuid без крапки, і `split('.').pop()` віддавав увесь uuid — на сторінці вартості
 * навчання бейдж мав вигляд «AFCB6A9E-1358-… · 4.6 MB». Тому спершу дивимося на MIME-тип, який
 * Directus зберігає завжди, а розширення лишається запасним варіантом.
 */

const MIME_LABELS: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.ms-excel': 'XLS',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'application/vnd.ms-powerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
  'application/rtf': 'RTF',
  'application/zip': 'ZIP',
  'application/x-zip-compressed': 'ZIP',
  'application/vnd.oasis.opendocument.text': 'ODT',
  'text/plain': 'TXT',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WEBP',
  'image/gif': 'GIF',
  'image/svg+xml': 'SVG',
  'video/mp4': 'MP4',
}

/** Схоже на розширення: букви й цифри, не довше за п'ять символів. */
const EXTENSION_RE = /^[a-z0-9]{1,5}$/i

export function fileKindLabel(file: { filename_download?: string | null; type?: string | null }): string {
  const mime = (file.type ?? '').toLowerCase()
  if (MIME_LABELS[mime]) return MIME_LABELS[mime]

  const name = file.filename_download ?? ''
  const dot = name.lastIndexOf('.')
  const extension = dot > 0 ? name.slice(dot + 1) : ''
  if (EXTENSION_RE.test(extension)) return extension.toUpperCase()

  // Невідомий тип на кшталт `application/octet-stream` — краще показати саму лише вагу файла.
  const subtype = mime.split('/')[1] ?? ''
  return EXTENSION_RE.test(subtype) ? subtype.toUpperCase() : ''
}
