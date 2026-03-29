<script setup lang="ts">
import type { Editor } from '@tiptap/core'

const props = defineProps<{
  editor: Editor
  uploading: boolean
}>()

const emit = defineEmits<{
  'edit-link': []
  'insert-image': []
}>()

interface ToolbarButton {
  icon: string
  title: string
  action: () => void
  isActive?: () => boolean
}

function isTextAlignActive(editor: Editor, align: 'left' | 'center' | 'right' | 'justify'): boolean {
  if (!editor.isActive('paragraph') && !editor.isActive('heading')) {
    return false
  }
  if (align === 'left') {
    return (
      !editor.isActive({ textAlign: 'center' })
      && !editor.isActive({ textAlign: 'right' })
      && !editor.isActive({ textAlign: 'justify' })
    )
  }
  return editor.isActive({ textAlign: align })
}

const toolbarButtons = computed<ToolbarButton[]>(() => {
  const e = props.editor
  return [
    { icon: 'B', title: 'Жирний', action: () => e.chain().focus().toggleBold().run(), isActive: () => e.isActive('bold') },
    { icon: 'I', title: 'Курсив', action: () => e.chain().focus().toggleItalic().run(), isActive: () => e.isActive('italic') },
    { icon: 'U', title: 'Підкреслення', action: () => e.chain().focus().toggleUnderline().run(), isActive: () => e.isActive('underline') },
    { icon: 'S', title: 'Закреслення', action: () => e.chain().focus().toggleStrike().run(), isActive: () => e.isActive('strike') },
    { icon: 'H1', title: 'Заголовок 1', action: () => e.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => e.isActive('heading', { level: 1 }) },
    { icon: 'H2', title: 'Заголовок 2', action: () => e.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => e.isActive('heading', { level: 2 }) },
    { icon: 'H3', title: 'Заголовок 3', action: () => e.chain().focus().toggleHeading({ level: 3 }).run(), isActive: () => e.isActive('heading', { level: 3 }) },
    { icon: 'H4', title: 'Заголовок 4', action: () => e.chain().focus().toggleHeading({ level: 4 }).run(), isActive: () => e.isActive('heading', { level: 4 }) },
    {
      icon: 'Л',
      title: 'Вирівняти зліва',
      action: () => e.chain().focus().setTextAlign('left').run(),
      isActive: () => isTextAlignActive(e, 'left'),
    },
    {
      icon: 'Ц',
      title: 'По центру',
      action: () => e.chain().focus().setTextAlign('center').run(),
      isActive: () => isTextAlignActive(e, 'center'),
    },
    {
      icon: 'П',
      title: 'Вирівняти справа',
      action: () => e.chain().focus().setTextAlign('right').run(),
      isActive: () => isTextAlignActive(e, 'right'),
    },
    {
      icon: 'В',
      title: 'По ширині',
      action: () => e.chain().focus().setTextAlign('justify').run(),
      isActive: () => isTextAlignActive(e, 'justify'),
    },
    { icon: '•', title: 'Маркований список', action: () => e.chain().focus().toggleBulletList().run(), isActive: () => e.isActive('bulletList') },
    { icon: '1.', title: 'Нумерований список', action: () => e.chain().focus().toggleOrderedList().run(), isActive: () => e.isActive('orderedList') },
    { icon: '❝', title: 'Цитата', action: () => e.chain().focus().toggleBlockquote().run(), isActive: () => e.isActive('blockquote') },
    { icon: '<>', title: 'Код', action: () => e.chain().focus().toggleCodeBlock().run(), isActive: () => e.isActive('codeBlock') },
    {
      icon: '🔗',
      title: 'Посилання',
      action: () => emit('edit-link'),
      isActive: () => e.isActive('link'),
    },
    {
      icon: '🖼',
      title: 'Зображення',
      action: () => {
        emit('insert-image')
      },
    },
    { icon: '↩', title: 'Скасувати', action: () => e.chain().focus().undo().run() },
    { icon: '↪', title: 'Повторити', action: () => e.chain().focus().redo().run() },
  ]
})
</script>

<template>
  <div class="flex flex-wrap gap-1 p-2 bg-off-white border-b border-border">
    <button
      v-for="btn in toolbarButtons"
      :key="btn.title"
      type="button"
      :title="btn.title"
      class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-280"
      :class="btn.isActive?.() ? 'bg-navy text-white' : 'text-navy hover:bg-navy/10'"
      @click="btn.action"
    >
      {{ btn.icon }}
    </button>
    <span v-if="uploading" class="flex items-center text-xs text-muted ml-2">
      Завантаження...
    </span>
  </div>
</template>
