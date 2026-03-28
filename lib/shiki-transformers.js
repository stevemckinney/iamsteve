/**
 * Custom Shiki transformers for iamsteve.me
 */

/**
 * Fixes syntax highlighting for Tailwind's @theme directive in CSS code blocks.
 *
 * Shiki's CSS TextMate grammar doesn't recognise @theme as an at-rule, so it
 * can't enter property-list context for its body. This transformer swaps
 * @theme for @font-face before tokenisation — @font-face is a known at-rule
 * whose body parses as property declarations (not selectors), and it gets
 * correct at-rule keyword colouring. The tokens hook patches the displayed
 * text back to @theme while keeping the correct colours and scopes.
 */
export function transformerCSSThemeDirective() {
  return {
    name: 'css-theme-directive',
    preprocess(code) {
      if (this.options.lang !== 'css') return code

      this._themeLines = new Set()
      const lines = code.split('\n')

      for (let i = 0; i < lines.length; i++) {
        if (/^\s*@theme\b/.test(lines[i])) {
          this._themeLines.add(i)
          lines[i] = lines[i].replace(/@theme\b/, '@font-face')
        }
      }

      if (this._themeLines.size === 0) return code
      return lines.join('\n')
    },
    tokens(tokens) {
      if (!this._themeLines?.size) return tokens

      for (const lineIdx of this._themeLines) {
        const line = tokens[lineIdx]
        if (!line) continue

        for (const token of line) {
          if (token.content.includes('@font-face')) {
            token.content = token.content.replace('@font-face', '@theme')
            break
          }
        }
      }

      return tokens
    },
  }
}

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
