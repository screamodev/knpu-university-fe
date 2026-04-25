import type { LegacyBlock, LegacyImage } from '~/types/directus'

const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g

const LEGACY_BLOCK_TYPES: ReadonlySet<string> = new Set([
  'paragraph',
  'heading',
  'list',
  'list-item',
  'quote',
  'code',
  'image',
])

function isLegacyBlockLike(value: unknown): boolean {
  if (value === null || typeof value !== 'object') return false
  const block = value as Record<string, unknown>
  if (typeof block.type !== 'string' || !LEGACY_BLOCK_TYPES.has(block.type)) return false
  if (block.type === 'image') {
    return true
  }
  return Array.isArray(block.children)
}

function normalizeLegacyBlockShape(value: unknown): LegacyBlock {
  const block = value as LegacyBlock
  if (block.type === 'image') {
    return {
      ...block,
      children: Array.isArray(block.children) ? block.children : [],
    }
  }
  return block
}

function minimalLegacyImageFromUrl(url: string, alternativeText: string): LegacyImage {
  return {
    id: 0,
    documentId: '',
    url: url.trim(),
    alternativeText: alternativeText.length > 0 ? alternativeText : null,
    width: 0,
    height: 0,
    formats: null,
  }
}

type Segment = { kind: 'text'; text: string } | { kind: 'image'; alt: string; url: string }

function splitChunkByMarkdownImages(chunk: string): Segment[] {
  const segments: Segment[] = []
  let lastIndex = 0
  const re = new RegExp(MARKDOWN_IMAGE_RE.source, 'g')
  let match: RegExpExecArray | null

  while ((match = re.exec(chunk)) !== null) {
    const before = chunk.slice(lastIndex, match.index)
    if (before.trim().length > 0) {
      segments.push({ kind: 'text', text: before })
    }
    segments.push({ kind: 'image', alt: match[1] ?? '', url: match[2] ?? '' })
    lastIndex = match.index + match[0].length
  }

  const tail = chunk.slice(lastIndex)
  if (tail.trim().length > 0) {
    segments.push({ kind: 'text', text: tail })
  }

  return segments
}

function markdownStringToBlocks(markdown: string): LegacyBlock[] {
  const trimmed = markdown.trim()
  if (!trimmed) return []

  const paragraphs = trimmed.split(/\n\s*\n/)
  const blocks: LegacyBlock[] = []

  for (const paragraph of paragraphs) {
    const chunk = paragraph.trim()
    if (!chunk) continue

    const segments = splitChunkByMarkdownImages(chunk)
    if (segments.length === 0) {
      blocks.push({
        type: 'paragraph',
        children: [{ type: 'text', text: chunk }],
      })
      continue
    }

    for (const segment of segments) {
      if (segment.kind === 'image') {
        blocks.push({
          type: 'image',
          children: [],
          image: minimalLegacyImageFromUrl(segment.url, segment.alt),
        })
      } else {
        const text = segment.text.trimEnd()
        if (text.length === 0) continue
        blocks.push({
          type: 'paragraph',
          children: [{ type: 'text', text }],
        })
      }
    }
  }

  return blocks
}

function hasLocalizedBody(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return false
}

/**
 * Some imported content can contain JSON-escaped newlines as literal text
 * (e.g. "\\n\\n" instead of real line breaks). Normalize those so markdown
 * renders correctly in public pages and the admin editor.
 */
function normalizeStoredMarkdownString(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ''
  const hasRealLineBreak = /[\r\n]/.test(trimmed)
  const hasEscapedLineBreak = /\\r\\n|\\n|\\r/.test(trimmed)
  if (!hasRealLineBreak && hasEscapedLineBreak) {
    return trimmed.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n')
  }
  return trimmed
}

/** Public article body: stored markdown string vs legacy JSON blocks. */
export type LocalizedArticleBody =
  | { kind: 'markdown'; source: string }
  | { kind: 'blocks'; blocks: LegacyBlock[] }

/**
 * Picks `content` vs `contentEn` by locale, then returns either the raw markdown string
 * or normalized blocks for public rendering.
 */
export function normalizedLocalizedBody(
  content: unknown,
  contentEn: unknown,
  localeCode: string,
): LocalizedArticleBody {
  const preferEn = localeCode === 'en'
  const primary = preferEn ? contentEn : content
  const fallback = preferEn ? content : contentEn
  const raw = hasLocalizedBody(primary) ? primary : fallback

  if (raw === null || raw === undefined) {
    return { kind: 'blocks', blocks: [] }
  }

  if (typeof raw === 'string') {
    const normalized = normalizeStoredMarkdownString(raw)
    if (normalized === '') {
      return { kind: 'blocks', blocks: [] }
    }
    return { kind: 'markdown', source: normalized }
  }

  if (!Array.isArray(raw)) {
    return { kind: 'blocks', blocks: [] }
  }

  const blocks = raw.filter(isLegacyBlockLike).map(normalizeLegacyBlockShape)
  return { kind: 'blocks', blocks }
}

/**
 * Picks `content` vs `contentEn` by locale, then coerces markdown or blocks to `LegacyBlock[]`
 * for public rendering (`NewsRichText`) or legacy callers.
 */
export function normalizedLocalizedBodyBlocks(
  content: unknown,
  contentEn: unknown,
  localeCode: string,
): LegacyBlock[] {
  const body = normalizedLocalizedBody(content, contentEn, localeCode)
  if (body.kind === 'markdown') {
    return markdownStringToBlocks(body.source)
  }
  return body.blocks
}

/**
 * Coerces article `content` / `contentEn` from the API (blocks JSON or markdown string)
 * into `LegacyBlock[] | null` for the admin rich-text editor.
 */
export function normalizeRichTextForEditor(input: unknown): LegacyBlock[] | null {
  if (input === null || input === undefined) return null

  if (typeof input === 'string') {
    const normalized = normalizeStoredMarkdownString(input)
    if (normalized === '') return null
    const blocks = markdownStringToBlocks(normalized)
    return blocks.length > 0 ? blocks : null
  }

  if (!Array.isArray(input)) return null

  if (input.length === 0) return null

  const blocks = input.filter(isLegacyBlockLike).map(normalizeLegacyBlockShape)
  return blocks.length > 0 ? blocks : null
}
