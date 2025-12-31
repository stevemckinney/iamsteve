import Link from 'next/link'
import Image from 'next/image'

// Hash function for deterministic pseudo-random color
const hashString = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash = hash | 0 // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

const Placeholder = ({
  category,
  slug,
  alt = '',
  width = 384,
  height = 240,
  href,
  className = '',
}) => {
  // Generate deterministic color index from slug or category
  const colorIndex = hashString(slug || category || 'default') % 10
  const backgroundColorVar = `var(--placeholder-color-${colorIndex})`

  // Determine which image to use based on category
  const small =
    category === 'Design'
      ? '/images/default/design-default.svg'
      : '/images/default/code-default.svg'

  const large =
    category === 'Design'
      ? '/images/default/design-default-large.svg'
      : '/images/default/code-default-large.svg'

  // Fallback alt text
  const altText = alt || `${category} placeholder`

  // Shared image content
  const imageContent = (
    <>
      <Image
        src={small}
        alt={altText}
        width={width}
        height={height}
        className="@md:hidden"
      />
      <Image
        src={large}
        alt={altText}
        width={width}
        height={height}
        className="hidden @md:block"
        aria-hidden={true}
      />
    </>
  )

  // Conditional wrapper with inline style for background color
  if (href) {
    return (
      <Link
        href={href}
        className={`${className} relative`}
        style={{ backgroundColor: backgroundColorVar }}
      >
        {imageContent}
      </Link>
    )
  }

  return (
    <div className={className} style={{ backgroundColor: backgroundColorVar }}>
      {imageContent}
    </div>
  )
}

export default Placeholder
