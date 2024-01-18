'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { unstable_getImgProps as getImgProps } from 'next/image'

const PlaceholderDesign = [
  { color: '#f4dac8', imageUrl: '/images/default/design-default.svg' },
  { color: '#f7efc2', imageUrl: '/images/default/design-default.svg' },
  { color: '#d0e6de', imageUrl: '/images/default/design-default.svg' },
  { color: '#cfdef6', imageUrl: '/images/default/design-default.svg' },
  { color: '#e9eec3', imageUrl: '/images/default/design-default.svg' },
  { color: '#e9eec3', imageUrl: '/images/default/design-default.svg' },
  { color: '#dfd4f5', imageUrl: '/images/default/design-default.svg' },
  { color: '#f3dcea', imageUrl: '/images/default/design-default.svg' },
]

const PlaceholderCode = [
  { color: '#f4dac8', imageUrl: '/images/default/code-default.svg' },
  { color: '#f7efc2', imageUrl: '/images/default/code-default.svg' },
  { color: '#d0e6de', imageUrl: '/images/default/code-default.svg' },
  { color: '#cfdef6', imageUrl: '/images/default/code-default.svg' },
  { color: '#e9eec3', imageUrl: '/images/default/code-default.svg' },
  { color: '#e9eec3', imageUrl: '/images/default/code-default.svg' },
  { color: '#dfd4f5', imageUrl: '/images/default/code-default.svg' },
  { color: '#f3dcea', imageUrl: '/images/default/code-default.svg' },
]

const Placeholder = ({
  category,
  size = 'medium',
  imageClass = 'image',
  ...props
}) => {
  const [randomImage, setRandomImage] = useState(null)
  const { width = 384, height = 240 } = props

  const generateRandomImage = useCallback(() => {
    const images = category === 'Design' ? PlaceholderDesign : PlaceholderCode
    const randomIndex = Math.floor(Math.random() * images.length)
    const randomImage = images[randomIndex]
    setRandomImage(randomImage)
  }, [category])

  const small =
    category === 'Design'
      ? `/images/default/design-default.svg`
      : `/images/default/code-default.svg`
  const large =
    category === 'Design'
      ? `/images/default/design-default-large.svg`
      : `/images/default/code-default-large.svg`

  const common = { alt: props.alt, width: width, height: height }
  const {
    props: { srcSet: smallProps },
  } = getImgProps({ ...common, src: small })
  const {
    props: { srcSet: largeProps, ...rest },
  } = getImgProps({ ...common, src: large })

  // Fix the error by checking if randomImage is null before accessing the color property
  const backgroundColor = randomImage?.color

  useEffect(() => {
    // Add generateRandomImage to the callback params
    generateRandomImage()
  }, [category, generateRandomImage])

  if (props.href) {
    return (
      <Link
        href={props.href}
        style={{ backgroundColor: backgroundColor }}
        className={`${props.className}`}
      >
        <img srcSet={`${small} w380, ${large} w592`} {...rest} />
      </Link>
    )
  }

  return (
    <div
      className={`${props.className}`}
      style={{ backgroundColor: backgroundColor }}
    >
      <img srcSet={`${small} w380, ${large} w592`} {...rest} />
    </div>
  )
}

export default Placeholder
