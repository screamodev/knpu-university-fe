export interface ArticleBodyImage {
  src: string
  alt: string
}

export type ArticleHtmlSegment =
  | { kind: 'html'; html: string }
  | { kind: 'images'; images: ArticleBodyImage[] }

function extractImgAttrs(imgTag: string): ArticleBodyImage | null {
  const srcMatch = imgTag.match(/\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i)
  const src = srcMatch?.[1] ?? srcMatch?.[2] ?? ''
  if (!src) return null

  const altMatch = imgTag.match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)')/i)
  const alt = altMatch?.[1] ?? altMatch?.[2] ?? ''
  return { src, alt }
}

/**
 * Image-only top-level blocks produced by markdown-it and the Directus WYSIWYG:
 * - `<p><img …></p>` (the `<p>` may carry alignment attributes)
 * - a bare `<img …>` that stands between two tags
 *
 * A picture that shares a paragraph with text, sits inside a link, or is wrapped in a
 * `<figure>` must be left alone — pulling it out would split its container in half.
 */
const IMAGE_ONLY_BLOCK_RE = new RegExp(
  [
    // <p …>[breaks]<img …>[breaks]</p>
    '<p[^>]*>(?:\\s|&nbsp;|<br\\s*/?>)*<img\\b[^>]*>(?:\\s|&nbsp;|<br\\s*/?>)*</p>',
    // a standalone <img …>: preceded by a tag, followed by a tag, and not closing a
    // container that owns it
    '(?<=>)\\s*<img\\b[^>]*>(?!\\s*(?:</(?:p|a|li|td|th|figure|figcaption)\\b|<figcaption\\b))(?=\\s*<|\\s*$)',
  ].join('|'),
  'gi',
)

/**
 * Splits sanitized article HTML into HTML chunks and consecutive image groups.
 * Groups of 2+ adjacent images become carousel candidates; a single image stays as HTML.
 */
export function splitArticleHtmlByImages(html: string): ArticleHtmlSegment[] {
  const source = html.trim()
  if (!source) return []

  type ImageMatch = {
    start: number
    end: number
    image: ArticleBodyImage
  }

  const matches: ImageMatch[] = []
  const re = new RegExp(IMAGE_ONLY_BLOCK_RE.source, IMAGE_ONLY_BLOCK_RE.flags)
  let match: RegExpExecArray | null

  while ((match = re.exec(source)) !== null) {
    const imgTag = match[0].match(/<img\b[^>]*>/i)?.[0]
    if (!imgTag) continue
    const image = extractImgAttrs(imgTag)
    if (!image) continue
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      image,
    })
  }

  if (matches.length === 0) {
    return [{ kind: 'html', html: source }]
  }

  const segments: ArticleHtmlSegment[] = []
  let cursor = 0
  let index = 0

  while (index < matches.length) {
    const first = matches[index]!

    if (first.start > cursor) {
      const before = source.slice(cursor, first.start)
      if (before.trim()) {
        segments.push({ kind: 'html', html: before })
      }
    }

    const group = [first.image]
    let end = first.end
    let nextIndex = index + 1

    while (nextIndex < matches.length) {
      const next = matches[nextIndex]!
      const between = source.slice(end, next.start)
      if (between.trim() !== '') break
      group.push(next.image)
      end = next.end
      nextIndex += 1
    }

    if (group.length >= 2) {
      segments.push({ kind: 'images', images: group })
    } else {
      segments.push({ kind: 'html', html: source.slice(first.start, end) })
    }

    cursor = end
    index = nextIndex
  }

  if (cursor < source.length) {
    const rest = source.slice(cursor)
    if (rest.trim()) {
      segments.push({ kind: 'html', html: rest })
    }
  }

  return segments
}
