<script setup lang="ts">
import { MEMORIAL_EXTERNAL_URL } from '~/utils/memorialUrl'

definePageMeta({ layout: 'default' })

await navigateTo(MEMORIAL_EXTERNAL_URL, { external: true, replace: true })
</script>

<template>
  <div class="min-h-[30vh]" aria-hidden="true" />
</template>
