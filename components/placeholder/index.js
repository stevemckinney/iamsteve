'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const PlaceholderDesign = [
  {
    color: 'rgb(244 218 200 / 1)',
    rgb: '244,218,200',
    imageUrl: '/images/default/design-default.svg',
  },
  {
    color: 'rgb(247 239 194 / 1)',
    rgb: '247,239,194',
    imageUrl: '/images/default/design-default.svg',
  },
  {
    color: 'rgb(208 230 222 / 1)',
    rgb: '208,230,222',
    imageUrl: '/images/default/design-default.svg',
  },
  {
    color: 'rgb(207 222 246 / 1)',
    rgb: '207,222,246',
    imageUrl: '/images/default/design-default.svg',
  },
  {
    color: 'rgb(233 238 195 / 1)',
    rgb: '233,238,195',
    imageUrl: '/images/default/design-default.svg',
  },
  {
    color: 'rgb(233 238 195 / 1)',
    rgb: '233,238,195',
    imageUrl: '/images/default/design-default.svg',
  },
  {
    color: 'rgb(223 212 245 / 1)',
    rgb: '223,212,245',
    imageUrl: '/images/default/design-default.svg',
  },
  {
    color: 'rgb(243 220 234 / 1)',
    rgb: '243,220,234',
    imageUrl: '/images/default/design-default.svg',
  },
]

const PlaceholderCode = [
  {
    color: 'rgb(244 218 200 / 1)',
    rgb: '244,218,200',
    imageUrl: '/images/default/code-default.svg',
  },
  {
    color: 'rgb(247 239 194 / 1)',
    rgb: '247,239,194',
    imageUrl: '/images/default/code-default.svg',
  },
  {
    color: 'rgb(208 230 222 / 1)',
    rgb: '208,230,222',
    imageUrl: '/images/default/code-default.svg',
  },
  {
    color: 'rgb(207 222 246 / 1)',
    rgb: '207,222,246',
    imageUrl: '/images/default/code-default.svg',
  },
  {
    color: 'rgb(233 238 195 / 1)',
    rgb: '233,238,195',
    imageUrl: '/images/default/code-default.svg',
  },
  {
    color: 'rgb(233 238 195 / 1)',
    rgb: '233,238,195',
    imageUrl: '/images/default/code-default.svg',
  },
  {
    color: 'rgb(223 212 245 / 1)',
    rgb: '223,212,245',
    imageUrl: '/images/default/code-default.svg',
  },
  {
    color: 'rgb(243 220 234 / 1)',
    rgb: '243,220,234',
    imageUrl: '/images/default/code-default.svg',
  },
]

const Placeholder = ({
  category,
  size = 'medium',
  imageClass = 'image',
  alt = '',
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
        className={`${props.className} relative`}
      >
        {/* <div
          className={`absolute before:transition before:duration-200 before:ease-in z-[2] inset-0 before:z-[-1] before:absolute bg-fade before:bg-fade-neutral before:inset-0 before:opacity-0 group-active:before:opacity-100`}
          style={{ '--bg-fade-top': randomImage?.rgb }}
        /> */}
        <Image src={small} alt={alt} className="@md:hidden" />
        <Image src={large} alt={alt} className="hidden @md:block" />
      </Link>
    )
  }

  return (
    <div
      className={`${props.className}`}
      style={{ backgroundColor: backgroundColor }}
    >
      {/* <div
        className={`absolute before:transition before:duration-200 before:ease-in z-[2] inset-0 before:z-[-1] before:absolute bg-fade before:bg-fade-neutral before:inset-0 before:opacity-0 group-active:before:opacity-100`}
        style={{ '--bg-fade-top': '255,255,255' }}
      /> */}
      <Image src={small} alt={alt} className="@md:hidden" />
      <Image src={large} alt={alt} className="hidden @md:block" />
    </div>
  )
}

export default Placeholder
