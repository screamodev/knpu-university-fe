<script setup lang="ts">
import type { NavItem } from '~/composables/useNavigation'

const { t, localePath } = useSafeI18nWithRouter()

const props = defineProps<{
  item: NavItem
  position: 'first' | 'middle' | 'last'
}>()

const colCount = computed(() => props.item.columns?.length ?? 0)
</script>

<template>
  <div
    v-if="item.columns?.length"
    class="absolute top-full left-1/2 -translate-y-2 bg-navy min-w-[900px] p-9 shadow-mega opacity-0 pointer-events-none transition-all duration-280 border-t-[3px] border-gold z-[999] group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0"
    :class="{
      'left-0 translate-x-0 group-hover:translate-x-0': position === 'first',
      'left-auto right-0 translate-x-0 group-hover:translate-x-0': position === 'last',
    }"
    :style="{ minWidth: item.minWidth }"
  >
    <div
      class="grid gap-0"
      :class="item.cta ? 'grid-cols-3' : {
        'grid-cols-2': colCount === 2,
        'grid-cols-3': colCount === 3,
        'grid-cols-4': colCount === 4,
      }"
    >
      <template v-if="item.labelKey === 'nav.admissions' && item.cta">
        <div class="pr-6 border-r border-white/8 space-y-5 min-w-0">
          <div v-for="(col, i) in item.columns!.slice(0, 2)" :key="i" class="min-w-0" :class="{ 'mt-5': i === 1 }">
            <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-3.5 pb-2.5 border-b border-gold/25 flex items-center gap-1.5">
              {{ t(col.titleKey) }}
            </div>
            <ul class="list-none flex flex-col gap-0.5 min-w-0">
              <li v-for="link in col.links" :key="link.path" class="min-w-0">
                <NuxtLink
                  :to="localePath(link.path)"
                  class="block py-1.5 px-2 text-[13px] text-white/95 no-underline rounded-md hover:text-white hover:bg-gold/10 hover:pl-3 transition-all duration-280 leading-snug break-words"
                >
                  {{ t(link.key) }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="px-6 border-r border-white/8 space-y-5 min-w-0">
          <div v-for="(col, i) in item.columns!.slice(2, 4)" :key="i" class="min-w-0" :class="{ 'mt-5': i === 1 }">
            <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-3.5 pb-2.5 border-b border-gold/25">
              {{ t(col.titleKey) }}
            </div>
            <ul class="list-none flex flex-col gap-0.5 min-w-0">
              <li v-for="link in col.links" :key="link.path" class="min-w-0">
                <NuxtLink
                  :to="localePath(link.path)"
                  class="block py-1.5 px-2 text-[13px] text-white/95 no-underline rounded-md hover:text-white hover:bg-gold/10 hover:pl-3 transition-all duration-280 leading-snug break-words"
                >
                  {{ t(link.key) }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="pl-6 flex flex-col gap-3">
          <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-3.5 pb-2.5 border-b border-gold/25">
            {{ t('nav.admissions.quick') }}
          </div>
          <NuxtLink
            :to="localePath(item.cta.primaryPath)"
            class="block py-3.5 px-4 rounded-[10px] text-[13.5px] font-semibold text-center bg-gold text-navy-deep no-underline hover:bg-gold-light transition-all duration-280"
          >
            {{ t(item.cta.primaryKey) }}
          </NuxtLink>
          <NuxtLink
            :to="localePath(item.cta.secondaryPath)"
            class="block py-3.5 px-4 rounded-[10px] text-[13.5px] font-semibold text-center bg-white/10 text-white/85 border border-white/15 no-underline hover:bg-white/14 transition-all duration-280"
          >
            {{ t(item.cta.secondaryKey) }}
          </NuxtLink>
          <div
            v-if="item.admissionBlock"
            class="bg-gold/10 border border-gold/20 rounded-[10px] p-4 mt-2"
          >
            <div class="text-[11px] text-gold font-semibold uppercase tracking-wider mb-2">
              {{ t(item.admissionBlock.tagKey) }}
            </div>
            <div class="text-[22px] font-playfair font-bold text-white">
              {{ t(item.admissionBlock.dateKey) }}
            </div>
            <div class="text-xs text-white/50 mt-1">
              {{ t(item.admissionBlock.descKey) }}
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(col, i) in item.columns"
          :key="i"
          class="pr-6 pl-0 min-w-0"
          :class="{ 'border-r border-white/8 pr-6': i < item.columns!.length - 1, 'pl-6': i > 0 }"
        >
          <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-3.5 pb-2.5 border-b border-gold/25 flex items-center gap-1.5">
            {{ t(col.titleKey) }}
          </div>
          <ul class="list-none flex flex-col gap-0.5 min-w-0">
            <li v-for="link in col.links" :key="link.path" class="min-w-0">
              <NuxtLink
                :to="localePath(link.path)"
                class="block py-1.5 px-2 text-[13px] text-white/95 no-underline rounded-md hover:text-white hover:bg-gold/10 hover:pl-3 transition-all duration-280 leading-snug break-words"
              >
                {{ t(link.key) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
