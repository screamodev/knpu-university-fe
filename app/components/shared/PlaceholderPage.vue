<script setup lang="ts">
const props = defineProps<{
  titleKey: string
}>()
const { t } = useSafeI18nWithRouter()
useHead({
  title: () => t(props.titleKey),
})
</script>

<template>
  <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <h1 class="font-playfair text-3xl font-bold text-navy mb-4">
      {{ t(titleKey) }}
    </h1>
    <p class="text-text-muted">
      {{ t('common.comingSoon') }}
    </p>
  </div>
</template>
