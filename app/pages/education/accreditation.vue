<script setup lang="ts">
import { readItems } from '@directus/sdk'
import type { FileLinkItem } from '~/components/shared/FileLinkList.vue'
import type { DirectusAccreditationCertificate, EducationLevel } from '~/types/directus'

/**
 * Акредитація освітніх програм.
 *
 * The legacy site published ~90 certificates as one flat page; here they are grouped рівень →
 * галузь знань and collapsed, so a visitor can find their speciality instead of scrolling. The
 * accreditation dossiers themselves (відомості про самооцінювання, звіти експертних груп) belong
 * to the quality centre and live on /education/quality.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const { client } = useDirectus()
const localePath = useLocalePath()

useHead({
  title: () => t('nav.links.accreditation'),
  meta: [{ name: 'description', content: () => t('education.accreditation.subtitle') }],
})

const LEVELS: EducationLevel[] = ['bachelor', 'master', 'phd']

const { data, pending } = await useAsyncData('accreditation-certificates', () =>
  client.request(
    readItems('accreditation_certificates', {
      fields: [
        'id',
        'level',
        'branch',
        'specialtyCode',
        'title',
        'titleEn',
        'externalUrl',
        'order',
        { file: ['id', 'filename_download', 'filesize', 'type'] },
      ],
      sort: ['order'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const certificates = computed<DirectusAccreditationCertificate[]>(
  () => (data.value as DirectusAccreditationCertificate[] | null) ?? [],
)

/** Рівень → галузь знань, keeping the order the certificates are published in. */
const groups = computed(() =>
  LEVELS
    .map((level) => {
      const branches: { branch: string; items: FileLinkItem[] }[] = []
      const rows = certificates.value.filter(item => item.level === level)

      for (const row of rows) {
        const branch = row.branch || t('education.accreditation.otherBranch')
        let bucket = branches.find(entry => entry.branch === branch)
        if (!bucket) {
          bucket = { branch, items: [] }
          branches.push(bucket)
        }
        bucket.items.push({
          id: row.id,
          title: row.title,
          badge: row.specialtyCode,
          file: row.file,
          externalUrl: row.externalUrl,
        })
      }

      return { level, count: rows.length, branches }
    })
    .filter(group => group.count > 0),
)
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.accreditation.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.accreditation.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.accreditation.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-body text-text-muted max-w-3xl mb-12">
        {{ t('education.accreditation.intro') }}
      </p>

      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('education.accreditation.cardsTitle') }}
      </h2>

      <div v-if="pending" class="space-y-3">
        <div v-for="i in 3" :key="i" class="animate-pulse h-14 rounded-12 border border-border bg-off-white" />
      </div>

      <div v-else-if="groups.length" class="space-y-4">
        <SharedAccordion
          v-for="(group, index) in groups"
          :key="group.level"
          :title="t(`education.accreditation.levels.${group.level}`)"
          :hint="`${group.count}`"
          :open="index === 0"
        >
          <div class="space-y-6 pt-4">
            <div v-for="branch in group.branches" :key="branch.branch">
              <h3 class="text-body-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                {{ branch.branch }}
              </h3>
              <SharedFileLinkList :items="branch.items" dense />
            </div>
          </div>
        </SharedAccordion>
      </div>

      <SharedSectionPending v-else />

      <!-- Callout: gold left border -->
      <div class="mt-14 border-l-4 border-gold bg-off-white border border-border rounded-12 p-6 lg:p-8">
        <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
          {{ t('education.accreditation.calloutTitle') }}
        </h3>
        <p class="text-body text-text-muted mb-4">
          {{ t('education.accreditation.calloutText') }}
        </p>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <NuxtLink
            :to="localePath('/education/quality')"
            class="font-medium text-navy underline hover:text-gold"
          >
            {{ t('education.accreditation.dossiersLink') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/university/licenses')"
            class="font-medium text-navy underline hover:text-gold"
          >
            {{ t('education.accreditation.licenceLink') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
