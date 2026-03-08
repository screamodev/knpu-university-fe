<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.distance'),
  meta: [{ name: 'description', content: () => t('education.distance.subtitle') }],
})

const differenceIds = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'] as const
const scheduleRowIds = ['row1', 'row2', 'row3'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.distance.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.distance.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.distance.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro (2-col: text + placeholder) + key differences + schedule -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <p class="text-body text-text-muted">
          {{ t('education.distance.intro') }}
        </p>
        <div
          class="rounded-16 bg-gradient-to-br from-navy-mid/20 to-gold/10 aspect-[4/3] max-h-64 lg:max-h-none"
          aria-hidden
        />
      </div>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.distance.differencesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        <article
          v-for="id in differenceIds"
          :key="id"
          class="bg-off-white border border-border rounded-12 p-5 flex gap-4 items-start"
        >
          <span
            class="w-10 h-10 shrink-0 rounded-full bg-gold/15 flex items-center justify-center"
            aria-hidden
          >
            <span class="w-2 h-2 rounded-full bg-gold" />
          </span>
          <div>
            <h3 class="font-playfair text-base font-semibold text-navy mb-1">
              {{ t(`education.distance.differences.${id}.title`) }}
            </h3>
            <p class="text-body-sm text-text-muted">
              {{ t(`education.distance.differences.${id}.text`) }}
            </p>
          </div>
        </article>
      </div>

      <!-- Schedule section -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('education.distance.scheduleTitle') }}
      </h2>
      <div class="border border-border rounded-12 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-border">
              <th class="py-3 px-4 font-semibold text-navy text-body-sm">
                {{ t('education.schedule.tableEvent') }}
              </th>
              <th class="py-3 px-4 font-semibold text-navy text-body-sm">
                {{ t('education.distance.scheduleSession1') }}
              </th>
              <th class="py-3 px-4 font-semibold text-navy text-body-sm">
                {{ t('education.distance.scheduleSession2') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(rowId, index) in scheduleRowIds"
              :key="rowId"
              class="border-b border-border last:border-b-0"
              :class="index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'"
            >
              <td class="py-3 px-4 text-body-sm text-navy">
                {{ t(`education.distance.scheduleRows.${rowId}.activity`) }}
              </td>
              <td class="py-3 px-4 text-body-sm text-text-muted">
                {{ t(`education.distance.scheduleRows.${rowId}.s1`) }}
              </td>
              <td class="py-3 px-4 text-body-sm text-text-muted">
                {{ t(`education.distance.scheduleRows.${rowId}.s2`) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
