<script setup lang="ts">
/**
 * Гуртожитки — одна сторінка на весь сайт.
 *
 * Було дві: ця (картки гуртожитків і кроки поселення) і /student/dormitories (перенесений зі
 * старого сайту текст). Клієнт попросив звести їх докупи — дизайн звідси, зміст звідти, — тож
 * стара адреса тепер редіректить сюди (див. `routeRules` у nuxt.config).
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.dormitories'),
  meta: [{ name: 'description', content: () => t('admissions.dormitories.subtitle') }],
})

/**
 * Фото гуртожитків — ті самі файли, що були в блоці «Наші гуртожитки» всередині перенесеного
 * тексту сторінки. Клієнт попросив показати їх у картках замість заглушок, а дубль у тексті
 * прибрати (правка 10.09), тож id лежать тут.
 */
const dormKeys = [
  { key: 'dorm1', photo: '40ddcf54-25a5-55b7-8e28-031707df943c' },
  { key: 'dorm2', photo: 'c98bd63a-bbac-51d2-848d-e75aa4b0c222' },
  { key: 'dorm3', photo: '9938fc3a-c7f9-5c40-bf98-28617d02d1b6' },
] as const

const steps = [
  { titleKey: 'step1Title' as const, textKey: 'step1Text' as const },
  { titleKey: 'step2Title' as const, textKey: 'step2Text' as const },
  { titleKey: 'step3Title' as const, textKey: 'step3Text' as const },
  { titleKey: 'step4Title' as const, textKey: 'step4Text' as const },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.dormitories.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.dormitories.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.dormitories.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('admissions.dormitories.intro') }}
      </p>
    </div>

    <!-- Dormitory cards -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('admissions.dormitories.cardsTitle') }}
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            v-for="dorm in dormKeys"
            :key="dorm.key"
            class="bg-white border border-border rounded-16 overflow-hidden flex flex-col"
          >
            <img
              :src="`/assets/${dorm.photo}`"
              :alt="t(`admissions.dormitories.${dorm.key}.name`)"
              loading="lazy"
              class="aspect-[4/3] w-full object-cover bg-navy-deep shrink-0"
            >
            <div class="p-6 flex flex-col gap-4 flex-1">
              <h3 class="font-playfair text-xl font-semibold text-navy">
                {{ t(`admissions.dormitories.${dorm.key}.name`) }}
              </h3>
              <p class="text-body-sm text-text-muted flex items-center gap-2">
                <span class="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                {{ t(`admissions.dormitories.${dorm.key}.address`) }}
              </p>
              <p class="text-body-sm text-navy font-medium">
                <a :href="`tel:${t(`admissions.dormitories.${dorm.key}.phone`).replace(/[^+\d]/g, '')}`" class="text-navy no-underline hover:text-gold">
                  {{ t(`admissions.dormitories.${dorm.key}.phone`) }}
                </a>
              </p>
              <p class="text-body-sm text-text-muted">
                {{ t(`admissions.dormitories.${dorm.key}.capacity`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Перенесений зі старого сайту текст: оголошення, адреси, умови поселення -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <SharedStaticPageBody slug="dormitories" />
    </div>

    <!-- Накази й інші документи: редактори додають їх у Directus -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('admissions.dormitories.documentsTitle') }}
      </h2>
      <SharedDocumentList section="dormitories" />
    </div>

    <!-- How to get a room: 4-step process -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-10">
        {{ t('admissions.dormitories.howToGetTitle') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(step, index) in steps"
          :key="step.titleKey"
          class="flex flex-col"
        >
          <div
            class="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold font-playfair text-xl font-bold shrink-0 mb-4"
          >
            {{ index + 1 }}
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`admissions.dormitories.${step.titleKey}`) }}
          </h3>
          <p class="text-body text-text-muted">
            {{ t(`admissions.dormitories.${step.textKey}`) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
