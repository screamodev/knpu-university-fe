import { uploadFiles as directusUploadFiles } from '@directus/sdk'

import type { DirectusFile } from '~/types/directus'
import { compressImageFile } from '~/utils/compressImageFile'
import { convertHeicFile } from '~/utils/convertHeicFile'

function isDirectusFileRecord(value: unknown): value is DirectusFile {
  return typeof value === 'object' && value !== null && 'id' in value
}

function normalizeUploadedFile(uploaded: unknown): DirectusFile {
  if (Array.isArray(uploaded)) {
    const first = uploaded[0]
    if (!isDirectusFileRecord(first)) {
      throw new Error('Upload failed: empty response')
    }
    return first
  }
  if (!isDirectusFileRecord(uploaded)) {
    throw new Error('Upload failed: invalid response')
  }
  return uploaded
}

/** HEIC → JPEG, then compress oversized photos before sending to Directus. */
async function prepareFileForUpload(file: File): Promise<File> {
  const webSafe = await convertHeicFile(file)
  return compressImageFile(webSafe)
}

/**
 * Upload files to Directus `/files` via the SDK (`multipart/form-data`, field `file`).
 * Each request sends one file; multi-file flows loop and collect `directus_files.id` values.
 */
export function useUpload() {
  const { client, assetUrl, publicUrl } = useDirectus()

  async function requireAuthToken(): Promise<void> {
    const token = await client.getToken()
    if (!token || token.length === 0) {
      throw new Error('Not authenticated')
    }
  }

  async function uploadFile(file: File): Promise<DirectusFile> {
    await requireAuthToken()

    const uploadable = await prepareFileForUpload(file)
    const formData = new FormData()
    formData.append('file', uploadable)

    const uploaded = await client.request(directusUploadFiles(formData))
    const record = normalizeUploadedFile(uploaded)
    const resolvedUrl = assetUrl(record)
    const id = typeof record.id === 'string' ? record.id : String(record.id)
    const url =
      resolvedUrl ??
      (id.length > 0 ? `${publicUrl}/assets/${id}` : null) ??
      (typeof record.url === 'string' ? record.url : null)
    if (url === null) {
      throw new Error('Upload failed: could not resolve file URL')
    }
    return {
      ...record,
      id,
      url,
    }
  }

  async function uploadFiles(files: File[]): Promise<string[]> {
    if (files.length === 0) {
      return []
    }
    await requireAuthToken()

    const ids: string[] = []
    for (const file of files) {
      const uploadable = await prepareFileForUpload(file)
      const formData = new FormData()
      formData.append('file', uploadable)

      const uploaded = await client.request(directusUploadFiles(formData))
      const record = normalizeUploadedFile(uploaded)
      const rawId = record.id
      ids.push(typeof rawId === 'string' ? rawId : String(rawId))
    }
    return ids
  }

  return { uploadFile, uploadFiles }
}
