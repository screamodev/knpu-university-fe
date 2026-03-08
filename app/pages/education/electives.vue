<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.electives'),
  meta: [{ name: 'description', content: () => t('education.electives.subtitle') }],
})

const categoryIds = ['humanities', 'sciences', 'professional', 'languages'] as const

const categoryCourseIds: Record<(typeof categoryIds)[number], readonly string[]> = {
  humanities: ['h1', 'h2', 'h3'],
  sciences: ['s1', 's2', 's3'],
  professional: ['p1', 'p2', 'p3'],
  languages: ['l1', 'l2', 'l3'],
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.electives.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.electives.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.electives.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('education.electives.intro') }}
      </p>
    </div>

    <!-- Category sections -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <section
          v-for="catId in categoryIds"
          :key="catId"
        >
          <h2 class="font-playfair text-xl font-bold text-navy mb-6">
            {{ t(`education.electives.categories.${catId}.heading`) }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              v-for="courseId in categoryCourseIds[catId]"
              :key="courseId"
              class="bg-white border border-border rounded-12 p-5"
            >
              <h3 class="font-playfair text-base font-semibold text-navy mb-2">
                {{ t(`education.electives.categories.${catId}.courses.${courseId}.name`) }}
              </h3>
              <p class="text-body-sm text-text-muted mb-2">
                {{ t('education.electives.creditsLabel') }}: {{ t(`education.electives.categories.${catId}.courses.${courseId}.credits`) }},
                {{ t('education.electives.semesterLabel') }}: {{ t(`education.electives.categories.${catId}.courses.${courseId}.semester`) }}
              </p>
              <p class="text-body-sm text-text-muted">
                {{ t(`education.electives.categories.${catId}.courses.${courseId}.description`) }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
