<script setup lang="ts">
const { t } = useSafeI18nWithRouter()
</script>

<template>
  <section class="py-20 bg-off-white">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <SharedSectionHeader :tag="t('sections.partners.tag')" :title="t('sections.partners.title')" />
      <div class="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center min-h-[120px]">
      </div>
    </div>
  </section>
</template>
