<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useSeoMeta({
  title: () => t('seo.admissionsAsk.title'),
  description: () => t('seo.admissionsAsk.description'),
})

function decodeMail(display: string): string {
  return display.replace(/\{'@'\}/g, '@')
}

function mailHref(localized: string): string {
  return `mailto:${decodeMail(localized)}`
}

const committeeMail = computed(() => mailHref(t('standalonePages.admissionsAsk.committeeEmailAddress')))
const consultMail = computed(() => mailHref(t('standalonePages.admissionsAsk.consultEmailAddress')))
const telHref = (raw: string) => `tel:${raw.replace(/\s/g, '')}`
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('standalonePages.admissionsAsk.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('standalonePages.admissionsAsk.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('standalonePages.admissionsAsk.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      <p class="text-body text-text-muted max-w-3xl">
        {{ t('standalonePages.admissionsAsk.intro') }}
      </p>

      <article class="border border-border rounded-16 p-6 md:p-8 bg-off-white/50">
        <h2 class="font-playfair text-xl font-semibold text-navy mb-6">
          {{ t('standalonePages.admissionsAsk.committeeTitle') }}
        </h2>
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-body-sm">
          <div>
            <dt class="text-text-muted mb-1">{{ t('standalonePages.admissionsAsk.committeeEmailCaption') }}</dt>
            <dd>
              <a :href="committeeMail" class="font-medium text-gold hover:text-gold-light no-underline">
                {{ decodeMail(t('standalonePages.admissionsAsk.committeeEmailAddress')) }}
              </a>
            </dd>
          </div>
          <div>
            <dt class="text-text-muted mb-1">{{ t('standalonePages.admissionsAsk.committeePhoneCaption') }}</dt>
            <dd>
              <a
                :href="telHref(t('standalonePages.admissionsAsk.committeePhoneNumber'))"
                class="font-medium text-navy hover:text-gold no-underline"
              >
                {{ t('standalonePages.admissionsAsk.committeePhoneNumber') }}
              </a>
            </dd>
          </div>
          <div class="md:col-span-2">
            <dt class="text-text-muted mb-1">{{ t('standalonePages.admissionsAsk.secretaryTitle') }}</dt>
            <dd class="font-medium text-navy">{{ t('standalonePages.admissionsAsk.secretaryName') }}</dd>
          </div>
        </dl>

        <h3 class="font-playfair text-lg font-semibold text-navy mt-8 mb-4">
          {{ t('standalonePages.admissionsAsk.deputyBlockTitle') }}
        </h3>
        <div class="space-y-6">
          <div>
            <p class="text-body-sm text-text-muted mb-2">{{ t('standalonePages.admissionsAsk.deputyGeneralRole') }}</p>
            <p class="text-body-sm font-medium text-navy">
              {{ t('standalonePages.admissionsAsk.deputyGeneralPhoneCaption') }}:
              <a
                :href="telHref(t('standalonePages.admissionsAsk.deputyGeneralPhoneNumber'))"
                class="text-gold hover:text-gold-light no-underline"
              >
                {{ t('standalonePages.admissionsAsk.deputyGeneralPhoneNumber') }}
              </a>
            </p>
          </div>
          <div>
            <p class="text-body-sm text-text-muted mb-2">{{ t('standalonePages.admissionsAsk.deputyVoucherRole') }}</p>
            <p class="text-body-sm font-medium text-navy">
              {{ t('standalonePages.admissionsAsk.deputyVoucherPhoneCaption') }}:
              <a
                :href="telHref(t('standalonePages.admissionsAsk.deputyVoucherPhoneNumber'))"
                class="text-gold hover:text-gold-light no-underline"
              >
                {{ t('standalonePages.admissionsAsk.deputyVoucherPhoneNumber') }}
              </a>
            </p>
          </div>
        </div>

        <h3 class="font-playfair text-lg font-semibold text-navy mt-8 mb-2">
          {{ t('standalonePages.admissionsAsk.winterCoordinatorTitle') }}
        </h3>
        <p class="text-body-sm text-navy">{{ t('standalonePages.admissionsAsk.winterCoordinatorName') }}</p>
        <p class="text-body-sm text-navy mt-2">
          {{ t('standalonePages.admissionsAsk.winterCoordinatorPhoneCaption') }}:
          <a
            :href="telHref(t('standalonePages.admissionsAsk.winterCoordinatorPhoneNumber'))"
            class="text-gold hover:text-gold-light no-underline ml-1"
          >
            {{ t('standalonePages.admissionsAsk.winterCoordinatorPhoneNumber') }}
          </a>
        </p>
        <p class="text-body-sm text-text-muted mt-4 max-w-prose">{{ t('standalonePages.admissionsAsk.winterHours') }}</p>
      </article>

      <article class="border border-border rounded-16 p-6 md:p-8">
        <h2 class="font-playfair text-xl font-semibold text-navy mb-4">
          {{ t('standalonePages.admissionsAsk.consultTitle') }}
        </h2>
        <dl class="space-y-4 text-body-sm">
          <div>
            <dt class="text-text-muted mb-1">{{ t('standalonePages.admissionsAsk.consultAddressLabel') }}</dt>
            <dd class="text-navy">{{ t('standalonePages.admissionsAsk.consultAddress') }}</dd>
          </div>
          <div>
            <dt class="text-text-muted mb-1">{{ t('standalonePages.admissionsAsk.consultHoursCaption') }}</dt>
            <dd class="text-navy">{{ t('standalonePages.admissionsAsk.consultHours') }}</dd>
          </div>
          <div>
            <dt class="text-text-muted mb-1">{{ t('standalonePages.admissionsAsk.consultEmailCaption') }}</dt>
            <dd>
              <a :href="consultMail" class="font-medium text-gold hover:text-gold-light no-underline">
                {{ decodeMail(t('standalonePages.admissionsAsk.consultEmailAddress')) }}
              </a>
            </dd>
          </div>
          <div>
            <dt class="text-text-muted mb-1">{{ t('standalonePages.admissionsAsk.consultHeadCaption') }}</dt>
            <dd class="text-navy">{{ t('standalonePages.admissionsAsk.consultHeadName') }}</dd>
          </div>
          <div>
            <dt class="text-text-muted mb-1">{{ t('standalonePages.admissionsAsk.consultLecturerCaption') }}</dt>
            <dd class="text-navy">{{ t('standalonePages.admissionsAsk.consultLecturerName') }}</dd>
            <dd class="mt-1 text-navy">
              {{ t('standalonePages.admissionsAsk.consultLecturerPhoneCaption') }}:
              <a
                :href="telHref(t('standalonePages.admissionsAsk.consultLecturerPhoneNumber'))"
                class="text-gold hover:text-gold-light no-underline ml-1"
              >
                {{ t('standalonePages.admissionsAsk.consultLecturerPhoneNumber') }}
              </a>
            </dd>
          </div>
        </dl>

        <h3 class="font-playfair text-lg font-semibold text-navy mt-8 mb-3">
          {{ t('standalonePages.admissionsAsk.consultDocsTitle') }}
        </h3>
        <ul class="list-disc pl-5 text-body-sm text-text-muted space-y-2">
          <li>{{ t('standalonePages.admissionsAsk.consultDocPassport') }}</li>
          <li>{{ t('standalonePages.admissionsAsk.consultDocPhotos') }}</li>
        </ul>
      </article>

      <p class="text-body-sm text-text-muted max-w-3xl">{{ t('standalonePages.admissionsAsk.contactsNotice') }}</p>

      <div class="flex flex-wrap items-center gap-4">
        <NuxtLink
          :to="localePath('/admissions/edebo')"
          class="inline-flex items-center justify-center rounded-12 px-5 py-2.5 bg-gold text-navy font-medium text-body-sm no-underline hover:bg-gold-light transition-colors"
        >
          {{ t('nav.admissions.edebo') }}
        </NuxtLink>
        <p class="text-body-sm text-text-muted max-w-xl">{{ t('standalonePages.admissionsAsk.toEdeboHint') }}</p>
      </div>
    </div>
  </div>
</template>
