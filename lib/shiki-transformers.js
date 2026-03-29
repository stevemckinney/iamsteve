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
 * When `showLineNumbers` is in the meta string, this transformer
 * restructures the code element into a two-column layout:
 *
 *   <code data-line-numbers>
 *     <span data-line-numbers-col>
 *       <span data-line-number>1</span>
 *       <span data-line-number>2</span>
 *     </span>
 *     <span data-line-numbers-content>
 *       <span class="line">...</span>
 *       <span class="line">...</span>
 *     </span>
 *   </code>
 *
 * CSS grid on code gives a fixed numbers column and a scrollable
 * code column. Only the content side scrolls horizontally.
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

      const startLine = lineNumMatch[1] ? parseInt(lineNumMatch[1], 10) : 1

      // Collect line spans, filtering out empty trailing lines
      const lineSpans = node.children.filter(
        (child) => child.type === 'element' && child.tagName === 'span'
      )

      // Remove empty trailing line (Shiki adds one for the final newline)
      const last = lineSpans[lineSpans.length - 1]
      if (
        last &&
        (last.children.length === 0 ||
          (last.children.length === 1 &&
            last.children[0].type === 'text' &&
            last.children[0].value === ''))
      ) {
        // Remove from the actual node children too
        const idx = node.children.indexOf(last)
        if (idx !== -1) node.children.splice(idx, 1)
        lineSpans.pop()
      }

      // Build the line numbers column and tag existing lines
      const numberSpans = []
      let lineNum = startLine

      for (const child of lineSpans) {
        child.properties = child.properties || {}
        child.properties['data-line'] = String(lineNum)

        numberSpans.push({
          type: 'element',
          tagName: 'span',
          properties: { 'data-line-number': '' },
          children: [{ type: 'text', value: String(lineNum) }],
        })

        lineNum++
      }

      // Wrap numbers in a column container
      const numbersCol = {
        type: 'element',
        tagName: 'span',
        properties: { 'data-line-numbers-col': '' },
        children: numberSpans,
      }

      // Wrap only line elements in content container (skip text nodes)
      const contentCol = {
        type: 'element',
        tagName: 'span',
        properties: { 'data-line-numbers-content': '' },
        children: lineSpans,
      }

      // Replace code children with the two columns
      node.children = [numbersCol, contentCol]
    },
    root(node) {
      // Sync highlighted/diff/focused classes from lines to their line numbers.
      // The line and code hooks have already run, so highlighted classes are set.
      const walk = (el) => {
        if (el.type !== 'element') return
        if (
          el.tagName === 'code' &&
          el.properties?.['data-line-numbers'] !== undefined
        ) {
          const numbersCol = el.children.find(
            (c) =>
              c.type === 'element' &&
              c.properties?.['data-line-numbers-col'] !== undefined
          )
          const contentCol = el.children.find(
            (c) =>
              c.type === 'element' &&
              c.properties?.['data-line-numbers-content'] !== undefined
          )
          if (!numbersCol || !contentCol) return

          const numbers = numbersCol.children.filter(
            (c) => c.type === 'element'
          )
          const lines = contentCol.children.filter((c) => c.type === 'element')

          for (let i = 0; i < lines.length && i < numbers.length; i++) {
            const lineClasses = lines[i].properties?.className || []
            if (lineClasses.includes('highlighted')) {
              numbers[i].properties.className =
                numbers[i].properties.className || []
              numbers[i].properties.className.push('highlighted')
            }
            if (lineClasses.includes('diff')) {
              numbers[i].properties.className =
                numbers[i].properties.className || []
              numbers[i].properties.className.push('diff')
              if (lineClasses.includes('add'))
                numbers[i].properties.className.push('add')
              if (lineClasses.includes('remove'))
                numbers[i].properties.className.push('remove')
            }
          }
        }
        if (el.children) el.children.forEach(walk)
      }
      walk(node)
    },
  }
}
