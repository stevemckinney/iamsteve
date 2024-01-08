'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

  // Fix the error by checking if randomImage is null before accessing the color property
  const backgroundColor = randomImage?.color

  useEffect(() => {
    // Add generateRandomImage to the callback params
    generateRandomImage()
  }, [category, generateRandomImage])

  if (props.href) {
    return (
      <Link {...props} style={{ backgroundColor: backgroundColor }}>
        <Image
          src={randomImage?.imageUrl}
          alt={props.alt}
          width={width}
          height={height}
          className={imageClass}
        />
      </Link>
    )
  }

  return (
    <div
      className={`${props.className}`}
      style={{ backgroundColor: backgroundColor }}
    >
      <Image
        src={randomImage?.imageUrl}
        alt={props.alt}
        width={width}
        height={height}
        className={imageClass}
        {...props}
      />
    </div>
  )
}

export default Placeholder
