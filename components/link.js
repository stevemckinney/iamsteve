/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link'

const Link = ({ href, ...props }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return <NextLink href={href} {...props} />
  }

  if (isAnchorLink) {
    return <a href={href} {...props} />
  }

  return <a rel="noopener noreferrer" href={href} {...props} />
}

export default Link
