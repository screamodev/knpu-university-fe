<script setup lang="ts">
const { t, locale } = useSafeI18nWithRouter()
useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
})
useHead({
  htmlAttrs: { lang: locale },
})
</script>

<template>
  <div>
    <WidgetsHero />
    <WidgetsQuickAccess />
    <WidgetsNewsSection />
    <WidgetsFactsBand />
    <WidgetsProgramsSection />
    <WidgetsAnnouncementBanner />
    <WidgetsEventsAndResources />
  </div>
</template>
