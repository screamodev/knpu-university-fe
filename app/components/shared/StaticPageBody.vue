<script setup lang="ts">
import { loadStaticPage } from '~/utils/staticPages'

/** Body of a standalone prose page migrated from the old site. */
const props = defineProps<{ slug: string }>()

const { t, locale } = useSafeI18nWithRouter()

const { data } = await useAsyncData(
  () => `static-page-${props.slug}-${locale.value}`,
  () => loadStaticPage(props.slug, locale.value),
  { watch: [() => props.slug, locale] },
)

const content = computed(() => data.value?.content ?? null)
const sections = computed(() => content.value?.sections ?? [])
const links = computed(() => content.value?.links ?? [])

/** Same fallback as the structure pages: the old site was Ukrainian-only. */
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
