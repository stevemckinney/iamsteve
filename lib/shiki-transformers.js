/**
 * Custom Shiki transformers for iamsteve.me
 */

/**
 * Adds line number support to code blocks.
 *
 * When `showLineNumbers` is in the meta string, this transformer:
 * - Adds `data-line-numbers` to the <code> element
 * - Adds `data-line` to each line <span>
 * - Supports `showLineNumbers=N` for custom start line
 *
 * Works with CSS counters in shiki.css for rendering.
 */
export function transformerLineNumbers() {
  return {
    name: 'line-numbers',
    pre(node) {
      // Remove meta props that React doesn't recognise on DOM elements
      if (node.properties) {
        delete node.properties.showLineNumbers
        delete node.properties.startLineNumber
      }
    },
    code(node) {
      const meta = this.options.meta?.__raw || ''
      const lineNumMatch = meta.match(/showLineNumbers(?:=(\d+))?/)

      if (!lineNumMatch) return

      // Add data-line-numbers to the <code> element
      node.properties = node.properties || {}
      node.properties['data-line-numbers'] = ''

      // If a start line is specified, set the counter offset
      const startLine = lineNumMatch[1] ? parseInt(lineNumMatch[1], 10) : 1

      if (startLine !== 1) {
        node.properties['data-line-numbers-start'] = String(startLine)
      }

      // Add data-line to each line span
      let lineNum = startLine
      for (const child of node.children) {
        if (child.type === 'element' && child.tagName === 'span') {
          child.properties = child.properties || {}
          child.properties['data-line'] = String(lineNum)
          lineNum++
        }
      }
    },
  }
}
