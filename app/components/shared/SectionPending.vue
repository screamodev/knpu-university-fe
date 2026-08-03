<script setup lang="ts">
/**
 * Placeholder for a section whose real content the university has not supplied yet.
 *
 * The site used to ship invented stand-ins here — plausible names, round statistics, ISSNs that
 * belonged to nobody. An honest "being filled in" note is better than data a visitor could act
 * on: see `docs/mock-data-audit.md` for the list of what was removed and what is expected.
 */
withDefaults(defineProps<{ note?: string | null }>(), { note: null })

const { t } = useSafeI18nWithRouter()
</script>

<template>
  <p class="text-body text-text-muted max-w-3xl">
    {{ note || t('common.sectionPending') }}
  </p>
</template>
