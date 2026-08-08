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

/** Hero band aspect (width / height). Must stay in sync with Directus `cover-hero-focal`. */
export const HERO_COVER_ASPECT_RATIO = 2.5

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value))
}

/**
 * Largest rectangle of aspect `ratio` (w/h) that fits inside the image — same as the admin frame.
 */
function maxHeroFrameSize(
  width: number,
  height: number,
  ratio: number,
): { width: number; height: number } {
  const imageRatio = width / height

  if (imageRatio >= ratio) {
    return { width: height * ratio, height }
  }

  return { width, height: width / ratio }
}

/**
 * CSS `object-position` so `object-fit: cover` shows the hero frame when the box aspect matches.
 *
 * Directus stores the frame center as focal pixels. Mapping `focal/size` straight to % pins that
 * point to the same % of the box (near the top for a top frame) and clips heads above it.
 * Travel along the freer axis maps the rectangle instead.
 */
export function objectPositionFromFile(
  file: string | DirectusFile | LegacyImage | null | undefined,
  aspectRatio: number = HERO_COVER_ASPECT_RATIO,
): string {
  if (!file || typeof file !== 'object') return DEFAULT_COVER_POSITION

  const { focal_point_x: x, focal_point_y: y, width, height } = file as DirectusFile
  if (typeof x !== 'number' || typeof y !== 'number') return DEFAULT_COVER_POSITION
  if (!width || !height) return DEFAULT_COVER_POSITION

  const safeRatio = aspectRatio > 0 ? aspectRatio : HERO_COVER_ASPECT_RATIO
  const frame = maxHeroFrameSize(width, height, safeRatio)
  const frameX = Math.min(Math.max(x - frame.width / 2, 0), width - frame.width)
  const frameY = Math.min(Math.max(y - frame.height / 2, 0), height - frame.height)

  const travelX = width - frame.width
  const travelY = height - frame.height
  const left = travelX <= 0 ? 50 : clampPercent((frameX / travelX) * 100)
  const top = travelY <= 0 ? 50 : clampPercent((frameY / travelY) * 100)

  return `${left.toFixed(2)}% ${top.toFixed(2)}%`
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
