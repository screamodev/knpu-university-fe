<script setup lang="ts">
import { slugifyUkrainian } from '~/utils/slugify'

const props = defineProps<{
  modelValue: string
  sourceText: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const autoMode = ref(true)

watch(() => props.sourceText, (text) => {
  if (autoMode.value) {
    emit('update:modelValue', slugifyUkrainian(text))
  }
})

function toggleAutoMode() {
  autoMode.value = !autoMode.value
  if (autoMode.value) {
    emit('update:modelValue', slugifyUkrainian(props.sourceText))
  }
}

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<template>
  <div>
    <label class="block text-sm font-semibold text-navy mb-1.5">Slug (URL)</label>
    <div class="relative">
      <input
        :value="modelValue"
        type="text"
        :readonly="autoMode"
        class="w-full py-3 px-4 pr-12 rounded-[12px] border border-border bg-white text-navy font-geologica text-sm outline-none transition-[border-color,box-shadow] duration-280 focus:border-gold focus:ring-2 focus:ring-gold/35"
        :class="autoMode ? 'bg-off-white/70 text-muted' : ''"
        placeholder="article-slug"
        @input="onInput"
      />
      <button
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors"
        :class="autoMode ? 'text-gold bg-gold/10' : 'text-muted hover:text-navy'"
        :title="autoMode ? 'Автоматичний режим' : 'Ручний режим'"
        @click="toggleAutoMode"
      >
        {{ autoMode ? '🔒' : '✏️' }}
      </button>
    </div>
  </div>
</template>
