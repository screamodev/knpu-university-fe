<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
</script>

<template>
  <NuxtLink :to="localePath('/')" class="flex items-center gap-3.5 shrink-0 no-underline">
    <img src="/main_logo.png" :alt="t('logo.alt')" class="h-14 w-auto max-w-none object-contain" onerror="this.style.display='none'">
    <div class="leading-[1.15]">
      <div class="font-playfair text-logo-abbr font-bold text-navy tracking-tight">{{ t('logo.abbr') }}</div>
      <div class="text-logo-name text-text-muted font-normal max-w-[200px] leading-snug">{{ t('logo.name') }}</div>
    </div>
  </NuxtLink>
</template>
