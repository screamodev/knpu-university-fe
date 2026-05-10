<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useSeoMeta({
  title: () => t('seo.accessibility.title'),
  description: () => t('seo.accessibility.description'),
})

function mailHref(fromT: string): string {
  return `mailto:${fromT.replace(/\{'@'\}/g, '@')}`
}

const admissionsMail = computed(() => mailHref(t('standalonePages.admissionsAsk.committeeEmailAddress')))
const pressMail = computed(() => mailHref(t('university.press.contactEmailAddress')))
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('standalonePages.accessibility.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('standalonePages.accessibility.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('standalonePages.accessibility.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('standalonePages.accessibility.intro') }}
      </p>

      <section class="max-w-3xl">
        <h2 class="font-playfair text-xl font-semibold text-navy mb-3">
          {{ t('standalonePages.accessibility.commitmentTitle') }}
        </h2>
        <p class="text-body text-text-muted">{{ t('standalonePages.accessibility.commitmentBody') }}</p>
      </section>

      <section class="max-w-3xl">
        <h2 class="font-playfair text-xl font-semibold text-navy mb-3">
          {{ t('standalonePages.accessibility.studyTitle') }}
        </h2>
        <p class="text-body text-text-muted mb-4">{{ t('standalonePages.accessibility.studyBody') }}</p>
        <NuxtLink
          :to="localePath('/university/inclusive')"
          class="inline-flex text-body-sm font-medium text-gold hover:text-gold-light no-underline transition-colors"
        >
          {{ t('standalonePages.accessibility.studyLinkLabel') }}
        </NuxtLink>
      </section>

      <section class="max-w-3xl">
        <h2 class="font-playfair text-xl font-semibold text-navy mb-3">
          {{ t('standalonePages.accessibility.reportTitle') }}
        </h2>
        <p class="text-body text-text-muted mb-4">{{ t('standalonePages.accessibility.reportBody') }}</p>
        <ul class="list-none space-y-2">
          <li>
            <span class="text-body-sm text-text-muted mr-2">{{ t('standalonePages.accessibility.pressEmailLabel') }}:</span>
            <a :href="pressMail" class="text-body-sm font-medium text-gold no-underline hover:text-gold-light">
              {{ t('university.press.contactEmailAddress').replace(/\{'@'\}/g, '@') }}
            </a>
          </li>
          <li>
            <span class="text-body-sm text-text-muted mr-2">{{ t('standalonePages.accessibility.admissionsEmailLabel') }}:</span>
            <a :href="admissionsMail" class="text-body-sm font-medium text-gold no-underline hover:text-gold-light">
              {{ t('standalonePages.admissionsAsk.committeeEmailAddress').replace(/\{'@'\}/g, '@') }}
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
