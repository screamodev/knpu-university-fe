<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
const { open: openSearch } = useSearch()
const { open: openMobile } = useMobileNav()
</script>

<template>
  <header class="bg-white border-b border-border sticky top-0 z-[1000] shadow-header">
    <div class="max-w-container mx-auto px-8 flex items-center gap-10 h-[76px]">
      <FeaturesLogo />
      <nav class="flex-1 flex items-center justify-center max-lg:hidden">
        <FeaturesNavList />
      </nav>
      <div class="flex items-center gap-3 shrink-0">
        <button
          type="button"
          class="w-[38px] h-[38px] border-[1.5px] border-border rounded-lg bg-transparent cursor-pointer flex items-center justify-center text-navy hover:border-gold hover:text-gold hover:bg-gold-pale transition-all duration-280"
          :aria-label="t('header.searchAria')"
          @click="openSearch"
        >
          <svg class="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <NuxtLink
          :to="localePath('/admissions/rules')"
          class="hidden lg:inline-flex bg-gold text-navy-deep border-none py-2.5 px-5 rounded-lg text-[13.5px] font-semibold no-underline font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
        >
          {{ t('header.vstup2025') }}
        </NuxtLink>
        <button
          type="button"
          class="lg:hidden flex flex-col gap-1.5 cursor-pointer border-none bg-transparent p-1"
          :aria-label="t('header.menuAria')"
          @click="openMobile"
        >
          <span class="block w-6 h-0.5 bg-navy rounded-sm" />
          <span class="block w-6 h-0.5 bg-navy rounded-sm" />
          <span class="block w-6 h-0.5 bg-navy rounded-sm" />
        </button>
      </div>
    </div>
  </header>
</template>
