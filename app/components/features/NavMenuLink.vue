<script setup lang="ts">
import type { NavLink } from '~/composables/useNavigation'

/**
 * One link of the mega menu or the mobile menu. A link can open another site, a file from the
 * media library (on the admin host), or a route here; its label is an i18n key or, for links
 * built from data (the «НДІ, центри, лабораторії» list), a label of its own.
 */
const props = defineProps<{ link: NavLink }>()

const { t, localePath, locale } = useSafeI18nWithRouter()
const { assetUrl } = useDirectus()

const label = computed(() => {
  if (props.link.label) return (locale.value === 'en' ? props.link.label.en : undefined) ?? props.link.label.uk
  return props.link.key ? t(props.link.key) : ''
})

const href = computed(() =>
  props.link.asset ? (assetUrl(props.link.path.replace('/assets/', '')) ?? props.link.path) : props.link.path,
)
</script>

<template>
  <a
    v-if="link.external || link.asset"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    {{ label }}
  </a>
  <NuxtLink v-else :to="localePath(link.path)">
    {{ label }}
  </NuxtLink>
</template>
