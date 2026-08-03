<script setup lang="ts">
import type { StructureUnitContacts } from '~/utils/structureContent'

/** Dean, address and social links for a unit. Shown beside every tab. */
const props = defineProps<{
  contacts: StructureUnitContacts
  kind: 'institute' | 'faculty' | 'department'
}>()

const { t } = useSafeI18nWithRouter()
const { localized } = useLocalizedField()

const headTitle = computed(() => {
  if (props.kind === 'institute') return t('university.structure.unit.directorTitle')
  if (props.kind === 'department') return t('university.structure.unit.headTitle')
  return t('university.structure.unit.deanTitle')
})

const dean = computed(() => localized(props.contacts, 'dean'))
const position = computed(() => localized(props.contacts, 'position'))
const address = computed(() => localized(props.contacts, 'address'))

const socials = computed(() =>
  [
    { key: 'facebook', url: props.contacts.facebook, label: 'Facebook' },
    { key: 'instagram', url: props.contacts.instagram, label: 'Instagram' },
  ].filter(entry => Boolean(entry.url)),
)

const hasAny = computed(() =>
  Boolean(dean.value || address.value || props.contacts.phone || props.contacts.email || socials.value.length),
)
</script>

<template>
  <!--
    `self-start` keeps the card at the height of its own content: as a grid item it would
    otherwise stretch over the whole (very tall) main column, which also made `lg:sticky` inert.
  -->
  <aside
    v-if="hasAny"
    class="self-start bg-off-white border border-border rounded-16 p-5 lg:sticky lg:top-6"
  >
    <h2 class="font-playfair text-lg font-bold text-navy mb-4">
      {{ t('university.structure.unit.contactsTitle') }}
    </h2>

    <div v-if="dean" class="mb-4">
      <div class="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-1">
        {{ headTitle }}
      </div>
      <a
        v-if="contacts.deanUrl"
        :href="contacts.deanUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-navy font-semibold hover:text-gold transition-colors duration-280"
      >
        {{ dean }}
        <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
      </a>
      <div v-else class="text-navy font-semibold">{{ dean }}</div>
      <div v-if="position" class="text-body-sm text-text-muted mt-0.5">{{ position }}</div>
    </div>

    <dl class="space-y-3 text-body-sm">
      <div v-if="address">
        <dt class="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-0.5">
          {{ t('university.structure.unit.addressLabel') }}
        </dt>
        <dd class="text-navy">{{ address }}</dd>
      </div>
      <div v-if="contacts.phone">
        <dt class="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-0.5">
          {{ t('university.structure.unit.phoneLabel') }}
        </dt>
        <dd>
          <a :href="`tel:${contacts.phone.replace(/[^+\d]/g, '')}`" class="text-navy hover:text-gold transition-colors duration-280">
            {{ contacts.phone }}
          </a>
        </dd>
      </div>
      <div v-if="contacts.email">
        <dt class="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-0.5">
          {{ t('university.structure.unit.emailLabel') }}
        </dt>
        <dd>
          <a :href="`mailto:${contacts.email}`" class="text-navy break-all hover:text-gold transition-colors duration-280">
            {{ contacts.email }}
          </a>
        </dd>
      </div>
    </dl>

    <div v-if="socials.length" class="mt-4 pt-4 border-t border-border">
      <div class="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-2">
        {{ t('university.structure.unit.socialsTitle') }}
      </div>
      <ul class="flex flex-wrap gap-2">
        <li v-for="social in socials" :key="social.key">
          <a
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-3 py-1 rounded-100 text-body-sm border border-border text-navy no-underline hover:border-navy transition-colors duration-280"
          >
            {{ social.label }}
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
