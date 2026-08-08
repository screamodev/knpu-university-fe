<script setup lang="ts">
import type { LegacyBlock, LegacyBlockChild } from '~/types/news'
import { resolveMediaAlt, resolveMediaSrc } from '~/utils/directusMedia'

defineProps<{
  block: LegacyBlock
}>()


const { mediaResolvers } = useMediaResolvers()

function blockImageSrc(image: NonNullable<LegacyBlock['image']>): string {
  return resolveMediaSrc(image, mediaResolvers)
}

function blockImageAlt(image: NonNullable<LegacyBlock['image']>): string {
  return resolveMediaAlt(image, '')
}

function renderText(child: LegacyBlockChild): string {
  return decodeHtmlEntities(child.text ?? '')
}

const headingTag: Record<number, string> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}
</script>

<template>
  <!-- Paragraph -->
  <p
    v-if="block.type === 'paragraph'"
    class="mb-4 leading-relaxed text-slate-700"
    :class="{
      'text-center': block.textAlign === 'center',
      'text-right': block.textAlign === 'right',
      'text-justify': block.textAlign === 'justify',
    }"
  >
    <template v-for="(child, j) in block.children" :key="j">
      <a
        v-if="child.type === 'link'"
        :href="child.url"
        target="_blank"
        rel="noopener noreferrer"
        class="font-semibold text-navy underline decoration-gold decoration-[1.5px] underline-offset-[3px] hover:text-gold transition-colors duration-280"
      >
        <template v-for="(linkChild, k) in child.children ?? []" :key="k">
          <strong v-if="linkChild.bold">{{ renderText(linkChild) }}</strong>
          <em v-else-if="linkChild.italic">{{ renderText(linkChild) }}</em>
          <template v-else>{{ renderText(linkChild) }}</template>
        </template>
      </a>
      <strong v-else-if="child.bold" class="font-semibold text-slate-900">{{ renderText(child) }}</strong>
      <em v-else-if="child.italic">{{ renderText(child) }}</em>
      <u v-else-if="child.underline">{{ renderText(child) }}</u>
      <s v-else-if="child.strikethrough">{{ renderText(child) }}</s>
      <code
        v-else-if="child.code"
        class="bg-slate-100 text-navy px-1.5 py-0.5 rounded text-sm font-mono"
      >{{ renderText(child) }}</code>
      <template v-else>{{ renderText(child) }}</template>
    </template>
  </p>

  <!-- Heading -->
  <component
    :is="headingTag[block.level ?? 2] ?? 'h2'"
    v-else-if="block.type === 'heading'"
    class="font-playfair font-bold text-navy mt-8 mb-3"
    :class="{
      'text-3xl': block.level === 1,
      'text-2xl': block.level === 2,
      'text-xl': block.level === 3,
      'text-lg': (block.level ?? 0) >= 4,
      'text-center': block.textAlign === 'center',
      'text-right': block.textAlign === 'right',
      'text-justify': block.textAlign === 'justify',
    }"
  >
    <template v-for="(child, j) in block.children" :key="j">{{ renderText(child) }}</template>
  </component>

  <!-- Ordered list -->
  <ol
    v-else-if="block.type === 'list' && block.format === 'ordered'"
    class="list-decimal list-inside mb-4 space-y-1 text-slate-700"
  >
    <li v-for="(item, j) in block.children" :key="j">
      <template v-for="(child, k) in item.children ?? []" :key="k">
        <strong v-if="child.bold" class="font-semibold">{{ renderText(child) }}</strong>
        <em v-else-if="child.italic">{{ renderText(child) }}</em>
        <template v-else>{{ renderText(child) }}</template>
      </template>
    </li>
  </ol>

  <!-- Unordered list -->
  <ul
    v-else-if="block.type === 'list'"
    class="list-disc list-inside mb-4 space-y-1 text-slate-700"
  >
    <li v-for="(item, j) in block.children" :key="j">
      <template v-for="(child, k) in item.children ?? []" :key="k">
        <strong v-if="child.bold" class="font-semibold">{{ renderText(child) }}</strong>
        <em v-else-if="child.italic">{{ renderText(child) }}</em>
        <template v-else>{{ renderText(child) }}</template>
      </template>
    </li>
  </ul>

  <!-- Blockquote -->
  <blockquote
    v-else-if="block.type === 'quote'"
    class="border-l-4 border-gold pl-4 my-6 italic text-slate-600"
  >
    <template v-for="(child, j) in block.children" :key="j">{{ renderText(child) }}</template>
  </blockquote>

  <!-- Code block -->
  <pre
    v-else-if="block.type === 'code'"
    class="bg-slate-100 rounded-12 p-4 my-6 overflow-x-auto text-sm font-mono text-slate-800"
  ><code><template v-for="(child, j) in block.children" :key="j">{{ renderText(child) }}</template></code></pre>

  <!-- Image -->
  <figure v-else-if="block.type === 'image' && block.image && blockImageSrc(block.image)" class="my-6">
    <img
      :src="blockImageSrc(block.image)"
      :alt="blockImageAlt(block.image)"
      class="rounded-12 w-full object-cover"
    />
  </figure>
</template>
