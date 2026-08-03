<script setup lang="ts">
import { splitArticleHtmlByImages } from '~/utils/splitArticleHtmlByImages'

const props = defineProps<{
  /** Raw stored body: HTML from the Directus WYSIWYG, or markdown from older records. */
  source: string
  kind: 'markdown' | 'html'
}>()

const { renderBody } = useArticleMarkdownHtml()

const segments = computed(() => {
  const html = renderBody(props.source, props.kind)
  if (!html) return []
  return splitArticleHtmlByImages(html)
})
</script>

<template>
  <div
    v-if="segments.length"
    class="news-article-md"
  >
    <template v-for="(segment, index) in segments" :key="index">
      <div
        v-if="segment.kind === 'html'"
        v-html="segment.html"
      />
      <div
        v-else
        class="my-6"
      >
        <NewsImageCarousel :images="segment.images" />
      </div>
    </template>
  </div>
</template>

<style>
/*
 * Typography for CMS bodies. Written by hand rather than with @tailwindcss/typography because
 * preflight strips list markers and headings, and because `v-html` output cannot be reached by
 * scoped CSS or utility classes.
 */
.news-article-md {
  color: theme('colors.navy');
  font-size: theme('fontSize.body[0]');
  line-height: 1.7;
}

.news-article-md p {
  margin: 0 0 1.15em;
}

.news-article-md > div > :first-child {
  margin-top: 0;
}

.news-article-md :is(h1, h2, h3, h4, h5, h6) {
  font-family: theme('fontFamily.playfair');
  color: theme('colors.navy');
  font-weight: 700;
  line-height: 1.25;
  margin: 1.8em 0 0.6em;
}

.news-article-md h1 { font-size: 1.875rem; }
.news-article-md h2 { font-size: 1.5rem; }
.news-article-md h3 { font-size: 1.25rem; }
.news-article-md :is(h4, h5, h6) { font-size: 1.0625rem; }

/* Preflight removes markers, so lists need them back explicitly. */
.news-article-md :is(ul, ol) {
  margin: 0 0 1.15em;
  padding-left: 1.5rem;
}

.news-article-md ul { list-style: disc; }
.news-article-md ol { list-style: decimal; }
.news-article-md :is(ul, ol) :is(ul, ol) { margin-bottom: 0.35em; }
.news-article-md li { margin-bottom: 0.35em; }
.news-article-md li::marker { color: theme('colors.gold'); }

.news-article-md blockquote {
  margin: 1.5em 0;
  padding: 0.25rem 0 0.25rem 1.15rem;
  border-left: 3px solid theme('colors.gold');
  color: theme('colors.text-muted');
  font-style: italic;
}

.news-article-md blockquote p:last-child { margin-bottom: 0; }

.news-article-md hr {
  margin: 2em 0;
  border: 0;
  border-top: 1px solid theme('colors.border');
}

.news-article-md :is(code, pre) {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
}

.news-article-md code {
  background: theme('colors.off-white');
  border: 1px solid theme('colors.border');
  border-radius: 6px;
  padding: 0.1em 0.35em;
}

.news-article-md pre {
  margin: 1.5em 0;
  padding: 1rem;
  overflow-x: auto;
  background: theme('colors.off-white');
  border: 1px solid theme('colors.border');
  border-radius: theme('borderRadius.12');
}

.news-article-md pre code {
  background: none;
  border: 0;
  padding: 0;
}

/* Tables come from the WYSIWYG and are the most likely thing to overflow on mobile. */
.news-article-md table {
  display: block;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  margin: 1.5em 0;
  font-size: theme('fontSize.body-sm[0]');
}

.news-article-md :is(th, td) {
  border: 1px solid theme('colors.border');
  padding: 0.5rem 0.75rem;
  text-align: left;
  vertical-align: top;
}

.news-article-md th {
  background: theme('colors.off-white');
  font-weight: 600;
}

.news-article-md caption {
  caption-side: bottom;
  padding-top: 0.5rem;
  color: theme('colors.text-muted');
  font-size: theme('fontSize.body-sm[0]');
}

/*
 * Migrated bodies carry raw <img> with no dimensions, so a 2000px logo used to fill the whole
 * column. Cap the height and let the width follow — `contain` keeps logos and scans undistorted.
 */
.news-article-md img {
  max-width: 100%;
  max-height: 22rem;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: theme('borderRadius.12');
}

/* A picture on its own line gets breathing room; one floated beside text must not. */
.news-article-md p > img:only-child,
.news-article-md figure img {
  display: block;
  margin: 0 auto;
}

/*
 * The structure-page migration leaves the unit's logo inline at the head of the first paragraph.
 * Give it its own line above the text instead of letting a single line of text sit beside it.
 */
.news-article-md p > img:first-child:not(:only-child):not([style*='float']) {
  display: block;
  margin: 0 auto 1rem;
}

.news-article-md figure {
  margin: 1.5em 0;
}

/* Video embeds (editor "media" button); the sanitizer limits these to YouTube/Vimeo. */
.news-article-md iframe {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  margin: 1.5em 0;
  border: 0;
  border-radius: theme('borderRadius.12');
}

/* A document from our own file library — PDFs read as portrait, not widescreen. */
.news-article-md iframe[src*='/assets/'] {
  aspect-ratio: 3 / 4;
  max-height: 80vh;
  border: 1px solid theme('colors.border');
  background: theme('colors.off-white');
}

.news-article-md figcaption {
  margin-top: 0.5rem;
  color: theme('colors.text-muted');
  font-size: theme('fontSize.body-sm[0]');
  text-align: center;
}

/*
 * Alignment arrives two ways: `data-align` from the old editor pipeline, and inline
 * `style="text-align:…"` / float styles from the Directus WYSIWYG (which the sanitizer keeps).
 */
.news-article-md [data-align='left'] { text-align: left; }
.news-article-md [data-align='center'] { text-align: center; }
.news-article-md [data-align='right'] { text-align: right; }
.news-article-md [data-align='justify'] { text-align: justify; }

.news-article-md img[style*='float: left'],
.news-article-md img[style*='float:left'] {
  margin: 0.35em 1.25rem 1rem 0;
}

.news-article-md img[style*='float: right'],
.news-article-md img[style*='float:right'] {
  margin: 0.35em 0 1rem 1.25rem;
}

/* Text wrapping around a floated image is the point; structural blocks still start clean. */
.news-article-md :is(h1, h2, h3, h4, h5, h6, table, figure, blockquote, pre, hr, iframe) {
  clear: both;
}

/* Floats must not escape the article body either. */
.news-article-md > div::after {
  content: '';
  display: table;
  clear: both;
}

.news-article-md a {
  color: theme('colors.navy');
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: theme('colors.gold');
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
  transition: color 280ms cubic-bezier(0.4, 0, 0.2, 1);
}

.news-article-md a:hover {
  color: theme('colors.gold');
}

@media (max-width: 640px) {
  .news-article-md img[style*='float'] {
    float: none !important;
    margin: 1em auto;
  }
}
</style>
