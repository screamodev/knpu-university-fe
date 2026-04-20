/**
 * Composable for resolving bilingual entity fields based on current locale.
 * When locale is "en", returns the "*En" suffixed field if non-empty; otherwise the base (Ukrainian) field.
 */
export function useLocalizedField() {
  const { locale } = useSafeI18nWithRouter()

  function localized(entity: unknown, field: string): string {
    if (entity === null || typeof entity !== 'object') {
      return ''
    }
    const record = entity as Record<string, unknown>
    if (locale.value === 'en') {
      const enKey = `${field}En`
      const enValue = record[enKey]
      if (enValue && typeof enValue === 'string' && enValue.trim()) return enValue
    }
    return (record[field] as string) ?? ''
  }

  return { localized }
}
