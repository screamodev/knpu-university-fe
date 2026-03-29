<script setup lang="ts">
const { t } = useSafeI18nWithRouter()

const props = defineProps<{
  open: boolean
  title: string
  message: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
}>()

function close() {
  emit('update:open', false)
}

function onBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('delete-confirm-overlay')) {
    close()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) close()
}

onMounted(() => {
  if (import.meta.client) window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="delete-confirm-overlay fixed inset-0 bg-navy-deep/88 backdrop-blur-sm z-[2500] flex items-center justify-center p-4 transition-opacity duration-280"
      :class="open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      :aria-hidden="!open"
      role="presentation"
      @click="onBackdropClick"
    >
      <div
        class="relative w-full max-w-[400px] rounded-16 border border-border bg-white p-6 sm:p-8 shadow-mega transition-transform duration-280 font-geologica"
        :class="open ? 'scale-100' : 'scale-95'"
        role="dialog"
        aria-modal="true"
        @click.stop
      >
        <button
          type="button"
          class="absolute top-4 right-4 w-9 h-9 rounded-full border border-border bg-transparent text-navy text-lg flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-280"
          @click="close"
        >
          ✕
        </button>
        <h2 class="font-playfair text-xl text-navy-deep pr-10 mb-3">
          {{ title }}
        </h2>
        <p class="text-sm text-text-muted mb-8 leading-relaxed">
          {{ message }}
        </p>
        <div class="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            class="py-2.5 px-5 rounded-lg text-sm font-semibold border border-border bg-white text-navy-deep transition-all duration-280 hover:border-gold hover:text-gold"
            @click="close"
          >
            {{ t('admin.cancel') }}
          </button>
          <button
            type="button"
            class="py-2.5 px-5 rounded-lg text-sm font-semibold border-2 border-danger text-danger bg-white transition-all duration-280 hover:bg-danger/10"
            @click="emit('confirm')"
          >
            {{ t('admin.confirmDelete') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
