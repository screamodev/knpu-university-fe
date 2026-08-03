<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
const issues = useNewspaperHomeIssues()

/** Issues whose PDF could not be rendered — those cards fall back to the flat icon. */
const previewFailed = ref(new Set<string>())

function markPreviewFailed(id: string) {
  previewFailed.value = new Set(previewFailed.value).add(id)
}

function hasPreview(issue: { id: string; href?: string }): boolean {
  return Boolean(issue.href) && !previewFailed.value.has(issue.id)
}
</script>

<template>
  <section class="py-20 bg-off-white">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-end justify-between gap-6 mb-10">
        <SharedSectionHeader
          class="max-w-3xl"
          :tag="t('sections.newspaper.tag')"
          :title="t('university.newspaper.title')"
          :description="t('university.newspaper.subtitle')"
        />
        <NuxtLink
          :to="localePath('/university/newspaper')"
          class="text-sm text-navy no-underline flex items-center gap-1.5 border-b-[1.5px] border-gold pb-0.5 font-medium shrink-0"
        >
          {{ t('sections.newspaper.all') }}
          <span>→</span>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- A card is the issue itself: it opens the PDF. -->
        <component
          :is="issue.href ? 'a' : 'div'"
          v-for="issue in issues"
          :key="issue.id"
          :href="issue.href"
          :target="issue.href ? '_blank' : undefined"
          :rel="issue.href ? 'noopener noreferrer' : undefined"
          class="group bg-white border border-border rounded-12 overflow-hidden flex flex-col no-underline transition-all duration-280 hover:border-gold hover:-translate-y-1 hover:shadow-gold max-sm:max-w-md max-sm:mx-auto w-full"
        >
          <div
            class="aspect-[3/4] max-h-[220px] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0 overflow-hidden"
          >
            <img
              v-if="issue.cover"
              :src="issue.cover"
              :alt="issue.issueLabel"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-280 group-hover:scale-105"
            />

            <!-- No uploaded cover: draw page 1 of the PDF, same as the archive page. -->
            <NewsPdfFirstPage
              v-else-if="hasPreview(issue)"
              :src="issue.href!"
              :width="300"
              class="transition-transform duration-280 group-hover:scale-105"
              @failed="markPreviewFailed(issue.id)"
            />

            <svg
              v-else
              class="w-10 h-10 text-gold/30 transition-transform duration-280 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              aria-hidden
            >
              <path d="M4 4h16v16H4z" />
              <path d="M4 8h16M4 12h16M4 16h8" />
            </svg>
          </div>
          <div class="p-4 flex flex-col flex-1">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-1">
              {{ issue.issueLabel }} · {{ issue.dateLabel }}
            </div>
            <p v-if="issue.description" class="text-sm text-text-muted leading-snug line-clamp-3">
              {{ issue.description }}
            </p>
            <span v-if="issue.href" class="mt-auto pt-3 text-sm text-navy font-medium">
              {{ t('university.newspaper.download') }}
              <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
            </span>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>
