<script setup lang="ts">
import { ERASMUS_PROJECTS } from '~/utils/erasmusProjects'
import { findSciencePage } from '~/utils/sciencePages'

/**
 * Грантова і проєктна діяльність — три розділи (правка 05.11, лист С. Сєрякова щодо HARMONY):
 * «Актуальні грантові пропозиції», «Проєкти за участі університету» і «Новини».
 *
 * Перший і третій — дві секції `science-grants` (JSON або рядок Directus `static_pages`), поділені
 * за заголовками. «Проєкти» мають власні вкладки; матеріалів до всіх, крім Еразмус+ (КА2),
 * університет ще не надав, тож там стандартна заглушка.
 *
 * Статична сторінка має пріоритет над `[slug].vue`.
 */
definePageMeta({ layout: 'default' })

const { t, locale, localePath } = useSafeI18nWithRouter()
const route = useRoute()
const router = useRouter()

const page = findSciencePage('grants')!
const title = computed(() => (locale.value === 'en' ? page.title.en : page.title.uk))

const TAB_IDS = ['offers', 'projects', 'news'] as const
const PROJECT_IDS = ['ka2', 'jeanMonnet', 'horizon', 'ucf', 'unicef', 'mon', 'other'] as const

type TabId = (typeof TAB_IDS)[number]
type ProjectId = (typeof PROJECT_IDS)[number]

function queryValue(name: string): string | undefined {
  const raw = route.query[name]
  return (Array.isArray(raw) ? raw[0] : raw) ?? undefined
}

const activeTab = computed<TabId>(() => {
  const raw = queryValue('tab')
  return TAB_IDS.includes(raw as TabId) ? (raw as TabId) : 'offers'
})

const activeProject = computed<ProjectId>(() => {
  const raw = queryValue('project')
  return PROJECT_IDS.includes(raw as ProjectId) ? (raw as ProjectId) : 'ka2'
})

function selectTab(tab: TabId) {
  router.push({ query: tab === 'offers' ? {} : { tab } })
}

function selectProject(project: ProjectId) {
  router.push({ query: project === 'ka2' ? { tab: 'projects' } : { tab: 'projects', project } })
}

useHead({
  title: () => title.value,
  meta: [{ name: 'description', content: () => title.value }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink
          :to="localePath('/science/activity')"
          class="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3 no-underline hover:text-gold-light"
        >
          {{ t('nav.links.scienceDepartment') }}
        </NuxtLink>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ title }}
        </h1>
      </div>
    </div>

    <!-- Tabs: під шапкою, яка теж липка й має висоту 76px. -->
    <div class="border-b border-border bg-white sticky top-[76px] z-10">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-2 overflow-x-auto">
        <button
          v-for="tab in TAB_IDS"
          :key="tab"
          type="button"
          :aria-current="tab === activeTab ? 'page' : undefined"
          class="shrink-0 py-2 px-4 rounded-100 border text-[13px] font-medium transition-all duration-280"
          :class="
            tab === activeTab
              ? 'bg-navy border-navy text-white'
              : 'bg-white border-border text-navy hover:border-gold'
          "
          @click="selectTab(tab)"
        >
          {{ t(`science.grants.tabs.${tab}`) }}
        </button>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t(`science.grants.tabs.${activeTab}`) }}
      </h2>

      <!-- Загальна інформація про грантові програми -->
      <SharedStaticPageBody
        v-if="activeTab === 'offers'"
        slug="science-grants"
        from="Актуальні"
        to="Новини"
        hide-headings
      />

      <!-- Проєкти за участі університету: вкладки за програмами -->
      <template v-else-if="activeTab === 'projects'">
        <div class="flex flex-wrap gap-2 mb-8">
          <button
            v-for="project in PROJECT_IDS"
            :key="project"
            type="button"
            :aria-current="project === activeProject ? 'true' : undefined"
            class="py-2 px-4 rounded-100 border text-[13px] font-medium text-left transition-all duration-280"
            :class="
              project === activeProject
                ? 'bg-navy border-navy text-white'
                : 'bg-white border-border text-navy hover:border-gold'
            "
            @click="selectProject(project)"
          >
            {{ t(`science.grants.projects.${project}`) }}
          </button>
        </div>

        <h3 class="font-playfair text-xl font-bold text-navy mb-4">
          {{ t(`science.grants.projects.${activeProject}`) }}
        </h3>

        <SharedLinkTileGrid v-if="activeProject === 'ka2'" :tiles="ERASMUS_PROJECTS" />
        <SharedSectionPending v-else />
      </template>

      <!-- Події та оголошення, перенесені з головної сторінки розділу -->
      <SharedStaticPageBody
        v-else
        slug="science-grants"
        from="Новини"
        hide-headings
      />
    </div>
  </div>
</template>
