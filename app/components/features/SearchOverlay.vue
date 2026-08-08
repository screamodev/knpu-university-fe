<script setup lang="ts">
import type { SearchHit } from '~~/server/utils/search/types'

/**
 * Header search: a preview of the results as the visitor types.
 *
 * Deliberately not the whole answer — it shows the first handful of hits so the common case
 * («де розклад?») is one keystroke away, and hands off to `/search` for filtering and paging.
 *
 * The results sit on a solid panel rather than directly on the dimmed page: over a photographic
 * hero, translucent white text was unreadable.
 */
const { t, localePath } = useSafeI18nWithRouter()
const { isOpen, inputRef, query, results, pending, grouped, open, close, search, reset } = useSearch()
const router = useRouter()

const activeIndex = ref(-1)

/** Flat list in display order, so the arrow keys can walk the groups as one column. */
const flatHits = computed<SearchHit[]>(() => grouped.value.flatMap(group => group.items))

const hasQuery = computed(() => query.value.trim().length >= 2)
const total = computed(() => results.value?.total ?? 0)

function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url)
}

function hitTo(hit: SearchHit): string {
  return isExternal(hit.url) ? hit.url : localePath(hit.url)
}

function onInput(event: Event) {
  activeIndex.value = -1
  search((event.target as HTMLInputElement).value)
}

function goToResultsPage() {
  if (!hasQuery.value) return
  close()
  router.push({ path: localePath('/search'), query: { q: query.value.trim() } })
}

function openHit(hit: SearchHit) {
  close()
  if (isExternal(hit.url)) {
    window.open(hit.url, '_blank', 'noopener')
    return
  }
  router.push(localePath(hit.url))
}

function onEnter() {
  const hit = flatHits.value[activeIndex.value]
  if (hit) openHit(hit)
  else goToResultsPage()
}

function move(step: number) {
  if (!flatHits.value.length) return
  const next = activeIndex.value + step
  activeIndex.value = next < 0 ? flatHits.value.length - 1 : next % flatHits.value.length
}

function onScrimClick(event: MouseEvent) {
  if ((event.target as HTMLElement).dataset.scrim !== undefined) close()
}

function onKeydown(event: KeyboardEvent) {
  // ⌘K / Ctrl+K from anywhere on the site.
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    isOpen.value ? close() : open()
    return
  }
  if (!isOpen.value) return
  if (event.key === 'Escape') close()
}

watch(isOpen, (opened) => {
  if (!opened) activeIndex.value = -1
  if (import.meta.client) document.body.style.overflow = opened ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <div
    data-scrim
    class="fixed inset-0 z-[2000] bg-navy-deep/70 backdrop-blur-md flex items-start justify-center px-4 pt-[70px] sm:pt-[100px] pb-10 overflow-y-auto transition-opacity duration-280"
    :class="{ 'opacity-100 pointer-events-auto': isOpen, 'opacity-0 pointer-events-none': !isOpen }"
    :aria-hidden="!isOpen"
    @click="onScrimClick"
  >
    <div class="w-full max-w-[720px] bg-white rounded-16 shadow-2xl overflow-hidden">
      <!-- Input row -->
      <div class="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-border">
        <svg class="w-5 h-5 shrink-0 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref="inputRef"
          type="search"
          :value="query"
          class="search-field flex-1 min-w-0 bg-transparent border-none outline-none text-navy text-base sm:text-lg font-geologica placeholder:text-text-muted/70"
          :placeholder="t('search.placeholder')"
          :aria-label="t('search.placeholder')"
          autocomplete="off"
          @input="onInput"
          @keydown.enter.prevent="onEnter"
          @keydown.down.prevent="move(1)"
          @keydown.up.prevent="move(-1)"
        >
        <button
          v-if="query"
          type="button"
          class="shrink-0 w-7 h-7 rounded-full bg-transparent border-none text-text-muted hover:text-navy transition-colors cursor-pointer flex items-center justify-center"
          :aria-label="t('search.clear')"
          @click="reset(); inputRef?.focus()"
        >
          ✕
        </button>
        <kbd class="shrink-0 hidden sm:block text-[10px] font-geologica border border-border rounded px-1.5 py-0.5 text-text-muted">
          Esc
        </kbd>
      </div>

      <div class="max-h-[60vh] overflow-y-auto">
        <!-- Idle: the shortcuts that were always here -->
        <div v-if="!hasQuery" class="px-4 sm:px-5 py-4 flex gap-2 flex-wrap items-center">
          <span class="text-[11px] uppercase tracking-wider font-semibold text-text-muted">
            {{ t('search.popular') }}
          </span>
          <NuxtLink
            v-for="shortcut in [
              { to: '/student/schedule', label: t('search.tagSchedule') },
              { to: '/admissions/rules', label: t('search.tagVstup') },
              { to: '/education/faculties', label: t('search.tagFaculties') },
            ]"
            :key="shortcut.to"
            :to="localePath(shortcut.to)"
            class="text-[13px] text-navy no-underline bg-off-white py-1 px-3 rounded-100 border border-border hover:border-gold hover:text-gold transition-colors"
            @click="close"
          >
            {{ shortcut.label }}
          </NuxtLink>
        </div>

        <p v-else-if="pending && !results" class="px-5 py-6 text-body-sm text-text-muted">
          {{ t('search.searching') }}
        </p>

        <p v-else-if="results && !total" class="px-5 py-8 text-body-sm text-text-muted text-center">
          {{ t('search.empty') }}
        </p>

        <div v-else-if="results" class="py-2">
          <div v-for="group in grouped" :key="group.type" class="mb-2">
            <div class="px-4 sm:px-5 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-gold">
              {{ t(`search.types.${group.type}`) }}
            </div>
            <ul class="list-none p-0 m-0">
              <li v-for="hit in group.items" :key="hit.id">
                <NuxtLink
                  :to="hitTo(hit)"
                  :target="isExternal(hit.url) ? '_blank' : undefined"
                  :rel="isExternal(hit.url) ? 'noopener noreferrer' : undefined"
                  class="block no-underline px-4 sm:px-5 py-2.5 border-l-2 transition-colors"
                  :class="flatHits[activeIndex]?.id === hit.id
                    ? 'bg-off-white border-gold'
                    : 'border-transparent hover:bg-off-white'"
                  @click="close"
                >
                  <span class="block text-navy font-medium leading-snug">{{ hit.title }}</span>
                  <span
                    v-if="hit.snippet"
                    class="block text-text-muted text-body-sm mt-0.5 leading-snug search-snippet"
                    v-html="hit.snippet"
                  />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        v-if="results && total"
        type="button"
        class="w-full text-center py-3 bg-off-white border-none border-t border-border text-navy hover:text-gold transition-colors font-geologica text-body-sm font-medium cursor-pointer"
        @click="goToResultsPage"
      >
        {{ t('search.showAll', { count: total }) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/*
 * WebKit adds its own clear button to `type="search"`, which sat next to ours — two crosses in one
 * field. Ours stays, because it also resets the results.
 */
.search-field::-webkit-search-cancel-button,
.search-field::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

.search-snippet :deep(mark) {
  background: theme('colors.gold-pale');
  color: theme('colors.navy');
  font-weight: 600;
  border-radius: 3px;
  padding: 0 2px;
}
</style>
