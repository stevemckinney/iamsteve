/**
 * CodePen Embed Component
 *
 * Embeds CodePen pens as iframes in blog articles.
 * Replaces the external CodePen embed script for better reliability and control.
 *
 * @param {string} slug - CodePen pen ID (required)
 * @param {string} user - CodePen username (default: 'stevemckinney')
 * @param {number} height - Iframe height in pixels (default: 520)
 * @param {string} defaultTab - Default tab to show (default: 'result')
 * @param {string} themeId - CodePen theme ID (default: '23161')
 * @param {string} title - Accessible title for iframe (default: 'CodePen')
 * @param {boolean} editable - Whether the embed is editable (default: false)
 * @param {string} className - Additional CSS classes
 */
export default function CodePen({
  slug,
  user = 'stevemckinney',
  height = 520,
  defaultTab = 'result',
  themeId = '23161',
  title = 'CodePen',
  editable = false,
  className = '',
}) {
  if (!slug) {
    console.error('CodePen component requires a slug prop')
    return null
  }

  const embedUrl = new URL(`https://codepen.io/${user}/embed/${slug}`)
  embedUrl.searchParams.set('default-tab', defaultTab)
  embedUrl.searchParams.set('theme-id', themeId)
  if (editable) embedUrl.searchParams.set('editable', 'true')

  return (
    <div className={`codepen-wide ${className}`}>
      <iframe
        height={height}
        style={{ width: '100%' }}
        scrolling="no"
        title={title}
        src={embedUrl.toString()}
        frameBorder="no"
        loading="lazy"
        allowtransparency="true"
        allowFullScreen={true}
      />
    </div>
  )
}
