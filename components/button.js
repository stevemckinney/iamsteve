/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link'

const Button = (props, forwardedRef) => {
  const styleVariants = {
    dandelion: 'button-dandelion',
  }
  const base = `select-none font-ui text-base/tight lowercase text-center`
  const style = `${styleVariants[props.theme]} ${props.className}`

  if (props.href) {
    const isInternalLink = props.href && props.href.startsWith('/')
    const isAnchorLink = props.href && props.href.startsWith('#')

    if (isInternalLink) {
      return (
        <NextLink href={props.href} {...props} className={`${base} ${style}`} />
      )
    }

    if (isAnchorLink) {
      return <a href={props.href} {...props} className={`${base} ${style}`} />
    }

    return (
      <a
        rel="noopener noreferrer"
        href={props.href}
        className={`${base} ${style}`}
        {...props}
      />
    )
  }

  return (
    <button {...props} className={`${base} ${style}`}>
      {props.children}
    </button>
  )
}

export default Button
