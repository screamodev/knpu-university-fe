<script setup lang="ts">
const translate = (key: string): string => {
  try {
    const i18n = (useNuxtApp() as any).$i18n?.global
    if (i18n?.t && typeof i18n.t === 'function') return i18n.t(key)
  } catch (_) {}
  return key
}
let localePath: (path: string) => string
try {
  localePath = useSafeI18nWithRouter().localePath
} catch (_) {
  localePath = (path: string) => path
}
const { isOpen, inputRef, close } = useSearch()

function onOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('search-overlay')) close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close()
}
onMounted(() => {
  if (import.meta.client) window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    class="search-overlay fixed inset-0 bg-navy-deep/92 backdrop-blur-sm z-[2000] flex items-start pt-[120px] transition-opacity duration-280"
    :class="{ 'opacity-100 pointer-events-auto': isOpen, 'opacity-0 pointer-events-none': !isOpen }"
    @click="onOverlayClick"
  >
    <button
      type="button"
      class="fixed top-8 right-8 w-11 h-11 rounded-full border border-white/20 bg-transparent text-white text-xl flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-280"
      aria-label="Close"
      @click="close"
    >
      ✕
    </button>
    <div class="max-w-[680px] w-full mx-auto px-8">
      <div class="relative">
        <input
          ref="inputRef"
          type="text"
          class="w-full py-5 pl-6 pr-[60px] text-[22px] border-2 border-gold/50 rounded-[14px] bg-white/5 text-white font-geologica outline-none transition-[border-color] duration-280 placeholder:text-white/30 focus:border-gold"
          :placeholder="translate('search.placeholder')"
        >
      </div>
      <div class="mt-5 flex gap-2.5 flex-wrap items-center">
        <span class="text-xs text-white/40">{{ translate('search.popular') }}</span>
        <NuxtLink :to="localePath('/student/schedule')" class="text-[13px] text-white/65 no-underline bg-white/5 py-1 px-3 rounded-100 border border-white/10">
          {{ translate('search.tagSchedule') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/admissions/rules')" class="text-[13px] text-white/65 no-underline bg-white/5 py-1 px-3 rounded-100 border border-white/10">
          {{ translate('search.tagVstup') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/student/moodle')" class="text-[13px] text-white/65 no-underline bg-white/5 py-1 px-3 rounded-100 border border-white/10">
          {{ translate('search.tagMoodle') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/education/faculties')" class="text-[13px] text-white/65 no-underline bg-white/5 py-1 px-3 rounded-100 border border-white/10">
          {{ translate('search.tagFaculties') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
