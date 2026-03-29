// ---------------------------------------------------------------------------
// Shared Strapi types (images, rich-text blocks, API responses).
// Entity-specific types: Article/Category in news.ts; Programme, Event, Partner here.
// ---------------------------------------------------------------------------

export interface StrapiImageFormat {
  url: string
  width: number
  height: number
}

export interface StrapiImage {
  id: number
  documentId: string
  url: string
  alternativeText: string | null
  width: number
  height: number
  formats: {
    thumbnail?: StrapiImageFormat
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
  } | null
}

/** A single node inside a Strapi 5 rich-text block */
export interface StrapiBlockChild {
  type: 'text' | 'link'
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  url?: string
  children?: StrapiBlockChild[]
}

/** Text alignment for blocks stored from the editor / rendered on the site */
export type StrapiBlockTextAlign = 'left' | 'center' | 'right' | 'justify'

/** A top-level block in Strapi 5 rich-text content */
export interface StrapiBlock {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'quote' | 'code' | 'image'
  children: StrapiBlockChild[]
  level?: 1 | 2 | 3 | 4 | 5 | 6
  textAlign?: StrapiBlockTextAlign
  format?: 'ordered' | 'unordered'
  image?: StrapiImage
}

export interface StrapiResponse<T> {
  data: T
  meta: Record<string, unknown>
}

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiPaginatedResponse<T> {
  data: T[]
  meta: {
    pagination: StrapiPagination
  }
}

export type ProgrammeLevel = 'bachelor' | 'master' | 'graduate'

export interface StrapiProgramme {
  id: number
  documentId: string
  slug: string
  title: string
  titleEn: string | null
  level: ProgrammeLevel
  faculty: string | null
  facultyEn: string | null
  description: string | null
  descriptionEn: string | null
  content: StrapiBlock[] | string | null
  contentEn: StrapiBlock[] | string | null
  cover: StrapiImage | null
  duration: string | null
  formOfStudy: string | null
  publishedAt: string
}

export interface StrapiEvent {
  id: number
  documentId: string
  slug: string
  title: string
  titleEn: string | null
  description: string | null
  descriptionEn: string | null
  content: StrapiBlock[] | string | null
  contentEn: StrapiBlock[] | string | null
  date: string
  endDate: string | null
  location: string | null
  locationEn: string | null
  tag: string | null
  tagEn: string | null
  cover: StrapiImage | null
  publishedAt: string
}

export interface StrapiPartner {
  id: number
  documentId: string
  slug: string
  name: string
  nameEn: string | null
  description: string | null
  descriptionEn: string | null
  website: string | null
  logo: StrapiImage | null
  country: string | null
  countryEn: string | null
}
