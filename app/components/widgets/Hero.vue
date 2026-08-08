<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()

const heroImages = ['/images/Hero2.JPG', '/images/Hero3.jpg', '/images/Hero4.jpg', '/images/Hero5.JPG']
const currentIndex = ref(0)
const nextLayerIndex = ref(1)
const showingNext = ref(false)
const FADE_DURATION_MS = 2000
const OPACITY_TRANSITION_MS = 1600
const ROTATE_INTERVAL_MS = 30000

const heroStats = computed(() => [
  {
    value: t('hero.statGraduatesValue'),
    label: t('hero.statGraduatesLabel'),
  },
  {
    value: t('hero.statSpecialtiesValue'),
    label: t('hero.statSpecialtiesLabel'),
  },
  {
    value: t('hero.statProgramsValue'),
    label: t('hero.statProgramsLabel'),
  },
])

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
  <!--
    Cap hero height so 4K / tall viewports don't center content below the fold.
    Chrome ≈ UtilityBar (~2rem) + AppHeader (76px). Content layer is never clipped.
  -->
  <section
    class="relative flex flex-col bg-navy-deep min-h-[480px] sm:min-h-[560px] lg:min-h-[min(40rem,calc(100dvh-7rem))] xl:min-h-[min(42rem,calc(100dvh-7rem))]"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
    </div>

    <div
      class="relative z-[3] flex flex-1 flex-col justify-center max-w-container mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 [@media(max-height:780px)]:py-6"
    >
      <div
        class="inline-flex items-center gap-2 bg-gold/15 border border-gold/35 text-gold-light py-1.5 px-3.5 rounded-100 text-xs font-medium tracking-wider uppercase mb-4 sm:mb-5 [@media(max-height:780px)]:mb-3 w-fit before:content-[''] before:w-1.5 before:h-1.5 before:bg-gold before:rounded-full"
      >
        {{ t('hero.tag') }}
      </div>
      <h1
        class="font-playfair text-[clamp(28px,2.2vw_+_1rem,52px)] font-bold text-white leading-[1.15] max-w-[720px] mb-3 sm:mb-4"
      >
        {{ t('hero.titleLine1') }}<br>
        {{ t('hero.titleLine2') }}<br>
        <template v-if="t('hero.titleLine3')">{{ t('hero.titleLine3') }} </template><em class="not-italic text-gold-light"> &nbsp;{{ t('hero.titleName') }}</em>
      </h1>
      <p
        class="text-[15px] sm:text-base text-white/65 max-w-[480px] leading-relaxed mb-6 sm:mb-8 [@media(max-height:780px)]:mb-5 font-light"
      >
        {{ t('hero.subtitle') }}
      </p>
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <NuxtLink
          :to="localePath('/admissions/edebo')"
          class="py-3 sm:py-3.5 px-8 rounded-[10px] text-[14.5px] font-semibold no-underline font-geologica transition-all duration-280 bg-gold text-navy-deep hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold-lg text-center"
        >
          {{ t('hero.ctaApply') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/university/history')"
          class="py-3 sm:py-3.5 px-8 rounded-[10px] text-[14.5px] font-semibold no-underline font-geologica transition-all duration-280 border-[1.5px] border-white/35 text-white bg-white/5 backdrop-blur-sm hover:border-white/70 hover:bg-white/10 text-center"
        >
          {{ t('hero.ctaAbout') }}
        </NuxtLink>
      </div>

      <!-- Stats: in-flow on small screens -->
      <div
        class="mt-10 flex w-full max-w-xl overflow-hidden rounded-12 border border-white/10 bg-white/5 backdrop-blur-md lg:hidden"
        role="list"
      >
        <div
          v-for="(stat, index) in heroStats"
          :key="stat.label"
          class="flex-1 py-3.5 px-3 text-center"
          :class="index > 0 ? 'border-l border-white/10' : ''"
          role="listitem"
        >
          <div class="font-playfair text-[22px] sm:text-[26px] font-bold text-gold-light leading-none mb-1">
            {{ stat.value }}
          </div>
          <div class="text-[10px] sm:text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Stats: bottom-right on large screens -->
    <div
      class="absolute bottom-10 right-6 xl:right-10 z-[3] hidden lg:flex overflow-hidden rounded-12 border border-white/10 bg-white/5 backdrop-blur-md"
      role="list"
    >
      <div
        v-for="(stat, index) in heroStats"
        :key="`desktop-${stat.label}`"
        class="py-4 px-6 text-center min-w-[7.5rem]"
        :class="index > 0 ? 'border-l border-white/10' : ''"
        role="listitem"
      >
        <div class="font-playfair text-[28px] font-bold text-gold-light leading-none mb-1">
          {{ stat.value }}
        </div>
        <div class="text-[11px] text-white/55 font-normal leading-snug whitespace-pre-line">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </section>
</template>
