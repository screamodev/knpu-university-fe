import MarkdownIt from 'markdown-it'
import type { StrapiBlock, StrapiBlockChild, StrapiBlockTextAlign } from '~/types/strapi'

const ALIGN_EXPORTABLE: readonly StrapiBlockTextAlign[] = ['left', 'center', 'right', 'justify']

function isExportableAlign(value: unknown): value is StrapiBlockTextAlign {
  return typeof value === 'string' && (ALIGN_EXPORTABLE as readonly string[]).includes(value)
}

/** Renders inline markdown (emphasis, links, code) to HTML for aligned block wrappers. */
const inlineMarkdownToHtml = (() => {
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false })
  return (source: string): string => md.renderInline(source)
})()

function blockTextAlignFromTiptap(attrs: Record<string, unknown> | undefined): StrapiBlockTextAlign | undefined {
  const raw = attrs?.textAlign
  if (!isExportableAlign(raw) || raw === 'left') return undefined
  return raw
}

// ---------------------------------------------------------------------------
// Tiptap ProseMirror JSON types (minimal)
// ---------------------------------------------------------------------------

interface TiptapMark {
  type: string
  attrs?: Record<string, unknown>
}

interface TiptapNode {
  type: string
  attrs?: Record<string, unknown>
  marks?: TiptapMark[]
  content?: TiptapNode[]
  text?: string
}

export interface TiptapDoc {
  type: 'doc'
  content: TiptapNode[]
}

// ---------------------------------------------------------------------------
// Strapi → Tiptap
// ---------------------------------------------------------------------------

function strapiChildToTiptapTextNodes(child: StrapiBlockChild): TiptapNode[] {
  if (child.type === 'link') {
    const linkChildren = child.children ?? []
    return linkChildren.flatMap((lc) => {
      const nodes = strapiChildToTiptapTextNodes(lc)
      return nodes.map((n) => ({
        ...n,
        marks: [...(n.marks ?? []), { type: 'link', attrs: { href: child.url ?? '' } }],
      }))
    })
  }

  const marks: TiptapMark[] = []
  if (child.bold) marks.push({ type: 'bold' })
  if (child.italic) marks.push({ type: 'italic' })
  if (child.underline) marks.push({ type: 'underline' })
  if (child.strikethrough) marks.push({ type: 'strike' })
  if (child.code) marks.push({ type: 'code' })

  return [
    {
      type: 'text',
      text: child.text ?? '',
      ...(marks.length > 0 ? { marks } : {}),
    },
  ]
}

function strapiChildrenToTiptapContent(children: StrapiBlockChild[]): TiptapNode[] {
  return children.flatMap(strapiChildToTiptapTextNodes)
}

function strapiBlockToTiptapNode(block: StrapiBlock): TiptapNode | null {
  switch (block.type) {
    case 'paragraph': {
      const attrs: Record<string, unknown> = {}
      if (block.textAlign && isExportableAlign(block.textAlign)) {
        attrs.textAlign = block.textAlign
      }
      return {
        type: 'paragraph',
        ...(Object.keys(attrs).length > 0 ? { attrs } : {}),
        content: strapiChildrenToTiptapContent(block.children),
      }
    }

    case 'heading': {
      const attrs: Record<string, unknown> = { level: block.level ?? 2 }
      if (block.textAlign && isExportableAlign(block.textAlign)) {
        attrs.textAlign = block.textAlign
      }
      return {
        type: 'heading',
        attrs,
        content: strapiChildrenToTiptapContent(block.children),
      }
    }

    case 'list': {
      const listType = block.format === 'ordered' ? 'orderedList' : 'bulletList'
      const items = block.children
        .filter((c) => c.type === 'text' || !c.type || c.children)
        .map((item): TiptapNode => ({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: item.children
                ? strapiChildrenToTiptapContent(item.children)
                : [{ type: 'text', text: item.text ?? '' }],
            },
          ],
        }))
      return { type: listType, content: items }
    }

    case 'quote':
      return {
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: strapiChildrenToTiptapContent(block.children),
          },
        ],
      }

    case 'code': {
      const text = block.children.map((c) => c.text ?? '').join('')
      return {
        type: 'codeBlock',
        content: text ? [{ type: 'text', text }] : [],
      }
    }

    case 'image':
      if (!block.image) return null
      return {
        type: 'image',
        attrs: {
          src: block.image.url,
          alt: block.image.alternativeText ?? '',
        },
      }

    default:
      return null
  }
}

export function strapiBlocksToTiptap(blocks: StrapiBlock[] | null | undefined): TiptapDoc {
  if (!blocks || blocks.length === 0) {
    return { type: 'doc', content: [{ type: 'paragraph' }] }
  }
  const content = blocks.map(strapiBlockToTiptapNode).filter(Boolean) as TiptapNode[]
  return { type: 'doc', content: content.length > 0 ? content : [{ type: 'paragraph' }] }
}

// ---------------------------------------------------------------------------
// Tiptap → Strapi
// ---------------------------------------------------------------------------

function tiptapMarksToStrapiFlags(marks?: TiptapMark[]): Partial<StrapiBlockChild> {
  if (!marks || marks.length === 0) return {}
  const flags: Partial<StrapiBlockChild> = {}
  for (const mark of marks) {
    switch (mark.type) {
      case 'bold':
        flags.bold = true
        break
      case 'italic':
        flags.italic = true
        break
      case 'underline':
        flags.underline = true
        break
      case 'strike':
        flags.strikethrough = true
        break
      case 'code':
        flags.code = true
        break
    }
  }
  return flags
}

function hasLinkMark(marks?: TiptapMark[]): TiptapMark | undefined {
  return marks?.find((m) => m.type === 'link')
}

function tiptapContentToStrapiChildren(content?: TiptapNode[]): StrapiBlockChild[] {
  if (!content) return [{ type: 'text', text: '' }]

  const children: StrapiBlockChild[] = []
  // Group text nodes by link mark
  let currentLink: { url: string; children: StrapiBlockChild[] } | null = null

  for (const node of content) {
    if (node.type !== 'text') continue

    const linkMark = hasLinkMark(node.marks)
    const flags = tiptapMarksToStrapiFlags(node.marks?.filter((m) => m.type !== 'link'))

    if (linkMark) {
      const url = (linkMark.attrs?.href as string) ?? ''
      if (currentLink && currentLink.url === url) {
        currentLink.children.push({ type: 'text', text: node.text ?? '', ...flags })
      } else {
        if (currentLink) {
          children.push({ type: 'link', url: currentLink.url, children: currentLink.children })
        }
        currentLink = { url, children: [{ type: 'text', text: node.text ?? '', ...flags }] }
      }
    } else {
      if (currentLink) {
        children.push({ type: 'link', url: currentLink.url, children: currentLink.children })
        currentLink = null
      }
      children.push({ type: 'text', text: node.text ?? '', ...flags })
    }
  }

  if (currentLink) {
    children.push({ type: 'link', url: currentLink.url, children: currentLink.children })
  }

  return children.length > 0 ? children : [{ type: 'text', text: '' }]
}

function tiptapNodeToStrapiBlock(node: TiptapNode): StrapiBlock | null {
  switch (node.type) {
    case 'paragraph': {
      const textAlign = blockTextAlignFromTiptap(node.attrs)
      return {
        type: 'paragraph',
        ...(textAlign ? { textAlign } : {}),
        children: tiptapContentToStrapiChildren(node.content),
      }
    }

    case 'heading': {
      const textAlign = blockTextAlignFromTiptap(node.attrs)
      return {
        type: 'heading',
        level: (node.attrs?.level as 1 | 2 | 3 | 4 | 5 | 6) ?? 2,
        ...(textAlign ? { textAlign } : {}),
        children: tiptapContentToStrapiChildren(node.content),
      }
    }

    case 'bulletList':
    case 'orderedList': {
      const items = (node.content ?? [])
        .filter((item) => item.type === 'listItem')
        .map((item): StrapiBlockChild => {
          // Unwrap listItem > paragraph > children
          const paragraph = item.content?.find((c) => c.type === 'paragraph')
          const children = paragraph
            ? tiptapContentToStrapiChildren(paragraph.content)
            : [{ type: 'text' as const, text: '' }]
          return { type: 'text', children }
        })
      return {
        type: 'list',
        format: node.type === 'orderedList' ? 'ordered' : 'unordered',
        children: items,
      }
    }

    case 'blockquote': {
      // Flatten blockquote > paragraph > children
      const paragraph = node.content?.find((c) => c.type === 'paragraph')
      return {
        type: 'quote',
        children: paragraph
          ? tiptapContentToStrapiChildren(paragraph.content)
          : [{ type: 'text', text: '' }],
      }
    }

    case 'codeBlock': {
      const text = node.content?.map((c) => c.text ?? '').join('') ?? ''
      return {
        type: 'code',
        children: [{ type: 'text', text }],
      }
    }

    case 'image':
      return {
        type: 'image',
        children: [],
        image: {
          id: 0,
          documentId: '',
          url: (node.attrs?.src as string) ?? '',
          alternativeText: (node.attrs?.alt as string) ?? null,
          width: 0,
          height: 0,
          formats: null,
        },
      }

    default:
      return null
  }
}

export function tiptapToStrapiBlocks(doc: TiptapDoc | null | undefined): StrapiBlock[] {
  if (!doc || !doc.content) return []
  return doc.content.map(tiptapNodeToStrapiBlock).filter(Boolean) as StrapiBlock[]
}

// ---------------------------------------------------------------------------
// Strapi blocks → Markdown (for API fields typed as string / Long text)
// ---------------------------------------------------------------------------

function escapeMarkdownImageAlt(alt: string): string {
  return alt.replace(/\\/g, '\\\\').replace(/\]/g, '\\]')
}

function inlineChildToMarkdown(child: StrapiBlockChild): string {
  if (child.type === 'link') {
    const label = strapiChildrenToInlineMarkdown(child.children ?? [])
    const safeLabel = label.replace(/\]/g, '\\]')
    return `[${safeLabel}](${child.url ?? ''})`
  }

  let text = child.text ?? ''
  if (child.code) {
    text = '`' + text.replace(/`/g, '\\`') + '`'
  }
  if (child.strikethrough) {
    text = `~~${text}~~`
  }
  if (child.bold && child.italic) {
    text = `***${text}***`
  } else if (child.bold) {
    text = `**${text}**`
  } else if (child.italic) {
    text = `*${text}*`
  }
  return text
}

function strapiChildrenToInlineMarkdown(children: StrapiBlockChild[]): string {
  return children.map(inlineChildToMarkdown).join('')
}

function listItemChildToText(item: StrapiBlockChild): string {
  if (item.children && item.children.length > 0) {
    return strapiChildrenToInlineMarkdown(item.children)
  }
  return item.text ?? ''
}

function strapiBlockToMarkdownChunk(block: StrapiBlock): string {
  switch (block.type) {
    case 'paragraph': {
      const text = strapiChildrenToInlineMarkdown(block.children).trim()
      if (!text) return ''
      const align = block.textAlign
      if (!align || align === 'left') {
        return text
      }
      const inner = inlineMarkdownToHtml(text)
      return `<p data-align="${align}">${inner}</p>`
    }

    case 'heading': {
      const level = Math.min(Math.max(block.level ?? 2, 1), 6)
      const text = strapiChildrenToInlineMarkdown(block.children).trim()
      if (!text) return ''
      const align = block.textAlign
      if (!align || align === 'left') {
        const hashes = '#'.repeat(level)
        return `${hashes} ${text}`
      }
      const tag = `h${level}`
      const inner = inlineMarkdownToHtml(text)
      return `<${tag} data-align="${align}">${inner}</${tag}>`
    }

    case 'list': {
      const ordered = block.format === 'ordered'
      const lines: string[] = []
      for (let i = 0; i < block.children.length; i++) {
        const item = block.children[i]
        const prefix = ordered ? `${i + 1}. ` : '- '
        lines.push(prefix + listItemChildToText(item))
      }
      return lines.join('\n')
    }

    case 'quote': {
      const inner = strapiChildrenToInlineMarkdown(block.children).trim()
      if (!inner) return ''
      return inner
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n')
    }

    case 'code': {
      const text = block.children.map((c) => c.text ?? '').join('')
      return '```\n' + text + '\n```'
    }

    case 'image': {
      if (!block.image?.url) return ''
      const alt = escapeMarkdownImageAlt(block.image.alternativeText ?? '')
      return `![${alt}](${block.image.url})`
    }

    default:
      return ''
  }
}

/**
 * Serializes editor blocks to markdown for Strapi fields stored as plain string / markdown
 * (not Rich Text Blocks JSON).
 */
export function strapiBlocksToMarkdown(blocks: StrapiBlock[] | null | undefined): string {
  if (!blocks || blocks.length === 0) return ''

  const chunks: string[] = []
  for (const block of blocks) {
    const chunk = strapiBlockToMarkdownChunk(block)
    if (chunk.length > 0) {
      chunks.push(chunk)
    }
  }

  return chunks.join('\n\n')
}
