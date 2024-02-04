'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const colorVariants = [
  'bg-rio-100',
  'bg-dandelion-100',
  'bg-lavender-100',
  'bg-magenta-100',
  'bg-grass-100',
  'bg-fern-100',
  'bg-moss-100',
  'bg-neutral-01-200',
  'bg-neutral-02-200',
  'bg-cornflour-200',
]

const Placeholder = ({ category, size, imageClass, alt, ...props }) => {
  const { width = 384, height = 240 } = props
  const [color, setColor] = useState('#ffffff') // Set initial color

  useEffect(() => {
    generateRandomColor()
  }, [])

  const generateRandomColor = () => {
    const colors = colorVariants // Array of 8 colors
    const randomColor = colors[Math.floor(Math.random() * colors.length)] // Choose a random color
    setColor(randomColor) // Set the background color
  }

  const small =
    category === 'Design'
      ? `/images/default/design-default.svg`
      : `/images/default/code-default.svg`
  const large =
    category === 'Design'
      ? `/images/default/design-default-large.svg`
      : `/images/default/code-default-large.svg`

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={`${props.className} ${color} relative`}
      >
        {/* <div
          className={`absolute before:transition before:duration-200 before:ease-in z-[2] inset-0 before:z-[-1] before:absolute bg-fade before:bg-fade-neutral before:inset-0 before:opacity-0 group-active:before:opacity-100`}
          style={{ '--bg-fade-top': randomImage?.rgb }}
        /> */}
        <Image
          src={small}
          alt={alt}
          width={width}
          height={height}
          className="@md:hidden"
        />
        <Image
          src={large}
          alt={alt}
          width={width}
          height={height}
          className="hidden @md:block"
          aria-hidden={true}
        />
      </Link>
    )
  }

  return (
    <div className={`${props.className} ${color}`}>
      {/* <div
        className={`absolute before:transition before:duration-200 before:ease-in z-[2] inset-0 before:z-[-1] before:absolute bg-fade before:bg-fade-neutral before:inset-0 before:opacity-0 group-active:before:opacity-100`}
        style={{ '--bg-fade-top': '255,255,255' }}
      /> */}
      <Image
        src={small}
        alt={alt}
        width={width}
        height={height}
        className="@md:hidden"
      />
      <Image
        src={large}
        alt={alt}
        width={width}
        height={height}
        className="hidden @md:block"
      />
    </div>
  )
}

export default Placeholder
