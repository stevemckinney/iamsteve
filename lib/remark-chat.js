import { visit } from 'unist-util-visit'

/**
 * Remark plugin that transforms `chat` code blocks into Chat components.
 *
 * Usage in markdown:
 *
 * ```chat:iMessage
 * L: hello how are you
 * L: what have you been up to
 * R: hello I'm good thank you
 * ```
 *
 * - `L:` marks a left-aligned message (received)
 * - `R:` marks a right-aligned message (sent)
 * - The title after `:` is optional (e.g. `chat` or `chat:iMessage`)
 */
export default function remarkChat() {
  const transformer = (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      // Match `chat` or `chat:Title`
      const lang = node.lang
      if (!lang || !lang.startsWith('chat')) return

      // Extract title from `chat:Title` syntax
      let title = null
      if (lang.includes(':')) {
        title = lang.slice(lang.indexOf(':') + 1).trim()
        if (!title.length) title = null
      }

      // Parse messages from the code block content
      const lines = node.value.split('\n')
      const messageNodes = []

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
        }

        if (!text) continue

        messageNodes.push({
          type: 'mdxJsxFlowElement',
          name: 'ChatMessage',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'align',
              value: align,
            },
          ],
          children: [{ type: 'text', value: text }],
          data: { _xdmExplicitJsx: true },
        })
      }

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
