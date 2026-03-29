import type { StrapiBlock, StrapiImage } from '~/types/strapi'

export interface ArticleFormPayload {
  title: string
  titleEn: string
  slug: string
  excerpt: string
  excerptEn: string
  content: StrapiBlock[] | null
  contentEn: StrapiBlock[] | null
  cover: StrapiImage | null
  attachments: StrapiImage[]
  author: string
  categoryId: string | null
}
