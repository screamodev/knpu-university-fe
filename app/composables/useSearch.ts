export function useSearch() {
  const isOpen = ref(false)
  const inputRef = ref<HTMLInputElement | null>(null)

  function open() {
    isOpen.value = true
    nextTick(() => {
      inputRef.value?.focus()
    })
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value ? close() : open()
  }

  return { isOpen, inputRef, open, close, toggle }
}
