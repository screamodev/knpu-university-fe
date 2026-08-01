import type { RichTextBlock } from '~/types/directus'

export interface ArticleFormPayload {
  title: string
  titleEn: string
  slug: string
  excerpt: string
  excerptEn: string
  content: RichTextBlock[] | null
  contentEn: RichTextBlock[] | null
  /** `directus_files.id` (M2O cover). */
  cover: string | null
  /** `directus_files.id` list (M2M attachments). */
  attachments: string[]
  author: string
  /** `categories.id` list (M2M through `articles_categories`). */
  categoryIds: string[]
}
