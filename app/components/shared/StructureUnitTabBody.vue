<script setup lang="ts">
import { loadStructureTabContent, type StructureTabId } from '~/utils/structureContent'

/** Migrated legacy content for one tab of one unit. */
const props = defineProps<{
  slug: string
  tab: StructureTabId
}>()

const { t, locale } = useSafeI18nWithRouter()

const { data } = await useAsyncData(
  () => `structure-content-${props.slug}-${props.tab}-${locale.value}`,
  () => loadStructureTabContent(props.slug, props.tab, locale.value),
  { watch: [() => props.slug, () => props.tab, locale] },
)

const content = computed(() => data.value?.content ?? null)
const sections = computed(() => content.value?.sections ?? [])
const links = computed(() => content.value?.links ?? [])

/** The old site translated only the faculty landing pages, so English often falls back to uk. */
const showTranslationNotice = computed(() => locale.value !== 'uk' && data.value?.locale === 'uk')
</script>

<template>
  <div v-if="sections.length || links.length">
    <p
      v-if="showTranslationNotice"
      class="mb-6 px-4 py-3 rounded-12 bg-gold-pale/50 border border-gold/40 text-body-sm text-navy"
    >
      {{ t('university.structure.unit.translationPending') }}
    </p>

    <section v-for="(section, index) in sections" :key="index" :class="index > 0 ? 'mt-12' : ''">
      <h2 v-if="section.heading" class="font-playfair text-xl font-bold text-navy mb-4">
        {{ section.heading }}
      </h2>
      <NewsMarkdownBody :source="section.html" kind="html" />
    </section>

    <SharedStructureUnitLinkList :links="links" />
  </div>
</template>
