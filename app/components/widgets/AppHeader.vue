<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
const { open: openMobile } = useMobileNav()
</script>

<template>
  <header class="bg-white border-b border-border sticky top-0 z-[1000] shadow-header">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-6 lg:gap-10 h-[76px]">
      <FeaturesLogo />
      <nav class="flex-1 flex items-center justify-center max-lg:hidden min-w-0">
        <FeaturesNavList />
      </nav>
      <div class="flex items-center gap-3 shrink-0">
        <NuxtLink
          :to="localePath('/admissions/rules')"
          class="hidden lg:inline-flex bg-gold text-navy-deep border-none py-2.5 px-5 rounded-lg text-[13.5px] font-semibold no-underline font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
        >
          {{ t('header.vstup2026') }}
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
