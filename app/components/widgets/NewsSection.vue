<script setup lang="ts">
const { t, tm, localePath } = useSafeI18nWithRouter()

const mainNews = computed(() => ({
  category: t('news.main.category'),
  title: t('news.main.title'),
  date: t('news.main.date'),
}))

const newsItems = computed(() => {
  const items = tm('news.items') as Array<{ category: string; title: string; date: string }>
  return items || []
})
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-container mx-auto px-8">
      <div class="flex flex-wrap items-end justify-between mb-10">
        <SharedSectionHeader :tag="t('sections.news.tag')" :title="t('sections.news.title')" />
        <NuxtLink
          :to="localePath('/news')"
          class="text-sm text-navy no-underline flex items-center gap-1.5 border-b-[1.5px] border-gold pb-0.5 font-medium"
        >
          {{ t('sections.news.all') }}
          <span>→</span>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <NuxtLink
          :to="localePath('/news')"
          class="bg-navy rounded-16 overflow-hidden flex flex-col no-underline transition-transform duration-280 hover:-translate-y-1"
        >
          <div class="h-60 bg-gradient-to-br from-navy-mid to-navy-deep relative overflow-hidden flex items-center justify-center">
            <div class="absolute inset-0 flex items-center justify-center opacity-20">
              <svg class="w-16 h-16 text-gold/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-2.5">{{ mainNews.category }}</div>
            <div class="font-playfair text-xl font-semibold text-white leading-snug flex-1 mb-4">{{ mainNews.title }}</div>
            <div class="text-xs text-white/40">{{ mainNews.date }}</div>
          </div>
        </NuxtLink>
        <div class="flex flex-col gap-3">
          <NuxtLink
            v-for="(item, i) in newsItems"
            :key="i"
            :to="localePath('/news')"
            class="block bg-off-white border border-border rounded-12 p-4 no-underline transition-all duration-280 hover:border-gold hover:bg-gold-pale hover:translate-x-1"
          >
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold">{{ item.category }}</div>
            <div class="font-playfair text-[15px] text-navy mb-2 leading-snug">{{ item.title }}</div>
            <div class="text-xs text-text-muted">{{ item.date }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
