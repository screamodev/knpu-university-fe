<script setup lang="ts">
import type { LegacyBlock } from '~/types/news'
import { resolveMediaAlt, resolveMediaSrc } from '~/utils/directusMedia'

interface CarouselImage {
  src: string
  alt: string
  key?: string
}

const props = defineProps<{
  blocks: LegacyBlock[]
}>()

const { mediaResolvers } = useMediaResolvers()

function blockImageSrc(image: NonNullable<LegacyBlock['image']>): string {
  return resolveMediaSrc(image, mediaResolvers)
}

function blockImageAlt(image: NonNullable<LegacyBlock['image']>): string {
  return resolveMediaAlt(image, '')
}

type RenderSegment =
  | { kind: 'block'; block: LegacyBlock; key: string }
  | { kind: 'carousel'; images: CarouselImage[]; key: string }

const renderSegments = computed((): RenderSegment[] => {
  const segments: RenderSegment[] = []
  let index = 0

  while (index < props.blocks.length) {
    const block = props.blocks[index]!

    if (block.type === 'image' && block.image && blockImageSrc(block.image)) {
      const images: CarouselImage[] = []
      let cursor = index

      while (cursor < props.blocks.length) {
        const current = props.blocks[cursor]!
        if (current.type !== 'image' || !current.image) break
        const src = blockImageSrc(current.image)
        if (!src) break
        images.push({
          src,
          alt: blockImageAlt(current.image),
          key: `img-${cursor}`,
        })
        cursor += 1
      }

      if (images.length >= 2) {
        segments.push({
          kind: 'carousel',
          images,
          key: `carousel-${index}`,
        })
      } else {
        segments.push({
          kind: 'block',
          block,
          key: `block-${index}`,
        })
      }

      index = cursor
      continue
    }

    segments.push({
      kind: 'block',
      block,
      key: `block-${index}`,
    })
    index += 1
  }

  return segments
})
</script>

<template>
  <div class="prose prose-navy max-w-none">
    <template v-for="segment in renderSegments" :key="segment.key">
      <div v-if="segment.kind === 'carousel'" class="not-prose my-6">
        <NewsImageCarousel :images="segment.images" />
      </div>

      <NewsRichTextBlock
        v-else
        :block="segment.block"
      />
    </template>
  </div>
</template>
