<script setup lang="ts">
import { JOURNALS_EXTERNAL_URL, LEGACY_SITE_URL, PSYCHOLOGICAL_SERVICE_URL } from '~/utils/externalSites'

const { t, localePath } = useSafeI18nWithRouter()
const logoUrl = '/main_logo.png'

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
  <footer class="bg-navy-deep text-white/70">
    <div class="py-16 pb-10">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
        <div>
          <div class="flex items-center gap-3 mb-5">
            <img :src="logoUrl" :alt="t('logo.alt')" class="h-[52px] max-w-none" onerror="this.style.display='none'">
            <div>
              <div class="font-playfair text-xl text-white">{{ t('logo.abbr') }}</div>
              <div class="text-[10px] text-white/50 max-w-[160px]">{{ t('logo.name') }}</div>
            </div>
          </div>
          <p class="text-[13px] leading-relaxed text-white/50 mb-6">
            {{ t('footer.desc') }}
          </p>
          <div class="flex flex-col gap-2">
            <a href="tel:+380577006909" class="text-[13px] text-white/65 no-underline hover:text-gold transition-colors duration-280">{{ t('footer.contactPhone') }}</a>
            <a :href="`mailto:${(t('utility.email') || '').replace(`{'@'}`, '@')}`" class="text-[13px] text-white/65 no-underline hover:text-gold transition-colors duration-280">{{ t('footer.contactEmail') }}</a>
            <NuxtLink :to="localePath('/university/contacts')" class="text-[13px] text-white/65 no-underline hover:text-gold transition-colors duration-280">{{ t('footer.contactAddress') }}</NuxtLink>
            <span class="text-[13px] text-white/65">{{ t('footer.contactHours') }}</span>
          </div>
          <div class="mt-5 flex gap-2">
            <a
              v-for="social in socialLinks"
              :key="social.title"
              :href="social.href"
              :aria-label="social.title"
              :title="social.title"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 border border-white/15 rounded-lg bg-white/[0.03] flex items-center justify-center text-white/60 no-underline hover:border-gold hover:text-gold hover:bg-white/[0.08] transition-all duration-200"
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-4">{{ t('footer.colUniversity') }}</div>
            <ul class="list-none flex flex-col gap-2">
              <li><NuxtLink :to="localePath('/university/history')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkAbout') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/university/rectorate')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkRectorate') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/university/structure')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkStructure') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/university/public-info')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkPublicInfo') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/university/contacts')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkContacts') }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-4">{{ t('footer.colEducation') }}</div>
            <ul class="list-none flex flex-col gap-2">
              <li><NuxtLink :to="localePath('/education/faculties')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkFaculties') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/education/programs')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkPrograms') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/student/schedule')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkSchedule') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/education/quality')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkQuality') }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-4">{{ t('footer.colScience') }}</div>
            <ul class="list-none flex flex-col gap-2">
              <li><a :href="JOURNALS_EXTERNAL_URL" target="_blank" rel="noopener noreferrer" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkPublications') }}</a></li>
              <li><NuxtLink :to="localePath('/science/library')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkLibrary') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/science/repository')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkRepository') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/science/graduate')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkGraduate') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/science/conferences')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkConferences') }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-4">{{ t('footer.colStudent') }}</div>
            <ul class="list-none flex flex-col gap-2">
              <li><NuxtLink :to="localePath('/admissions/dormitories')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkDormitories') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/student/council')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkStudentCouncil') }}</NuxtLink></li>
              <li><a :href="PSYCHOLOGICAL_SERVICE_URL" target="_blank" rel="noopener noreferrer" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkPsychology') }}</a></li>
              <li><NuxtLink :to="localePath('/student/career')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkCareer') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/university/erasmus')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkErasmus') }}</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-white/8 py-5">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/40">
        <span>{{ t('footer.copyright') }}</span>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a
            :href="LEGACY_SITE_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-100 border border-white/20 text-white/70 no-underline hover:border-gold hover:text-gold transition-all duration-280"
          >
            {{ t('footer.legacySite') }}
            <svg class="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M14 4h6v6" />
              <path d="M20 4 11 13" />
              <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
          </a>
          <NuxtLink :to="localePath('/privacy')" class="text-white/40 no-underline">{{ t('footer.privacy') }}</NuxtLink>
          <NuxtLink :to="localePath('/sitemap')" class="text-white/40 no-underline">{{ t('footer.sitemap') }}</NuxtLink>
          <NuxtLink :to="localePath('/accessibility')" class="text-white/40 no-underline">{{ t('footer.accessibility') }}</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
