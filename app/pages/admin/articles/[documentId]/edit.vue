<script setup lang="ts">
import type { StrapiArticle, StrapiResponse } from '~/types/news'
import type { ArticleFormPayload } from '~/types/admin'

definePageMeta({ layout: 'default', middleware: 'admin' })

const { t, localePath } = useSafeI18nWithRouter()
const route = useRoute()
const strapi = useStrapi()
const { jwt, isAdmin, meRestoreCompleted } = useAuth()
const toast = useToast()

const documentId = route.params.documentId as string

useHead({ title: () => t('admin.editArticle') })

watch(meRestoreCompleted, (completed) => {
  if (completed && !isAdmin.value) navigateTo(localePath('/'))
}, { immediate: true })

// Fetch article
const { data: articleData, pending: loading } = await useAsyncData(
  `admin-article-${documentId}`,
  () =>
    strapi.strapiFetch<StrapiResponse<StrapiArticle>>(
      `/articles/${documentId}?populate[0]=cover&populate[1]=category&populate[2]=attachments`,
      { bearerToken: jwt.value },
    ),
)

const article = computed(() => articleData.value?.data ?? null)

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
      cover: payload.cover,
      attachments: payload.attachments,
      category: payload.categoryId ?? null,
    }

    await strapi.strapiFetch(`/articles/${documentId}`, {
      method: 'PUT',
      bearerToken: jwt.value,
      body: { data: body },
    })

    toast.success(t('admin.articleUpdated'))
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
          {{ t('admin.editArticle') }}
        </h1>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading -->
      <div v-if="loading" class="space-y-4 animate-pulse">
        <div class="h-10 bg-border rounded-[12px] w-3/4" />
        <div class="h-10 bg-border rounded-[12px] w-1/2" />
        <div class="h-40 bg-border rounded-[12px]" />
        <div class="h-64 bg-border rounded-[12px]" />
      </div>

      <!-- Not found -->
      <div v-else-if="!article" class="py-24 text-center text-text-muted">
        {{ t('admin.articleNotFound') }}
      </div>

      <!-- Form -->
      <AdminArticleForm
        v-else
        :initial-data="article"
        :saving="saving"
        :error="error"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
