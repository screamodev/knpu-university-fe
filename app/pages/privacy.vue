<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useSeoMeta({
  title: () => t('seo.privacy.title'),
  description: () => t('seo.privacy.description'),
})

const paragraphs = ['p1', 'p2', 'p3', 'p4', 'p5'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('standalonePages.privacy.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('standalonePages.privacy.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('standalonePages.privacy.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-6">
      <p
        v-for="key in paragraphs"
        :key="key"
        class="text-body text-text-muted max-w-3xl"
      >
        {{ t(`standalonePages.privacy.${key}`) }}
      </p>
    </div>
  </div>
</template>
