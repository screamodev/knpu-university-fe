<script setup lang="ts">
/**
 * «Конференція трудового колективу».
 *
 * The staff conference had no page at all — the structure chart named it and stopped there. Text
 * comes from the client; the ухвали are documents, so they are a `SharedDocumentList` section
 * editors fill in rather than a list frozen in code.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('university.staffConference.title'),
  meta: [{ name: 'description', content: () => t('university.staffConference.subtitle') }],
})

const POWERS = [
  'powersStatute',
  'powersRectorReport',
  'powersRectorTermination',
  'powersRules',
  'powersCouncilElection',
  'powersUnionReport',
  'powersOther',
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.staffConference.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.staffConference.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.staffConference.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-3xl flex flex-col gap-5">
        <p class="text-body text-text-muted">{{ t('university.staffConference.intro') }}</p>
        <p class="text-body text-text-muted">{{ t('university.staffConference.composition') }}</p>
        <p class="text-body text-text-muted">{{ t('university.staffConference.supervisory') }}</p>
      </div>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-12 mb-6">
        {{ t('university.staffConference.powersTitle') }}
      </h2>
      <ul class="max-w-3xl flex flex-col gap-3">
        <li v-for="key in POWERS" :key="key" class="text-body text-text-muted flex items-start gap-3">
          <span class="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden></span>
          <span>{{ t(`university.staffConference.${key}`) }}</span>
        </li>
      </ul>

      <p class="max-w-3xl text-body text-text-muted mt-8">
        {{ t('university.staffConference.outro') }}
      </p>

      <h2 class="font-playfair text-2xl font-bold text-navy mt-12 mb-6">
        {{ t('university.staffConference.decisionsTitle') }}
      </h2>
      <SharedDocumentList section="staff-conference" />
    </div>
  </div>
</template>
