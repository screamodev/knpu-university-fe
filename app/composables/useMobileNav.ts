export function useMobileNav() {
  const isOpen = ref(false)
  const openIndex = ref<number | null>(null)

  function open() {
    isOpen.value = true
    if (import.meta.client) {
      document.body.style.overflow = 'hidden'
    }
  }

  function close() {
    isOpen.value = false
    openIndex.value = null
    if (import.meta.client) {
      document.body.style.overflow = ''
    }
  }

  function toggleAccordion(index: number) {
    openIndex.value = openIndex.value === index ? null : index
  }

  return { isOpen, openIndex, open, close, toggleAccordion }
}
