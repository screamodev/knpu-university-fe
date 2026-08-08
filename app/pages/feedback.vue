<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, tm, localePath } = useSafeI18nWithRouter()

useSeoMeta({
  title: () => t('seo.feedback.title'),
  description: () => t('seo.feedback.description'),
})

function mailHref(messageKey: string): string {
  return `mailto:${t(messageKey).replace(/\{'@'\}/g, '@')}`
}

const utilityMail = computed(() => mailHref('utility.email'))
const utilityTel = computed(() => `tel:${t('utility.phone').replace(/\s/g, '')}`)

/**
 * The old site routed enquiries through a form with a «Категорія» dropdown; each category has its
 * own mailbox, so the categories are published as addresses instead of rebuilding the form.
 */
const TOPICS_KEY = 'standalonePages.feedback.topics'

const topics = computed(() => {
  const rows = tm(TOPICS_KEY)
  if (!Array.isArray(rows)) return []
  return rows.map((_, index) => ({
    name: t(`${TOPICS_KEY}.${index}.name`),
    email: t(`${TOPICS_KEY}.${index}.email`).replace(/\{'@'\}/g, '@'),
  }))
})
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

      <!-- Categories of the old feedback form, as the mailboxes that handle them -->
      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-2">
        {{ t('standalonePages.feedback.topicsTitle') }}
      </h2>
      <p class="text-body-sm text-text-muted max-w-3xl mb-6">
        {{ t('standalonePages.feedback.topicsIntro') }}
      </p>
      <ul class="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
        <li
          v-for="topic in topics"
          :key="topic.email"
          class="border border-border rounded-12 px-4 py-3 flex flex-col gap-0.5"
        >
          <span class="font-medium text-navy">{{ topic.name }}</span>
          <a
            :href="`mailto:${topic.email}`"
            class="text-body-sm text-navy underline hover:text-gold break-all"
          >
            {{ topic.email }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
