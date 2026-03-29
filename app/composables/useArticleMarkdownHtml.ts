/**
 * Renders Strapi-stored article markdown to sanitized HTML using `public.strapiUrl`
 * (same public base as `useStrapi().imageUrl`) for relative `/uploads` and image URLs.
 */
export function useArticleMarkdownHtml() {
  const config = useRuntimeConfig()
  const strapiPublicUrl = config.public.strapiUrl as string

  function renderMarkdown(markdown: string): string {
    return renderStoredArticleMarkdown(markdown, { strapiPublicUrl })
  }

  return { renderMarkdown }
}
