<script setup lang="ts">
/**
 * «Зимовий вступ» — набір на «нульовий курс» (Підготовче відділення «Відкритий шлях до вищої освіти»).
 *
 * МОН вимагає, щоб із головної сторінки був помітний вхід на сторінку закладу з деталями набору.
 * Текст сторінки надала С. Марцин (лист 23.11.2026) — він у `app/content/pages/winter-admission.uk.json`.
 *
 * Шапка — пробний варіант за гайдбуком кампанії («Зимовий вступ 2026_гайд.pdf»): градієнт #0045ff → #4cb4e7,
 * логотипи МОН і «Зимовий вступ» одним блоком зліва, логотип ЗВО справа, шрифт Kyiv Type Sans
 * (Black — заголовок, Regular — текст), акцент #d3da47. Файли — з пакета МОН, без змін.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('admissions.winter.title'),
  meta: [{ name: 'description', content: () => t('admissions.winter.subtitle') }],
  link: [{ rel: 'stylesheet', href: '/brand/winter-admission/kyiv-type-sans.css' }],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-br from-[#0045ff] via-[#0045ff] to-[#4cb4e7] py-10 md:py-14">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between gap-6">
          <div class="flex items-center gap-4 sm:gap-5">
            <img
              src="/brand/winter-admission/mon-logo-white.svg"
              alt="Міністерство освіти і науки України"
              class="h-6 sm:h-8 w-auto"
              width="178"
              height="32"
            >
            <img
              src="/brand/winter-admission/zv-logo-white.png"
              alt="Зимовий вступ"
              class="h-11 sm:h-14 w-auto"
              width="156"
              height="56"
            >
          </div>
          <span class="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-white">
            <img src="/main_logo.png" :alt="t('logo.alt')" class="h-9 sm:h-11 w-auto object-contain">
          </span>
        </div>

        <h1 class="zv-black mt-10 md:mt-14 text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.05] text-white">
          {{ t('admissions.winter.title') }}
        </h1>
        <p class="zv-regular mt-5 max-w-2xl text-base md:text-lg text-white/90">
          {{ t('admissions.winter.subtitle') }}
        </p>

        <div class="mt-7 flex flex-wrap gap-3">
          <span class="zv-black rounded-full bg-[#d3da47] px-5 py-2 text-sm text-black">
            {{ t('admissions.winter.applyDates') }}
          </span>
          <span class="zv-black rounded-full bg-white px-5 py-2 text-sm text-[#0045ff]">
            {{ t('admissions.winter.studyDates') }}
          </span>
        </div>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedStaticPageBody slug="winter-admission" />
    </div>
  </div>
</template>
