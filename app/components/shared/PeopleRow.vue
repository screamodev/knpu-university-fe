<script setup lang="ts">
import type { StructureUnitPerson } from '~/utils/structureContent'

/**
 * Leadership of a unit as a row of cards, matching `/university/rectorate`.
 *
 * The data comes from the migrated pages, where the same people sat inside a `<table>` of
 * full-width portraits — see `migration/structure-pages/6_extract_people.py`. Photos are Directus
 * assets (`/assets/<uuid>`); the old site had none for a few people, so a card must survive
 * without one.
 */
const props = defineProps<{ people: StructureUnitPerson[]; heading?: string | null }>()

const { t } = useSafeI18nWithRouter()
const { publicUrl } = useDirectus()

/** Same display size as the rector cards, doubled for retina. */
const PHOTO_WIDTH = 640

function photoSrc(person: StructureUnitPerson): string | null {
  if (!person.photo) return null
  const absolute = person.photo.startsWith('/')
    ? `${publicUrl.replace(/\/$/, '')}${person.photo}`
    : person.photo
  return absolute.includes('?') ? absolute : `${absolute}?width=${PHOTO_WIDTH}&quality=80`
}

const initials = (name: string) => name.trim().charAt(0).toUpperCase()

const people = computed(() => props.people.filter(person => person.name))
</script>

<template>
  <section v-if="people.length" class="mb-10">
    <h2 v-if="heading" class="font-playfair text-xl font-bold text-navy mb-4">
      {{ heading }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <article
        v-for="person in people"
        :key="person.name"
        class="bg-off-white border border-border rounded-16 overflow-hidden flex flex-col"
      >
        <img
          v-if="photoSrc(person)"
          :src="photoSrc(person)!"
          :alt="person.name"
          loading="lazy"
          class="w-full aspect-[4/5] object-cover object-top"
        />
        <div
          v-else
          class="w-full aspect-[4/5] bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
          aria-hidden
        >
          <span class="font-playfair text-4xl font-bold text-gold/50">{{ initials(person.name) }}</span>
        </div>

        <div class="p-5 flex flex-col gap-1.5 flex-1">
          <div
            v-if="person.position"
            class="text-[11px] font-semibold tracking-wider uppercase text-gold min-h-[2.5rem]"
          >
            {{ person.position }}
          </div>
          <div class="font-playfair text-base font-semibold text-navy">
            {{ person.name }}
          </div>
          <div v-if="person.degree" class="text-body-sm text-text-muted">
            {{ person.degree }}
          </div>

          <a
            v-if="person.profileUrl"
            :href="person.profileUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-auto pt-3 inline-flex items-center gap-1.5 text-body-sm font-medium text-navy hover:text-gold transition-colors no-underline"
          >
            {{ t('university.structure.personalPage') }}
            <svg class="w-3 h-3 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden>
              <path d="M7 17L17 7M17 7H8m9 0v9" />
            </svg>
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
