<script setup lang="ts">
import { resolveMessageValue } from '../../composables/useSafeT'
const { t, tm, localePath } = useSafeI18nWithRouter()

const programs = computed(() => {
  const items = (tm('programs.items') || []) as Array<{ level: unknown; name: unknown; faculty: unknown }>
  return items.map((p) => ({
    level: resolveMessageValue(p.level),
    name: resolveMessageValue(p.name),
    faculty: resolveMessageValue(p.faculty),
  }))
})
</script>

<template>
  <section class="py-20 bg-off-white">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-end justify-between mb-10">
        <SharedSectionHeader :tag="t('sections.programs.tag')" :title="t('sections.programs.title')" />
        <NuxtLink
          :to="localePath('/education/programs')"
          class="text-sm text-navy no-underline flex items-center gap-1.5 border-b-[1.5px] border-gold pb-0.5 font-medium"
        >
          {{ t('sections.programs.all') }}
          <span>→</span>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink
          v-for="(prog, i) in programs"
          :key="i"
          :to="localePath('/education/programs')"
          class="relative border-[1.5px] border-border rounded-14 p-7 no-underline transition-all duration-280 bg-white overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gold before:scale-y-0 before:origin-bottom before:transition-transform before:duration-280 hover:border-transparent hover:shadow-[0_8px_32px_rgba(27,46,75,0.12)] hover:-translate-y-0.5 hover:before:scale-y-100"
        >
          <div class="w-11 h-11 bg-gold-pale rounded-[10px] flex items-center justify-center mb-4">
            <svg class="w-[22px] h-[22px] text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div class="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">{{ prog.level }}</div>
          <div class="font-playfair text-[17px] text-navy font-semibold leading-tight mb-2.5">{{ prog.name }}</div>
          <div class="text-[12.5px] text-text-muted leading-snug">{{ prog.faculty }}</div>
          <div class="absolute top-7 right-6 text-border text-lg transition-colors duration-280 group-hover:text-gold">›</div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
