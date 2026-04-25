<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.press'),
  meta: [{ name: 'description', content: () => t('university.press.subtitle') }],
})

const serviceKeys = ['releases', 'accreditation', 'experts', 'brand'] as const

type SocialIcon = 'instagram' | 'youtube' | 'telegram' | 'facebook' | 'facebook-group'

const socialLinks = [
  { title: 'Instagram', href: 'https://www.instagram.com/sk.times/?utm_source=ig_profile_share&igshid=sq991sb25cc5', icon: 'instagram' as SocialIcon },
  { title: 'YouTube', href: 'https://www.youtube.com/channel/UCDJGXeqlVlbcn26Yy7Y2gQg?view_as=subscriber', icon: 'youtube' as SocialIcon },
  { title: 'Telegram', href: 'https://web.telegram.org/#/im?p=@Skovoroda_university', icon: 'telegram' as SocialIcon },
  { title: 'Facebook', href: 'https://www.facebook.com/KhNPU', icon: 'facebook' as SocialIcon },
  { title: 'Facebook Group', href: 'https://www.facebook.com/groups/1029347057130340/', icon: 'facebook-group' as SocialIcon },
] as const
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('university.press.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('university.press.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('university.press.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Intro 2-col: text + placeholder image -->
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <p class="text-body text-text-muted">
          {{ t('university.press.intro') }}
        </p>
        <div
          class="rounded-16 overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep aspect-[4/3] flex items-center justify-center shrink-0"
        >
          <svg
            class="w-16 h-16 text-gold/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Services grid: 2x2 -->
      <h2 class="font-playfair text-2xl font-bold text-navy mb-8">
        {{ t('university.press.servicesTitle') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
        <article
          v-for="key in serviceKeys"
          :key="key"
          class="bg-white border border-border rounded-16 p-6 flex flex-col transition-all duration-280 hover:border-gold/40"
        >
          <div
            class="w-12 h-12 rounded-12 bg-gold/15 flex items-center justify-center mb-4"
            aria-hidden
          >
            <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="font-playfair text-lg font-semibold text-navy mb-2">
            {{ t(`university.press.services.${key}.title`) }}
          </h3>
          <p class="text-body-sm text-text-muted">
            {{ t(`university.press.services.${key}.text`) }}
          </p>
        </article>
      </div>

      <!-- Contact block: callout card -->
      <div class="bg-slate-50 border border-border rounded-16 p-8 lg:p-10">
        <h2 class="font-playfair text-2xl font-bold text-navy mb-6">
          {{ t('university.press.contactTitle') }}
        </h2>
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
          <div class="flex items-center gap-3">
            <div
              class="w-14 h-14 rounded-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center shrink-0"
              aria-hidden
            >
              <span class="text-gold/60 font-playfair text-xl font-bold">
                {{ t('university.press.contact.name').charAt(0) }}
              </span>
            </div>
            <div>
              <p class="font-playfair text-lg font-semibold text-navy">
                {{ t('university.press.contact.name') }}
              </p>
              <p class="text-body-sm text-text-muted">
                {{ t('university.press.contact.position') }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap gap-6 text-body-sm">
            <a
              :href="`tel:${(t('utility.phone') || '').replace(/\s/g, '')}`"
              class="text-navy no-underline hover:text-gold transition-colors"
            >
              {{ t('university.press.contact.phone') }}: {{ t('utility.phone') }}
            </a>
            <a
              :href="`mailto:${(t('university.press.contactEmailAddress') || '').replace(`{'@'}`, '@')}`"
              class="text-navy no-underline hover:text-gold transition-colors"
            >
              {{ t('university.press.contact.email') }}: {{ t('university.press.contactEmailAddress') }}
            </a>
          </div>
        </div>
        <div class="mt-6 flex gap-2">
          <a
            v-for="social in socialLinks"
            :key="social.title"
            :href="social.href"
            :aria-label="social.title"
            :title="social.title"
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 border border-border rounded-lg bg-white flex items-center justify-center text-text-muted hover:border-gold hover:text-gold transition-all duration-280"
          >
            <svg v-if="social.icon === 'instagram'" class="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
            <svg v-else-if="social.icon === 'youtube'" class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="2.5" y="6.5" width="19" height="11" rx="3.2" />
              <path d="M10 9.3l5 2.7-5 2.7V9.3z" fill="currentColor" stroke="none" />
            </svg>
            <svg v-else-if="social.icon === 'telegram'" class="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <path d="M21 4L3.8 10.9c-1.1.4-1 1.9.1 2.2l4.5 1.5 1.7 4.9c.4 1.1 1.9 1.2 2.4.2L21 4z" />
              <path d="M8.3 14.3l8.6-7.5" />
            </svg>
            <svg v-else-if="social.icon === 'facebook'" class="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 8h3V4h-3c-3.3 0-6 2.7-6 6v3H5v4h3v5h4v-5h4l1-4h-5v-3c0-1.1.9-2 2-2z" />
            </svg>
            <svg v-else class="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="9" cy="9" r="3" />
              <circle cx="16.5" cy="10.5" r="2.5" />
              <path d="M3.5 19c.7-2.7 2.9-4.5 5.5-4.5s4.8 1.8 5.5 4.5" />
              <path d="M13.5 19c.5-1.9 2-3.2 3.8-3.2 1.2 0 2.3.6 3.2 1.8" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
