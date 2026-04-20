/**
 * Directus collections, files, auth, and rich-text editor JSON (TipTap ↔ API).
 * Consumed by `createDirectus<DirectusSchema>()` in `useDirectus` and app data layers.
 */

import type { DirectusRole, DirectusUser } from '~/types/auth'

// ——— Schema (SDK) —————————————————————————————————————————————————————————

/** Maps Directus collection names to row types for `@directus/sdk`. */
export interface DirectusSchema {
  articles: DirectusArticle[]
  categories: DirectusCategory[]
  events: DirectusEvent[]
  partners: DirectusPartner[]
  programmes: DirectusProgramme[]
  directus_files: DirectusFile[]
  directus_users: DirectusUser[]
  directus_roles: DirectusRole[]
}

// ——— Files ———————————————————————————————————————————————————————————————

/** Subset of Directus `directus_files` fields used by the Nuxt app. */
export interface DirectusFile {
  id: string
  /** Optional resolved public URL (legacy Strapi-style or computed `/assets/:id`). */
  url?: string | null
  /** Legacy Strapi field name; Directus uses `title` for captions when needed. */
  alternativeText?: string | null
  storage?: string
  filename_disk?: string | null
  filename_download?: string | null
  title?: string | null
  type?: string | null
  folder?: string | null
  uploaded_by?: string | null
  created_on?: string | null
  modified_by?: string | null
  modified_on?: string | null
  charset?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  duration?: number | null
  description?: string | null
  location?: string | null
  tags?: string | null
  metadata?: Record<string, unknown> | null
  focal_point_x?: number | null
  focal_point_y?: number | null
  tus_id?: string | null
  tus_data?: unknown | null
  uploaded_on?: string | null
}

// ——— Shared enums ——————————————————————————————————————————————————————————

export type ProgrammeLevel = 'bachelor' | 'master' | 'graduate'

export type DirectusContentStatus = 'published' | 'draft' | 'archived'

// ——— Rich-text blocks (editor JSON; stored as markdown string or JSON in API) —

/** A single node inside a rich-text block (TipTap / legacy Strapi-shaped JSON). */
export interface RichTextBlockChild {
  type: 'text' | 'link'
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  url?: string
  children?: RichTextBlockChild[]
}

export type RichTextBlockTextAlign = 'left' | 'center' | 'right' | 'justify'

/**
 * Minimal image shape used when importing markdown into blocks before a real file id exists.
 * Prefer `DirectusFile` for persisted uploads.
 */
export interface RichTextImageStub {
  id: string
  url: string
  alternativeText?: string | null
  width?: number
  height?: number
}

/** Top-level block in article / programme / event body content. */
export interface RichTextBlock {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'quote' | 'code' | 'image'
  children: RichTextBlockChild[]
  level?: 1 | 2 | 3 | 4 | 5 | 6
  textAlign?: RichTextBlockTextAlign
  format?: 'ordered' | 'unordered'
  /** Inline image: Directus file, markdown stub, or legacy Strapi-shaped JSON from the editor. */
  image?: DirectusFile | RichTextImageStub | StrapiImage | null
}

/** @deprecated Use `RichTextBlock` — migration alias. */
export type StrapiBlock = RichTextBlock
/** @deprecated Use `RichTextBlockChild` — migration alias. */
export type StrapiBlockChild = RichTextBlockChild
/** @deprecated Use `RichTextBlockTextAlign` — migration alias. */
export type StrapiBlockTextAlign = RichTextBlockTextAlign

/** @deprecated Strapi `formats.*`; Directus uses transform query params on `/assets/:id`. */
export interface StrapiImageFormat {
  url: string
  width: number
  height: number
}

/**
 * @deprecated Legacy Strapi media shape; new code should use `DirectusFile` and `assetUrl()`.
 * Kept so existing converters can narrow during the migration.
 */
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

// ——— Legacy Strapi REST wrappers (remove when all list calls use the SDK) ————

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

// ——— Collections ———————————————————————————————————————————————————————————

export interface DirectusCategory {
  id: string
  /** @deprecated Same as `id` (Strapi `documentId`); use `id` for Directus. */
  documentId?: string
  name: string
  nameEn: string | null
  slug: string
  date_created?: string
  date_updated?: string
}

export interface DirectusArticle {
  id: string
  /** @deprecated Strapi `documentId`; use `id`. */
  documentId?: string
  title: string
  titleEn: string | null
  slug: string
  excerpt: string | null
  excerptEn: string | null
  content: RichTextBlock[] | string | null
  contentEn: RichTextBlock[] | string | null
  /** M2O → `directus_files`; may be unexpanded id string. */
  cover: DirectusFile | string | null
  /** M2M → `directus_files`; expanded or junction rows depending on query. */
  attachments: DirectusFile[] | DirectusArticleAttachmentLink[] | string[] | null
  author: string | null
  date_published: string | null
  /** @deprecated Strapi field name; use `date_published`. */
  publishedAt?: string
  date_created: string
  /** @deprecated Strapi field name; use `date_created`. */
  createdAt?: string
  date_updated: string
  /** @deprecated Strapi field name; use `date_updated`. */
  updatedAt?: string
  category: DirectusCategory | string | null
  status?: DirectusContentStatus
}

/** Junction row shape when M2M is queried without deep expansion (optional). */
export interface DirectusArticleAttachmentLink {
  id?: number
  articles_id?: string
  directus_files_id?: string | DirectusFile
}

export interface DirectusProgramme {
  id: string
  slug: string
  title: string
  titleEn: string | null
  level: ProgrammeLevel
  faculty: string | null
  facultyEn: string | null
  description: string | null
  descriptionEn: string | null
  content: RichTextBlock[] | string | null
  contentEn: RichTextBlock[] | string | null
  cover: DirectusFile | string | null
  duration: string | null
  formOfStudy: string | null
  date_published: string | null
  /** @deprecated Strapi field name; use `date_published`. */
  publishedAt?: string
  date_created?: string
  date_updated?: string
  status?: DirectusContentStatus
}

export interface DirectusEvent {
  id: string
  slug: string
  title: string
  titleEn: string | null
  description: string | null
  descriptionEn: string | null
  content: RichTextBlock[] | string | null
  contentEn: RichTextBlock[] | string | null
  date: string
  endDate: string | null
  location: string | null
  locationEn: string | null
  tag: string | null
  tagEn: string | null
  cover: DirectusFile | string | null
  date_published: string | null
  /** @deprecated Strapi field name; use `date_published`. */
  publishedAt?: string
  date_created?: string
  date_updated?: string
  status?: DirectusContentStatus
}

export interface DirectusPartner {
  id: string
  slug: string
  name: string
  nameEn: string | null
  description: string | null
  descriptionEn: string | null
  website: string | null
  logo: DirectusFile | string | null
  country: string | null
  countryEn: string | null
  date_published?: string | null
  date_created?: string
  date_updated?: string
  status?: DirectusContentStatus
}

/** @deprecated Use `DirectusProgramme`. */
export type StrapiProgramme = DirectusProgramme
/** @deprecated Use `DirectusEvent`. */
export type StrapiEvent = DirectusEvent
/** @deprecated Use `DirectusPartner`. */
export type StrapiPartner = DirectusPartner

export type { DirectusRole, DirectusUser }
