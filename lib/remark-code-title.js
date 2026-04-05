import { visit } from 'unist-util-visit'

/**
 * Remark plugin to extract title from code fence meta strings
 * and wrap code blocks in a figure with a figcaption.
 *
 * Works with @shikijs/rehype for syntax highlighting.
 *
 * Supports meta syntax:
 *   ```css title="app.css" showLineNumbers {6-8}
 *
 * Generates HTML:
 *   <figure data-rehype-pretty-code-figure>
 *     <figcaption data-rehype-pretty-code-title data-language="css">
 *       <span>app.css</span>
 *     </figcaption>
 *     <pre><code>...</code></pre>
 *   </figure>
 */
export default function remarkCodeTitles() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || index === undefined) return

      // Skip chat blocks — these are handled by remark-chat
      if (node.lang === 'chat') return

      const meta = node.meta || ''

      // Extract title="..." from meta
      const titleMatch = meta.match(/title="([^"]*)"/)
      if (!titleMatch) return

      const title = titleMatch[1]
      const language = node.lang || 'text'

      // Remove title="..." from meta so shiki doesn't see it
      node.meta = meta.replace(titleMatch[0], '').trim() || null

      // Create HTML figure/figcaption wrapper
      const figcaption = {
        type: 'html',
        value: `<figcaption data-rehype-pretty-code-title="" data-language="${language}"><span class="text-base tracking-normal py-1.5 px-3">${title}</span></figcaption>`,
      }

      const figure = {
        type: 'parent',
        data: {
          hName: 'figure',
          hProperties: { 'data-rehype-pretty-code-figure': '' },
        },
        children: [figcaption, node],
      }

      // Replace the code node with the figure
      parent.children.splice(index, 1, figure)
    })
  }
}
