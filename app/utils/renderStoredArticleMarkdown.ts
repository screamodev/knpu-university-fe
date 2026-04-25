import type { Config } from 'dompurify'
import DOMPurify from 'isomorphic-dompurify'
import MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

export interface RenderStoredArticleMarkdownOptions {
  /** Same base as `useRuntimeConfig().public.directusUrl` / `useDirectus().assetUrl`. */
  directusPublicUrl: string
}

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
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'blockquote',
    'code',
    'pre',
    'a',
    'img',
    'hr',
  ],
  ALLOWED_ATTR: [
    'href',
    'src',
    'alt',
    'title',
    'class',
    'rel',
    'target',
    'loading',
    'width',
    'height',
    'data-align',
  ],
  ALLOW_DATA_ATTR: false,
}

let articlePurifyDataAlignHookInstalled = false

function ensureArticlePurifyDataAlignHook(): void {
  if (articlePurifyDataAlignHookInstalled) return
  articlePurifyDataAlignHookInstalled = true
  DOMPurify.addHook('uponSanitizeAttribute', (_node, data) => {
    if (data.attrName !== 'data-align') return
    const value = String(data.attrValue)
    if (!['left', 'center', 'right', 'justify'].includes(value)) {
      data.keepAttr = false
    }
  })
}

function normalizeDirectusPublicUrl(publicUrl: string): string {
  return publicUrl.replace(/\/$/, '')
}

function isAbsoluteLikeUrl(url: string): boolean {
  return /^https?:\/\//i.test(url) || url.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(url)
}

/**
 * Converts root-relative URLs to absolute URLs under the Directus public base.
 * Most importantly, this maps `/assets/<uuid>` pasted in markdown to a browser-safe absolute URL.
 */
export function resolveDirectusPublicUrl(url: string, directusPublicUrl: string): string {
  if (!url) return url
  const trimmed = url.trim()
  if (!trimmed || isAbsoluteLikeUrl(trimmed)) return trimmed
  if (trimmed.startsWith('#')) return trimmed
  if (!trimmed.startsWith('/')) return trimmed
  return `${normalizeDirectusPublicUrl(directusPublicUrl)}${trimmed}`
}

function rewriteMarkdownLinkHref(href: string, directusPublicUrl: string): string {
  return resolveDirectusPublicUrl(href, directusPublicUrl)
}

function applyDirectusUrlRewrite(md: MarkdownIt, directusPublicUrl: string): void {
  const previousImageRule = md.renderer.rules.image
  const imageRule: RenderRule = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (!token) {
      return ''
    }
    const srcIndex = token.attrIndex('src')
    const srcPair = srcIndex >= 0 ? token.attrs?.[srcIndex] : undefined
    if (srcPair?.[1] !== undefined) {
      srcPair[1] = resolveDirectusPublicUrl(srcPair[1], directusPublicUrl)
    }
    if (previousImageRule) {
      return previousImageRule(tokens, idx, options, env, self)
    }
    return self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.image = imageRule

  const previousLinkOpenRule = md.renderer.rules.link_open
  const linkOpenRule: RenderRule = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (!token) {
      return ''
    }
    const hrefIndex = token.attrIndex('href')
    const hrefPair = hrefIndex >= 0 ? token.attrs?.[hrefIndex] : undefined
    if (hrefPair?.[1] !== undefined) {
      hrefPair[1] = rewriteMarkdownLinkHref(hrefPair[1], directusPublicUrl)
    }
    if (previousLinkOpenRule) {
      return previousLinkOpenRule(tokens, idx, options, env, self)
    }
    return self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.link_open = linkOpenRule
}

const markdownItByDirectusPublicUrl = new Map<string, MarkdownIt>()

function getMarkdownIt(directusPublicUrl: string): MarkdownIt {
  const cached = markdownItByDirectusPublicUrl.get(directusPublicUrl)
  if (cached) return cached

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false,
  })
  applyDirectusUrlRewrite(md, directusPublicUrl)
  markdownItByDirectusPublicUrl.set(directusPublicUrl, md)
  return md
}

/**
 * Turns stored markdown (from the admin editor pipeline) into safe HTML for `v-html`.
 */
export function renderStoredArticleMarkdown(
  markdown: string,
  options: RenderStoredArticleMarkdownOptions,
): string {
  const source = markdown.trim()
  if (!source) return ''

  ensureArticlePurifyDataAlignHook()
  const md = getMarkdownIt(options.directusPublicUrl)
  const html = md.render(source)
  const safe = DOMPurify.sanitize(html, articleHtmlPurifyConfig)
  return typeof safe === 'string' ? safe : String(safe)
}
