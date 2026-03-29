<script setup lang="ts">
const props = defineProps<{
  open: boolean
  initialUrl: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  apply: [url: string]
  remove: []
}>()

const urlInput = ref('')
const urlInputRef = ref<HTMLInputElement | null>(null)

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      urlInput.value = props.initialUrl
      await nextTick()
      urlInputRef.value?.focus()
      urlInputRef.value?.select()
    }
  },
)

function close(): void {
  emit('update:open', false)
}

function onBackdropClick(e: MouseEvent): void {
  if ((e.target as HTMLElement).classList.contains('link-dialog-overlay')) {
    close()
  }
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape' && props.open) {
    close()
  }
}

function onSubmit(e: Event): void {
  e.preventDefault()
  emit('apply', urlInput.value.trim())
  close()
}

function onRemove(): void {
  emit('remove')
  close()
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      class="link-dialog-overlay fixed inset-0 bg-navy-deep/88 backdrop-blur-sm z-[2500] flex items-center justify-center p-4 transition-opacity duration-280"
      :class="open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      :aria-hidden="!open"
      role="presentation"
      @click="onBackdropClick"
    >
      <div
        class="relative w-full max-w-[440px] rounded-2xl border border-border bg-white p-6 shadow-mega transition-transform duration-280 font-geologica"
        :class="open ? 'scale-100' : 'scale-95'"
        role="dialog"
        aria-modal="true"
        aria-labelledby="link-dialog-title"
        @click.stop
      >
        <button
          type="button"
          class="absolute top-4 right-4 w-9 h-9 rounded-full border border-border bg-transparent text-navy text-lg flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-280"
          @click="close"
        >
          ✕
        </button>
        <h2 id="link-dialog-title" class="font-playfair text-xl text-navy-deep pr-10 mb-4">
          Посилання
        </h2>
        <form @submit="onSubmit">
          <label class="block text-xs font-semibold text-slate-600 mb-2" for="link-dialog-url">
            URL
          </label>
          <input
            id="link-dialog-url"
            ref="urlInputRef"
            v-model="urlInput"
            type="text"
            inputmode="url"
            autocomplete="off"
            placeholder="https://…"
            class="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-navy-deep placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <div class="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end mt-6">
            <button
              type="button"
              class="py-2.5 px-5 rounded-lg text-sm font-semibold border border-border bg-white text-navy-deep transition-all duration-280 hover:border-gold hover:text-gold"
              @click="close"
            >
              Скасувати
            </button>
            <button
              type="button"
              class="py-2.5 px-5 rounded-lg text-sm font-semibold border border-border bg-white text-danger transition-all duration-280 hover:bg-danger/10"
              @click="onRemove"
            >
              Прибрати посилання
            </button>
            <button
              type="submit"
              class="py-2.5 px-5 rounded-lg text-sm font-semibold bg-navy text-white transition-all duration-280 hover:bg-navy-deep"
            >
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
