/**
 * Renders CMS-stored article markdown to sanitized HTML using `public.directusUrl`
 * (same public base as `useStrapi().imageUrl`) for relative `/uploads` and image URLs.
 */
export function useArticleMarkdownHtml() {
  const config = useRuntimeConfig()
  const directusPublicUrl = config.public.directusUrl as string

  function renderMarkdown(markdown: string): string {
    return renderStoredArticleMarkdown(markdown, { strapiPublicUrl: directusPublicUrl })
  }

  return { renderMarkdown }
}
