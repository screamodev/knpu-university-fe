/**
 * Composable for resolving bilingual entity fields based on current locale.
 * When locale is "en", returns the "*En" suffixed field if non-empty; otherwise the base (Ukrainian) field.
 */
export function useLocalizedField() {
  const { locale } = useSafeI18nWithRouter()

  function localized<T extends Record<string, unknown>>(
    entity: T,
    field: string,
  ): string {
    if (locale.value === 'en') {
      const enKey = `${field}En`
      const enValue = entity[enKey]
      if (enValue && typeof enValue === 'string' && enValue.trim()) return enValue
    }
    return (entity[field] as string) ?? ''
  }

  return { localized }
}
