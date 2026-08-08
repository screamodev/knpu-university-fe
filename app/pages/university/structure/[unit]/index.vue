<script setup lang="ts">
import { findStructureUnit } from '~/utils/structure'

/**
 * Головна of any unit that has no file of its own — every кафедра, and any unit added later.
 *
 * The ten institutes and faculties keep their own thin pages; Nuxt gives those static routes
 * priority over this dynamic one. `validate` runs against the static chart, so an unknown slug
 * 404s instead of rendering an empty shell.
 */
definePageMeta({
  layout: 'default',
  validate: route => Boolean(findStructureUnit(String(route.params.unit))),
})

const route = useRoute()
const unit = computed(() => String(route.params.unit))
</script>

<template>
  <SharedStructureUnitPage :slug="unit" />
</template>
