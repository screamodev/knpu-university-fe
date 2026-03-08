<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.nonformal'),
  meta: [{ name: 'description', content: () => t('student.nonformal.subtitle') }],
})

const programmeKeys = ['language', 'it', 'leadership', 'volunteering', 'softSkills', 'entrepreneurship'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.nonformal.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.nonformal.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.nonformal.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('student.nonformal.intro') }}
      </p>
    </div>

    <!-- Programme cards: 2x3 grid with gradient image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('student.nonformal.programmesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="key in programmeKeys"
          :key="key"
          class="bg-white border border-border rounded-16 overflow-hidden flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="aspect-[4/3] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
          >
            <svg
              class="w-12 h-12 text-gold/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
              {{ t(`student.nonformal.programmes.${key}.name`) }}
            </h3>
            <p class="text-body-sm text-text-muted mb-1">
              {{ t(`student.nonformal.programmes.${key}.duration`) }}
            </p>
            <p class="text-body-sm text-gold font-medium mb-3">
              {{ t(`student.nonformal.programmes.${key}.credits`) }}
            </p>
            <p class="text-body-sm text-text-muted mt-auto">
              {{ t(`student.nonformal.programmes.${key}.text`) }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <!-- Certification: bg-off-white + credit recognition + certificate placeholder -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('student.nonformal.certTitle') }}
        </h2>
        <p class="text-body text-text-muted max-w-3xl mb-10">
          {{ t('student.nonformal.certIntro') }}
        </p>
        <div
          class="rounded-16 overflow-hidden bg-white border border-border aspect-[4/3] max-w-2xl flex items-center justify-center"
        >
          <div class="text-center p-8">
            <svg
              class="w-20 h-20 text-gold/40 mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="text-body-sm text-text-muted">{{ t('student.nonformal.certPlaceholder') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
