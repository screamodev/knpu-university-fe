<script setup lang="ts">
import type { StrapiImage } from '~/types/strapi'

const props = defineProps<{
  modelValue: StrapiImage[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: StrapiImage[]]
}>()

const { uploadFile } = useUpload()
const uploading = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

function triggerSelect() {
  fileInputRef.value?.click()
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (!files || files.length === 0) return

  uploading.value = true
  try {
    const uploaded: StrapiImage[] = []
    for (const file of Array.from(files)) {
      const image = await uploadFile(file)
      uploaded.push(image)
    }
    emit('update:modelValue', [...(props.modelValue ?? []), ...uploaded])
  } catch {
    // Error handling deferred to parent
  } finally {
    uploading.value = false
    input.value = ''
  }
}

function removeAt(index: number) {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}
</script>

<template>
  <div>
    <label class="block text-sm font-semibold text-navy mb-1.5">Вкладення</label>

    <div v-if="modelValue.length > 0" class="space-y-2 mb-3">
      <div
        v-for="(file, index) in modelValue"
        :key="file.id"
        class="flex items-center justify-between py-2 px-3 rounded-lg border border-border bg-off-white/50"
      >
        <span class="text-sm text-navy truncate">{{ file.url.split('/').pop() }}</span>
        <button
          type="button"
          class="ml-2 text-danger hover:text-danger/70 text-sm font-semibold transition-colors shrink-0"
          @click="removeAt(index)"
        >
          ✕
        </button>
      </div>
    </div>

    <button
      type="button"
      class="w-full py-3 rounded-[12px] border-2 border-dashed border-border hover:border-gold bg-off-white/50 hover:bg-gold/5 transition-all duration-280 text-sm text-muted"
      :disabled="uploading"
      @click="triggerSelect"
    >
      <template v-if="uploading">Завантаження...</template>
      <template v-else>+ Додати файл</template>
    </button>

    <input
      ref="fileInputRef"
      type="file"
      multiple
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>
