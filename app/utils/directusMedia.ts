import type { DirectusArticle, DirectusFile, LegacyImage } from '~/types/directus'
import type { AssetTransform } from '~/utils/imageTransform'

export interface MediaUrlResolvers {
  assetUrl: (
    v: string | DirectusFile | { id: string } | null | undefined,
    transform?: AssetTransform,
  ) => string | null
  legacyImageUrl: (path: string) => string | null
}

/**
 * Cover / logo / inline rich-text image: UUID string, expanded `directus_files`, or legacy media
 * path. `transform` applies to Directus-hosted files only — legacy images live on the old host
 * and are served as-is.
 */
export function resolveMediaSrc(
  file: string | DirectusFile | LegacyImage | null | undefined,
  resolvers: MediaUrlResolvers,
  transform?: AssetTransform,
): string {
  if (file == null) return ''
  if (typeof file === 'object' && file !== null && 'id' in file && typeof (file as { id: unknown }).id === 'number') {
    const s = file as LegacyImage
    return resolvers.legacyImageUrl(s.url) ?? s.url
  }
  const direct = resolvers.assetUrl(file as string | DirectusFile | { id: string }, transform)
  if (direct) return direct
  if (typeof file === 'object' && file !== null && 'url' in file && typeof (file as { url: unknown }).url === 'string') {
    const url = (file as { url: string }).url
    return resolvers.legacyImageUrl(url) ?? url
  }
  if (typeof file === 'object' && file !== null && 'filename_download' in file) {
    const fd = (file as DirectusFile).filename_download
    if (fd) return String(fd)
  }
  return ''
}

export function resolveMediaAlt(
  file: string | DirectusFile | LegacyImage | null | undefined,
  fallback: string,
): string {
  if (file != null && typeof file === 'object' && file.alternativeText) {
    return file.alternativeText
  }
  return fallback
}

export interface NormalizedArticleAttachment {
  key: string
  href: string
  label: string
  alt: string
  /** True when the file should render as a photo (carousel / single image). */
  isImage: boolean
  /** True when the file should offer a download affordance (non-image). */
  downloadable: boolean
}

/** Normalized attachment row for gallery images or download links. */
export function normalizeArticleAttachment(
  att: NonNullable<DirectusArticle['attachments']>[number],
  resolvers: MediaUrlResolvers,
): NormalizedArticleAttachment {
  if (typeof att === 'string') {
    const href = resolvers.assetUrl(att) ?? '#'
    const isImage = isProbablyImageHref(href)
    return {
      key: att,
      href,
      label: att.slice(0, 8) + '…',
      alt: '',
      isImage,
      downloadable: !isImage,
    }
  }
  if (att && typeof att === 'object' && 'directus_files_id' in att) {
    const j = att.directus_files_id
    if (typeof j === 'string') {
      const href = resolvers.assetUrl(j) ?? '#'
      const isImage = isProbablyImageHref(href)
      return {
        key: j,
        href,
        label: j.slice(0, 8) + '…',
        alt: '',
        isImage,
        downloadable: !isImage,
      }
    }
    if (j && typeof j === 'object' && 'id' in j) {
      const f = j as DirectusFile
      const href = resolvers.assetUrl(f) ?? resolveMediaSrc(f, resolvers)
      const label = f.title ?? f.filename_download ?? f.id
      const isImage = isDirectusImageFile(f) || isProbablyImageHref(href)
      return {
        key: f.id,
        href,
        label: label ?? f.id,
        alt: resolveMediaAlt(f, label ?? ''),
        isImage,
        downloadable: !isImage,
      }
    }
  }
  if (att && typeof att === 'object' && 'id' in att && typeof (att as DirectusFile).id === 'string') {
    const f = att as DirectusFile
    const href = resolvers.assetUrl(f) ?? resolveMediaSrc(f, resolvers)
    const label = f.title ?? f.filename_download ?? f.id
    const isImage = isDirectusImageFile(f) || isProbablyImageHref(href)
    return {
      key: f.id,
      href,
      label: label ?? f.id,
      alt: resolveMediaAlt(f, label ?? ''),
      isImage,
      downloadable: !isImage,
    }
  }
  if (
    att &&
    typeof att === 'object' &&
    'id' in att &&
    typeof (att as { id: unknown }).id === 'number' &&
    'url' in att &&
    typeof (att as { url: unknown }).url === 'string'
  ) {
    const s = att as unknown as LegacyImage
    const href = resolvers.legacyImageUrl(s.url) ?? s.url
    const isImage = isProbablyImageHref(href)
    return {
      key: String(s.id),
      href,
      label: s.alternativeText || fileNameFromUrl(s.url),
      alt: s.alternativeText ?? '',
      isImage,
      downloadable: !isImage,
    }
  }
  return { key: 'unknown', href: '#', label: '', alt: '', isImage: false, downloadable: false }
}

/** Splits article attachments into gallery photos vs downloadable files. */
export function partitionArticleAttachments(
  attachments: DirectusArticle['attachments'],
  resolvers: MediaUrlResolvers,
): {
  photos: NormalizedArticleAttachment[]
  files: NormalizedArticleAttachment[]
} {
  if (!attachments?.length) {
    return { photos: [], files: [] }
  }

  const photos: NormalizedArticleAttachment[] = []
  const files: NormalizedArticleAttachment[] = []

  for (const att of attachments) {
    const normalized = normalizeArticleAttachment(att, resolvers)
    if (!normalized.href || normalized.href === '#') continue
    if (normalized.isImage) {
      photos.push(normalized)
    } else {
      files.push(normalized)
    }
  }

  return { photos, files }
}

function fileNameFromUrl(url: string): string {
  return url.split('/').pop() ?? url
}

export function isDirectusImageFile(file: DirectusFile): boolean {
  if (file.type?.startsWith('image/')) return true
  const name = file.filename_download ?? file.filename_disk ?? ''
  return isProbablyImageHref(name)
}

export function isProbablyImageHref(href: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg|avif|heic|heif)(\?|$)/i.test(href)
}
