<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { FileLinkItem } from '~/components/shared/FileLinkList.vue'
import type { DirectusAccreditationDossier } from '~/types/directus'

/**
 * Центр забезпечення якості освіти.
 *
 * The centre ran its own Joomla site (smc.hnpu.edu.ua); this page folds it in. Prose comes from
 * the migrated static content, documents from the `documents` collection, and the accreditation
 * dossiers from their own collection. «Новини» stays pending: the centre's news are still on the
 * old site and arrive with its database dump.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const { client } = useDirectus()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const TAB_IDS = [
  'home',
  'news',
  'documents',
  'regulations',
  'students',
  'quality',
  'programmes',
  'accreditation',
] as const

/** Articles the centre publishes; migrated from the accordion «Новини» page of its old site. */
const NEWS_CATEGORY = 'tsentr-zabezpechennya-yakosti'

type QualityTabId = (typeof TAB_IDS)[number]

const activeTab = computed<QualityTabId>(() => {
  const raw = Array.isArray(route.query.tab) ? route.query.tab[0] : route.query.tab
  return TAB_IDS.includes(raw as QualityTabId) ? (raw as QualityTabId) : 'home'
})

function selectTab(tab: QualityTabId) {
  router.push({ query: tab === 'home' ? {} : { tab } })
}

useHead({
  title: () => t('education.quality.title'),
  meta: [{ name: 'description', content: () => t('education.quality.subtitle') }],
})

const { data, pending } = await useAsyncData('accreditation-dossiers', () =>
  client.request(
    readItems('accreditation_dossiers', {
      fields: [
        'id',
        'academicYear',
        'level',
        'programmeTitle',
        'order',
        {
          files: [
            'id',
            'kind',
            'title',
            'externalUrl',
            'order',
            'status',
            { file: ['id', 'filename_download', 'filesize', 'type'] },
          ],
        },
      ],
      sort: ['order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const dossiers = computed<DirectusAccreditationDossier[]>(
  () => (data.value as DirectusAccreditationDossier[] | null) ?? [],
)

/** Навчальний рік → освітні програми, newest year first. */
const dossierYears = computed(() => {
  const years = [...new Set(dossiers.value.map(item => item.academicYear).filter(Boolean))] as string[]
  return years
    .sort((left, right) => right.localeCompare(left))
    .map(year => ({
      year,
      items: dossiers.value.filter(item => item.academicYear === year),
    }))
})

function dossierFiles(dossier: DirectusAccreditationDossier): FileLinkItem[] {
  return (dossier.files ?? [])
    .filter(entry => entry.status !== 'draft' && entry.status !== 'archived')
    .map(entry => ({
      id: entry.id,
      title: entry.title || t(`education.quality.dossierKinds.${entry.kind}`),
      file: entry.file,
      externalUrl: entry.externalUrl,
    }))
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.quality.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.quality.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.quality.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-border bg-white sticky top-0 z-10">
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
          {{ t(`education.quality.tabs.${tab}`) }}
        </button>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t(`education.quality.tabs.${activeTab}`) }}
      </h2>

      <!-- Про центр: опис, склад, положення -->
      <template v-if="activeTab === 'home'">
        <SharedStaticPageBody slug="quality-centre" />
      </template>

      <!-- Новини центру: перенесені з його сайту, далі публікуються в CMS -->
      <template v-else-if="activeTab === 'news'">
        <SharedStructureUnitNews :category-slug="NEWS_CATEGORY" :limit="9" />
      </template>

      <!-- Документи центру: на старому сайті цей розділ був закритий авторизацією -->
      <template v-else-if="activeTab === 'documents'">
        <SharedStaticPageBody slug="quality-centre-documents" />
      </template>

      <template v-else-if="activeTab === 'regulations'">
        <SharedStaticPageBody slug="quality-centre-regulations" />
        <div class="mt-8">
          <SharedDocumentList section="quality-centre" />
        </div>
      </template>

      <!-- Здобувачу: дисципліни вільного вибору веде центр, решта — на сторінках сайту -->
      <template v-else-if="activeTab === 'students'">
        <p class="text-body text-text-muted max-w-3xl mb-8">
          {{ t('education.quality.studentsIntro') }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="link in [
              { path: '/education/electives', key: 'nav.links.electives' },
              { path: '/education/schedule', key: 'nav.links.processSchedule' },
              { path: '/student/schedule', key: 'nav.links.schedule' },
            ]"
            :key="link.path"
            :to="localePath(link.path)"
            class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
          >
            <span class="block font-playfair text-lg font-semibold text-navy">{{ t(link.key) }}</span>
          </NuxtLink>
        </div>
        <div class="mt-10">
          <SharedStaticPageBody slug="quality-centre-students" />
        </div>
      </template>

      <!-- Якість освіти: моніторинг веде окрема сторінка -->
      <template v-else-if="activeTab === 'quality'">
        <p class="text-body text-text-muted max-w-3xl mb-8">
          {{ t('education.quality.qualityIntro') }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NuxtLink
            v-for="link in [
              { path: '/education/monitoring', key: 'nav.links.monitoring' },
              { path: '/university/integrity', key: 'nav.links.integrity' },
            ]"
            :key="link.path"
            :to="localePath(link.path)"
            class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
          >
            <span class="block font-playfair text-lg font-semibold text-navy">{{ t(link.key) }}</span>
          </NuxtLink>
        </div>
        <div class="mt-10">
          <SharedStaticPageBody slug="quality-centre-quality" />
        </div>
      </template>

      <!-- Гарантам освітніх програм -->
      <template v-else-if="activeTab === 'programmes'">
        <SharedStaticPageBody slug="quality-centre-programmes" />
        <div class="mt-8">
          <SharedDocumentList section="quality-centre-programmes" />
        </div>
      </template>

      <!-- Акредитаційні справи -->
      <template v-else>
        <p class="text-body text-text-muted max-w-3xl mb-8">
          {{ t('education.quality.accreditationIntro') }}
        </p>

        <div class="mb-10">
          <SharedStaticPageBody slug="quality-centre-accreditation" />
        </div>

        <div v-if="pending" class="space-y-3">
          <div v-for="i in 3" :key="i" class="animate-pulse h-14 rounded-12 border border-border bg-off-white" />
        </div>

        <div v-else-if="dossierYears.length" class="space-y-4">
          <SharedAccordion
            v-for="(entry, index) in dossierYears"
            :key="entry.year"
            :title="t('education.quality.dossierYear', { year: entry.year })"
            :hint="`${entry.items.length}`"
            :open="index === 0"
          >
            <div class="space-y-6 pt-4">
              <article
                v-for="dossier in entry.items"
                :key="dossier.id"
                class="border-l-4 border-gold pl-4 sm:pl-5"
              >
                <h3 class="font-medium text-navy mb-2">{{ dossier.programmeTitle }}</h3>
                <SharedFileLinkList :items="dossierFiles(dossier)" dense />
              </article>
            </div>
          </SharedAccordion>
        </div>

        <SharedSectionPending v-else />

        <NuxtLink
          :to="localePath('/education/accreditation')"
          class="inline-block mt-10 font-medium text-navy underline hover:text-gold"
        >
          {{ t('education.quality.certificatesLink') }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
