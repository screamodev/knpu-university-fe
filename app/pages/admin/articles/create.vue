<script setup lang="ts">
import type { ArticleFormPayload } from '~/types/admin'

definePageMeta({ layout: 'default', middleware: 'admin' })

const { t, localePath } = useSafeI18nWithRouter()
const strapi = useStrapi()
const { jwt, isAdmin, meRestoreCompleted } = useAuth()
const toast = useToast()

useHead({ title: () => t('admin.createArticle') })

watch(meRestoreCompleted, (completed) => {
  if (completed && !isAdmin.value) navigateTo(localePath('/'))
}, { immediate: true })

const saving = ref(false)
const error = ref<string | null>(null)

async function handleSubmit(payload: ArticleFormPayload) {
  saving.value = true
  error.value = null

  try {
    const body: Record<string, unknown> = {
      title: payload.title,
      titleEn: payload.titleEn || null,
      slug: payload.slug,
      excerpt: payload.excerpt || null,
      excerptEn: payload.excerptEn || null,
      content: strapiBlocksToMarkdown(payload.content),
      contentEn: strapiBlocksToMarkdown(payload.contentEn),
      author: payload.author || null,
      cover: payload.cover?.id ?? null,
      attachments: payload.attachments.map((a) => a.id),
      category: payload.categoryId ?? null,
    }

    await strapi.strapiFetch('/articles', {
      method: 'POST',
      bearerToken: jwt.value,
      body: { data: body },
    })

    toast.success(t('admin.articleCreated'))
    await navigateTo(localePath('/admin/articles'))
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    error.value = msg
    toast.error(t('admin.saveError'))
  } finally {
    saving.value = false
  }
}

function handleCancel() {
  navigateTo(localePath('/admin/articles'))
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink
          :to="localePath('/admin/articles')"
          class="inline-flex items-center gap-1.5 text-gold/80 hover:text-gold text-sm no-underline mb-4 transition-colors"
        >
          <span>&larr;</span> {{ t('admin.backToArticles') }}
        </NuxtLink>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('admin.createArticle') }}
        </h1>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AdminArticleForm
        :saving="saving"
        :error="error"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
