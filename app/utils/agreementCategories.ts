/**
 * Sections of the cooperation agreements register.
 *
 * One page per category under `/university/agreements/`, all reading the single Directus
 * collection `cooperation_agreements` — the ids must match its `category` choices
 * (`migration/schema/apply_schema.py`, `AGREEMENT_CATEGORIES`).
 */
export const AGREEMENT_CATEGORIES = [
  'napn',
  'universities',
  'schools',
  'organizations',
  'international',
] as const

export type AgreementCategoryId = (typeof AGREEMENT_CATEGORIES)[number]
