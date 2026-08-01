/**
 * Renders CMS-stored article bodies to sanitized HTML using `public.directusUrl`
 * (same public base as `useDirectus().assetUrl`) for relative `/assets/<uuid>` URLs.
 *
 * Two stored formats coexist: HTML from the Directus WYSIWYG, and markdown from the legacy
 * import and everything written before the switch.
 */
export function useArticleMarkdownHtml() {
  const config = useRuntimeConfig()
  const directusPublicUrl = config.public.directusUrl as string

  function renderMarkdown(markdown: string): string {
    return renderStoredArticleMarkdown(markdown, { directusPublicUrl })
  }

  function renderHtml(html: string): string {
    return renderStoredArticleHtml(html, { directusPublicUrl })
  }

  function renderBody(source: string, kind: 'markdown' | 'html'): string {
    return kind === 'html' ? renderHtml(source) : renderMarkdown(source)
  }

  return { renderMarkdown, renderHtml, renderBody }
}
