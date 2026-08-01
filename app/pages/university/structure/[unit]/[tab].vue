<script setup lang="ts">
import { isStructureTabRoute, type StructureTabId } from '~/utils/structureContent'

/**
 * Sub-tab of an institute / faculty page. The Головна tab lives at the unit URL itself
 * (`../<slug>.vue`), so this route never matches `home`.
 *
 * `validate` runs synchronously against the static manifest, so a unit without that tab 404s
 * instead of rendering an empty page.
 */
definePageMeta({
  layout: 'default',
  validate: route => isStructureTabRoute(String(route.params.unit), String(route.params.tab)),
})

const route = useRoute()
const unit = computed(() => String(route.params.unit))
const tab = computed(() => String(route.params.tab) as StructureTabId)
</script>

<template>
  <SharedStructureUnitPage :slug="unit" :tab="tab" />
</template>
