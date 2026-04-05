interface CodePenProps {
  slug: string
  user?: string
  height?: number
  defaultTab?: string
  themeId?: string
  title?: string
  editable?: boolean
  className?: string
}

export default function CodePen({
  slug,
  user = 'stevemckinney',
  height = 520,
  defaultTab = 'result',
  themeId = '23161',
  title = 'CodePen',
  editable = false,
  className = '',
}: CodePenProps) {
  if (!slug) {
    console.error('CodePen component requires a slug prop')
    return null
  }

  const embedUrl = new URL(`https://codepen.io/${user}/embed/${slug}`)
  embedUrl.searchParams.set('default-tab', defaultTab)
  embedUrl.searchParams.set('theme-id', themeId)
  if (editable) embedUrl.searchParams.set('editable', 'true')

  return (
    <div className={`codepen-wide ${className}`.trim()}>
      <iframe
        height={height}
        style={{ width: '100%' }}
        scrolling="no"
        title={title}
        src={embedUrl.toString()}
        frameBorder="no"
        loading="lazy"
        allowFullScreen={true}
      />
    </div>
  )
}
