<script setup lang="ts">
const { t, tm } = useSafeI18nWithRouter()

interface Props {
  /** Optional sub-heading rendered above the featured rector card */
  rectorHeading?: string
  /** Optional sub-heading rendered above the vice-rectors grid */
  viceHeading?: string
}
defineProps<Props>()

interface Admin {
  position: string
  name: string
  room: string
  phone: string
  email: string
  photo: string
  degree?: string
  /** Personal page on an external site, when the person keeps one. */
  profile?: string
}

const KEY = 'university.structure.administration'

/**
 * Optional fields (`degree`, `profile`) are only present for some people, so
 * they are read off the message object rather than probed with `t()` — probing
 * a missing key makes vue-i18n log a "Not found … key" warning on every render.
 */
function field(entry: Record<string, unknown>, name: string): string | undefined {
  const raw = entry?.[name]
  if (raw === undefined || raw === null) return undefined
  const value = resolveMessageValue(raw)
  return value.trim() ? value : undefined
}

function getAdmins(): Admin[] {
  const value = tm(KEY)
  if (!Array.isArray(value)) return []
  return value.map((entry, i) => ({
    position: t(`${KEY}.${i}.position`),
    name: t(`${KEY}.${i}.name`),
    room: t(`${KEY}.${i}.room`),
    phone: t(`${KEY}.${i}.phone`),
    email: t(`${KEY}.${i}.email`),
    photo: t(`${KEY}.${i}.photo`),
    degree: field(entry, 'degree'),
    profile: field(entry, 'profile'),
  }))
}

const admins = computed(() => getAdmins())
const rector = computed(() => admins.value[0])
const viceRectors = computed(() => admins.value.slice(1))

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`
</script>

<template>
  <div>
    <!-- Rector: featured (top of hierarchy) -->
    <template v-if="rector">
      <h3 v-if="rectorHeading" class="font-playfair text-xl font-bold text-navy mb-4">
        {{ rectorHeading }}
      </h3>
      <article
        class="bg-off-white border border-border rounded-16 overflow-hidden border-t-4 border-t-gold flex flex-col sm:flex-row"
      >
        <img
          :src="rector.photo"
          :alt="rector.name"
          class="w-full sm:w-56 h-64 sm:h-auto object-cover object-top shrink-0"
        >
        <div class="p-6 lg:p-8 flex flex-col gap-2 justify-center">
          <div class="text-[11px] font-semibold tracking-wider uppercase text-gold">
            {{ rector.position }}
          </div>
          <div class="font-playfair text-2xl font-bold text-navy">
            {{ rector.name }}
          </div>
          <p v-if="rector.degree" class="text-body-sm text-text-muted max-w-md">
            {{ rector.degree }}
          </p>
          <div class="text-body-sm text-text-muted">{{ rector.room }}</div>
          <a :href="telHref(rector.phone)" class="text-body-sm text-primary hover:underline">
            {{ rector.phone }}
          </a>
          <a :href="`mailto:${rector.email}`" class="text-body-sm text-primary hover:underline break-all">
            {{ rector.email }}
          </a>
          <a
            v-if="rector.profile"
            :href="rector.profile"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 self-start inline-flex items-center gap-1.5 py-1 px-3 rounded-100 border border-gold/50 bg-white text-body-sm font-medium text-navy transition-colors duration-280 hover:border-gold hover:text-primary"
          >
            {{ t('university.structure.personalPage') }}
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
              <path d="M7 17L17 7M17 7H8m9 0v9" />
            </svg>
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
        </div>
      </article>
    </template>

    <!-- Vice-rectors: second tier -->
    <h3 v-if="viceHeading" class="font-playfair text-xl font-bold text-navy mt-10 mb-4">
      {{ viceHeading }}
    </h3>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      :class="rectorHeading || viceHeading ? '' : 'mt-6'"
    >
      <div
        v-for="(admin, index) in viceRectors"
        :key="index"
        class="bg-off-white border border-border rounded-16 overflow-hidden flex flex-col"
      >
        <img
          :src="admin.photo"
          :alt="admin.name"
          loading="lazy"
          class="w-full aspect-[4/5] object-cover object-top"
        >
        <div class="p-5 flex flex-col gap-1.5 flex-1">
          <div class="text-[11px] font-semibold tracking-wider uppercase text-gold min-h-[2.5rem]">
            {{ admin.position }}
          </div>
          <div class="font-playfair text-base font-semibold text-navy">
            {{ admin.name }}
          </div>
          <div class="text-body-sm text-text-muted">{{ admin.room }}</div>
          <a :href="telHref(admin.phone)" class="text-body-sm text-primary hover:underline">
            {{ admin.phone }}
          </a>
          <a :href="`mailto:${admin.email}`" class="text-body-sm text-primary hover:underline break-all">
            {{ admin.email }}
          </a>
          <a
            v-if="admin.profile"
            :href="admin.profile"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-auto self-start inline-flex items-center gap-1.5 py-1 px-3 rounded-100 border border-gold/50 bg-white text-body-sm font-medium text-navy transition-colors duration-280 hover:border-gold hover:text-primary"
          >
            {{ t('university.structure.personalPage') }}
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden>
              <path d="M7 17L17 7M17 7H8m9 0v9" />
            </svg>
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
