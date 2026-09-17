<script setup lang="ts">
import { findStructureUnit } from '~/utils/structure'

/**
 * «Аспіранти — громадяни України» — окрема сторінка відділу аспірантури і докторантури
 * (правки аспірантури, 17.09): на неї ведуть пункт вкладки «Аспіранту» і кнопка в меню відділу.
 *
 * Текст редагується в адмінці (`static_pages`, slug `postgraduate-ukrainian-students`);
 * `app/content/pages/postgraduate-ukrainian-students.uk.json` — перша версія й запасний варіант.
 * Статичний маршрут має пріоритет над `[unit].vue`, тож адреса не конфліктує з підрозділами.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

const unit = findStructureUnit('postgraduate')
const unitName = computed(() => (unit ? localized(unit, 'name') : ''))
const title = computed(() => t('university.structure.postgraduateUkrainian.title'))

useHead({
  title: () => `${title.value} — ${unitName.value}`,
  meta: [{ name: 'description', content: () => title.value }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-navy py-14 sm:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          class="flex flex-wrap items-center gap-2 text-[12px] text-white/55 mb-5"
          :aria-label="t('university.structure.unit.breadcrumbHome')"
        >
          <NuxtLink
            :to="localePath('/university/structure')"
            class="text-white/55 no-underline hover:text-gold-light transition-colors"
          >
            {{ t('university.structure.backToStructure') }}
          </NuxtLink>
          <span aria-hidden>/</span>
          <NuxtLink
            :to="localePath('/university/structure/postgraduate/students')"
            class="text-white/55 no-underline hover:text-gold-light transition-colors"
          >
            {{ unitName }}
          </NuxtLink>
          <span aria-hidden>/</span>
          <span class="text-white/80">{{ title }}</span>
        </nav>
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ unitName }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ title }}
        </h1>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <SharedStaticPageBody slug="postgraduate-ukrainian-students" />
    </div>
  </div>
</template>
