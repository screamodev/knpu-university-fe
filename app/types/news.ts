import type {
  DirectusArticle,
  DirectusCategory,
  DirectusFile,
  RichTextBlock,
  RichTextBlockChild,
  StrapiBlock,
  StrapiBlockChild,
  StrapiImage,
  StrapiImageFormat,
  StrapiPaginatedResponse,
  StrapiPagination,
  StrapiResponse,
} from '~/types/directus'

export type {
  DirectusArticle,
  DirectusCategory,
  DirectusFile,
  RichTextBlock,
  RichTextBlockChild,
  StrapiBlock,
  StrapiBlockChild,
  StrapiImage,
  StrapiImageFormat,
  StrapiPaginatedResponse,
  StrapiPagination,
  StrapiResponse,
}

/** @deprecated Use `DirectusCategory`. */
export type StrapiCategory = DirectusCategory

/** @deprecated Use `DirectusArticle`. */
export type StrapiArticle = DirectusArticle
