import type { DirectusFile, LegacyImage } from '~/types/directus'

/**
 * Directus asset transform parameters.
 *
 * `storage_asset_transform` is `all` on this instance, so arbitrary parameters are allowed and
 * no named preset has to be registered first. Asking for a size matters: without it every card
 * downloads the full-resolution original.
 *
 * @see https://directus.io/docs/guides/files
 */
export interface AssetTransform {
  width?: number
  height?: number
  /** `cover` crops to fill, `contain` fits inside, `inside`/`outside` scale without cropping. */
  fit?: 'cover' | 'contain' | 'inside' | 'outside'
  /** 1-100. Directus defaults to 80. */
  quality?: number
  format?: 'auto' | 'jpeg' | 'png' | 'webp' | 'avif'
  withoutEnlargement?: boolean
}

/** Serialises a transform to a query string (without `?`); empty when nothing is set. */
export function assetTransformQuery(transform: AssetTransform | undefined): string {
  if (!transform) return ''
  const params = new URLSearchParams()
  if (transform.width) params.set('width', String(Math.round(transform.width)))
  if (transform.height) params.set('height', String(Math.round(transform.height)))
  if (transform.fit) params.set('fit', transform.fit)
  if (transform.quality) params.set('quality', String(transform.quality))
  if (transform.format) params.set('format', transform.format)
  if (transform.withoutEnlargement) params.set('withoutEnlargement', 'true')
  return params.toString()
}

/**
 * Default crop anchor: horizontally centred, but above the middle.
 *
 * News covers are mostly group photos in landscape, shown in a much wider band — a centred crop
 * eats the top and bottom, which is exactly where heads are. Biasing upwards keeps faces in
 * frame without anyone having to touch the file. An explicit focal point always wins.
 */
export const DEFAULT_COVER_POSITION = '50% 35%'

/**
 * CSS `object-position` honouring the focal point an editor set in the Directus file editor.
 *
 * Directus stores the focal point in pixels, so it only means something together with the
 * file's dimensions. Anything missing — an unset focal point, a legacy image, an older Directus
 * that lacks the columns — falls back to the default anchor above.
 */
export function objectPositionFromFile(
  file: string | DirectusFile | LegacyImage | null | undefined,
): string {
  if (!file || typeof file !== 'object') return DEFAULT_COVER_POSITION

  const { focal_point_x: x, focal_point_y: y, width, height } = file as DirectusFile
  if (typeof x !== 'number' || typeof y !== 'number') return DEFAULT_COVER_POSITION
  if (!width || !height) return DEFAULT_COVER_POSITION

  const clamp = (value: number) => Math.min(100, Math.max(0, value))
  return `${clamp((x / width) * 100).toFixed(2)}% ${clamp((y / height) * 100).toFixed(2)}%`
}

/**
 * Cover presets. Both ask for a width only — deliberately.
 *
 * Passing width *and* height with `fit=cover` would make Directus crop around the centre of the
 * image, throwing away the pixels a focal point might have wanted. Scaling on the server and
 * cropping in CSS (`object-fit` + `object-position`) keeps the choice with the editor.
 */
export const HERO_COVER_TRANSFORM: AssetTransform = {
  width: 1600,
  format: 'auto',
  quality: 80,
  withoutEnlargement: true,
}

export const CARD_COVER_TRANSFORM: AssetTransform = {
  width: 800,
  format: 'auto',
  quality: 78,
  withoutEnlargement: true,
}

/** Fields a query must request for `objectPositionFromFile` to have anything to work with. */
export const COVER_FILE_FIELDS = [
  'id',
  'width',
  'height',
  'focal_point_x',
  'focal_point_y',
  'alternativeText',
  'title',
  'type',
] as const
