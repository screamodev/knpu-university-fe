<script setup lang="ts">
import { loadStaticPage } from '~/utils/staticPages'
import type { StructureTabSection } from '~/utils/structureContent'

/**
 * Body of a standalone prose page migrated from the old site.
 *
 * `from` / `to` cut a slice out of the page: the Центр забезпечення якості tabs were split into
 * per-level pages, and each of those shows the drop-downs of one stretch of the same source file
 * instead of duplicating the content into new files.
 */
const props = defineProps<{
  slug: string
  /** Heading (or its start) the slice begins at; the section itself is included. */
  from?: string
  /** Heading the slice stops before. Omit to run to the end of the page. */
  to?: string
  /** Hide the headings of the plain (non-collapsible) sections in the slice. */
  hideHeadings?: boolean
}>()

const { t, locale } = useSafeI18nWithRouter()

/**
 * The slice is applied inside the fetch, not in a computed: `quality-centre-students` is a 300 KB
 * file and a page that shows one stretch of it must not ship the rest to the browser.
 */
function sliceSections(sections: StructureTabSection[]): StructureTabSection[] {
  if (!props.from && !props.to) return sections
  const heading = (section: StructureTabSection) => (section.heading ?? '').trim()
  const start = props.from ? sections.findIndex(section => heading(section).startsWith(props.from!)) : 0
  if (start < 0) return []
  const rest = sections.slice(start)
  const stop = props.to
    ? rest.findIndex((section, index) => index > 0 && heading(section).startsWith(props.to!))
    : -1
  const slice = stop > 0 ? rest.slice(0, stop) : rest
  return props.hideHeadings
    ? slice.map(section => (section.collapsible ? section : { ...section, heading: null }))
    : slice
}

const { data } = await useAsyncData(
  () => `static-page-${props.slug}-${locale.value}-${props.from ?? ''}-${props.to ?? ''}`,
  async () => {
    const page = await loadStaticPage(props.slug, locale.value)
    if (!page?.content) return page
    return { ...page, content: { ...page.content, sections: sliceSections(page.content.sections ?? []) } }
  },
  { watch: [() => props.slug, () => props.from, () => props.to, locale] },
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

    <template v-for="(section, index) in sections" :key="index">
      <!-- Drop-down, as the old site had it: consecutive ones sit right under each other. -->
      <SharedAccordion
        v-if="section.collapsible"
        :title="section.heading ?? ''"
        :class="index > 0 ? 'mt-3' : ''"
      >
        <div class="pt-4">
          <NewsMarkdownBody v-if="section.html" :source="section.html" kind="html" />
          <SharedAccordion
            v-for="(child, childIndex) in section.children ?? []"
            :key="childIndex"
            :title="child.heading ?? ''"
            class="mt-4"
          >
            <div class="pt-4">
              <NewsMarkdownBody :source="child.html" kind="html" />
            </div>
          </SharedAccordion>
        </div>
      </SharedAccordion>

      <section v-else :class="index > 0 ? 'mt-12' : ''">
        <h2 v-if="section.heading" class="font-playfair text-xl font-bold text-navy mb-4">
          {{ section.heading }}
        </h2>
        <NewsMarkdownBody v-if="section.html" :source="section.html" kind="html" />
      </section>
    </template>

    <SharedStructureUnitLinkList :links="links" />
  </div>
</template>
