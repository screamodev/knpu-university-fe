<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.budget'),
  meta: [{ name: 'description', content: () => t('admissions.budget.subtitle') }],
})

const bachelorRowIds = ['s1', 's2', 's3', 's4', 's5'] as const
const masterRowIds = ['s1', 's2', 's3'] as const
const graduateRowIds = ['s1', 's2'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.budget.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.budget.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.budget.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <p class="max-w-3xl text-body text-text-muted">
        {{ t('admissions.budget.intro') }}
      </p>
    </div>

    <!-- Stats band: 3 gold numbers -->
    <div class="bg-off-white border-y border-border py-12 lg:py-14">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          <div class="text-center">
            <p class="font-playfair text-4xl md:text-5xl font-bold text-gold">
              650
            </p>
            <p class="mt-2 text-body-sm font-medium text-text-muted">
              {{ t('admissions.budget.statsTotalPlaces') }}
            </p>
          </div>
          <div class="text-center">
            <p class="font-playfair text-4xl md:text-5xl font-bold text-gold">
              24
            </p>
            <p class="mt-2 text-body-sm font-medium text-text-muted">
              {{ t('admissions.budget.statsSpecialties') }}
            </p>
          </div>
          <div class="text-center">
            <p class="font-playfair text-4xl md:text-5xl font-bold text-gold">
              12
            </p>
            <p class="mt-2 text-body-sm font-medium text-text-muted">
              {{ t('admissions.budget.statsFaculties') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Breakdown by level: Bachelor / Master / Graduate tables -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-10">
        {{ t('admissions.budget.breakdownTitle') }}
      </h2>

      <div class="space-y-12">
        <!-- Bachelor -->
        <section>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-4">
            {{ t('admissions.budget.levelBachelor') }}
          </h3>
          <div class="overflow-hidden rounded-12 border border-border">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-off-white border-b border-border">
                  <th class="px-4 py-3 text-body-sm font-semibold text-text-muted">
                    {{ t('admissions.budget.tableSpecialty') }}
                  </th>
                  <th class="px-4 py-3 text-body-sm font-semibold text-text-muted w-24 text-right">
                    {{ t('admissions.budget.tablePlaces') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(id, index) in bachelorRowIds"
                  :key="id"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50'"
                  class="border-b border-border last:border-b-0"
                >
                  <td class="px-4 py-3 font-medium text-navy">
                    {{ t(`admissions.budget.bachelorRows.${id}.name`) }}
                  </td>
                  <td class="px-4 py-3 text-body-sm text-text-muted text-right">
                    {{ t(`admissions.budget.bachelorRows.${id}.places`) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Master -->
        <section>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-4">
            {{ t('admissions.budget.levelMaster') }}
          </h3>
          <div class="overflow-hidden rounded-12 border border-border">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-off-white border-b border-border">
                  <th class="px-4 py-3 text-body-sm font-semibold text-text-muted">
                    {{ t('admissions.budget.tableSpecialty') }}
                  </th>
                  <th class="px-4 py-3 text-body-sm font-semibold text-text-muted w-24 text-right">
                    {{ t('admissions.budget.tablePlaces') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(id, index) in masterRowIds"
                  :key="id"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50'"
                  class="border-b border-border last:border-b-0"
                >
                  <td class="px-4 py-3 font-medium text-navy">
                    {{ t(`admissions.budget.masterRows.${id}.name`) }}
                  </td>
                  <td class="px-4 py-3 text-body-sm text-text-muted text-right">
                    {{ t(`admissions.budget.masterRows.${id}.places`) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Graduate -->
        <section>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-4">
            {{ t('admissions.budget.levelGraduate') }}
          </h3>
          <div class="overflow-hidden rounded-12 border border-border">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-off-white border-b border-border">
                  <th class="px-4 py-3 text-body-sm font-semibold text-text-muted">
                    {{ t('admissions.budget.tableSpecialty') }}
                  </th>
                  <th class="px-4 py-3 text-body-sm font-semibold text-text-muted w-24 text-right">
                    {{ t('admissions.budget.tablePlaces') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(id, index) in graduateRowIds"
                  :key="id"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50'"
                  class="border-b border-border last:border-b-0"
                >
                  <td class="px-4 py-3 font-medium text-navy">
                    {{ t(`admissions.budget.graduateRows.${id}.name`) }}
                  </td>
                  <td class="px-4 py-3 text-body-sm text-text-muted text-right">
                    {{ t(`admissions.budget.graduateRows.${id}.places`) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
