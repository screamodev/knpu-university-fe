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
const touchStartX = ref<number | null>(null)

const hasMultiple = computed(() => props.images.length > 1)

watch(
  () => props.images.length,
  () => {
    if (activeIndex.value >= props.images.length) {
      activeIndex.value = Math.max(0, props.images.length - 1)
    }
  },
)

function goTo(index: number): void {
  if (!hasMultiple.value) return
  const count = props.images.length
  activeIndex.value = ((index % count) + count) % count
}

function goPrev(): void {
  goTo(activeIndex.value - 1)
}

function goNext(): void {
  goTo(activeIndex.value + 1)
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

function onTouchStart(event: TouchEvent): void {
  touchStartX.value = event.changedTouches[0]?.clientX ?? null
}

function onTouchEnd(event: TouchEvent): void {
  if (touchStartX.value == null || !hasMultiple.value) return
  const endX = event.changedTouches[0]?.clientX ?? touchStartX.value
  const delta = endX - touchStartX.value
  touchStartX.value = null
  if (Math.abs(delta) < 48) return
  if (delta > 0) goPrev()
  else goNext()
}
</script>

<template>
  <div v-if="images.length === 1" class="w-full">
    <img
      :src="images[0]!.src"
      :alt="images[0]!.alt"
      class="w-full rounded-12 object-cover max-h-[32rem]"
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
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="relative overflow-hidden rounded-12 bg-slate-100">
      <div
        class="flex transition-transform duration-280 ease-out"
        :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
      >
        <figure
          v-for="(image, index) in images"
          :key="image.key ?? `${image.src}-${index}`"
          class="w-full shrink-0"
          :aria-hidden="index !== activeIndex"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full object-cover max-h-[32rem]"
            :loading="index === 0 ? 'eager' : 'lazy'"
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
