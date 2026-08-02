<script setup lang="ts">
export interface MultiSelectOption {
  value: string
  label: string
}

/**
 * Dropdown multi-select for filter facets.
 *
 * A row of chips stops scaling once there are ~30 categories, so the list lives in a panel with
 * a search box, and the current selection stays visible as removable chips underneath — the
 * filter is readable without opening anything.
 */
const props = withDefaults(defineProps<{
  modelValue: string[]
  options: MultiSelectOption[]
  label: string
  searchPlaceholder?: string
  allLabel: string
  clearLabel: string
  emptyLabel: string
  /** Show the search box only once the list is long enough to need it. */
  searchThreshold?: number
}>(), { searchThreshold: 8 })

const emit = defineEmits<{ 'update:modelValue': [string[]] }>()

const open = ref(false)
const query = ref('')
const root = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)

/**
 * The parent applies a change by navigating, which resolves a tick later. Toggling twice quickly
 * would then compute the second change from the stale prop and lose the first, so the working
 * copy lives here and the prop only re-seeds it.
 */
const selected = ref<string[]>([...props.modelValue])
watch(() => props.modelValue, value => { selected.value = [...value] })

/** Alphabetical by the localized label, using Ukrainian collation. */
const sortedOptions = computed(() =>
  [...props.options].sort((left, right) => left.label.localeCompare(right.label, 'uk')),
)

const visibleOptions = computed(() => {
  const needle = query.value.trim().toLowerCase()
  if (!needle) return sortedOptions.value
  return sortedOptions.value.filter(option => option.label.toLowerCase().includes(needle))
})

const selectedOptions = computed(() =>
  sortedOptions.value.filter(option => selected.value.includes(option.value)),
)

function isSelected(value: string): boolean {
  return selected.value.includes(value)
}

function toggle(value: string) {
  selected.value = isSelected(value)
    ? selected.value.filter(item => item !== value)
    : [...selected.value, value]
  emit('update:modelValue', selected.value)
}

function clear() {
  selected.value = []
  emit('update:modelValue', [])
}

async function openPanel() {
  open.value = true
  await nextTick()
  searchInput.value?.focus()
}

function close() {
  open.value = false
  query.value = ''
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!open.value) return
  if (root.value && !root.value.contains(event.target as Node)) close()
}

onMounted(() => document.addEventListener('pointerdown', onDocumentPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointerDown))
</script>

<template>
  <div class="mb-10">
    <div ref="root" class="relative inline-block">
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-100 text-sm font-medium border transition-colors duration-280"
        :class="
          selected.length
            ? 'bg-navy text-white border-navy'
            : 'bg-white text-navy border-border hover:border-navy'
        "
        :aria-expanded="open"
        aria-haspopup="listbox"
        @click="open ? close() : openPanel()"
      >
        {{ label }}
        <span
          v-if="selected.length"
          class="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-100 bg-white/20 text-[11px] font-semibold"
        >
          {{ selected.length }}
        </span>
        <svg
          class="w-3.5 h-3.5 transition-transform duration-280"
          :class="open ? 'rotate-180' : ''"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        v-if="open"
        class="absolute z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] bg-white border border-border rounded-14 shadow-mega overflow-hidden"
        role="listbox"
        :aria-multiselectable="true"
        @keydown.esc="close"
      >
        <div v-if="sortedOptions.length >= searchThreshold" class="p-3 border-b border-border">
          <input
            ref="searchInput"
            v-model="query"
            type="search"
            :placeholder="searchPlaceholder"
            class="w-full px-3 py-2 rounded-10 border border-border text-sm text-navy outline-none focus:border-navy"
          />
        </div>

        <ul class="max-h-72 overflow-y-auto list-none p-0 m-0">
          <li v-for="option in visibleOptions" :key="option.value">
            <label
              class="flex items-start gap-2.5 px-4 py-2.5 cursor-pointer hover:bg-off-white transition-colors duration-280"
              role="option"
              :aria-selected="isSelected(option.value)"
            >
              <input
                type="checkbox"
                class="mt-0.5 w-4 h-4 shrink-0 accent-navy cursor-pointer"
                :checked="isSelected(option.value)"
                @change="toggle(option.value)"
              />
              <span class="text-sm text-navy leading-snug">{{ option.label }}</span>
            </label>
          </li>
          <li v-if="!visibleOptions.length" class="px-4 py-6 text-center text-body-sm text-text-muted">
            {{ emptyLabel }}
          </li>
        </ul>

        <div v-if="selected.length" class="p-2 border-t border-border">
          <button
            type="button"
            class="w-full px-3 py-2 rounded-10 text-sm font-medium text-navy hover:bg-off-white transition-colors duration-280"
            @click="clear()"
          >
            {{ clearLabel }}
          </button>
        </div>
      </div>
    </div>

    <!-- Selection stays visible with the panel closed, and each chip removes itself. -->
    <div v-if="selectedOptions.length" class="mt-3 flex flex-wrap items-center gap-2">
      <button
        v-for="option in selectedOptions"
        :key="option.value"
        type="button"
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-100 text-sm bg-navy text-white border border-navy transition-colors duration-280 hover:bg-navy-mid"
        @click="toggle(option.value)"
      >
        {{ option.label }}
        <svg class="w-3 h-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <button
        type="button"
        class="text-body-sm text-text-muted hover:text-navy underline transition-colors duration-280"
        @click="clear()"
      >
        {{ allLabel }}
      </button>
    </div>
  </div>
</template>
