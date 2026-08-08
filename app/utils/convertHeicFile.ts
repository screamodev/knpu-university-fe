const HEIC_MIME_TYPES = new Set(['image/heic', 'image/heif'])

/**
 * True when the file looks like HEIC/HEIF by MIME or extension.
 * Some browsers leave `file.type` empty for iPhone photos.
 */
export function isHeicLikeFile(file: File): boolean {
  const mime = file.type.toLowerCase()
  if (HEIC_MIME_TYPES.has(mime)) return true
  return /\.hei[cf]$/i.test(file.name)
}

function jpegFileName(originalName: string): string {
  const base = originalName.replace(/\.[^.]+$/, '') || 'image'
  return `${base}.jpg`
}

/**
 * Converts HEIC/HEIF to JPEG for web-safe upload. Non-HEIC files are returned unchanged.
 * Loads `heic-to` only when conversion is needed.
 */
export async function convertHeicFile(file: File): Promise<File> {
  if (!isHeicLikeFile(file)) return file

  const { heicTo, isHeic } = await import('heic-to')

  const confirmed = await isHeic(file)
  if (!confirmed) return file

  const jpegBlob = await heicTo({
    blob: file,
    type: 'image/jpeg',
    quality: 0.9,
  })

  return new File([jpegBlob], jpegFileName(file.name), {
    type: 'image/jpeg',
    lastModified: file.lastModified,
  })
}
