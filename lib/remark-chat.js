import { visit } from 'unist-util-visit'

/**
 * Remark plugin that transforms `chat` code blocks into Chat components.
 *
 * Usage in markdown:
 *
 * ```chat title="Claude app (Opus 4.6)"
 * L: hello how are you
 * R: hello I'm good thank you
 * ```
 *
 * - `L:` marks a left-aligned message (received)
 * - `R:` marks a right-aligned message (sent)
 * - `AI:` marks a left-aligned AI response (no background, bordered)
 * - `title="..."` in the meta string sets the chat title
 */
export default function remarkChat() {
  const transformer = (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      // Match `chat`
      const lang = node.lang
      if (!lang || lang !== 'chat') return

      // Extract title from meta string: title="Claude app (Opus 4.6)"
      let title = null
      if (node.meta) {
        const match = node.meta.match(/title="([^"]+)"/)
        if (match) title = match[1]
      }

      // Parse messages from the code block content,
      // merging consecutive lines with the same alignment
      const lines = node.value.split('\n')
      const grouped = []

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue

        let align = 'left'
        let text = trimmed

        if (/^[Ll]:\s*/.test(trimmed)) {
          align = 'left'
          text = trimmed.replace(/^[Ll]:\s*/, '')
        } else if (/^[Rr]:\s*/.test(trimmed)) {
          align = 'right'
          text = trimmed.replace(/^[Rr]:\s*/, '')
        } else if (/^(?:AI|ai):\s*/.test(trimmed)) {
          align = 'ai'
          text = trimmed.replace(/^(?:AI|ai):\s*/, '')
        }

        if (!text) continue

        const last = grouped[grouped.length - 1]
        if (last && last.align === align) {
          last.lines.push(text)
        } else {
          grouped.push({ align, lines: [text] })
        }
      }

      const messageNodes = grouped.map(({ align, lines: msgLines }) => ({
        type: 'mdxJsxFlowElement',
        name: 'ChatMessage',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'align',
            value: align,
          },
        ],
        children:
          msgLines.length === 1
            ? [{ type: 'text', value: msgLines[0] }]
            : msgLines.map((text) => ({
                type: 'mdxJsxFlowElement',
                name: 'p',
                attributes: [],
                children: [{ type: 'text', value: text }],
                data: { _xdmExplicitJsx: true },
              })),
        data: { _xdmExplicitJsx: true },
      }))

      // Build the Chat wrapper
      const chatAttributes = []
      if (title) {
        chatAttributes.push({
          type: 'mdxJsxAttribute',
          name: 'title',
          value: title,
        })
      }

      const chatNode = {
        type: 'mdxJsxFlowElement',
        name: 'Chat',
        attributes: chatAttributes,
        children: messageNodes,
        data: { _xdmExplicitJsx: true },
      }

      // Replace the code block with the Chat component
      parent.children.splice(index, 1, chatNode)
    })
  }

  return transformer
}
