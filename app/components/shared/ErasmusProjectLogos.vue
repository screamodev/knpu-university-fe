<script setup lang="ts">
/**
 * Пара лого над текстом проєкту Еразмус+: спершу «Co-funded by the European Union», далі — лого
 * самого проєкту.
 *
 * Правила видимості програми вимагають, щоб емблема ЄС стояла на початку сторінки, а не десь у
 * кінці, тож лого живуть тут, а не в тілі перенесеної сторінки: там два зображення в одному
 * абзаці перетворюються на карусель.
 */
defineProps<{
  /** Файл лого проєкту у `public/images/static/erasmus/`. */
  projectLogo: string
  projectAlt: string
}>()
</script>

<template>
  <div class="mb-10 flex flex-wrap items-center gap-6 sm:gap-10">
    <img
      src="/images/static/erasmus/co-funded-eu.jpg"
      alt="Co-funded by the European Union"
      class="h-14 sm:h-16 w-auto"
    >
    <img
      :src="`/images/static/erasmus/${projectLogo}`"
      :alt="projectAlt"
      class="h-14 sm:h-16 w-auto"
    >
  </div>
</template>
