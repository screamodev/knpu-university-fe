import type { StrapiImage } from '~/types/strapi'

/**
 * Upload files to Strapi `/api/upload` using multipart FormData.
 */
export function useUpload() {
  const { apiUrl } = useStrapi()
  const { jwt } = useAuth()

  async function uploadFile(file: File): Promise<StrapiImage> {
    const token = jwt.value
    if (!token) throw new Error('Not authenticated')

    const formData = new FormData()
    formData.append('files', file)

    const response = await $fetch<StrapiImage[]>(apiUrl('/upload'), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })

    const first = response?.[0]
    if (!first) {
      throw new Error('Upload failed: empty response')
    }

    return first
  }

  async function uploadFiles(files: File[]): Promise<StrapiImage[]> {
    const token = jwt.value
    if (!token) throw new Error('Not authenticated')

    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }

    const response = await $fetch<StrapiImage[]>(apiUrl('/upload'), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })

    return response ?? []
  }

  return { uploadFile, uploadFiles }
}
