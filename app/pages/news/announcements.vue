<script setup lang="ts">
import { ANNOUNCEMENTS_CATEGORY_SLUG } from '~/utils/announcements'

/**
 * «Оголошення» — the news archive scoped to the announcements category.
 *
 * A stable address the nav and the home banner can point at, rendered by the news listing itself
 * rather than by a second copy of it: everything the listing does (paging, the multi-select, the
 * shareable URL) applies here unchanged.
 */
definePageMeta({ layout: 'default' })

const route = useRoute()
const { localePath } = useSafeI18nWithRouter()

await navigateTo(
  localePath({
    path: '/news',
    query: { ...route.query, category: ANNOUNCEMENTS_CATEGORY_SLUG },
  }),
  { redirectCode: 302 },
)
</script>

<template>
  <div />
</template>
