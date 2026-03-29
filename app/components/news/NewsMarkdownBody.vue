<script setup lang="ts">
const props = defineProps<{
  markdown: string
}>()

const { renderMarkdown } = useArticleMarkdownHtml()

const safeHtml = computed(() => renderMarkdown(props.markdown))
</script>

<template>
  <div
    v-if="safeHtml"
    class="news-article-md prose prose-navy max-w-none"
    v-html="safeHtml"
  />
</template>

<style>
/* Alignment from serialized editor HTML (`data-align` on p / headings). Scoped CSS does not apply to v-html. */
.news-article-md :is(p, h1, h2, h3, h4, h5, h6)[data-align='left'] {
  text-align: left;
}
.news-article-md :is(p, h1, h2, h3, h4, h5, h6)[data-align='center'] {
  text-align: center;
}
.news-article-md :is(p, h1, h2, h3, h4, h5, h6)[data-align='right'] {
  text-align: right;
}
.news-article-md :is(p, h1, h2, h3, h4, h5, h6)[data-align='justify'] {
  text-align: justify;
}
</style>
