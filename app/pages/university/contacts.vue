<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.contacts'),
  meta: [{ name: 'description', content: () => t('university.contacts.subtitle') }],
})

const departmentKeys = ['admissions', 'international', 'deans', 'library', 'it'] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.contacts.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.contacts.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.contacts.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Contact grid: 3 cards -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <article class="bg-white border border-border rounded-16 p-6 flex flex-col">
          <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t('university.contacts.addressTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted">
            {{ t('university.contacts.addressText') }}
          </p>
        </article>
        <article class="bg-white border border-border rounded-16 p-6 flex flex-col">
          <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t('university.contacts.phoneEmailTitle') }}
          </h2>
          <a :href="`tel:${(t('utility.phone') || '').replace(/\s/g, '')}`" class="text-body-sm text-navy no-underline hover:text-gold transition-colors">
            {{ t('utility.phone') }}
          </a>
          <a :href="`mailto:${(t('utility.email') || '').replace(`{'@'}`, '@')}`" class="text-body-sm text-navy no-underline hover:text-gold transition-colors mt-1">
            {{ t('utility.email') }}
          </a>
        </article>
        <article class="bg-white border border-border rounded-16 p-6 flex flex-col">
          <div class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round" />
              <polyline points="12 6 12 12 16 14" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h2 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t('university.contacts.hoursTitle') }}
          </h2>
          <p class="text-body-sm text-text-muted">
            {{ t('university.contacts.hoursText') }}
          </p>
        </article>
      </div>

      <!-- Map placeholder -->
      <div class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-video flex items-center justify-center relative mb-12">
        <svg
          class="w-16 h-16 text-gold/40 absolute"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <!-- Departments list: bg-off-white -->
      <div class="bg-off-white rounded-16 p-6 lg:p-8">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
          {{ t('university.contacts.departmentsTitle') }}
        </h2>
        <ul class="space-y-4">
          <li
            v-for="key in departmentKeys"
            :key="key"
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-border last:border-b-0"
          >
            <span class="font-medium text-navy">
              {{ t(`university.contacts.departments.${key}.name`) }}
            </span>
            <div class="flex flex-wrap gap-4 text-body-sm text-text-muted">
              <a :href="`tel:${(t(`university.contacts.departments.${key}.phone`) || '').replace(/\s/g, '')}`" class="no-underline hover:text-gold transition-colors">
                {{ t(`university.contacts.departments.${key}.phone`) }}
              </a>
              <span>{{ t(`university.contacts.departments.${key}.room`) }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
