/**
 * RSS-friendly component renderers
 *
 * Converts MDX/JSX components to standard HTML for RSS feeds.
 * RSS readers can display HTML (including iframes) but not React components.
 */

/**
 * Converts Fig component to formatted text with bold and "Fig." prefix
 */
export function Fig({ children }) {
  return `<strong>Fig. ${children}</strong>`
}

/**
 * Converts CodePen component to iframe embed
 */
export function CodePen({
  slug,
  user = 'stevemckinney',
  height = 520,
  defaultTab = 'result',
  themeId = '23161',
  title = 'CodePen',
  editable = false,
}) {
  if (!slug) return ''

  const params = new URLSearchParams({
    'default-tab': defaultTab,
    'theme-id': themeId,
  })

  if (editable) params.set('editable', 'true')

  const src = `https://codepen.io/${user}/embed/${slug}?${params.toString()}`

  return `<div style="margin: 2em 0;">
    <iframe
      height="${height}"
      style="width: 100%;"
      scrolling="no"
      title="${title}"
      src="${src}"
      frameborder="0"
      loading="lazy"
      allowtransparency="true"
      allowfullscreen="true">
    </iframe>
  </div>`
}

/**
 * Converts Demo component to iframe embed
 */
export function Demo({ src, height = 600 }) {
  if (!src) return ''

  return `<div style="margin: 2em 0; background: #f5f5f5; padding: 12px; border-radius: 8px;">
    <iframe
      src="${src}"
      style="width: 100%; border: 1px solid #ddd; border-radius: 4px;"
      height="${height}"
      frameborder="0"
      loading="lazy">
    </iframe>
    <p style="margin-top: 8px; font-size: 0.9em; color: #666;"><a href="${src}">View interactive demo →</a></p>
  </div>`
}

/**
 * Converts custom Blockquote to styled blockquote
 */
export function Blockquote({ children, style }) {
  const styles = {
    notice: {
      prefix: '📌 Notice: ',
      bgColor: '#fffbea',
      borderColor: '#f59e0b',
    },
    signpost: {
      prefix: '👉 ',
      bgColor: '#eff6ff',
      borderColor: '#3b82f6',
    },
    afterthought: {
      prefix: '💭 ',
      bgColor: '#f5f5f5',
      borderColor: '#6b7280',
    },
  }

  const config = styles[style] || {
    prefix: '',
    bgColor: '#f9fafb',
    borderColor: '#d1d5db',
  }

  return `<blockquote style="
    margin: 1.5em 0;
    padding: 1em 1em 1em 1.5em;
    background: ${config.bgColor};
    border-left: 4px solid ${config.borderColor};
    font-style: italic;
  ">
    ${config.prefix}${children}
  </blockquote>`
}

/**
 * Converts LinkFigma to styled link
 */
export function LinkFigma({ href, children = 'View in Figma' }) {
  return `<a href="${href}" style="
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em 1em;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    text-decoration: none;
    color: #333;
    font-weight: 500;
  ">📐 ${children}</a>`
}

/**
 * Converts LinkGithub to styled link
 */
export function LinkGithub({ href, children = 'View on GitHub' }) {
  return `<a href="${href}" style="
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em 1em;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    text-decoration: none;
    color: #333;
    font-weight: 500;
  ">⚙️ ${children}</a>`
}

/**
 * Converts BentoGridShell to informative message with optional link
 */
export function BentoGridShell({
  link = 'https://stevemckinney.github.io/bento-grid/option-1.html',
}) {
  return `<div style="
    margin: 2em 0;
    padding: 1.5em;
    background: #f0f9ff;
    border: 1px solid #0ea5e9;
    border-radius: 8px;
    text-align: center;
  ">
    <p style="margin: 0; color: #0369a1;">
      📊 <strong>Interactive Grid Demo</strong><br>
      <em>Visit the website to try the interactive bento grid demonstration</em>
    </p>
    <p style="margin: 1em 0 0 0;"><a href="${link}" style="
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
      padding: 0.5em 1em;
      background: #0ea5e9;
      border-radius: 6px;
      text-decoration: none;
      color: #fff;
      font-weight: 500;
    ">View interactive demo →</a></p>
  </div>`
}

/**
 * Converts Next.js Image component to standard img tag
 */
export function Image({ src, alt = '', width, height }) {
  const attrs = []
  if (width) attrs.push(`width="${width}"`)
  if (height) attrs.push(`height="${height}"`)

  return `<img src="${src}" alt="${alt}" ${attrs.join(
    ' '
  )} style="max-width: 100%; height: auto;" />`
}

/**
 * Converts Images wrapper (with comparison) to figure with images
 */
export function Images({ children, description, compare }) {
  // This is trickier as it needs to extract child Image components
  // For now, return a note that comparison isn't available in RSS
  const compareNote = compare
    ? `<p style="font-size: 0.9em; color: #666; font-style: italic;">💡 Toggle between options on the website for comparison</p>`
    : ''

  // Return HTML without newlines to prevent marked from treating it as code block
  return `<figure style="margin: 2em 0;">${children}${
    description
      ? `<figcaption style="margin-top: 0.5em; font-style: italic; color: #666;">${description}</figcaption>`
      : ''
  }${compareNote}</figure>`
}

export const rssComponents = {
  Fig,
  CodePen,
  Demo,
  Blockquote,
  LinkFigma,
  LinkGithub,
  BentoGridShell,
  Image,
  Images,
}
