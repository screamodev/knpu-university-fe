<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
const logoUrl = '/logo.png'
</script>

<template>
  <footer class="bg-navy-deep text-white/70">
    <div class="py-16 pb-10">
      <div class="max-w-container mx-auto px-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
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
            <a href="tel:+380577000238" class="text-[13px] text-white/65 no-underline hover:text-gold transition-colors duration-280">{{ t('footer.contactPhone') }}</a>
            <a href="mailto:rector@hnpu.edu.ua" class="text-[13px] text-white/65 no-underline hover:text-gold transition-colors duration-280">{{ t('footer.contactEmail') }}</a>
            <NuxtLink :to="localePath('/university/contacts')" class="text-[13px] text-white/65 no-underline hover:text-gold transition-colors duration-280">{{ t('footer.contactAddress') }}</NuxtLink>
            <span class="text-[13px] text-white/65">{{ t('footer.contactHours') }}</span>
          </div>
          <div class="mt-5 flex gap-2">
            <a href="#" class="w-9 h-9 border border-white/15 rounded-lg flex items-center justify-center text-white/60 text-sm no-underline hover:border-gold hover:text-gold transition-all duration-200">f</a>
            <a href="#" class="w-9 h-9 border border-white/15 rounded-lg flex items-center justify-center text-white/60 text-sm no-underline hover:border-gold hover:text-gold transition-all duration-200">▶</a>
            <a href="#" class="w-9 h-9 border border-white/15 rounded-lg flex items-center justify-center text-white/60 text-sm no-underline hover:border-gold hover:text-gold transition-all duration-200">✈</a>
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
              <li><NuxtLink :to="localePath('/student/moodle')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkMoodle') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/education/quality')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkQuality') }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-4">{{ t('footer.colScience') }}</div>
            <ul class="list-none flex flex-col gap-2">
              <li><NuxtLink :to="localePath('/science/journals')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkPublications') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/science/library')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkLibrary') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/science/repository')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkRepository') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/science/graduate')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkGraduate') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/science/conferences')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkConferences') }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <div class="text-[11px] font-semibold tracking-widest uppercase text-gold mb-4">{{ t('footer.colStudent') }}</div>
            <ul class="list-none flex flex-col gap-2">
              <li><NuxtLink :to="localePath('/student/dormitories')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkDormitories') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/student/council')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkStudentCouncil') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/student/psychology')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkPsychology') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/student/career')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkCareer') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/university/erasmus')" class="text-[13px] text-white/60 no-underline hover:text-white/95 transition-colors duration-280 leading-snug">{{ t('footer.linkErasmus') }}</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-white/8 py-5">
      <div class="max-w-container mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/40">
        <span>{{ t('footer.copyright') }}</span>
        <div class="flex gap-4">
          <NuxtLink :to="localePath('/privacy')" class="text-white/40 no-underline">{{ t('footer.privacy') }}</NuxtLink>
          <NuxtLink :to="localePath('/sitemap')" class="text-white/40 no-underline">{{ t('footer.sitemap') }}</NuxtLink>
          <NuxtLink :to="localePath('/accessibility')" class="text-white/40 no-underline">{{ t('footer.accessibility') }}</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
