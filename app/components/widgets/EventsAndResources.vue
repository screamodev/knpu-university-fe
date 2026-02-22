<script setup lang="ts">
import { resolveMessageValue } from '../../composables/useSafeT'
const { t, tm, localePath } = useSafeI18nWithRouter()

const events = computed(() => {
  const items = (tm('events.items') || []) as Array<{ day: unknown; month: unknown; tag: unknown; title: unknown; place: unknown }>
  return items.map((ev) => ({
    day: resolveMessageValue(ev.day),
    month: resolveMessageValue(ev.month),
    tag: resolveMessageValue(ev.tag),
    title: resolveMessageValue(ev.title),
    place: resolveMessageValue(ev.place),
  }))
})

const resourceList = computed(() => [
  { path: '/science/library', titleKey: 'resources.library.title', subKey: 'resources.library.sub', icon: '📚', gold: false },
  { path: '/admissions/rules', titleKey: 'resources.vstup.title', subKey: 'resources.vstup.sub', icon: '🎓', gold: true },
  { path: '/student/career', titleKey: 'resources.career.title', subKey: 'resources.career.sub', icon: '💼', gold: false },
  { path: '/university/erasmus', titleKey: 'resources.erasmus.title', subKey: 'resources.erasmus.sub', icon: '🌍', gold: false },
])
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SharedSectionHeader :tag="t('sections.events.tag')" :title="t('sections.events.title')" />
          <div class="flex flex-col gap-4">
            <NuxtLink
              v-for="(ev, i) in events"
              :key="i"
              :to="localePath('/events')"
              class="grid grid-cols-1 min-[400px]:grid-cols-[80px_1fr_auto] items-center gap-3 min-[400px]:gap-5 py-4 px-4 min-[400px]:py-5 min-[400px]:px-6 border-[1.5px] border-border rounded-12 no-underline transition-all duration-280 bg-white hover:border-gold hover:translate-x-1"
            >
              <div class="text-center">
                <div class="font-playfair text-3xl font-bold text-navy leading-none">{{ ev.day }}</div>
                <div class="text-[11px] uppercase tracking-wider text-text-muted font-medium">{{ ev.month }}</div>
              </div>
              <div>
                <div class="text-[11px] font-semibold uppercase tracking-wide text-gold mb-1">{{ ev.tag }}</div>
                <div class="text-[15px] font-medium text-navy leading-snug">{{ ev.title }}</div>
                <div class="text-xs text-text-muted mt-1">📍 {{ ev.place }}</div>
              </div>
              <div class="text-border text-xl transition-colors duration-280 group-hover:text-gold">›</div>
            </NuxtLink>
          </div>
        </div>
        <div>
          <SharedSectionHeader :tag="t('sections.resources.tag')" :title="t('sections.resources.title')" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NuxtLink
              v-for="(res, i) in resourceList"
              :key="i"
              :to="localePath(res.path)"
              class="flex flex-col gap-3 p-6 rounded-14 no-underline transition-transform duration-200 hover:-translate-y-0.5"
              :class="res.gold ? 'bg-gold' : 'bg-navy border border-border'"
            >
              <div class="text-2xl">{{ res.icon }}</div>
              <div
                class="text-sm font-semibold"
                :class="res.gold ? 'text-navy-deep' : 'text-white'"
              >
                {{ t(res.titleKey) }}
              </div>
              <div
                class="text-xs"
                :class="res.gold ? 'text-navy-deep/65' : 'text-white/50'"
              >
                {{ t(res.subKey) }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
