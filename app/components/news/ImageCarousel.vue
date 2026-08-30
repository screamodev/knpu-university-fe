<script setup lang="ts">
export interface CarouselImage {
  src: string
  alt: string
  key?: string
}

const props = defineProps<{
  images: CarouselImage[]
  /** Accessible name for the carousel region. */
  label?: string
}>()

const { t } = useSafeI18nWithRouter()

const activeIndex = ref(0)

const hasMultiple = computed(() => props.images.length > 1)

watch(
  () => props.images.length,
  () => {
    if (activeIndex.value >= props.images.length) {
      activeIndex.value = Math.max(0, props.images.length - 1)
    }
  },
)

const track = ref<HTMLElement | null>(null)

/** Ширина однієї світлини разом із проміжком — крок гортання. */
function step(): number {
  const first = track.value?.firstElementChild as HTMLElement | undefined
  if (!first) return track.value?.clientWidth ?? 0
  const gap = Number.parseFloat(getComputedStyle(track.value!).columnGap || '0') || 0
  return first.clientWidth + gap
}

function goTo(index: number): void {
  if (!hasMultiple.value) return
  const count = props.images.length
  const next = ((index % count) + count) % count
  activeIndex.value = next
  track.value?.scrollTo({ left: next * step(), behavior: 'smooth' })
}

function goPrev(): void {
  goTo(activeIndex.value - 1)
}

function goNext(): void {
  goTo(activeIndex.value + 1)
}

/** Гортати можна й пальцем — крапки мають іти за смугою, а не лише за кнопками. */
function onScroll(): void {
  const width = step()
  if (!track.value || width <= 0) return
  activeIndex.value = Math.round(track.value.scrollLeft / width)
}

function onKeydown(event: KeyboardEvent): void {
  if (!hasMultiple.value) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    goPrev()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    goNext()
  }
}

</script>

<template>
  <div v-if="images.length === 1" class="w-full">
    <img
      :src="images[0]!.src"
      :alt="images[0]!.alt"
      class="w-full rounded-12 object-cover h-72 sm:h-80 lg:h-[28rem]"
    />
  </div>

  <div
    v-else-if="images.length > 1"
    class="relative w-full select-none"
    role="region"
    :aria-roledescription="t('news.carousel.role')"
    :aria-label="label || t('news.carousel.label')"
    tabindex="0"
    @keydown="onKeydown"
  >
    <div class="relative rounded-12 bg-slate-100">
      <!--
        Смуга прокрутки зі snap замість зсуву на 100%: так у кадр стає дві-три світлини на
        ширших екранах і одна на телефоні, без обрахунку ширини в JS.
      -->
      <div
        ref="track"
        class="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll.passive="onScroll"
      >
        <figure
          v-for="(image, index) in images"
          :key="image.key ?? `${image.src}-${index}`"
          class="snap-start shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-72 sm:h-80 lg:h-[28rem] object-cover rounded-12"
            :loading="index < 3 ? 'eager' : 'lazy'"
          />
        </figure>
      </div>

      <button
        type="button"
        class="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-10 bg-navy/75 text-white backdrop-blur-sm transition-colors duration-280 hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        :aria-label="t('news.carousel.prev')"
        @click="goPrev"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-10 bg-navy/75 text-white backdrop-blur-sm transition-colors duration-280 hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        :aria-label="t('news.carousel.next')"
        @click="goNext"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>

    <div class="mt-4 flex items-center justify-center gap-2" role="tablist" :aria-label="t('news.carousel.dots')">
      <button
        v-for="(image, index) in images"
        :key="`dot-${image.key ?? index}`"
        type="button"
        role="tab"
        class="h-2.5 w-2.5 rounded-full transition-colors duration-280 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        :class="index === activeIndex ? 'bg-navy' : 'bg-slate-300 hover:bg-slate-400'"
        :aria-label="t('news.carousel.goTo', { n: index + 1 })"
        :aria-selected="index === activeIndex"
        @click="goTo(index)"
      />
    </div>

    <p class="sr-only" aria-live="polite">
      {{ t('news.carousel.status', { current: activeIndex + 1, total: images.length }) }}
    </p>
  </div>
</template>
