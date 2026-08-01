import { timingSafeEqual } from 'node:crypto'

/**
 * Draft preview for Directus Live Preview.
 *
 * Directus opens `<site>/news/<slug>?preview=<secret>` inside an iframe while an editor works.
 * Public permissions only expose `status = published`, so the draft has to be fetched with a
 * privileged token — which stays on the server, behind this route, guarded by a shared secret.
 */

const PREVIEWABLE: Record<string, { path: string; fields: string }> = {
  articles: {
    path: 'articles',
    fields: '*,cover.*,categories.categories_id.*,attachments.directus_files_id.*',
  },
  events: { path: 'events', fields: '*,cover.*' },
  programmes: { path: 'programmes', fields: '*,cover.*' },
}

function secretMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { previewSecret, directusPreviewToken } = config

  if (!previewSecret || !directusPreviewToken) {
    throw createError({ statusCode: 501, statusMessage: 'Preview is not configured' })
  }

  const collection = getRouterParam(event, 'collection') ?? ''
  const slug = getRouterParam(event, 'slug') ?? ''
  const target = PREVIEWABLE[collection]
  if (!target || !slug) {
    throw createError({ statusCode: 404, statusMessage: 'Not previewable' })
  }

  const provided = String(getQuery(event).secret ?? '')
  if (!secretMatches(provided, previewSecret)) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid preview secret' })
  }

  const base = (config.directusServerUrl || config.public.directusUrl).replace(/\/$/, '')
  const response = await $fetch<{ data: unknown[] }>(`${base}/items/${target.path}`, {
    headers: { Authorization: `Bearer ${directusPreviewToken}` },
    query: {
      'filter[slug][_eq]': slug,
      'fields': target.fields,
      'limit': 1,
    },
  })

  const item = response.data?.[0]
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  // Never cached: the point of a preview is that it reflects the current draft.
  setHeader(event, 'Cache-Control', 'no-store')
  return item
})
