<script setup lang="ts">
const { t, localePath, switchLocalePath, locale } = useSafeI18nWithRouter()
const { open: openSearch } = useSearch()

type SocialIcon = 'instagram' | 'youtube' | 'telegram' | 'facebook'

const socialLinks = [
  { title: 'Instagram', href: 'https://www.instagram.com/sk.times/?utm_source=ig_profile_share&igshid=sq991sb25cc5', icon: 'instagram' as SocialIcon },
  { title: 'YouTube', href: 'https://www.youtube.com/channel/UCDJGXeqlVlbcn26Yy7Y2gQg?view_as=subscriber', icon: 'youtube' as SocialIcon },
  { title: 'Telegram', href: 'https://web.telegram.org/#/im?p=@Skovoroda_university', icon: 'telegram' as SocialIcon },
  { title: 'Facebook', href: 'https://www.facebook.com/KhNPU', icon: 'facebook' as SocialIcon },
] as const
</script>

<template>
  <div class="bg-navy-deep py-[7px] text-[12.5px] text-white/75 max-lg:hidden">
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      <div class="flex items-center gap-5 min-w-0">
        <a
          :href="`tel:${(t('utility.phone') || '').replace(/\s/g, '')}`"
          class="flex items-center gap-1.5 shrink-0 text-white/70 hover:text-gold-light transition-colors duration-280"
        >
          <svg class="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.63 4.35 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {{ t('utility.phone') }}
        </a>
        <a
          :href="`mailto:${(t('utility.email') || '').replace(`{'@'}`, '@')}`"
          class="flex items-center gap-1.5 shrink-0 text-white/70 hover:text-gold-light transition-colors duration-280"
        >
          <svg class="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {{ t('utility.email') }}
        </a>
        <span class="flex items-center gap-1.5 shrink-0 text-white/70">
          <svg class="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {{ t('utility.hours') }}
        </span>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <!--
          Styled as a field rather than an icon: an icon alone was easy to miss, and a box with a
          placeholder reads as "you can type here". It opens the overlay, which owns the real input.
        -->
        <button
          type="button"
          class="group flex items-center gap-2 w-[180px] xl:w-[230px] h-[28px] px-3 rounded-[10px] border border-white/20 bg-white/[0.06] text-white/55 hover:border-gold hover:bg-white/[0.12] hover:text-white/80 transition-all duration-280 cursor-text"
          :aria-label="t('search.open')"
          @click="openSearch"
        >
          <svg class="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span class="text-[12px] truncate">{{ t('search.placeholder') }}</span>
          <kbd class="ml-auto hidden xl:block text-[10px] font-geologica border border-white/20 rounded px-1 py-px text-white/40 group-hover:text-white/60">
            {{ t('search.shortcut') }}
          </kbd>
        </button>

        <div class="flex gap-2">
          <a
            v-for="social in socialLinks"
            :key="social.title"
            :href="social.href"
            :title="social.title"
            :aria-label="social.title"
            target="_blank"
            rel="noopener noreferrer"
            class="w-[28px] h-[28px] rounded-[10px] border border-white/20 bg-white/[0.03] flex items-center justify-center text-white/65 hover:border-gold hover:text-gold hover:bg-white/[0.08] transition-all duration-280"
          >
            <svg v-if="social.icon === 'instagram'" class="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
            <svg v-else-if="social.icon === 'youtube'" class="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="2.5" y="6.5" width="19" height="11" rx="3.2" />
              <path d="M10 9.3l5 2.7-5 2.7V9.3z" fill="currentColor" stroke="none" />
            </svg>
            <svg v-else-if="social.icon === 'telegram'" class="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <path d="M21 4L3.8 10.9c-1.1.4-1 1.9.1 2.2l4.5 1.5 1.7 4.9c.4 1.1 1.9 1.2 2.4.2L21 4z" />
              <path d="M8.3 14.3l8.6-7.5" />
            </svg>
            <svg v-else class="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 8h3V4h-3c-3.3 0-6 2.7-6 6v3H5v4h3v5h4v-5h4l1-4h-5v-3c0-1.1.9-2 2-2z" />
            </svg>
          </a>
        </div>
        <NuxtLink :to="localePath('/feedback')" class="text-[12px] text-white/65 hover:text-gold-light transition-colors duration-280 whitespace-nowrap">
          {{ t('utility.feedback') }}
        </NuxtLink>
        <div class="flex border border-white/20 rounded overflow-hidden shrink-0">
          <NuxtLink
            :to="switchLocalePath('uk')"
            class="px-2 py-0.5 text-[11.5px] font-medium transition-all duration-280"
            :class="locale === 'uk' ? 'bg-gold text-navy-deep' : 'text-white/60 hover:bg-white/10 hover:text-white'"
          >
            {{ t('utility.langUk') }}
          </NuxtLink>
          <NuxtLink
            :to="switchLocalePath('en')"
            class="px-2 py-0.5 text-[11.5px] font-medium transition-all duration-280"
            :class="locale === 'en' ? 'bg-gold text-navy-deep' : 'text-white/60 hover:bg-white/10 hover:text-white'"
          >
            {{ t('utility.langEn') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
