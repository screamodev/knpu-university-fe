<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3/menus'
import { isNodeActive } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import type { Editor } from '@tiptap/core'
import type { EditorState } from '@tiptap/pm/state'
import type { LegacyBlock } from '~/types/directus'
import { strapiBlocksToTiptap, tiptapToStrapiBlocks } from '~/utils/strapiBlocksConverter'
import type { TiptapDoc } from '~/utils/strapiBlocksConverter'

const props = defineProps<{
  modelValue: LegacyBlock[] | null
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [blocks: LegacyBlock[]]
}>()

const { uploadFile } = useUpload()
const { assetUrl } = useDirectus()

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const editor = useEditor({
  content: strapiBlocksToTiptap(props.modelValue),
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: null,
    }),
    Image,
    Link.configure({ openOnClick: false }),
    Underline,
    Placeholder.configure({ placeholder: props.placeholder ?? 'Почніть писати...' }),
  ],
  onUpdate({ editor: e }) {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      const doc = e.getJSON() as TiptapDoc
      emit('update:modelValue', tiptapToStrapiBlocks(doc))
    }, 300)
  },
})

watch(() => props.modelValue, (newBlocks) => {
  if (!editor.value) return
  const currentJson = JSON.stringify(tiptapToStrapiBlocks(editor.value.getJSON() as TiptapDoc))
  const newJson = JSON.stringify(newBlocks ?? [])
  if (currentJson !== newJson) {
    editor.value.commands.setContent(strapiBlocksToTiptap(newBlocks))
  }
}, { deep: true })

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

const fileInputRef = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

const linkDialogOpen = ref(false)
const linkDialogInitialUrl = ref('')
/** Saved from/to so applying the link survives focus moving to the dialog. */
const savedTextSelection = ref<{ from: number; to: number } | null>(null)

function bubbleMenuShouldShow(payload: { editor: Editor; state: EditorState }): boolean {
  if (!payload.editor.isEditable) return false
  if (payload.state.selection.empty) return false
  if (isNodeActive(payload.state, 'codeBlock')) return false
  return true
}

function openLinkDialog(): void {
  if (!editor.value) return
  const { from, to } = editor.value.state.selection
  savedTextSelection.value = { from, to }
  linkDialogInitialUrl.value = String(editor.value.getAttributes('link').href ?? '')
  linkDialogOpen.value = true
}

function applyLinkFromDialog(url: string): void {
  if (!editor.value || !savedTextSelection.value) return
  const { from, to } = savedTextSelection.value
  const e = editor.value
  if (url === '') {
    e.chain()
      .focus()
      .setTextSelection({ from, to })
      .extendMarkRange('link')
      .unsetLink()
      .run()
  } else {
    e.chain()
      .focus()
      .setTextSelection({ from, to })
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
  }
  savedTextSelection.value = null
}

function removeLinkFromDialog(): void {
  if (!editor.value || !savedTextSelection.value) return
  const { from, to } = savedTextSelection.value
  editor.value
    .chain()
    .focus()
    .setTextSelection({ from, to })
    .extendMarkRange('link')
    .unsetLink()
    .run()
  savedTextSelection.value = null
}

function onLinkDialogOpenUpdate(open: boolean): void {
  linkDialogOpen.value = open
  if (!open) {
    savedTextSelection.value = null
  }
}

function triggerImageUpload(): void {
  fileInputRef.value?.click()
}

async function handleImageUpload(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (!files || files.length === 0 || !editor.value) return

  uploading.value = true
  try {
    for (const file of Array.from(files)) {
      const image = await uploadFile(file)
      const src = assetUrl(image) ?? image.url ?? ''
      if (!src) continue
      editor.value.chain().focus().setImage({ src, alt: image.alternativeText ?? '' }).run()
    }
  } catch {
    // Toast handled by caller if needed
  } finally {
    uploading.value = false
    input.value = ''
  }
}
</script>

<template>
  <div class="rounded-[12px] border border-border overflow-hidden">
    <template v-if="editor">
      <AdminRichTextEditorToolbar
        :editor="editor"
        :uploading="uploading"
        @edit-link="openLinkDialog"
        @insert-image="triggerImageUpload"
      />

      <BubbleMenu
        class="flex"
        :editor="editor"
        :should-show="bubbleMenuShouldShow"
        :options="{ placement: 'top', offset: 8 }"
      >
        <div
          class="flex flex-wrap gap-0.5 rounded-xl border border-border bg-white p-1 shadow-lg z-[40]"
        >
          <button
            type="button"
            title="Жирний"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-280"
            :class="editor.isActive('bold') ? 'bg-navy text-white' : 'text-navy hover:bg-navy/10'"
            @click="editor.chain().focus().toggleBold().run()"
          >
            B
          </button>
          <button
            type="button"
            title="Курсив"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-280"
            :class="editor.isActive('italic') ? 'bg-navy text-white' : 'text-navy hover:bg-navy/10'"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            I
          </button>
          <button
            type="button"
            title="Підкреслення"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-280"
            :class="editor.isActive('underline') ? 'bg-navy text-white' : 'text-navy hover:bg-navy/10'"
            @click="editor.chain().focus().toggleUnderline().run()"
          >
            U
          </button>
          <button
            type="button"
            title="Закреслення"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-280"
            :class="editor.isActive('strike') ? 'bg-navy text-white' : 'text-navy hover:bg-navy/10'"
            @click="editor.chain().focus().toggleStrike().run()"
          >
            S
          </button>
          <button
            type="button"
            title="Посилання"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-280"
            :class="editor.isActive('link') ? 'bg-navy text-white' : 'text-navy hover:bg-navy/10'"
            @click="openLinkDialog"
          >
            🔗
          </button>
        </div>
      </BubbleMenu>
    </template>

    <!-- Editor content -->
    <EditorContent
      v-if="editor"
      :editor="editor"
      class="prose prose-navy max-w-none p-4 min-h-[300px] focus-within:outline-none [&_.tiptap]:outline-none [&_.tiptap_p.is-editor-empty:first-child::before]:text-muted [&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:h-0 [&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none"
    />
    <div
      v-else
      class="flex items-center justify-center p-4 min-h-[300px] text-sm text-muted bg-off-white/50"
      aria-busy="true"
    >
      Завантаження редактора…
    </div>

    <AdminRichTextEditorLinkDialog
      :open="linkDialogOpen"
      :initial-url="linkDialogInitialUrl"
      @update:open="onLinkDialogOpenUpdate"
      @apply="applyLinkFromDialog"
      @remove="removeLinkFromDialog"
    />

    <!-- Hidden file input for images -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*,.heic,.heif,image/heic,image/heif"
      multiple
      class="hidden"
      @change="handleImageUpload"
    />
  </div>
</template>
