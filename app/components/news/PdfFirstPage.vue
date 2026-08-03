<script setup lang="ts">
/**
 * First page of a PDF rendered to a canvas — the newspaper archive's cover thumbnails.
 *
 * The archive holds ~100 multi-megabyte issues, so nothing happens until a card scrolls into
 * view: the library itself is imported lazily and pdf.js only pulls the first chunks of the file
 * (Directus serves `Accept-Ranges`). Any failure is silent — the caller keeps its own placeholder
 * visible until `rendered` flips.
 */
const props = withDefaults(defineProps<{ src: string; width?: number }>(), { width: 420 })

const emit = defineEmits<{ rendered: []; failed: [] }>()

/** How long to keep looking for paint before giving up on a preview. */
const RENDER_TIMEOUT_MS = 6_000
const RENDER_POLL_MS = 300

/**
 * True once the canvas holds something other than a blank sheet.
 *
 * A newspaper front page is mostly white, so single-pixel probes miss. Downscaling the whole
 * canvas into a 32×32 buffer and inspecting every pixel catches any ink anywhere. The canvas is
 * not tainted — pdf.js draws vector operations, not a cross-origin image.
 */
function hasPixels(element: HTMLCanvasElement): boolean {
  const probe = document.createElement('canvas')
  probe.width = 32
  probe.height = 32

  const probeContext = probe.getContext('2d', { willReadFrequently: true })
  if (!probeContext) return false

  probeContext.drawImage(element, 0, 0, 32, 32)
  const { data } = probeContext.getImageData(0, 0, 32, 32)

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue
    if (data[i]! < 245 || data[i + 1]! < 245 || data[i + 2]! < 245) return true
  }
  return false
}

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const state = ref<'idle' | 'loading' | 'done' | 'failed'>('idle')

async function renderFirstPage() {
  if (state.value !== 'idle' || !canvas.value) return
  state.value = 'loading'

  try {
    const pdfjs = await import('pdfjs-dist')
    // Bundled worker: no CDN, and the CSP on the published site allows same-origin workers only.
    pdfjs.GlobalWorkerOptions.workerSrc = (
      await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
    ).default

    // Ranged fetching: pdf.js pulls the chunks page 1 needs instead of the whole issue, which
    // works only because Directus exposes its range headers to this origin
    // (CORS_EXPOSED_HEADERS in docker-compose). The task is destroyed right after the render, so
    // the background fetch of the remaining pages is cut short.
    const task = pdfjs.getDocument({ url: props.src })
    const doc = await task.promise
    const page = await doc.getPage(1)

    const base = page.getViewport({ scale: 1 })
    const scale = (props.width * Math.min(globalThis.devicePixelRatio || 1, 2)) / base.width
    const viewport = page.getViewport({ scale })

    const element = canvas.value
    element.width = Math.round(viewport.width)
    element.height = Math.round(viewport.height)

    const context = element.getContext('2d')
    if (!context) throw new Error('canvas 2d context unavailable')

    const renderTask = page.render({ canvas: element, canvasContext: context, viewport })

    /*
     * pdf.js paints the page well before `renderTask.promise` settles here — with a streamed
     * document that promise can stay pending while the rest of the issue trickles in, and a
     * thumbnail must not wait for that. So watch the canvas instead and stop as soon as there is
     * ink on it.
     */
    let painted = false
    for (let waited = 0; waited < RENDER_TIMEOUT_MS; waited += RENDER_POLL_MS) {
      await new Promise(resolve => setTimeout(resolve, RENDER_POLL_MS))
      if (hasPixels(element)) {
        painted = true
        break
      }
    }

    if (!painted) throw new Error('nothing was painted')

    state.value = 'done'
    emit('rendered')

    // Frees the worker and the buffered chunks; the canvas keeps the pixels. Not awaited — a
    // streamed task can sit on requests that never settle.
    void renderTask.cancel()
    void task.destroy()
  }
  catch (error) {
    if (import.meta.dev) console.warn('[PdfFirstPage] preview failed', props.src, error)
    state.value = 'failed'
    emit('failed')
  }
}

onMounted(() => {
  if (!root.value) return

  if (typeof IntersectionObserver === 'undefined') {
    renderFirstPage()
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      renderFirstPage()
    },
    { rootMargin: '200px' },
  )
  observer.observe(root.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <div ref="root" class="w-full h-full">
    <canvas
      ref="canvas"
      class="w-full h-full object-cover"
      :class="state === 'done' ? '' : 'invisible'"
      aria-hidden
    />
  </div>
</template>
