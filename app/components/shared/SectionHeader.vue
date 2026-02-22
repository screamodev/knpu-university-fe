<script setup lang="ts">
defineProps<{
  tag: string
  title: string
}>()
</script>

<template>
  <div class="mb-12">
    <div class="text-[11px] font-semibold tracking-[0.12em] uppercase text-gold mb-2.5 flex items-center gap-2">
      <span class="w-7 h-0.5 bg-gold rounded-sm" />
      {{ tag }}
    </div>
    <h2 class="font-playfair text-[clamp(26px,3.5vw,40px)] font-bold text-navy leading-tight">
      {{ title }}
    </h2>
  </div>
</template>
