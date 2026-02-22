<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()

const heroImages = ['/images/Hero2.JPG', '/images/Hero3.jpg', '/images/Hero4.jpg', '/images/Hero5.JPG']
const currentIndex = ref(0)
const nextLayerIndex = ref(1)
const showingNext = ref(false)
const FADE_DURATION_MS = 2000
const OPACITY_TRANSITION_MS = 1600
const ROTATE_INTERVAL_MS = 30000

function applySlide() {
  currentIndex.value = nextLayerIndex.value
  showingNext.value = false
  transitionTimer = setTimeout(() => {
    nextLayerIndex.value = (currentIndex.value + 1) % heroImages.length
    transitionTimer = null
  }, OPACITY_TRANSITION_MS)
}

let rotateTimer: ReturnType<typeof setInterval> | null = null
let transitionTimer: ReturnType<typeof setTimeout> | null = null

function scheduleNext() {
  rotateTimer = setInterval(() => {
    showingNext.value = true
    transitionTimer = setTimeout(() => {
      applySlide()
    }, FADE_DURATION_MS)
  }, ROTATE_INTERVAL_MS)
}

function stopRotation() {
  if (rotateTimer) clearInterval(rotateTimer)
  if (transitionTimer) clearTimeout(transitionTimer)
  rotateTimer = null
  transitionTimer = null
}

onMounted(() => {
  heroImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReducedMotion) scheduleNext()
})

onUnmounted(stopRotation)
</script>

<template>
  <section class="relative min-h-[480px] sm:min-h-[560px] max-h-[85vh] overflow-hidden bg-navy-deep">
    <div
      class="absolute inset-0 z-[1] bg-cover bg-center animate-slowZoom transition-opacity duration-[1600ms] ease-out"
      :class="showingNext ? 'opacity-0' : 'opacity-100'"
      :style="{ backgroundImage: `linear-gradient(135deg, rgba(15,30,50,0.88) 0%, rgba(27,46,75,0.6) 60%, rgba(15,30,50,0.4) 100%), url('${heroImages[currentIndex]}')` }"
    />
    <div
      class="absolute inset-0 z-0 bg-cover bg-center animate-slowZoom transition-opacity duration-[1600ms] ease-out"
      :class="showingNext ? 'opacity-100' : 'opacity-0'"
      :style="{ backgroundImage: `linear-gradient(135deg, rgba(15,30,50,0.88) 0%, rgba(27,46,75,0.6) 60%, rgba(15,30,50,0.4) 100%), url('${heroImages[nextLayerIndex]}')` }"
    />
    <div
      class="absolute inset-0 z-[2] opacity-30"
      style="background-image: repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(201,162,39,0.03) 60px, rgba(201,162,39,0.03) 61px);"
    />
    <div class="absolute bottom-0 left-0 right-0 z-[2] h-1 bg-gradient-to-r from-gold to-transparent" />
    <div class="relative z-[3] h-full flex flex-col justify-center max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-10 lg:py-14">
      <div
        class="inline-flex items-center gap-2 bg-gold/15 border border-gold/35 text-gold-light py-1.5 px-3.5 rounded-100 text-xs font-medium tracking-wider uppercase mb-6 w-fit before:content-[''] before:w-1.5 before:h-1.5 before:bg-gold before:rounded-full"
      >
        {{ t('hero.tag') }}
      </div>
      <h1 class="font-playfair text-[clamp(32px,5vw,58px)] font-bold text-white leading-tight max-w-[720px] mb-5">
        {{ t('hero.titleLine1') }}<br>
        {{ t('hero.titleLine2') }}<br>
        <template v-if="t('hero.titleLine3')">{{t('hero.titleLine3') }} </template><em class="not-italic text-gold-light"> &nbsp;{{ t('hero.titleName') }}</em>
      </h1>
      <p class="text-base text-white/65 max-w-[480px] leading-relaxed mb-10 font-light">
        {{ t('hero.subtitle') }}
      </p>
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <NuxtLink
          :to="localePath('/admissions/edebo')"
          class="py-3.5 px-8 rounded-[10px] text-[14.5px] font-semibold no-underline font-geologica transition-all duration-280 bg-gold text-navy-deep hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold-lg text-center"
        >
          {{ t('hero.ctaApply') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/university/history')"
          class="py-3.5 px-8 rounded-[10px] text-[14.5px] font-semibold no-underline font-geologica transition-all duration-280 border-[1.5px] border-white/35 text-white bg-white/5 backdrop-blur-sm hover:border-white/70 hover:bg-white/10 text-center"
        >
          {{ t('hero.ctaAbout') }}
        </NuxtLink>
      </div>
    </div>
    <div class="absolute bottom-12 right-8 z-[2] flex gap-0.5 max-lg:hidden">
      <div class="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 text-center rounded-l-[12px]">
        <div class="font-playfair text-[28px] font-bold text-gold-light leading-none mb-1">220</div>
        <div class="text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">{{ t('hero.statYears') }}</div>
      </div>
      <div class="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 text-center">
        <div class="font-playfair text-[28px] font-bold text-gold-light leading-none mb-1">8 000+</div>
        <div class="text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">{{ t('hero.statStudents') }}</div>
      </div>
      <div class="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 text-center">
        <div class="font-playfair text-[28px] font-bold text-gold-light leading-none mb-1">30+</div>
        <div class="text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">{{ t('hero.statJournals') }}</div>
      </div>
      <div class="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 text-center rounded-r-[12px]">
        <div class="font-playfair text-[28px] font-bold text-gold-light leading-none mb-1">95+</div>
        <div class="text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">{{ t('hero.statPrograms') }}</div>
      </div>
    </div>
  </section>
</template>
