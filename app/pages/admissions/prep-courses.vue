<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.prepCourses'),
  meta: [{ name: 'description', content: () => t('admissions.prepCourses.subtitle') }],
})

const courseKeys = ['course1', 'course2', 'course3', 'course4'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('admissions.prepCourses.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admissions.prepCourses.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('admissions.prepCourses.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro: 2-col text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <p class="text-body text-text-muted max-w-xl">
          {{ t('admissions.prepCourses.intro') }}
        </p>
        <div
          class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] flex items-center justify-center shrink-0"
        >
          <svg
            class="w-16 h-16 text-gold/20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Course cards 2x2 -->
    <div class="bg-off-white border-t border-border py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('admissions.prepCourses.coursesTitle') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            v-for="key in courseKeys"
            :key="key"
            class="bg-white border border-border rounded-16 p-6 flex flex-col"
          >
            <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center text-gold shrink-0 mb-4">
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3 class="font-playfair text-lg font-semibold text-navy mb-3">
              {{ t(`admissions.prepCourses.${key}.name`) }}
            </h3>
            <p class="text-body-sm text-text-muted mb-1">
              {{ t(`admissions.prepCourses.${key}.duration`) }}
            </p>
            <p class="text-body-sm text-text-muted mb-1">
              {{ t(`admissions.prepCourses.${key}.schedule`) }}
            </p>
            <p class="text-body-sm font-medium text-gold mt-auto pt-3">
              {{ t(`admissions.prepCourses.${key}.price`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA banner: sign up -->
    <div class="bg-gradient-to-br from-navy-mid to-navy-deep py-14">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div>
          <h2 class="font-playfair text-3xl text-white font-bold leading-tight mb-2">
            {{ t('admissions.prepCourses.ctaTitle') }}
          </h2>
          <p class="text-[15px] text-white/60">
            {{ t('admissions.prepCourses.ctaSubtitle') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/contacts')"
          class="shrink-0 py-3.5 px-9 bg-gold text-navy-deep no-underline rounded-[10px] font-bold text-sm font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold"
        >
          {{ t('admissions.prepCourses.ctaButton') }} →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
