<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useSeoMeta({
  title: () => t('seo.feedback.title'),
  description: () => t('seo.feedback.description'),
})

function mailHref(messageKey: string): string {
  return `mailto:${t(messageKey).replace(/\{'@'\}/g, '@')}`
}

const utilityMail = computed(() => mailHref('utility.email'))
const utilityTel = computed(() => `tel:${t('utility.phone').replace(/\s/g, '')}`)
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('standalonePages.feedback.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('standalonePages.feedback.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('standalonePages.feedback.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <p class="text-body text-text-muted max-w-3xl mb-10">
        {{ t('standalonePages.feedback.intro') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <article class="bg-off-white border border-border rounded-16 p-6">
          <h2 class="font-playfair text-lg font-semibold text-navy mb-3">
            {{ t('standalonePages.feedback.cardGeneralTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted mb-4">{{ t('standalonePages.feedback.cardGeneralBody') }}</p>
          <a
            :href="utilityTel"
            class="block text-body-sm font-medium text-gold hover:text-gold-light no-underline"
          >
            {{ t('utility.phone') }}
          </a>
          <a :href="utilityMail" class="block text-body-sm font-medium text-gold hover:text-gold-light no-underline mt-2">
            {{ t('utility.email').replace(/\{'@'\}/g, '@') }}
          </a>
          <p class="text-body-sm text-text-muted mt-4">{{ t('utility.hours') }}</p>
        </article>

        <article class="bg-off-white border border-border rounded-16 p-6 flex flex-col">
          <h2 class="font-playfair text-lg font-semibold text-navy mb-3">
            {{ t('standalonePages.feedback.cardAdmissionsTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted mb-6">{{ t('standalonePages.feedback.cardAdmissionsBody') }}</p>
          <NuxtLink
            :to="localePath('/admissions/ask')"
            class="inline-flex mt-auto text-body-sm font-medium text-gold hover:text-gold-light no-underline"
          >
            {{ t('standalonePages.feedback.admissionsPageLink') }}
          </NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>
