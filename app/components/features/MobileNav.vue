<script setup lang="ts">
const { t, localePath, switchLocalePath } = useSafeI18nWithRouter()
const { isOpen, openIndex, close, toggleAccordion } = useMobileNav()
const { items } = useNavigation()
const router = useRouter()
const memorialLink = computed(() => items.find((i) => i.labelKey === 'nav.memorialPage'))
onMounted(() => {
  router.afterEach(() => close())
})

const mobileSections = computed(() => [
  {
    labelKey: 'nav.university',
    links: [
      { path: '/university/history', key: 'nav.links.history' },
      { path: '/university/rectorate', key: 'nav.links.rectorate' },
      { path: '/university/structure', key: 'nav.links.structure' },
      { path: '/university/public-info', key: 'nav.links.publicInfo' },
      { path: '/university/erasmus', key: 'nav.links.erasmus' },
    ],
  },
  {
    labelKey: 'nav.admissions',
    links: [
      { path: '/admissions/rules', key: 'nav.links.rules' },
      { path: '/admissions/specialties', key: 'nav.links.specialties' },
      { path: '/admissions/tuition', key: 'nav.links.tuition' },
      { path: '/admissions/open-days', key: 'nav.links.openDays' },
    ],
  },
  {
    labelKey: 'nav.education',
    links: [
      { path: '/education/faculties', key: 'nav.links.faculties' },
      { path: '/education/programs', key: 'nav.links.programs' },
      { path: '/student/schedule', key: 'nav.links.schedule' },
      { path: '/education/schedule', key: 'nav.links.processSchedule' },
    ],
  },
  {
    labelKey: 'nav.science',
    links: [
      { path: '/science/directions', key: 'nav.links.directions' },
      { path: '/science/journals', key: 'nav.links.journals' },
      { path: '/science/library', key: 'nav.links.library' },
    ],
  },
  {
    labelKey: 'nav.student',
    links: [
      { path: '/student/moodle', key: 'nav.links.moodle' },
      { path: '/student/dormitories', key: 'nav.links.dormitories' },
      { path: '/student/council', key: 'nav.links.studentCouncil' },
      { path: '/student/career', key: 'nav.links.career' },
    ],
  },
])
</script>

<template>
  <nav
    class="fixed inset-0 bg-navy-deep z-[1500] overflow-y-auto py-20 px-6 transition-transform duration-280 lg:hidden"
    :class="[
      isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none',
    ]"
    :aria-hidden="!isOpen"
  >
    <button
      type="button"
      class="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 bg-transparent text-white text-lg flex items-center justify-center"
      aria-label="Close"
      @click="close"
    >
      ✕
    </button>
    <ul class="list-none flex flex-col">
      <li
        v-for="(section, idx) in mobileSections"
        :key="idx"
        class="border-b border-white/8"
      >
        <button
          type="button"
          class="flex items-center justify-between w-full py-4 text-lg font-medium text-white bg-transparent border-none cursor-pointer font-geologica text-left"
          @click="toggleAccordion(idx)"
        >
          {{ t(section.labelKey) }}
          <span>{{ openIndex === idx ? '∧' : '›' }}</span>
        </button>
        <div
          v-show="openIndex === idx"
          class="py-2 pb-4 flex flex-col"
        >
          <NuxtLink
            v-for="link in section.links"
            :key="link.path"
            :to="localePath(link.path)"
            class="block py-2 text-sm text-white/65 no-underline hover:text-gold transition-colors duration-280"
            @click="close"
          >
            {{ t(link.key) }}
          </NuxtLink>
        </div>
      </li>
    </ul>
    <div class="mt-8 flex flex-col gap-3">
      <a
        v-if="memorialLink?.path"
        :href="memorialLink.path"
        target="_blank"
        rel="noopener noreferrer"
        class="block text-center py-3 text-white/80 no-underline border border-white/20 rounded-lg text-[14px] hover:border-gold hover:text-gold transition-colors duration-280"
        @click="close"
      >
        {{ t('nav.memorialPage') }}
      </a>
      <NuxtLink
        :to="localePath('/admissions/rules')"
        class="block text-center bg-gold text-navy-deep py-3.5 rounded-[10px] font-bold no-underline text-[15px]"
        @click="close"
      >
        {{ t('header.vstup2026') }}
      </NuxtLink>
      <div class="flex gap-2">
        <NuxtLink
          :to="switchLocalePath('uk')"
          class="flex-1 text-center py-3 bg-white/5 text-white/70 rounded-lg text-[13px] no-underline border border-white/10"
        >
          {{ t('utility.langUk') }}
        </NuxtLink>
        <NuxtLink
          :to="switchLocalePath('en')"
          class="flex-1 text-center py-3 bg-white/5 text-white/70 rounded-lg text-[13px] no-underline border border-white/10"
        >
          {{ t('utility.langEn') }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
