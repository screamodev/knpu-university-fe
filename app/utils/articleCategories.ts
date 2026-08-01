import type { DirectusArticle, DirectusCategory } from '~/types/directus'

/** Anything carrying the M2M field — a full article, a form's partial, or nothing. */
type ArticleCategoriesSource = { categories?: DirectusArticle['categories'] } | null | undefined

/**
 * Articles link to categories through the `articles_categories` M2M junction, so
 * the same field arrives in several shapes depending on how deep the query went:
 * `[{ categories_id: {...} }]`, `[{ categories_id: 'uuid' }]` or plain `['uuid']`.
 * Everything that only holds an id is dropped — callers want renderable records.
 */
export function articleCategories(article: ArticleCategoriesSource): DirectusCategory[] {
  const raw = article?.categories
  if (!Array.isArray(raw) || raw.length === 0) return []

  const out: DirectusCategory[] = []
  for (const entry of raw) {
    if (entry == null || typeof entry === 'string') continue

    const row = entry as Record<string, unknown>
    // Junction row: unwrap the related side, otherwise the row is the category.
    const candidate = 'categories_id' in row ? row.categories_id : row
    if (candidate == null || typeof candidate !== 'object') continue

    const category = candidate as DirectusCategory
    if (typeof category.name === 'string') out.push(category)
  }
  return out
}

/** First linked category — used wherever the UI shows a single badge. */
export function primaryArticleCategory(article: ArticleCategoriesSource): DirectusCategory | null {
  return articleCategories(article)[0] ?? null
}

/** `categories.id` list, for form state and M2M write payloads. */
export function articleCategoryIds(article: ArticleCategoriesSource): string[] {
  const raw = article?.categories
  if (!Array.isArray(raw) || raw.length === 0) return []

  const out: string[] = []
  for (const entry of raw) {
    if (typeof entry === 'string') {
      out.push(entry)
      continue
    }
    if (entry == null || typeof entry !== 'object') continue

    const row = entry as Record<string, unknown>
    const candidate = 'categories_id' in row ? row.categories_id : row
    if (typeof candidate === 'string') {
      out.push(candidate)
      continue
    }
    if (candidate && typeof candidate === 'object' && 'id' in candidate) {
      const id = (candidate as { id: unknown }).id
      if (typeof id === 'string') out.push(id)
    }
  }
  return out
}
