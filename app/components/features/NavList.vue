<script setup lang="ts">
const { t } = useSafeI18nWithRouter()
const { items } = useNavigation()

function position(index: number): 'first' | 'middle' | 'last' {
  if (index === 0) return 'first'
  if (index === items.length - 1) return 'last'
  return 'middle'
}
</script>

<template>
  <ul class="list-none flex items-center gap-0.5">
    <li
      v-for="(item, index) in items"
      :key="item.labelKey"
      class="relative group"
    >
      <button
        type="button"
        class="flex items-center gap-2.5 py-7 px-4 text-sm font-medium text-navy no-underline cursor-pointer border-none bg-transparent font-geologica whitespace-nowrap transition-colors duration-280 relative after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[3px] after:bg-gold after:scale-x-0 after:origin-center after:transition-transform after:duration-280 after:rounded-t group-hover:text-gold group-hover:after:scale-x-100"
      >
        {{ t(item.labelKey) }}
        <span
          class="w-2 h-2 border-r border-b border-current rotate-45 -translate-y-px shrink-0 transition-transform duration-280 group-hover:rotate-[-135deg] group-hover:-translate-y-px"
          aria-hidden
        />
      </button>
      <FeaturesMegaMenu :item="item" :position="position(index)" />
    </li>
  </ul>
</template>
