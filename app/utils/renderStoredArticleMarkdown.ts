import type { Config } from 'dompurify'
import DOMPurify from 'isomorphic-dompurify'
import MarkdownIt from 'markdown-it'
import { decodeHtmlEntities, fixDoubleEncodedHtmlEntities } from '~/utils/decodeHtmlEntities'

export interface RenderStoredArticleMarkdownOptions {
  /** Same base as `useRuntimeConfig().public.directusUrl` / `useDirectus().assetUrl`. */
  directusPublicUrl: string
}

/**
 * Allow-list for both body formats: markdown rendered by markdown-it, and HTML written in the
 * Directus WYSIWYG. The WYSIWYG emits tables, figures, spans and `style="text-align:…"`, so the
 * list is wider than plain markdown needs — anything missing here is dropped silently at render
 * time, which is why editor features and this list have to move together.
 */
const articleHtmlPurifyConfig: Config = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'strong',
    'b',
    'em',
    'i',
    'u',
    's',
    'del',
    'strike',
    'sub',
    'sup',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'dl',
    'dt',
    'dd',
    'blockquote',
    'code',
    'pre',
    'a',
    'img',
    'figure',
    'figcaption',
    'span',
    'div',
    'table',
    'caption',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'th',
    'td',
    'hr',
    // Video embeds inserted with the editor's "media" button. Restricted to known hosts by
    // the `afterSanitizeElements` hook below — an iframe pointing anywhere else is removed.
    'iframe',
  ],
  ALLOWED_ATTR: [
    'href',
    'src',
    'alt',
    'title',
    'class',
    'id',
    'rel',
    'target',
    'loading',
    'width',
    'height',
    'srcset',
    'sizes',
    'style',
    'colspan',
    'rowspan',
    'data-align',
    'allow',
    'allowfullscreen',
    'frameborder',
  ],
  ALLOW_DATA_ATTR: false,
}

function normalizeDirectusPublicUrl(publicUrl: string): string {
  return publicUrl.replace(/\/$/, '')
}

function isAbsoluteLikeUrl(url: string): boolean {
  return /^https?:\/\//i.test(url) || url.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(url)
}

/**
 * Converts root-relative URLs to absolute URLs under the Directus public base.
 * Most importantly, this maps `/assets/<uuid>` written by the editor to a browser-safe URL.
 */
export function resolveDirectusPublicUrl(url: string, directusPublicUrl: string): string {
  if (!url) return url
  const trimmed = url.trim()
  if (!trimmed || isAbsoluteLikeUrl(trimmed)) return trimmed
  if (trimmed.startsWith('#')) return trimmed
  if (!trimmed.startsWith('/')) return trimmed
  return `${normalizeDirectusPublicUrl(directusPublicUrl)}${trimmed}`
}

/** Widest a body image is ever displayed, doubled for retina — see `NewsMarkdownBody`'s cap. */
const BODY_IMAGE_WIDTH = 1200

/**
 * Ask Directus for a display-sized copy of a body image. Migrated bodies point at the original
 * upload, which for a scan or a poster can be several megabytes.
 */
export function withAssetWidth(url: string, width = BODY_IMAGE_WIDTH): string {
  if (!url.includes('/assets/')) return url
  // Anything already carrying a query was sized deliberately (editor presets) — leave it alone.
  if (url.includes('?')) return url
  return `${url}?width=${width}&quality=80`
}

/**
 * The Directus base for the sanitize pass currently running. DOMPurify hooks are global and
 * cannot take arguments; sanitize is synchronous, so setting this immediately before the call
 * is safe on both the server and the client.
 */
let activeDirectusPublicUrl = ''

/**
 * Hosts whose iframes may stay: video and document embeds, nothing that can run arbitrary
 * scripts. Google's published documents (`/pubembed`, `/preview`) are here because the admissions
 * committee publishes its slide decks that way and the pages carry no copy of them.
 */
const EMBED_HOSTS = new Set([
  'www.youtube.com',
  'youtube.com',
  'www.youtube-nocookie.com',
  'youtube-nocookie.com',
  'player.vimeo.com',
  'vimeo.com',
  'docs.google.com',
  'drive.google.com',
  'calendar.google.com',
])

/** `/assets/<uuid>` on our own Directus — used to embed a PDF viewer in an article body. */
function isOwnAsset(src: string): boolean {
  const trimmed = src.trim()
  if (trimmed.startsWith('/assets/')) return true
  if (!activeDirectusPublicUrl) return false
  return trimmed.startsWith(`${normalizeDirectusPublicUrl(activeDirectusPublicUrl)}/assets/`)
}

function isAllowedEmbed(src: string): boolean {
  if (isOwnAsset(src)) return true
  try {
    const url = new URL(src, 'https://placeholder.invalid')
    return url.protocol === 'https:' && EMBED_HOSTS.has(url.hostname)
  }
  catch {
    return false
  }
}

let articlePurifyHooksInstalled = false

function ensureArticlePurifyHooks(): void {
  if (articlePurifyHooksInstalled) return
  articlePurifyHooksInstalled = true

  DOMPurify.addHook('uponSanitizeAttribute', (_node, data) => {
    if (data.attrName !== 'data-align') return
    const value = String(data.attrValue)
    if (!['left', 'center', 'right', 'justify'].includes(value)) {
      data.keepAttr = false
    }
  })

  DOMPurify.addHook('afterSanitizeElements', (node) => {
    if (node.nodeName !== 'IFRAME') return
    if (!isAllowedEmbed(node.getAttribute?.('src') ?? '')) node.remove()
  })

  // Absolutise `/assets/<uuid>` after sanitizing. Doing it here rather than in markdown-it's
  // renderer rules covers raw HTML bodies too — the renderer only ever sees markdown tokens.
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (!activeDirectusPublicUrl) return
    for (const attribute of ['src', 'href'] as const) {
      if (!node.hasAttribute?.(attribute)) continue
      const current = node.getAttribute(attribute) ?? ''
      let resolved = resolveDirectusPublicUrl(current, activeDirectusPublicUrl)
      if (node.nodeName === 'IMG' && attribute === 'src') resolved = withAssetWidth(resolved)
      if (resolved !== current) node.setAttribute(attribute, resolved)
    }
  })
}

function sanitizeArticleHtml(html: string, directusPublicUrl: string): string {
  ensureArticlePurifyHooks()
  activeDirectusPublicUrl = directusPublicUrl
  try {
    const safe = DOMPurify.sanitize(html, articleHtmlPurifyConfig)
    return typeof safe === 'string' ? safe : String(safe)
  }
  finally {
    activeDirectusPublicUrl = ''
  }
}

let markdownIt: MarkdownIt | undefined

function getMarkdownIt(): MarkdownIt {
  markdownIt ??= new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false,
  })
  return markdownIt
}

/**
 * Turns stored markdown (legacy imports and pre-WYSIWYG editing) into safe HTML for `v-html`.
 */
export function renderStoredArticleMarkdown(
  markdown: string,
  options: RenderStoredArticleMarkdownOptions,
): string {
  const source = decodeHtmlEntities(markdown.trim())
  if (!source) return ''
  return sanitizeArticleHtml(getMarkdownIt().render(source), options.directusPublicUrl)
}

/**
 * Turns stored HTML (Directus WYSIWYG) into safe HTML for `v-html`. Same allow-list and URL
 * handling as the markdown path, minus markdown-it — which would mangle indented HTML blocks.
 */
export function renderStoredArticleHtml(
  html: string,
  options: RenderStoredArticleMarkdownOptions,
): string {
  const source = fixDoubleEncodedHtmlEntities(html.trim())
  if (!source) return ''
  return sanitizeArticleHtml(source, options.directusPublicUrl)
}
