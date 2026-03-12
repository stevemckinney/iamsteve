import { visit } from 'unist-util-visit'

/**
 * Remark plugin to extract title from code fence meta strings
 * and wrap code blocks in a figure/figcaption structure.
 *
 * Works with @shikijs/rehype for syntax highlighting.
 *
 * Supports meta syntax:
 *   ```css title="app.css" showLineNumbers {6-8}
 *
 * Generates (in mdast → hast):
 *   <figure data-rehype-pretty-code-figure>
 *     <figcaption data-rehype-pretty-code-title>app.css</figcaption>
 *     <pre><code>...</code></pre>
 *   </figure>
 */
export default function remarkCodeTitles() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || index === undefined) return

      const meta = node.meta || ''

      // Extract title="..." from meta
      const titleMatch = meta.match(/title="([^"]*)"/)
      if (!titleMatch) return

      const title = titleMatch[1]

      // Remove title="..." from meta so shiki doesn't see it
      node.meta = meta.replace(titleMatch[0], '').trim() || null

      // Create the figcaption node
      const figcaption = {
        type: 'paragraph',
        children: [{ type: 'text', value: title }],
        data: {
          hName: 'figcaption',
          hProperties: {
            'data-rehype-pretty-code-title': '',
            'data-language': node.lang || 'text',
          },
        },
      }

      // Create the figure wrapper containing figcaption + code block
      const figure = {
        type: 'container',
        children: [figcaption, node],
        data: {
          hName: 'figure',
          hProperties: {
            'data-rehype-pretty-code-figure': '',
          },
        },
      }

      // Replace the code node with the figure
      parent.children.splice(index, 1, figure)
    })
  }
}
