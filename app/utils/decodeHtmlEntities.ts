/**
 * Undo HTML character references that show up as literal text after paste/import
 * (e.g. `&quot;` instead of `"` in titles and WYSIWYG bodies).
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00A0',
  laquo: '«',
  raquo: '»',
  mdash: '—',
  ndash: '–',
  hellip: '…',
}

const ENTITY_RE = /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi

/** Decode named/numeric entities in plain text (titles, excerpts, block children). */
export function decodeHtmlEntities(input: string): string {
  if (!input.includes('&')) return input

  return input.replace(ENTITY_RE, (match, body: string) => {
    const lower = body.toLowerCase()

    if (lower.startsWith('#x')) {
      const code = Number.parseInt(lower.slice(2), 16)
      return Number.isFinite(code) ? String.fromCodePoint(code) : match
    }

    if (lower.startsWith('#')) {
      const code = Number.parseInt(lower.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : match
    }

    return NAMED_ENTITIES[lower] ?? match
  })
}

/**
 * WYSIWYG paste often double-encodes (`&amp;quot;`), which `v-html` then shows as the
 * literal characters `&quot;`. Undo one or more layers without turning single `&quot;`
 * into raw `"` inside attribute values.
 */
export function fixDoubleEncodedHtmlEntities(html: string): string {
  if (!html.includes('&amp;')) return html

  let result = html
  const layered =
    /&amp;(#x[0-9a-f]+|#\d+|quot|lt|gt|apos|nbsp|amp|laquo|raquo|mdash|ndash|hellip);/gi

  for (let pass = 0; pass < 3; pass += 1) {
    const next = result.replace(layered, '&$1;')
    if (next === result) break
    result = next
  }

  return result
}
