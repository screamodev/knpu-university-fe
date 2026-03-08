import type {
  StrapiImage,
  StrapiImageFormat,
  StrapiBlock,
  StrapiBlockChild,
  StrapiResponse,
  StrapiPagination,
  StrapiPaginatedResponse,
} from '~/types/strapi'

export type {
  StrapiImage,
  StrapiImageFormat,
  StrapiBlock,
  StrapiBlockChild,
  StrapiResponse,
  StrapiPagination,
  StrapiPaginatedResponse,
}

export interface StrapiCategory {
  id: number
  documentId: string
  name: string
  nameEn: string | null
  slug: string
}

export interface StrapiArticle {
  id: number
  documentId: string
  title: string
  titleEn: string | null
  slug: string
  excerpt: string | null
  excerptEn: string | null
  content: StrapiBlock[] | null
  contentEn: StrapiBlock[] | null
  cover: StrapiImage | null
  attachments: StrapiImage[] | null
  author: string | null
  publishedAt: string
  createdAt: string
  updatedAt: string
  category: StrapiCategory | null
}
