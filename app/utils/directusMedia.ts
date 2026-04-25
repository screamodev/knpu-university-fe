import type { DirectusArticle, DirectusFile, LegacyImage } from '~/types/directus'

export interface MediaUrlResolvers {
  assetUrl: (v: string | DirectusFile | { id: string } | null | undefined) => string | null
  legacyImageUrl: (path: string) => string | null
}

/** Cover / logo / inline rich-text image: UUID string, expanded `directus_files`, or legacy media path. */
export function resolveMediaSrc(
  file: string | DirectusFile | LegacyImage | null | undefined,
  resolvers: MediaUrlResolvers,
): string {
  if (file == null) return ''
  if (typeof file === 'object' && file !== null && 'id' in file && typeof (file as { id: unknown }).id === 'number') {
    const s = file as LegacyImage
    return resolvers.legacyImageUrl(s.url) ?? s.url
  }
  const direct = resolvers.assetUrl(file as string | DirectusFile | { id: string })
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

/** Normalized attachment row for download links (M2M junction, file id, or legacy media). */
export function normalizeArticleAttachment(
  att: NonNullable<DirectusArticle['attachments']>[number],
  resolvers: MediaUrlResolvers,
): { key: string; href: string; label: string; downloadable: boolean } {
  if (typeof att === 'string') {
    const href = resolvers.assetUrl(att) ?? '#'
    return {
      key: att,
      href,
      label: att.slice(0, 8) + '…',
      downloadable: !isProbablyImageHref(href),
    }
  }
  if (att && typeof att === 'object' && 'directus_files_id' in att) {
    const j = att.directus_files_id
    if (typeof j === 'string') {
      const href = resolvers.assetUrl(j) ?? '#'
      return {
        key: j,
        href,
        label: j.slice(0, 8) + '…',
        downloadable: !isProbablyImageHref(href),
      }
    }
    if (j && typeof j === 'object' && 'id' in j) {
      const f = j as DirectusFile
      const href = resolvers.assetUrl(f) ?? resolveMediaSrc(f, resolvers)
      const label = f.title ?? f.filename_download ?? f.id
      return {
        key: f.id,
        href,
        label: label ?? f.id,
        downloadable: !isProbablyImageHref(href),
      }
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
    const downloadable = !isProbablyImageHref(href)
    return {
      key: String(s.id),
      href,
      label: s.alternativeText || fileNameFromUrl(s.url),
      downloadable,
    }
  }
  return { key: 'unknown', href: '#', label: '', downloadable: false }
}

function fileNameFromUrl(url: string): string {
  return url.split('/').pop() ?? url
}

export function isProbablyImageHref(href: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i.test(href)
}
