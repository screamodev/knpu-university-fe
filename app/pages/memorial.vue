<script setup lang="ts">
definePageMeta({ layout: 'default' })

const localePath = useLocalePath()

await navigateTo(localePath('/university/memorial'), { replace: true })
</script>

<template>
  <div class="min-h-[30vh]" aria-hidden="true" />
</template>
