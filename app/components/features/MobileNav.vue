<script setup lang="ts">
import type { NavLink } from '~/composables/useNavigation'

const { t, localePath, switchLocalePath } = useSafeI18nWithRouter()
const { isOpen, openIndex, close, toggleAccordion } = useMobileNav()
const { open: openSearch } = useSearch()
const { items } = useNavigation()
const router = useRouter()

onMounted(() => {
  router.afterEach(() => close())
})

/** Same links as desktop mega menu — derived from useNavigation(), not a trimmed subset. */
const mobileSections = computed(() =>
  items
    .filter((item) => (item.columns?.length ?? 0) > 0)
    .map((item) => ({
      labelKey: item.labelKey,
      columns: item.columns ?? [],
      cta: item.cta,
    })),
)

function linkKey(link: NavLink): string {
  return `${link.key}:${link.path}`
}
</script>

<template>
  <nav
    class="fixed inset-0 bg-navy-deep z-[1500] overflow-y-auto py-20 px-6 transition-transform duration-280 lg:hidden"
    :class="[
      isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none',
    ]"
    :aria-hidden="!isOpen"
  >
    <button
      type="button"
      class="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 bg-transparent text-white text-lg flex items-center justify-center"
      aria-label="Close"
      @click="close"
    >
      ✕
    </button>
    <button
      type="button"
      class="flex items-center gap-3 w-full mb-4 py-3 px-4 rounded-12 border border-white/15 bg-white/5 text-white/80 font-geologica text-body-sm cursor-pointer"
      @click="close(); openSearch()"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      {{ t('search.placeholder') }}
    </button>

    <ul class="list-none flex flex-col">
      <li
        v-for="(section, idx) in mobileSections"
        :key="section.labelKey"
        class="border-b border-white/8"
      >
        <button
          type="button"
          class="flex items-center justify-between w-full py-4 text-lg font-medium text-white bg-transparent border-none cursor-pointer font-geologica text-left"
          @click="toggleAccordion(idx)"
        >
          {{ t(section.labelKey) }}
          <span>{{ openIndex === idx ? '∧' : '›' }}</span>
        </button>
        <div
          v-show="openIndex === idx"
          class="py-2 pb-4 flex flex-col gap-4"
        >
          <div
            v-for="column in section.columns"
            :key="column.titleKey"
            class="flex flex-col"
          >
            <div class="text-[11px] font-semibold tracking-widest uppercase text-gold/90 mb-2">
              {{ t(column.titleKey) }}
            </div>
            <template v-for="link in column.links" :key="linkKey(link)">
              <a
                v-if="link.external"
                :href="link.path"
                target="_blank"
                rel="noopener noreferrer"
                class="block py-2 text-sm text-white/65 no-underline hover:text-gold transition-colors duration-280"
                @click="close"
              >
                {{ t(link.key) }}
              </a>
              <NuxtLink
                v-else
                :to="localePath(link.path)"
                class="block py-2 text-sm text-white/65 no-underline hover:text-gold transition-colors duration-280"
                @click="close"
              >
                {{ t(link.key) }}
              </NuxtLink>
            </template>
          </div>

          <div v-if="section.cta" class="flex flex-col gap-2 pt-1">
            <NuxtLink
              :to="localePath(section.cta.primaryPath)"
              class="block py-2.5 px-3 text-sm font-semibold text-navy-deep bg-gold rounded-lg no-underline text-center"
              @click="close"
            >
              {{ t(section.cta.primaryKey) }}
            </NuxtLink>
            <NuxtLink
              :to="localePath(section.cta.secondaryPath)"
              class="block py-2 text-sm text-white/80 no-underline text-center border border-white/20 rounded-lg hover:border-gold hover:text-gold transition-colors duration-280"
              @click="close"
            >
              {{ t(section.cta.secondaryKey) }}
            </NuxtLink>
          </div>
        </div>
      </li>
    </ul>
    <div class="mt-6 flex flex-col gap-3">
      <NuxtLink
        :to="localePath('/admissions/edebo')"
        class="block text-center bg-gold text-navy-deep py-3.5 rounded-[10px] font-bold no-underline text-[15px]"
        @click="close"
      >
        {{ t('header.vstup2026') }}
      </NuxtLink>
      <div class="flex gap-2">
        <NuxtLink
          :to="switchLocalePath('uk')"
          class="flex-1 text-center py-3 bg-white/5 text-white/70 rounded-lg text-[13px] no-underline border border-white/10"
        >
          {{ t('utility.langUk') }}
        </NuxtLink>
        <NuxtLink
          :to="switchLocalePath('en')"
          class="flex-1 text-center py-3 bg-white/5 text-white/70 rounded-lg text-[13px] no-underline border border-white/10"
        >
          {{ t('utility.langEn') }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
