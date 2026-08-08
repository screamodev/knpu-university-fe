/**
 * Text preparation shared by the two index producers.
 *
 * `scripts/build-search-index.mjs` loads this file through jiti so the build-time and runtime
 * halves of the index tokenise identically — a term that is normalised one way when indexed and
 * another way when queried simply never matches.
 */

/** Block-level tags whose end is a paragraph break; kept so chunking can split on real boundaries. */
const BLOCK_END_RE = /<\/(?:p|div|li|tr|h[1-6]|blockquote|figcaption|td|th)\s*>|<br\s*\/?>/gi
const TAG_RE = /<[^>]*>/g
const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&laquo;': '«',
  '&raquo;': '»',
  '&mdash;': '—',
  '&ndash;': '–',
  '&hellip;': '…',
}

/** Migrated HTML → plain text, with paragraph breaks preserved as newlines. */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return ''
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(BLOCK_END_RE, '\n')
    .replace(TAG_RE, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, entity => ENTITIES[entity.toLowerCase()] ?? ' ')
    .replace(/[ \t ]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim()
}

/** Collapse everything, newlines included — for titles and summaries. */
export function collapse(text: string | null | undefined): string {
  return (text ?? '').replace(/\s+/g, ' ').trim()
}

export const SUMMARY_LENGTH = 200

/** First sentence-ish of a body, for the result card. Cut on a word boundary, never mid-word. */
export function summarize(text: string, max = SUMMARY_LENGTH): string {
  const flat = collapse(text)
  if (flat.length <= max) return flat
  const cut = flat.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

export const CHUNK_LENGTH = 1200

/**
 * Split a long body into indexable chunks on paragraph boundaries.
 *
 * One faculty tab can be 145 000 characters in a single section. Indexed whole it would be one
 * document with a meaningless snippet and no way to tell the reader where in the page the match
 * is; chunked it produces several documents with quotable context.
 */
export function chunkText(text: string, size = CHUNK_LENGTH): string[] {
  const flat = text.trim()
  if (!flat) return []
  if (flat.length <= size) return [flat]

  const chunks: string[] = []
  let current = ''

  for (const paragraph of flat.split('\n')) {
    const piece = paragraph.trim()
    if (!piece) continue

    // A single paragraph longer than the budget is split on word boundaries rather than truncated.
    if (piece.length > size) {
      if (current) {
        chunks.push(current)
        current = ''
      }
      let rest = piece
      while (rest.length > size) {
        const window = rest.slice(0, size)
        const cut = window.lastIndexOf(' ')
        const head = cut > size * 0.5 ? window.slice(0, cut) : window
        chunks.push(head.trim())
        rest = rest.slice(head.length).trimStart()
      }
      current = rest
      continue
    }

    if (current.length + piece.length + 1 > size) {
      chunks.push(current)
      current = piece
    }
    else {
      current = current ? `${current} ${piece}` : piece
    }
  }

  if (current) chunks.push(current)
  return chunks
}

/**
 * Terms that carry no signal. Ukrainian first — a query like «положення про організацію» would
 * otherwise be dominated by «про».
 */
export const SEARCH_STOPWORDS = new Set([
  'та', 'і', 'й', 'у', 'в', 'з', 'із', 'зі', 'на', 'до', 'за', 'по', 'про', 'від', 'для', 'при',
  'що', 'як', 'це', 'цей', 'ця', 'ці', 'той', 'та́', 'но', 'не', 'ні', 'або', 'чи', 'же', 'бо',
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'is', 'are', 'be', 'by',
])

/**
 * One term → its indexed form. Applied to documents and queries alike.
 *
 * Ukrainian has no stemmer available in any option open to this stack, so normalisation stays
 * conservative and the morphology is handled at query time by prefix matching instead
 * (`студент` matches `студентів`). Folding here is limited to things that are genuinely the same
 * character typed differently.
 */
export function normalizeSearchTerm(term: string): string | null {
  const normalized = term
    .toLowerCase()
    .replace(/[’ʼ`´']/g, "'")
    .replace(/ё/g, 'е')
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}']+$/gu, '')

  if (normalized.length < 2) return null
  if (SEARCH_STOPWORDS.has(normalized)) return null
  return normalized
}

/** Same splitting rule for documents and queries; apostrophes stay inside a word. */
export function tokenize(text: string): string[] {
  return text.split(/[^\p{L}\p{N}'’ʼ]+/u).filter(Boolean)
}
