<script setup lang="ts">
/**
 * Вхід у «Зимовий вступ» на першому екрані головної (вимога МОН: помітний банер/кнопка, перехід за 1 клік).
 *
 * Оформлено за гайдбуком кампанії («Зимовий вступ 2026_гайд.pdf»): логотипи МОН і «Зимовий вступ» одним
 * блоком зліва в цьому порядку, логотип ЗВО справа, фірмовий шрифт Kyiv Type Sans (Regular для тексту,
 * Black для заголовка), кольори #0045ff → #4cb4e7, акцент #d3da47. Файли — з пакета МОН, без змін
 * кольорів і пропорцій; лежать у `public/brand/winter-admission/`.
 */
const { t, localePath } = useSafeI18nWithRouter()

useHead({ link: [{ rel: 'stylesheet', href: '/brand/winter-admission/kyiv-type-sans.css' }] })
</script>

<template>
  <section
    class="bg-gradient-to-r from-[#0045ff] via-[#0045ff] to-[#4cb4e7]"
    :aria-label="t('sections.winterAdmission.tag')"
  >
    <div
      class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 text-center lg:text-left"
    >
      <div class="flex items-center gap-4 shrink-0">
        <img
          src="/brand/winter-admission/mon-logo-white.svg"
          alt="Міністерство освіти і науки України"
          class="h-6 w-auto"
          width="133"
          height="24"
        >
        <img
          src="/brand/winter-admission/zv-logo-white.png"
          alt="Зимовий вступ"
          class="h-11 w-auto"
          width="123"
          height="44"
        >
      </div>

      <div class="flex-1 min-w-0">
        <p class="zv-black text-lg sm:text-xl text-white leading-tight">
          {{ t('sections.winterAdmission.title') }}
        </p>
        <p class="zv-regular mt-1 text-[13px] sm:text-sm text-white/90">
          {{ t('sections.winterAdmission.subtitle') }}
        </p>
      </div>

      <div class="flex items-center gap-4 shrink-0">
        <NuxtLink
          :to="localePath('/admissions/winter-admission')"
          class="zv-black py-2.5 px-6 rounded-[10px] bg-[#d3da47] text-[#000] no-underline text-sm transition-all duration-280 hover:bg-white hover:-translate-y-0.5"
        >
          {{ t('sections.winterAdmission.cta') }} →
        </NuxtLink>
        <span class="hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white">
          <img src="/main_logo.png" :alt="t('logo.alt')" class="h-9 w-auto object-contain">
        </span>
      </div>
    </div>
  </section>
</template>
