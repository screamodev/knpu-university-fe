<script setup lang="ts">
/**
 * Центр забезпечення якості освіти.
 *
 * The centre runs its own Joomla site (smc.hnpu.edu.ua) which is being folded into this one. The
 * client asked for the tab structure now and the content later («информацию брать пока рано»), so
 * every tab is a shell. The tab lives in the URL so a filled-in section can be linked to later.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const route = useRoute()
const router = useRouter()

const TAB_IDS = [
  'home',
  'news',
  'regulations',
  'documents',
  'students',
  'quality',
  'programmes',
  'accreditation',
] as const

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

    <!-- Tab body: empty until the centre supplies content -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-3">
        {{ t(`education.quality.tabs.${activeTab}`) }}
      </h2>
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('education.quality.contentPending') }}
      </p>
    </div>
  </div>
</template>
