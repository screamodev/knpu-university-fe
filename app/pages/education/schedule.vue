<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.processSchedule'),
  meta: [{ name: 'description', content: () => t('education.schedule.subtitle') }],
})

const semesterIds = ['s1', 's2'] as const
const periodKeys = ['p1', 'p2', 'p3', 'p4'] as const
const keyDateIds = ['k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.schedule.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.schedule.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.schedule.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('education.schedule.intro') }}
      </p>

      <!-- Semester timeline: 2 side-by-side cards -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('education.schedule.semestersTitle') }}
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        <div
          v-for="semId in semesterIds"
          :key="semId"
          class="bg-off-white border border-border rounded-16 p-6 lg:p-8"
        >
          <h3 class="font-playfair text-lg font-semibold text-navy mb-1">
            {{ semId === 's1' ? t('education.schedule.semester1') : t('education.schedule.semester2') }}
          </h3>
          <p class="text-body-sm text-gold font-medium mb-6">
            {{ t(`education.schedule.semesters.${semId}.dateRange`) }}
          </p>
          <ul class="space-y-4">
            <li
              v-for="periodKey in periodKeys"
              :key="periodKey"
              class="flex gap-3 items-start"
            >
              <span
                class="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5"
                aria-hidden
              />
              <div>
                <p class="font-medium text-navy text-body-sm">
                  {{ t(`education.schedule.semesters.${semId}.periods.${periodKey}.name`) }}
                </p>
                <p class="text-body-sm text-text-muted">
                  {{ t(`education.schedule.semesters.${semId}.periods.${periodKey}.range`) }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Key dates table -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('education.schedule.keyDatesTitle') }}
      </h2>
      <div class="border border-border rounded-12 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-border">
              <th class="py-3 px-4 font-semibold text-navy text-body-sm">
                {{ t('education.schedule.tableEvent') }}
              </th>
              <th class="py-3 px-4 font-semibold text-navy text-body-sm">
                {{ t('education.schedule.tableDate') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(keyId, index) in keyDateIds"
              :key="keyId"
              class="border-b border-border last:border-b-0"
              :class="index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'"
            >
              <td class="py-3 px-4 text-body-sm text-navy">
                {{ t(`education.schedule.keyDates.${keyId}.event`) }}
              </td>
              <td class="py-3 px-4 text-body-sm text-text-muted">
                {{ t(`education.schedule.keyDates.${keyId}.date`) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
