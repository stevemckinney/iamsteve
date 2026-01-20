/**
 * Clean markdown for LLM consumption by removing custom React components
 * and converting them to simple markdown equivalents
 */
export function cleanMarkdownForLLMs(markdown) {
  let cleaned = markdown
  let inCodeBlock = false
  const lines = cleaned.split('\n')
  const processedLines = []

  // Track multi-line component state
  let inFigure = false
  let inImages = false
  let figureContent = []
  let figcaption = ''

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Track code blocks - don't transform anything inside them
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      processedLines.push(line)
      continue
    }

    if (inCodeBlock) {
      processedLines.push(line)
      continue
    }

    // Handle multi-line figure/images components
    if (line.includes('<figure>')) {
      inFigure = true
      figureContent = []
      figcaption = ''
      continue
    }

    if (inFigure) {
      if (line.includes('</figure>')) {
        // End of figure - output the figcaption if we have one
        if (figcaption) {
          processedLines.push(figcaption)
          processedLines.push('') // Add blank line after
        }
        inFigure = false
        continue
      }

      // Extract figcaption content
      if (line.includes('<figcaption>')) {
        let captionLine = line
        // Continue collecting until we find </figcaption>
        while (!captionLine.includes('</figcaption>') && i < lines.length - 1) {
          i++
          captionLine += ' ' + lines[i].trim()
        }

        // Extract content between figcaption tags
        const captionMatch = captionLine.match(
          /<figcaption>(.*?)<\/figcaption>/s
        )
        if (captionMatch) {
          let caption = captionMatch[1]
          // Remove HTML tags but keep text content
          caption = caption.replace(/<p>/g, '').replace(/<\/p>/g, '')
          // Transform <Fig>N</Fig> to **Figure N**
          caption = caption.replace(/<Fig>(\d+)<\/Fig>/g, '**Figure $1**')
          figcaption = caption.trim()
        }
      }
      continue
    }

    // Single-line transformations

    // <Fig>N</Fig> → **Figure N**
    line = line.replace(/<Fig>(\d+)<\/Fig>/g, '**Figure $1**')

    // <Shortcut>text</Shortcut> → text
    line = line.replace(/<Shortcut>(.*?)<\/Shortcut>/g, '$1')

    // <Blockquote style="notice">text</Blockquote> → > **Note:** text
    line = line.replace(
      /<Blockquote\s+style="notice">(.*?)<\/Blockquote>/g,
      '> **Note:** $1'
    )

    // <LinkFigma href="url">text</LinkFigma> → [text](url)
    line = line.replace(
      /<LinkFigma\s+href="([^"]+)">(.*?)<\/LinkFigma>/g,
      '[$2]($1)'
    )

    // <LinkGithub href="url">text</LinkGithub> → [text](url)
    line = line.replace(
      /<LinkGithub\s+href="([^"]+)">(.*?)<\/LinkGithub>/g,
      '[$2]($1)'
    )

    // <Demo src="url" /> → [View interactive demo](url)
    line = line.replace(
      /<Demo\s+src="([^"]+)"\s*\/>/g,
      '[View interactive demo]($1)'
    )

    // Remove <Image> tags entirely (single line)
    line = line.replace(/<Image\s+[^>]*\/>/g, '')

    // Remove <Images> opening and closing tags
    line = line.replace(/<Images(\s+[^>]*)?>/, '')
    line = line.replace(/<\/Images>/, '')

    // Remove <div className="sandbox"> and closing tags
    if (line.includes('<div className="sandbox">')) {
      // Skip until we find the closing </div>
      let depth = 1
      while (depth > 0 && i < lines.length - 1) {
        i++
        if (lines[i].includes('<div')) depth++
        if (lines[i].includes('</div>')) depth--
      }
      continue
    }

    // Remove any remaining figure/figcaption tags that might be inline
    line = line.replace(/<\/?figure>/g, '')
    line = line.replace(/<figcaption>.*?<\/figcaption>/g, '')

    // Only add non-empty lines (trim whitespace-only lines)
    if (line.trim() || processedLines[processedLines.length - 1]?.trim()) {
      processedLines.push(line)
    }
  }

  // Join lines and clean up excessive blank lines
  cleaned = processedLines.join('\n')

  // Replace 3+ consecutive newlines with just 2
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')

  // Trim start and end
  cleaned = cleaned.trim()

  return cleaned
}
