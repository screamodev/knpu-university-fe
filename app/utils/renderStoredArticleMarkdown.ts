import type { Config } from 'dompurify'
import DOMPurify from 'isomorphic-dompurify'
import MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

export interface RenderStoredArticleMarkdownOptions {
  /** Same base as `useRuntimeConfig().public.strapiUrl` / `useStrapi().imageUrl`. */
  strapiPublicUrl: string
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

/**
 * Resolves Strapi media paths for browser `<img>` / asset URLs.
 * Keep in sync with `useStrapi().imageUrl`.
 */
export function resolveStrapiPublicMediaUrl(imagePath: string, strapiPublicUrl: string): string {
  if (!imagePath) return imagePath
  if (imagePath.startsWith('http')) return imagePath
  return `${strapiPublicUrl}${imagePath}`
}

function rewriteMarkdownLinkHref(href: string, strapiPublicUrl: string): string {
  const trimmed = href.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('//')) return trimmed
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed
  if (trimmed.startsWith('/uploads')) return `${strapiPublicUrl}${trimmed}`
  return trimmed
}

function applyStrapiUrlRewrite(md: MarkdownIt, strapiPublicUrl: string): void {
  const previousImageRule = md.renderer.rules.image
  const imageRule: RenderRule = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (!token) {
      return ''
    }
    const srcIndex = token.attrIndex('src')
    const srcPair = srcIndex >= 0 ? token.attrs?.[srcIndex] : undefined
    if (srcPair?.[1] !== undefined) {
      srcPair[1] = resolveStrapiPublicMediaUrl(srcPair[1], strapiPublicUrl)
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
      hrefPair[1] = rewriteMarkdownLinkHref(hrefPair[1], strapiPublicUrl)
    }
    if (previousLinkOpenRule) {
      return previousLinkOpenRule(tokens, idx, options, env, self)
    }
    return self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.link_open = linkOpenRule
}

const markdownItByStrapiPublicUrl = new Map<string, MarkdownIt>()

function getMarkdownIt(strapiPublicUrl: string): MarkdownIt {
  const cached = markdownItByStrapiPublicUrl.get(strapiPublicUrl)
  if (cached) return cached

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false,
  })
  applyStrapiUrlRewrite(md, strapiPublicUrl)
  markdownItByStrapiPublicUrl.set(strapiPublicUrl, md)
  return md
}

/**
 * Turns Strapi-stored markdown (from the admin editor pipeline) into safe HTML for `v-html`.
 */
export function renderStoredArticleMarkdown(
  markdown: string,
  options: RenderStoredArticleMarkdownOptions,
): string {
  const source = markdown.trim()
  if (!source) return ''

  ensureArticlePurifyDataAlignHook()
  const md = getMarkdownIt(options.strapiPublicUrl)
  const html = md.render(source)
  const safe = DOMPurify.sanitize(html, articleHtmlPurifyConfig)
  return typeof safe === 'string' ? safe : String(safe)
}
