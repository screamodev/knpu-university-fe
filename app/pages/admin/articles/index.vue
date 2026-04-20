<script setup lang="ts">
import type { StrapiPaginatedResponse, StrapiArticle } from '~/types/news'
import { resolveMediaAlt, resolveMediaSrc } from '~/utils/directusMedia'

definePageMeta({ layout: 'default', middleware: 'admin' })

const { t, localePath, locale } = useSafeI18nWithRouter()
const strapi = useStrapi()
const { assetUrl } = useDirectus()
const { localized } = useLocalizedField()

const mediaResolvers = { assetUrl, strapiImageUrl: strapi.imageUrl }
const { isAdmin, meRestoreCompleted } = useAuth()
const toast = useToast()

useHead({ title: () => t('admin.articlesTitle') })

// Redirect non-admins after session restore
watch(meRestoreCompleted, (completed) => {
  if (completed && !isAdmin.value) {
    navigateTo(localePath('/'))
  }
}, { immediate: true })

const { data: articlesData, pending, refresh } = useAsyncData(
  'admin-articles',
  () => {
    const params = new URLSearchParams({
      'populate[0]': 'cover',
      'populate[1]': 'category',
      sort: 'publishedAt:desc',
      'pagination[pageSize]': '50',
    })
    return strapi.strapiFetch<StrapiPaginatedResponse<StrapiArticle>>(
      `/articles?${params.toString()}`,
    )
  },
)

const articles = computed(() => articlesData.value?.data ?? [])

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat(locale.value === 'uk' ? 'uk-UA' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function articlePublishedAt(article: StrapiArticle): string {
  return article.date_published ?? article.publishedAt ?? article.date_created ?? ''
}

function articleCoverSrc(cover: StrapiArticle['cover']): string {
  return resolveMediaSrc(cover, mediaResolvers)
}

function articleCoverAlt(cover: StrapiArticle['cover'], titleFallback: string): string {
  return resolveMediaAlt(cover, titleFallback)
}

function articleEditId(article: StrapiArticle): string {
  return article.documentId ?? article.id
}

// Delete
const deleteTarget = ref<StrapiArticle | null>(null)
const showDeleteModal = ref(false)
const deleting = ref(false)

function confirmDelete(article: StrapiArticle) {
  deleteTarget.value = article
  showDeleteModal.value = true
}

async function handleDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    const { jwt } = useAuth()
    await strapi.strapiFetch(`/articles/${articleEditId(deleteTarget.value)}`, {
      method: 'DELETE',
      bearerToken: jwt.value,
    })
    toast.success(t('admin.articleDeleted'))
    showDeleteModal.value = false
    deleteTarget.value = null
    await refresh()
  } catch {
    toast.error(t('admin.deleteError'))
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Page header -->
    <div class="bg-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-3">
          {{ t('admin.tag') }}
        </div>
        <div class="flex items-center justify-between gap-4">
          <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
            {{ t('admin.articlesTitle') }}
          </h1>
          <NuxtLink
            :to="localePath('/admin/articles/create')"
            class="inline-flex items-center gap-2 rounded-lg bg-gold text-navy-deep no-underline py-2.5 px-5 text-sm font-bold font-geologica shadow-sm border border-gold-light/80 hover:bg-gold-light hover:-translate-y-px hover:shadow-md transition-all duration-280 shrink-0"
          >
            <span class="text-lg leading-none">+</span>
            {{ t('admin.createArticle') }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading skeleton -->
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-off-white border border-border rounded-16 overflow-hidden animate-pulse"
        >
          <div class="h-48 bg-border" />
          <div class="p-5 space-y-3">
            <div class="h-3 bg-border rounded w-1/4" />
            <div class="h-5 bg-border rounded w-4/5" />
            <div class="h-3 bg-border rounded w-1/4" />
          </div>
        </div>
      </div>

      <!-- Articles card grid -->
      <div v-else-if="articles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="article in articles"
          :key="article.id"
          class="group relative bg-off-white border border-border rounded-16 overflow-hidden flex flex-col transition-all duration-280 hover:border-gold hover:-translate-y-1 hover:shadow-gold"
        >
          <!-- Cover image -->
          <div class="h-48 bg-navy-mid overflow-hidden relative">
            <img
              v-if="article.cover && articleCoverSrc(article.cover)"
              :src="articleCoverSrc(article.cover)"
              :alt="articleCoverAlt(article.cover, localized(article, 'title'))"
              class="w-full h-full object-cover transition-transform duration-280 group-hover:scale-105"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center"
            >
              <svg class="w-10 h-10 text-gold/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>

            <!-- Action overlay -->
            <div class="absolute inset-0 bg-navy-deep/70 opacity-0 group-hover:opacity-100 transition-opacity duration-280 flex items-center justify-center gap-3">
              <NuxtLink
                :to="localePath(`/admin/articles/${articleEditId(article)}/edit`)"
                class="py-2 px-4 rounded-lg text-sm font-semibold bg-white text-navy no-underline hover:bg-off-white transition-colors"
              >
                {{ t('admin.edit') }}
              </NuxtLink>
              <button
                type="button"
                class="py-2 px-4 rounded-lg text-sm font-semibold bg-danger text-white hover:bg-danger/90 transition-colors"
                @click.stop="confirmDelete(article)"
              >
                {{ t('admin.delete') }}
              </button>
            </div>
          </div>

          <!-- Card body -->
          <div class="p-5 flex flex-col flex-1">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-gold mb-2">
              {{ article.category ? localized(article.category, 'name') : '' }}
            </div>
            <div class="font-playfair text-[16px] font-semibold text-navy leading-snug flex-1 mb-3">
              {{ localized(article, 'title') }}
            </div>
            <div class="text-xs text-text-muted">
              {{ articlePublishedAt(article) ? formatDate(articlePublishedAt(article)) : '' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="py-24 text-center">
        <p class="text-text-muted mb-6">{{ t('admin.noArticles') }}</p>
        <NuxtLink
          :to="localePath('/admin/articles/create')"
          class="inline-flex items-center gap-2 rounded-lg bg-gold text-navy-deep no-underline py-2.5 px-5 text-sm font-bold shadow-sm border border-gold-light/80 hover:bg-gold-light transition-all duration-280"
        >
          {{ t('admin.createFirstArticle') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Delete modal -->
    <AdminDeleteConfirmModal
      v-model:open="showDeleteModal"
      :title="t('admin.deleteArticleTitle')"
      :message="t('admin.deleteArticleMessage', { title: deleteTarget?.title ?? '' })"
      @confirm="handleDelete"
    />
  </div>
</template>
