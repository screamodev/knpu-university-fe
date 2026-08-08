const SIZE_THRESHOLD_BYTES = 1 * 1024 * 1024
const MAX_EDGE_PX = 2048
const JPEG_QUALITY = 0.82

const COMPRESSIBLE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
])

/**
 * True when the file is a raster image we can safely re-encode with canvas.
 * SVG and GIF are excluded (vector / possible animation).
 */
export function isCompressibleImageFile(file: File): boolean {
  const mime = file.type.toLowerCase()
  if (COMPRESSIBLE_MIME_TYPES.has(mime)) return true
  return /\.(jpe?g|png|webp)$/i.test(file.name)
}

function jpegFileName(originalName: string): string {
  const base = originalName.replace(/\.[^.]+$/, '') || 'image'
  return `${base}.jpg`
}

function loadImageBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file)
}

function canvasToJpegBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality)
  })
}

/**
 * Shrinks oversized admin photos before Directus upload.
 * Compresses when file is over 1 MB or longest edge exceeds 2048 px.
 * Returns the original file when compression is not needed or would not help.
 */
export async function compressImageFile(file: File): Promise<File> {
  if (!isCompressibleImageFile(file)) return file

  let bitmap: ImageBitmap

  try {
    bitmap = await loadImageBitmap(file)
  } catch {
    return file
  }

  try {
    const longestEdge = Math.max(bitmap.width, bitmap.height)
    const oversizeBytes = file.size > SIZE_THRESHOLD_BYTES
    const oversizePixels = longestEdge > MAX_EDGE_PX

    if (!oversizeBytes && !oversizePixels) {
      return file
    }

    const scale = oversizePixels ? MAX_EDGE_PX / longestEdge : 1
    const targetWidth = Math.max(1, Math.round(bitmap.width * scale))
    const targetHeight = Math.max(1, Math.round(bitmap.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight

    const context = canvas.getContext('2d')
    if (!context) return file

    context.drawImage(bitmap, 0, 0, targetWidth, targetHeight)

    const blob = await canvasToJpegBlob(canvas, JPEG_QUALITY)
    if (!blob || blob.size >= file.size) {
      return file
    }

    return new File([blob], jpegFileName(file.name), {
      type: 'image/jpeg',
      lastModified: file.lastModified,
    })
  } finally {
    bitmap.close()
  }
}
