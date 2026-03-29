<script setup lang="ts">
const { t } = useSafeI18nWithRouter()

interface Props {
  open: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
}>()

function close(): void {
  emit('update:open', false)
}

function onBackdropClick(e: MouseEvent): void {
  if ((e.target as HTMLElement).classList.contains('logout-confirm-overlay')) {
    close()
  }
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape' && props.open) {
    close()
  }
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

function onConfirm(): void {
  emit('confirm')
}
</script>

<template>
  <Teleport to="body">
    <div
      class="logout-confirm-overlay fixed inset-0 bg-navy-deep/88 backdrop-blur-sm z-[2500] flex items-center justify-center p-4 transition-opacity duration-280"
      :class="{
        'opacity-100 pointer-events-auto': open,
        'opacity-0 pointer-events-none': !open,
      }"
      :aria-hidden="!open"
      role="presentation"
      @click="onBackdropClick"
    >
      <div
        class="relative w-full max-w-[400px] rounded-16 border border-border bg-white p-6 sm:p-8 shadow-mega transition-transform duration-280 font-geologica"
        :class="open ? 'scale-100' : 'scale-95'"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
        @click.stop
      >
        <button
          type="button"
          class="absolute top-4 right-4 w-9 h-9 rounded-full border border-border bg-transparent text-navy text-lg flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-280"
          :aria-label="t('auth.logoutCancel')"
          @click="close"
        >
          ✕
        </button>
        <h2 id="logout-confirm-title" class="font-playfair text-xl text-navy-deep pr-10 mb-3">
          {{ t('auth.logoutConfirmTitle') }}
        </h2>
        <p class="text-sm text-text-muted mb-8 leading-relaxed">
          {{ t('auth.logoutConfirmMessage') }}
        </p>
        <div class="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            class="py-2.5 px-5 rounded-lg text-sm font-semibold border border-border bg-white text-navy-deep transition-all duration-280 hover:border-gold hover:text-gold"
            @click="close"
          >
            {{ t('auth.logoutCancel') }}
          </button>
          <button
            type="button"
            class="py-2.5 px-5 rounded-lg text-sm font-semibold border-2 border-danger text-danger bg-white transition-all duration-280 hover:bg-danger/10"
            @click="onConfirm"
          >
            {{ t('auth.logoutConfirm') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
