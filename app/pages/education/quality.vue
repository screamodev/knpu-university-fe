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
  'regulations',
  'students',
  'quality',
  'accreditation',
] as const

/** Articles the centre publishes; migrated from the accordion «Новини» page of its old site. */
const NEWS_CATEGORY = 'tsentr-zabezpechennya-yakosti'

/** Академічна доброчесність runs on its own Google Site. */
const ACADEMIC_INTEGRITY_EXTERNAL_URL = 'https://sites.google.com/hnpu.edu.ua/akdob'

/**
 * «Нормативна база» is now four destinations and nothing else — the client moved the документи
 * here and struck the rest off. Two of them are Drive folders that stay access-restricted on
 * purpose.
 */
const REGULATION_LINKS = [
  { key: 'regulationsPolicies', path: '/university/regulations', external: false },
  { key: 'regulationsOrders', path: '/university/orders', external: false },
  {
    key: 'regulationsDirectives',
    path: 'https://drive.google.com/drive/folders/1zEXQc01CP-RNsw11fTkFtGcnW-x4_IU-?usp=drive_link',
    external: true,
  },
  {
    key: 'regulationsTemplates',
    path: 'https://drive.google.com/drive/folders/1Qn3NQnXw4VOyt4AZCYzl9hAOnL5rZ7Fg',
    external: true,
  },
] as const

type QualityTabId = (typeof TAB_IDS)[number]

const activeTab = computed<QualityTabId>(() => {
  const raw = Array.isArray(route.query.tab) ? route.query.tab[0] : route.query.tab
  return TAB_IDS.includes(raw as QualityTabId) ? (raw as QualityTabId) : 'home'
})

function selectTab(tab: QualityTabId) {
  router.push({ query: tab === 'home' ? {} : { tab } })
}

/**
 * Вкладки «Освітні програми» більше немає: Центр якості попросив звести її до спільного
 * переліку ОП (правка 10.09). Стара адреса ходить у розсилках і закладках, тож ведемо її туди,
 * куди клієнт просив, замість того щоб мовчки показувати «Головну».
 */
if (route.query.tab === 'programmes') {
  await navigateTo(localePath('/education/programs'), { redirectCode: 301 })
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
    <!-- Під шапкою: вона теж липка й має висоту 76px. -->
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

      <!-- Нормативна база: the four destinations the client left on this tab -->
      <template v-else-if="activeTab === 'regulations'">
        <p class="text-body text-text-muted max-w-3xl mb-8">
          {{ t('education.quality.regulationsIntro') }}
        </p>
        <!--
          Дві окремі гілки, а не <component :is>: динамічний `is` із NuxtLink лишав внутрішні
          кнопки без href, і вони не відкривались.
        -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <template v-for="link in REGULATION_LINKS" :key="link.key">
            <a
              v-if="link.external"
              :href="link.path"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
            >
              <span class="flex-1 font-playfair text-lg font-semibold text-navy">
                {{ t(`education.quality.${link.key}`) }}
              </span>
              <svg class="w-4 h-4 text-text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
                <path d="M7 17L17 7M17 7H8m9 0v9" />
              </svg>
            </a>
            <NuxtLink
              v-else
              :to="localePath(link.path)"
              class="flex items-center gap-3 rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
            >
              <span class="flex-1 font-playfair text-lg font-semibold text-navy">
                {{ t(`education.quality.${link.key}`) }}
              </span>
              <svg class="w-4 h-4 text-text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </template>
        </div>
        <div class="mt-8">
          <SharedDocumentList section="quality-centre" />
        </div>
      </template>

      <!--
        Здобувачу: the four subsections the client left — дисципліни вільного вибору by рівень,
        рейтинг успішності, графік освітнього процесу and «Першокурснику», the last two as buttons.
      -->
      <template v-else-if="activeTab === 'students'">
        <p class="text-body text-text-muted max-w-3xl mb-8">
          {{ t('education.quality.studentsIntro') }}
        </p>

        <h3 class="font-playfair text-xl font-bold text-navy mb-4">
          {{ t('education.quality.freeChoiceTitle') }}
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NuxtLink
            v-for="level in ['bachelor', 'master', 'phd']"
            :key="level"
            :to="localePath(`/education/free-choice/${level}`)"
            class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
          >
            <span class="block font-playfair text-lg font-semibold text-navy">
              {{ t(`education.freeChoice.${level}Title`) }}
            </span>
          </NuxtLink>
        </div>

        <!-- Рейтинг живе на власній сторінці: тут лише вхід до неї. -->
        <div class="mt-12">
          <NuxtLink
            :to="localePath('/education/student-rating')"
            class="flex items-center gap-3 rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
          >
            <span class="flex-1">
              <span class="block font-playfair text-lg font-semibold text-navy">
                {{ t('education.quality.ratingTitle') }}
              </span>
              <span class="mt-1 block text-[13px] text-text-muted">
                {{ t('education.quality.ratingCta') }}
              </span>
            </span>
            <svg class="w-4 h-4 text-text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- «На допомогу першокурснику» клієнт попросив зняти (правка 10.09): сторінку
             видалено, її текст лишається розділом вкладки «Здобувачу». -->
        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NuxtLink
            :to="localePath('/education/schedule')"
            class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
          >
            <span class="block font-playfair text-lg font-semibold text-navy">
              {{ t('nav.links.processSchedule') }}
            </span>
          </NuxtLink>
        </div>
      </template>

      <!-- Якість освіти: моніторинг веде окрема сторінка -->
      <template v-else-if="activeTab === 'quality'">
        <p class="text-body text-text-muted max-w-3xl mb-8">
          {{ t('education.quality.qualityIntro') }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NuxtLink
            v-for="link in [
              { path: '/education/monitoring', key: 'nav.links.monitoring' },
              { path: '/university/mission', key: 'nav.links.mission' },
            ]"
            :key="link.path"
            :to="localePath(link.path)"
            class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
          >
            <span class="block font-playfair text-lg font-semibold text-navy">{{ t(link.key) }}</span>
          </NuxtLink>
          <a
            :href="ACADEMIC_INTEGRITY_EXTERNAL_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-16 border border-border p-6 no-underline hover:border-gold transition-colors"
          >
            <span class="block font-playfair text-lg font-semibold text-navy">
              {{ t('nav.links.integrity') }}
            </span>
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
        </div>
        <div class="mt-10">
          <SharedStaticPageBody slug="quality-centre-quality" />
        </div>
      </template>

      <!-- Акредитаційні справи -->
      <template v-else>
        <p class="text-body text-text-muted max-w-3xl mb-8">
          {{ t('education.quality.accreditationIntro') }}
        </p>

        <!--
          Перенесений зі старого сайту список акредитацій показував ті самі роки, що й
          акредитаційні справи нижче, тільки без вмісту — клієнт просив лишити один, «нижній».
        -->
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
