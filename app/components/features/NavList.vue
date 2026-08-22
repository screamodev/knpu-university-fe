<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
const { items } = useNavigation()

function position(index: number): 'first' | 'middle' | 'last' {
  if (index === 0) return 'first'
  if (index >= 3) return 'last'
  return 'middle'
}

/**
 * Спільні класи кнопки верхнього рівня. Вони однакові для всіх трьох варіантів (кнопка, внутрішнє
 * посилання, зовнішнє посилання), тож живуть в одному місці.
 */
const TRIGGER_CLASS
  = 'flex items-center gap-2.5 py-7 px-4 text-sm font-medium text-navy no-underline cursor-pointer '
  + 'font-geologica whitespace-nowrap transition-colors duration-280 relative after:content-[\'\'] '
  + 'after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[3px] after:bg-gold '
  + 'after:scale-x-0 after:origin-center after:transition-transform after:duration-280 after:rounded-t '
  + 'group-hover:text-gold group-hover:after:scale-x-100'
</script>

<template>
  <ul class="list-none flex items-center gap-0.5">
    <li
      v-for="(item, index) in items"
      :key="item.labelKey"
      class="relative group"
    >
      <!--
        Пункт із мегаменю. «Вступ» тепер веде на приймальну комісію старого сайту, тож заголовок
        буває зовнішнім посиланням — але список під ним лишається.
      -->
      <template v-if="item.columns?.length">
        <a
          v-if="item.path && item.external"
          :href="item.path"
          target="_blank"
          rel="noopener noreferrer"
          :class="TRIGGER_CLASS"
        >
          {{ t(item.labelKey) }}
          <span
            class="w-2 h-2 border-r border-b border-current rotate-45 -translate-y-px shrink-0 transition-transform duration-280 group-hover:rotate-[-135deg] group-hover:-translate-y-px"
            aria-hidden
          />
        </a>
        <button
          v-else
          type="button"
          :class="[TRIGGER_CLASS, 'border-none bg-transparent']"
        >
          {{ t(item.labelKey) }}
          <span
            class="w-2 h-2 border-r border-b border-current rotate-45 -translate-y-px shrink-0 transition-transform duration-280 group-hover:rotate-[-135deg] group-hover:-translate-y-px"
            aria-hidden
          />
        </button>
        <FeaturesMegaMenu :item="item" :position="position(index)" />
      </template>

      <a
        v-else-if="item.path && item.external"
        :href="item.path"
        target="_blank"
        rel="noopener noreferrer"
        :class="TRIGGER_CLASS"
      >
        {{ t(item.labelKey) }}
      </a>
      <NuxtLink
        v-else-if="item.path"
        :to="localePath(item.path)"
        :class="TRIGGER_CLASS"
      >
        {{ t(item.labelKey) }}
      </NuxtLink>
    </li>
  </ul>
</template>
