/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link'

const Link = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink href={href} legacyBehavior>
        <a {...rest} />
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a rel="noopener noreferrer" href={href} {...rest} />
}

export default Link
