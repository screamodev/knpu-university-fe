<script setup lang="ts">
const { t } = useSafeI18nWithRouter()

const facts = [
  { num: '1804', key: 'facts.founded' },
  { num: '8 000+', key: 'facts.students' },
  { num: '700+', key: 'facts.staff' },
  { num: '95+', key: 'facts.specialties' },
]
</script>

<template>
  <div class="bg-navy py-16">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-16 overflow-hidden">
      <div
        v-for="(fact, i) in facts"
        :key="fact.key"
        class="bg-navy py-6 px-4 sm:py-9 sm:px-8 text-center transition-colors duration-280 hover:bg-navy-mid"
        :class="{ 'rounded-l-[12px]': i === 0, 'rounded-r-[12px]': i === facts.length - 1 }"
      >
        <div class="font-playfair text-4xl md:text-5xl font-bold text-gold leading-none mb-2">{{ fact.num }}</div>
        <div class="text-[13px] text-white/60 leading-snug">{{ t(fact.key) }}</div>
      </div>
    </div>
  </div>
</template>
