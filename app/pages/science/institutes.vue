<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.institutes'),
  meta: [{ name: 'description', content: () => t('science.institutes.subtitle') }],
})

const instituteIds = ['i1', 'i2', 'i3', 'i4'] as const

const instituteFocusKeys: Record<(typeof instituteIds)[number], readonly string[]> = {
  i1: ['f1', 'f2', 'f3'],
  i2: ['f4', 'f5', 'f6'],
  i3: ['f7', 'f8', 'f9'],
  i4: ['f10', 'f11', 'f12'],
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('science.institutes.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.institutes.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.institutes.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro + alternating institute cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <p class="text-body text-text-muted max-w-3xl mb-14">
        {{ t('science.institutes.intro') }}
      </p>

      <div
        v-for="(id, index) in instituteIds"
        :key="id"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10 first:pt-0 last:pb-0"
        :class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''"
      >
        <!-- Image block -->
        <div
          class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] lg:aspect-[3/4] flex items-center justify-center"
          :class="index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'"
        >
          <div
            class="repeating-diagonal-pattern w-full h-full flex items-center justify-center opacity-30"
            aria-hidden
          />
        </div>

        <!-- Text block -->
        <div class="flex flex-col gap-4" :class="index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'">
          <h2 class="font-playfair text-2xl font-bold text-navy">
            {{ t(`science.institutes.items.${id}.name`) }}
          </h2>
          <p class="text-body text-text-muted">
            {{ t(`science.institutes.items.${id}.description`) }}
          </p>
          <ul class="list-none space-y-2 mt-2">
            <li
              v-for="focusKey in instituteFocusKeys[id]"
              :key="focusKey"
              class="flex items-start gap-2 text-body-sm text-text-muted"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" aria-hidden />
              <span>{{ t(`science.institutes.focusLabels.${focusKey}`) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.repeating-diagonal-pattern {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(201, 162, 39, 0.06) 0,
    rgba(201, 162, 39, 0.06) 1px,
    transparent 1px,
    transparent 24px
  );
}
</style>
