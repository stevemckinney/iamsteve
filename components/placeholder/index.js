'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const PlaceholderDesign = [
  { color: '#E8DCD9', imageUrl: '/images/default/design-default.svg' },
  { color: '#D9DFE8', imageUrl: '/images/default/design-default.svg' },
  { color: '#D9E8E3', imageUrl: '/images/default/design-default.svg' },
  { color: '#F9EFBD', imageUrl: '/images/default/design-default.svg' },
  { color: '#F4966B', imageUrl: '/images/default/design-default.svg' },
  { color: '#8FB6F2', imageUrl: '/images/default/design-default.svg' },
  { color: '#90CD83', imageUrl: '/images/default/design-default.svg' },
  { color: '#CDB9F5', imageUrl: '/images/default/design-default.svg' },
]

const PlaceholderCode = [
  { color: '#E8DCD9', imageUrl: '/images/default/code-default.svg' },
  { color: '#D9DFE8', imageUrl: '/images/default/code-default.svg' },
  { color: '#D9E8E3', imageUrl: '/images/default/code-default.svg' },
  { color: '#F9EFBD', imageUrl: '/images/default/code-default.svg' },
  { color: '#F4D340', imageUrl: '/images/default/code-default.svg' },
  { color: '#8FB6F2', imageUrl: '/images/default/code-default.svg' },
  { color: '#90CD83', imageUrl: '/images/default/code-default.svg' },
  { color: '#CDB9F5', imageUrl: '/images/default/code-default.svg' },
]

const Placeholder = ({ category, imageClass = 'image', ...props }) => {
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
