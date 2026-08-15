<script setup lang="ts">
export interface MultiSelectOption {
  value: string
  label: string
  /** Nested options — a faculty's кафедри. Rendered as an accordion under the parent row. */
  children?: MultiSelectOption[]
}

/**
 * Dropdown multi-select for filter facets.
 *
 * A row of chips stops scaling once there are ~30 categories, so the list lives in a panel with
 * a search box, and the current selection stays visible as removable chips underneath — the
 * filter is readable without opening anything.
 *
 * Options may be two levels deep: the client asked that кафедри hang off their faculty instead of
 * sitting in one flat list. Ticking a faculty ticks its кафедри as well, so the reader gets the
 * whole feed of that faculty — the same roll-up the unit pages do.
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

/** Alphabetical by the localized label, using Ukrainian collation — children included. */
const byLabel = (left: MultiSelectOption, right: MultiSelectOption) =>
  left.label.localeCompare(right.label, 'uk')

const sortedOptions = computed<MultiSelectOption[]>(() =>
  [...props.options].sort(byLabel).map(option => (
    option.children?.length ? { ...option, children: [...option.children].sort(byLabel) } : option
  )),
)

/** A parent whose own label misses the needle still shows, trimmed to its matching children. */
const visibleOptions = computed<MultiSelectOption[]>(() => {
  const needle = query.value.trim().toLowerCase()
  if (!needle) return sortedOptions.value

  const matches = (option: MultiSelectOption) => option.label.toLowerCase().includes(needle)

  return sortedOptions.value.flatMap((option) => {
    if (matches(option)) return [option]
    const children = option.children?.filter(matches) ?? []
    return children.length ? [{ ...option, children }] : []
  })
})

/** Parents expanded in the panel; a search hit expands its parent automatically. */
const expanded = ref<string[]>([])

function isExpanded(option: MultiSelectOption): boolean {
  return expanded.value.includes(option.value) || Boolean(query.value.trim() && option.children?.length)
}

function toggleExpanded(value: string) {
  expanded.value = expanded.value.includes(value)
    ? expanded.value.filter(item => item !== value)
    : [...expanded.value, value]
}

const flatOptions = computed<MultiSelectOption[]>(() =>
  sortedOptions.value.flatMap(option => [option, ...(option.children ?? [])]),
)

const selectedOptions = computed(() =>
  flatOptions.value.filter(option => selected.value.includes(option.value)),
)

function isSelected(value: string): boolean {
  return selected.value.includes(value)
}

/** A parent is «partly» selected when кафедри under it are ticked but the faculty itself is not. */
function isPartlySelected(option: MultiSelectOption): boolean {
  if (isSelected(option.value) || !option.children?.length) return false
  return option.children.some(child => isSelected(child.value))
}

/** Ticking a faculty takes its кафедри with it; unticking releases them. */
function toggle(option: MultiSelectOption | string) {
  const target = typeof option === 'string' ? { value: option, label: option } : option
  const values = [target.value, ...(target.children ?? []).map(child => child.value)]
  const next = isSelected(target.value)
    ? selected.value.filter(item => !values.includes(item))
    : [...new Set([...selected.value, ...values])]

  selected.value = next
  emit('update:modelValue', next)
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
            <div class="flex items-start">
              <label
                class="flex flex-1 items-start gap-2.5 px-4 py-2.5 cursor-pointer hover:bg-off-white transition-colors duration-280"
                role="option"
                :aria-selected="isSelected(option.value)"
              >
                <input
                  type="checkbox"
                  class="mt-0.5 w-4 h-4 shrink-0 accent-navy cursor-pointer"
                  :checked="isSelected(option.value)"
                  :indeterminate="isPartlySelected(option)"
                  @change="toggle(option)"
                />
                <span class="text-sm text-navy leading-snug">{{ option.label }}</span>
              </label>

              <!-- Faculty row expands to its кафедри. -->
              <button
                v-if="option.children?.length"
                type="button"
                class="shrink-0 px-3 py-2.5 text-navy/60 hover:text-navy transition-colors duration-280"
                :aria-expanded="isExpanded(option)"
                :aria-label="option.label"
                @click="toggleExpanded(option.value)"
              >
                <svg
                  class="w-3.5 h-3.5 transition-transform duration-280"
                  :class="isExpanded(option) ? 'rotate-180' : ''"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>

            <ul
              v-if="option.children?.length && isExpanded(option)"
              class="list-none p-0 m-0 border-l-2 border-border ml-6"
            >
              <li v-for="child in option.children" :key="child.value">
                <label
                  class="flex items-start gap-2.5 px-4 py-2 cursor-pointer hover:bg-off-white transition-colors duration-280"
                  role="option"
                  :aria-selected="isSelected(child.value)"
                >
                  <input
                    type="checkbox"
                    class="mt-0.5 w-4 h-4 shrink-0 accent-navy cursor-pointer"
                    :checked="isSelected(child.value)"
                    @change="toggle(child)"
                  />
                  <span class="text-body-sm text-text-muted leading-snug">{{ child.label }}</span>
                </label>
              </li>
            </ul>
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
