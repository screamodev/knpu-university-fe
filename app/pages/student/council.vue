<script setup lang="ts">
import { readItems, readSingleton } from '@directus/sdk'
import type {
  DirectusGalleryItem,
  DirectusStudentCouncilInfo,
  DirectusStudentCouncilMember,
  DirectusStudentCouncilSector,
  StudentCouncilGroup,
} from '~/types/directus'
import type { StructureUnitPerson } from '~/utils/structureContent'

/**
 * Студентське самоврядування.
 *
 * The client asked for the section structure knmu.edu.ua uses, starting empty: nothing is carried
 * over from the old site. Every block reads Directus — the texts and contacts from the
 * `student_council_info` singleton, people from `student_council_members`, sectors from
 * `student_council_sectors` — so the students fill the page themselves, without a deploy. Blocks
 * with no rows yet show the site's usual «розділ наповнюється» note.
 */
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()
const { client } = useDirectus()

useHead({
  title: () => t('student.council.title'),
  meta: [{ name: 'description', content: () => t('student.council.subtitle') }],
})

const NEWS_CATEGORY = 'studentskyi-parlament'

const { data: infoData } = await useAsyncData('student-council-info', () =>
  client.request(
    readSingleton('student_council_info', {
      fields: [
        'about', 'mission', 'objectives', 'legalBasis',
        { emblem: ['id'] }, { photo: ['id'] },
        'address', 'email', 'trustBoxUrl', 'facebook', 'instagram', 'telegram',
        'status',
      ],
    }),
  ),
)

const { data: membersData } = await useAsyncData('student-council-members', () =>
  client.request(
    readItems('student_council_members', {
      fields: [
        'id', 'group', 'name', 'position', 'faculty', 'email', 'profileUrl', 'order',
        { photo: ['id'] },
      ],
      sort: ['order', 'name'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

const { data: sectorsData } = await useAsyncData('student-council-sectors', () =>
  client.request(
    readItems('student_council_sectors', {
      fields: ['id', 'name', 'description', 'leadName', 'leadEmail', 'externalUrl', 'order'],
      sort: ['order', 'name'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }),
  ),
)

/**
 * Фотозвіти парламенту — категорія «Студентський парламент» спільної галереї. Альбом — це
 * фото з однаковою назвою, тож студенти додають новий звіт у Gallery Items без деплою.
 */
const PHOTO_CATEGORY = 'student-parliament'

const { data: photosData } = await useAsyncData('student-council-photos', () =>
  client.request(
    readItems('gallery_items', {
      fields: ['id', 'title', 'titleEn', 'order', { image: ['id'] }],
      sort: ['order'],
      filter: { status: { _eq: 'published' }, category: { slug: { _eq: PHOTO_CATEGORY } } },
      limit: -1,
    }),
  ),
)

const info = computed<DirectusStudentCouncilInfo | null>(
  () => (infoData.value as DirectusStudentCouncilInfo | null) ?? null,
)

const members = computed<DirectusStudentCouncilMember[]>(
  () => (membersData.value as DirectusStudentCouncilMember[] | null) ?? [],
)

const sectors = computed<DirectusStudentCouncilSector[]>(
  () => (sectorsData.value as DirectusStudentCouncilSector[] | null) ?? [],
)

/** Prose blocks, in the order of the reference page. */
const prose = computed(() => [
  { key: 'aboutTitle', html: info.value?.about },
  { key: 'missionTitle', html: info.value?.mission },
  { key: 'objectivesTitle', html: info.value?.objectives },
])

const contacts = computed(() => [
  { key: 'contactsAddress', value: info.value?.address, href: null as string | null },
  {
    key: 'contactsEmail',
    value: info.value?.email,
    href: info.value?.email ? `mailto:${info.value.email}` : null,
  },
  {
    key: 'contactsTrustBox',
    value: info.value?.trustBoxUrl,
    href: info.value?.trustBoxUrl ?? null,
  },
])

const socials = computed(() =>
  [
    { label: 'Facebook', url: info.value?.facebook },
    { label: 'Instagram', url: info.value?.instagram },
    { label: 'Telegram', url: info.value?.telegram },
  ].filter((entry): entry is { label: string; url: string } => Boolean(entry.url)),
)

/** `SharedPeopleRow` already renders portrait cards; map members onto the shape it expects. */
function peopleOf(group: StudentCouncilGroup): StructureUnitPerson[] {
  return members.value
    .filter(member => member.group === group)
    .map(member => ({
      photo: member.photo
        ? `/assets/${typeof member.photo === 'string' ? member.photo : member.photo.id}`
        : null,
      // The faculty is what tells one faculty chair from another.
      position: member.position || member.faculty || null,
      name: member.name,
      degree: member.email,
      profileUrl: member.profileUrl,
    }))
}

const leadershipBlocks = computed(() =>
  (['chair', 'deputy', 'faculty-chair'] as const).map(group => ({
    group,
    titleKey: {
      'chair': 'chairTitle',
      'deputy': 'deputiesTitle',
      'faculty-chair': 'facultyChairsTitle',
    }[group],
    people: peopleOf(group),
  })),
)

const { assetUrl } = useDirectus()
const { localized } = useLocalizedField()

const fileId = (file: { id: string } | string | null | undefined) =>
  typeof file === 'string' ? file : file?.id ?? null

const emblemSrc = computed(() => assetUrl(fileId(info.value?.emblem), { width: 480 }))
const photoSrc = computed(() => assetUrl(fileId(info.value?.photo), { width: 1400, quality: 82 }))

interface PhotoAlbum { title: string; photos: { id: string; src: string; full: string }[] }

/** Neighbouring photos with the same title form one album, in the order the editor set. */
const albums = computed<PhotoAlbum[]>(() => {
  const result: PhotoAlbum[] = []
  for (const item of (photosData.value as DirectusGalleryItem[] | null) ?? []) {
    const id = fileId(item.image as { id: string } | string | null)
    if (!id) continue
    const title = localized(item, 'title') ?? item.title
    const photo = {
      id: item.id,
      src: assetUrl(id, { width: 640, quality: 80 }) ?? '',
      full: assetUrl(id, { width: 2000, quality: 85 }) ?? '',
    }
    const last = result[result.length - 1]
    if (last && last.title === title) last.photos.push(photo)
    else result.push({ title, photos: [photo] })
  }
  return result
})

const auditMembers = computed(() => members.value.filter(member => member.group === 'audit'))
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('student.council.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('student.council.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('student.council.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Емблема й загальне фото парламенту (правка 13.09) -->
    <div
      v-if="emblemSrc || photoSrc"
      class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-center"
    >
      <img
        v-if="emblemSrc"
        :src="emblemSrc"
        :alt="t('student.council.emblemAlt')"
        class="w-full max-w-[280px] mx-auto object-contain"
      >
      <img
        v-if="photoSrc"
        :src="photoSrc"
        :alt="t('student.council.title')"
        class="w-full rounded-16 object-cover"
        :class="emblemSrc ? '' : 'lg:col-span-2'"
      >
    </div>

    <!-- Про самоврядування / Місія / Завдання -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <section v-for="block in prose" :key="block.key">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-3">
          {{ t(`student.council.${block.key}`) }}
        </h2>
        <NewsMarkdownBody v-if="block.html" :source="block.html" kind="html" />
        <SharedSectionPending v-else :note="t('student.council.sectionEmpty')" />
      </section>
    </div>

    <!-- Контактні дані -->
    <div class="bg-off-white border-t border-border py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('student.council.contactsTitle') }}
        </h2>
        <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="row in contacts" :key="row.key">
            <dt class="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-1.5">
              {{ t(`student.council.${row.key}`) }}
            </dt>
            <dd class="text-body-sm">
              <a
                v-if="row.value && row.href"
                :href="row.href"
                class="text-navy underline hover:text-gold break-all"
              >
                {{ row.value }}
              </a>
              <span v-else-if="row.value" class="text-text-muted">{{ row.value }}</span>
              <span v-else class="text-text-muted">{{ t('student.council.sectionEmpty') }}</span>
            </dd>
          </div>

          <div>
            <dt class="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-1.5">
              {{ t('student.council.contactsSocials') }}
            </dt>
            <dd class="text-body-sm flex flex-wrap gap-x-4 gap-y-1">
              <a
                v-for="social in socials"
                :key="social.label"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-navy underline hover:text-gold"
              >
                {{ social.label }}
              </a>
              <span v-if="!socials.length" class="text-text-muted">
                {{ t('student.council.sectionEmpty') }}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Голова, заступники, голови студрад факультетів -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('student.council.leadershipTitle') }}
      </h2>

      <template v-for="block in leadershipBlocks" :key="block.group">
        <SharedPeopleRow
          v-if="block.people.length"
          :people="block.people"
          :heading="t(`student.council.${block.titleKey}`)"
        />
        <section v-else class="mb-10">
          <h3 class="font-playfair text-xl font-bold text-navy mb-2">
            {{ t(`student.council.${block.titleKey}`) }}
          </h3>
          <SharedSectionPending :note="t('student.council.sectionEmpty')" />
        </section>
      </template>
    </div>

    <!-- Сектори -->
    <div class="bg-off-white border-y border-border py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('student.council.sectorsTitle') }}
        </h2>

        <div v-if="sectors.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="sector in sectors"
            :key="sector.id"
            class="bg-white border border-border rounded-16 p-6 flex flex-col gap-2"
          >
            <h3 class="font-playfair text-lg font-semibold text-navy">
              <a
                v-if="sector.externalUrl"
                :href="sector.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-navy no-underline hover:text-gold"
              >
                {{ sector.name }}
                <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
              </a>
              <template v-else>{{ sector.name }}</template>
            </h3>
            <p v-if="sector.description" class="text-body-sm text-text-muted flex-1">
              {{ sector.description }}
            </p>
            <p v-if="sector.leadName" class="text-body-sm text-navy mt-auto">
              {{ t('student.council.sectorLead') }}: {{ sector.leadName }}
              <a
                v-if="sector.leadEmail"
                :href="`mailto:${sector.leadEmail}`"
                class="block text-text-muted underline hover:text-gold break-all"
              >
                {{ sector.leadEmail }}
              </a>
            </p>
          </article>
        </div>

        <SharedSectionPending v-else :note="t('student.council.sectionEmpty')" />
      </div>
    </div>

    <!-- Контрольно-ревізійна комісія -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('student.council.auditTitle') }}
      </h2>

      <ul v-if="auditMembers.length" class="list-none p-0 m-0 space-y-3 max-w-3xl">
        <li
          v-for="member in auditMembers"
          :key="member.id"
          class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-border pb-3 last:border-b-0"
        >
          <span class="font-medium text-navy">
            {{ member.name }}
            <span v-if="member.position" class="font-normal text-text-muted">
              — {{ member.position }}
            </span>
          </span>
          <a
            v-if="member.email"
            :href="`mailto:${member.email}`"
            class="text-body-sm text-navy underline hover:text-gold break-all"
          >
            {{ member.email }}
          </a>
        </li>
      </ul>

      <SharedSectionPending v-else :note="t('student.council.sectionEmpty')" />
    </div>

    <!-- Новини й оголошення: live from the «Студентське самоврядування» category -->
    <div class="bg-off-white border-y border-border py-12">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
            {{ t('student.council.newsTitle') }}
          </h2>
          <SharedStructureUnitNews :category-slug="NEWS_CATEGORY" :limit="6" />
        </div>
        <SharedStructureUnitAnnouncements :unit-category-slug="NEWS_CATEGORY" />
      </div>
    </div>

    <!-- Фотозвіти: категорія «Студентський парламент» галереї -->
    <div v-if="albums.length" class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
      <h2 class="font-playfair text-2xl font-bold text-navy">
        {{ t('student.council.albumsTitle') }}
      </h2>
      <section v-for="album in albums" :key="album.title">
        <h3 class="font-playfair text-lg font-semibold text-navy mb-4">{{ album.title }}</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <a
            v-for="photo in album.photos"
            :key="photo.id"
            :href="photo.full"
            target="_blank"
            rel="noopener noreferrer"
            class="block aspect-[4/3] overflow-hidden rounded-12 bg-off-white"
          >
            <img :src="photo.src" :alt="album.title" loading="lazy" class="w-full h-full object-cover">
          </a>
        </div>
      </section>
    </div>

    <!-- Документи: нормативна база й Положення та інші файли, розділ `student-council` у Directus -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16">
      <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
        {{ t('student.council.documentsTitle') }}
      </h2>
      <div v-if="info?.legalBasis" class="mb-8 max-w-3xl">
        <NewsMarkdownBody :source="info.legalBasis" kind="html" />
      </div>
      <SharedDocumentList section="student-council" />

      <!--
        Звіти парламенту окремим розділом: на старому сайті вони називалися «Звіти про
        діяльність спілки студентів та молоді», парламент попросив і перейменувати, і
        відокремити їх від положень.
      -->
      <h2 class="font-playfair text-2xl font-bold text-navy mt-14 mb-6">
        {{ t('student.council.reportsTitle') }}
      </h2>
      <SharedDocumentList section="student-council-reports" />
    </div>
  </div>
</template>
