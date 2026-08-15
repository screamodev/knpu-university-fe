<script setup lang="ts">
import type { LinkTile } from '~/components/shared/LinkTileGrid.vue'

definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.plagiarism'),
  meta: [{ name: 'description', content: () => t('science.plagiarism.subtitle') }],
})

const contactKeys = ['library', 'antiplagiat'] as const
const typeKeys = ['copy', 'mix', 'paraphrase'] as const
const letterIds = ['l1', 'l2', 'l3', 'l4'] as const

/** File types the checking service accepts — technical, so not translated. */
const formats = [
  '.doc', '.docx', '.rtf', '.txt', '.odt', '.ppt', '.pptx', '.html', '.pdf', '.pages', '.gdoc',
] as const

const links = computed<LinkTile[]>(() => [
  { label: t('science.plagiarism.integrityLabel'), url: 'https://sites.google.com/hnpu.edu.ua/akdob', icon: 'shield' },
  { label: t('science.plagiarism.libraryLabel'), path: '/science/library', icon: 'book' },
  { label: t('science.plagiarism.freeCheckLabel'), url: 'https://edubirdie.com/perevirka-na-plagiat', icon: 'link' },
])
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('science.plagiarism.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('science.plagiarism.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('science.plagiarism.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('science.plagiarism.intro') }}
      </p>
    </div>

    <!-- Where to send: two mailbox cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.plagiarism.contactsTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <article
          v-for="key in contactKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col border-l-4 border-l-gold"
        >
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`science.plagiarism.contacts.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted mb-4">
            {{ t(`science.plagiarism.contacts.${key}.text`) }}
          </p>
          <a
            :href="`mailto:${t(`science.plagiarism.contacts.${key}.email`)}`"
            class="mt-auto text-body-sm font-medium text-navy no-underline hover:text-gold transition-colors duration-280 break-all"
          >
            {{ t(`science.plagiarism.contacts.${key}.email`) }}
          </a>
        </article>
      </div>
    </div>

    <!-- Supported formats -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('science.plagiarism.formatsTitle') }}
        </h2>
        <ul class="list-none p-0 m-0 flex flex-wrap gap-2 mb-6">
          <li
            v-for="format in formats"
            :key="format"
            class="px-3 py-1.5 bg-white border border-border rounded-full text-body-sm font-medium text-navy"
          >
            {{ format }}
          </li>
        </ul>
        <p class="text-body-sm text-text-muted max-w-3xl">
          {{ t('science.plagiarism.formatsNote') }}
        </p>
      </div>
    </div>

    <!-- Definition + legal note -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('science.plagiarism.definitionTitle') }}
      </h2>
      <blockquote class="border-l-4 border-l-gold pl-6 max-w-3xl m-0">
        <p class="text-body text-text-muted">
          {{ t('science.plagiarism.definitionText') }}
        </p>
        <cite class="block mt-3 text-body-sm text-text-muted/80 not-italic">
          {{ t('science.plagiarism.definitionSource') }}
        </cite>
      </blockquote>
      <p class="mt-6 text-body text-text-muted max-w-3xl">
        {{ t('science.plagiarism.legalNote') }}
      </p>
    </div>

    <!-- Three types -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.plagiarism.typesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <article
          v-for="key in typeKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4 text-gold shrink-0"
            aria-hidden
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 3h9a2 2 0 0 1 2 2v11" stroke-linecap="round" stroke-linejoin="round" />
              <rect x="4" y="7" width="12" height="14" rx="2" />
            </svg>
          </div>
          <p class="text-body-sm text-text-muted">
            {{ t(`science.plagiarism.types.${key}.text`) }}
          </p>
        </article>
      </div>
      <p class="mt-4 text-body-sm text-text-muted/80">
        {{ t('science.plagiarism.typesSource') }}
      </p>
    </div>

    <!-- МОН letters -->
    <div class="bg-off-white py-12 lg:py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('science.plagiarism.lettersTitle') }}
        </h2>
        <ul class="list-none p-0 m-0 space-y-4">
          <li
            v-for="id in letterIds"
            :key="id"
            class="bg-white border border-border rounded-16 p-5 text-body-sm text-text-muted"
          >
            {{ t(`science.plagiarism.letters.${id}.text`) }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Related links -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('science.plagiarism.linksTitle') }}
      </h2>
      <SharedLinkTileGrid :tiles="links" />
    </div>
  </div>
</template>
