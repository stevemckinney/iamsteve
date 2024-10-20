const Icon = ({ icon = 'folder', className = 'text-fern-1100', size = 24 }) => {
  if (icon === 'design' || icon === 'Design') icon = 'pen'
  if (
    icon === 'everything' ||
    icon === 'archive' ||
    icon === 'all' ||
    icon === 'Everything' ||
    icon === 'Archive' ||
    icon === 'All'
  ) {
    icon = 'folder'
  }

  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className}
      >
        <use
          className={icon.toLowerCase()}
          xlinkHref={`#${icon.toLowerCase()}-${size}`}
        />
      </svg>
    </>
  )
}

export default Icon
