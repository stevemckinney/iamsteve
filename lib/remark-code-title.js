import { visit } from 'unist-util-visit'

/**
 * Remark plugin to extract title from code fence meta strings
 * and wrap code blocks in a CodeFigure MDX component.
 *
 * Works with @shikijs/rehype for syntax highlighting.
 *
 * Supports meta syntax:
 *   ```css title="app.css" showLineNumbers {6-8}
 *
 * Generates an MDX element:
 *   <CodeFigure title="app.css" language="css">
 *     <pre><code>...</code></pre>
 *   </CodeFigure>
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

      // Create the CodeFigure MDX element
      const codeFigure = {
        type: 'mdxJsxFlowElement',
        name: 'CodeFigure',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'title',
            value: title,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'language',
            value: node.lang || 'text',
          },
        ],
        children: [node],
      }

      // Replace the code node with the CodeFigure
      parent.children.splice(index, 1, codeFigure)
    })
  }
}
