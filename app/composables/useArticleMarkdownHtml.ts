/**
 * Renders CMS-stored article markdown to sanitized HTML using `public.directusUrl`
 * (same public base as `useDirectus().assetUrl`) for relative `/assets/<uuid>` URLs.
 */
export function useArticleMarkdownHtml() {
  const config = useRuntimeConfig()
  const directusPublicUrl = config.public.directusUrl as string

  function renderMarkdown(markdown: string): string {
    return renderStoredArticleMarkdown(markdown, { directusPublicUrl })
  }

  return { renderMarkdown }
}
