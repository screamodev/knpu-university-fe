<script setup lang="ts">
const props = defineProps<{
  /** `directus_files.id` */
  modelValue: string | null
  label: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const { uploadFile } = useUpload()
const { assetUrl } = useDirectus()
const uploading = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

const previewSrc = computed(() => (props.modelValue ? assetUrl(props.modelValue) : null))

function triggerSelect() {
  fileInputRef.value?.click()
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploading.value = true
  try {
    const uploaded = await uploadFile(file)
    const rawId = uploaded.id
    const id = typeof rawId === 'string' ? rawId : String(rawId)
    emit('update:modelValue', id)
  } catch {
    // Error handling deferred to parent
  } finally {
    uploading.value = false
    input.value = ''
  }
}

function remove() {
  emit('update:modelValue', null)
}
</script>

<template>
  <div>
    <label class="block text-sm font-semibold text-navy mb-1.5">{{ label }}</label>

    <!-- Preview -->
    <div
      v-if="modelValue && previewSrc"
      class="relative group rounded-[12px] overflow-hidden border border-border"
    >
      <img
        :src="previewSrc"
        alt=""
        class="w-full h-48 object-cover"
      />
      <div class="absolute inset-0 bg-navy-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-280 flex items-center justify-center gap-3">
        <button
          type="button"
          class="py-2 px-4 rounded-lg text-sm font-semibold bg-white text-navy hover:bg-off-white transition-colors"
          @click="triggerSelect"
        >
          Замінити
        </button>
        <button
          type="button"
          class="py-2 px-4 rounded-lg text-sm font-semibold bg-danger text-white hover:bg-danger/90 transition-colors"
          @click="remove"
        >
          Видалити
        </button>
      </div>
    </div>

    <!-- Dropzone -->
    <button
      v-else
      type="button"
      class="w-full h-48 rounded-[12px] border-2 border-dashed border-border hover:border-gold bg-off-white/50 hover:bg-gold/5 transition-all duration-280 flex flex-col items-center justify-center gap-2 text-muted"
      :disabled="uploading"
      @click="triggerSelect"
    >
      <template v-if="uploading">
        <span class="inline-block w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span class="text-sm">Завантаження...</span>
      </template>
      <template v-else>
        <svg class="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 16V4m0 0L8 8m4-4l4 4" />
          <path d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
        </svg>
        <span class="text-sm">Натисніть для завантаження</span>
      </template>
    </button>

    <input
      ref="fileInputRef"
      type="file"
      accept="image/*,.heic,.heif,image/heic,image/heif"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>
