<script setup lang="ts">
import type { StrapiArticle, StrapiCategory, StrapiImage, StrapiBlock, StrapiPaginatedResponse } from '~/types/news'
import type { ArticleFormPayload } from '~/types/admin'
import { normalizeStrapiRichTextForEditor } from '~/utils/articleRichTextNormalize'

const { t } = useSafeI18nWithRouter()

const props = defineProps<{
  initialData?: Partial<StrapiArticle>
  saving: boolean
  error: string | null
}>()

const emit = defineEmits<{
  submit: [payload: ArticleFormPayload]
  cancel: []
}>()

// Form state
const title = ref(props.initialData?.title ?? '')
const titleEn = ref(props.initialData?.titleEn ?? '')
const slug = ref(props.initialData?.slug ?? '')
const excerpt = ref(props.initialData?.excerpt ?? '')
const excerptEn = ref(props.initialData?.excerptEn ?? '')
const content = ref<StrapiBlock[] | null>(normalizeStrapiRichTextForEditor(props.initialData?.content))
const contentEn = ref<StrapiBlock[] | null>(normalizeStrapiRichTextForEditor(props.initialData?.contentEn))
const cover = ref<StrapiImage | null>(props.initialData?.cover ?? null)
const attachments = ref<StrapiImage[]>(props.initialData?.attachments ?? [])
const author = ref(props.initialData?.author ?? '')
const selectedCategoryId = ref<string | null>(props.initialData?.category?.documentId ?? null)

// Tabs
const activeTab = ref<'uk' | 'en'>('uk')

// Categories
const { strapiFetch } = useStrapi()
const { data: categoriesData } = await useAsyncData('admin-categories', () =>
  strapiFetch<StrapiPaginatedResponse<StrapiCategory>>('/categories?pagination[pageSize]=100'),
)
const categories = computed(() => categoriesData.value?.data ?? [])

watch(
  () => props.initialData?.documentId,
  () => {
    const data = props.initialData
    if (!data) return
    content.value = normalizeStrapiRichTextForEditor(data.content)
    contentEn.value = normalizeStrapiRichTextForEditor(data.contentEn)
  },
)

// Validation
const titleError = computed(() => !title.value.trim() ? t('admin.fieldRequired') : null)
const slugError = computed(() => !slug.value.trim() ? t('admin.fieldRequired') : null)

const inputClass = 'w-full py-3 px-4 rounded-[12px] border border-border bg-white text-navy font-geologica text-sm outline-none transition-[border-color,box-shadow] duration-280 focus:border-gold focus:ring-2 focus:ring-gold/35'

function handleSubmit() {
  if (titleError.value || slugError.value) return
  emit('submit', {
    title: title.value,
    titleEn: titleEn.value,
    slug: slug.value,
    excerpt: excerpt.value,
    excerptEn: excerptEn.value,
    content: content.value,
    contentEn: contentEn.value,
    cover: cover.value,
    attachments: attachments.value,
    author: author.value,
    categoryId: selectedCategoryId.value,
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Error banner -->
    <div
      v-if="error"
      class="rounded-[12px] border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
    >
      {{ error }}
    </div>

    <!-- Language tabs -->
    <div class="flex gap-1 border-b border-border">
      <button
        type="button"
        class="py-2.5 px-4 text-sm font-semibold transition-colors duration-280 border-b-2 -mb-px"
        :class="activeTab === 'uk' ? 'border-gold text-navy' : 'border-transparent text-muted hover:text-navy'"
        @click="activeTab = 'uk'"
      >
        Українська
      </button>
      <button
        type="button"
        class="py-2.5 px-4 text-sm font-semibold transition-colors duration-280 border-b-2 -mb-px"
        :class="activeTab === 'en' ? 'border-gold text-navy' : 'border-transparent text-muted hover:text-navy'"
        @click="activeTab = 'en'"
      >
        English
      </button>
    </div>

    <!-- Ukrainian tab -->
    <div v-show="activeTab === 'uk'" class="space-y-4">
      <div>
        <label class="block text-sm font-semibold text-navy mb-1.5">{{ t('admin.title') }} *</label>
        <input
          v-model="title"
          type="text"
          :class="[inputClass, titleError ? 'border-danger' : '']"
          :placeholder="t('admin.titlePlaceholder')"
        />
        <p v-if="titleError" class="text-xs text-danger mt-1">{{ titleError }}</p>
      </div>

      <AdminSlugInput v-model="slug" :source-text="title" />
      <p v-if="slugError" class="text-xs text-danger -mt-3">{{ slugError }}</p>

      <div>
        <label class="block text-sm font-semibold text-navy mb-1.5">{{ t('admin.excerpt') }}</label>
        <textarea
          v-model="excerpt"
          :class="inputClass"
          rows="3"
          :placeholder="t('admin.excerptPlaceholder')"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-navy mb-1.5">{{ t('admin.content') }}</label>
        <AdminRichTextEditor v-model="content" />
      </div>
    </div>

    <!-- English tab -->
    <div v-show="activeTab === 'en'" class="space-y-4">
      <div>
        <label class="block text-sm font-semibold text-navy mb-1.5">{{ t('admin.titleEn') }}</label>
        <input
          v-model="titleEn"
          type="text"
          :class="inputClass"
          placeholder="Article title in English"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-navy mb-1.5">{{ t('admin.excerptEn') }}</label>
        <textarea
          v-model="excerptEn"
          :class="inputClass"
          rows="3"
          placeholder="Short excerpt in English"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-navy mb-1.5">{{ t('admin.contentEn') }}</label>
        <AdminRichTextEditor v-model="contentEn" placeholder="Start writing in English..." />
      </div>
    </div>

    <!-- Common fields -->
    <div class="border-t border-border pt-6 space-y-4">
      <AdminImageUpload v-model="cover" :label="t('admin.coverImage')" />

      <div>
        <label class="block text-sm font-semibold text-navy mb-1.5">{{ t('admin.author') }}</label>
        <input
          v-model="author"
          type="text"
          :class="inputClass"
          :placeholder="t('admin.authorPlaceholder')"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-navy mb-1.5">{{ t('admin.category') }}</label>
        <select v-model="selectedCategoryId" :class="inputClass">
          <option :value="null">{{ t('admin.noCategory') }}</option>
          <option v-for="cat in categories" :key="cat.documentId" :value="cat.documentId">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <AdminAttachmentsUpload v-model="attachments" />
    </div>

    <!-- Actions -->
    <div class="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4 border-t border-border">
      <button
        type="button"
        class="py-2.5 px-6 rounded-lg text-sm font-semibold border border-border bg-white text-navy-deep transition-all duration-280 hover:border-gold hover:text-gold"
        @click="emit('cancel')"
      >
        {{ t('admin.cancel') }}
      </button>
      <button
        type="submit"
        :disabled="saving || !!titleError || !!slugError"
        class="py-2.5 px-6 rounded-lg text-sm font-bold bg-gold text-navy-deep border border-gold-light/80 shadow-sm hover:bg-gold-light hover:-translate-y-px hover:shadow-md transition-all duration-280 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="saving" class="inline-block w-4 h-4 border-2 border-navy-deep border-t-transparent rounded-full animate-spin mr-2 align-middle" />
        {{ saving ? t('admin.saving') : t('admin.save') }}
      </button>
    </div>
  </form>
</template>
