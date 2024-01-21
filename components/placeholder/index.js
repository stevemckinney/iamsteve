'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Colors = [
  {
    color: 'rgb(244 218 200 / 1)',
    rgb: '244,218,200',
  },
  {
    color: 'rgb(247 239 194 / 1)',
    rgb: '247,239,194',
  },
  {
    color: 'rgb(208 230 222 / 1)',
    rgb: '208,230,222',
  },
  {
    color: 'rgb(207 222 246 / 1)',
    rgb: '207,222,246',
  },
  {
    color: 'rgb(233 238 195 / 1)',
    rgb: '233,238,195',
  },
  {
    color: 'rgb(233 238 195 / 1)',
    rgb: '233,238,195',
  },
  {
    color: 'rgb(223 212 245 / 1)',
    rgb: '223,212,245',
  },
  {
    color: 'rgb(243 220 234 / 1)',
    rgb: '243,220,234',
  },
]

const Placeholder = ({ category, size, imageClass, alt, ...props }) => {
  const { width = 384, height = 240 } = props
  const [color, setColor] = useState('#ffffff') // Set initial color

  useEffect(() => {
    generateRandomColor()
  }, [])

  const generateRandomColor = () => {
    const colors = Colors // Array of 8 colors
    const randomColor = colors[Math.floor(Math.random() * colors.length)] // Choose a random color
    setColor(randomColor.color) // Set the background color
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
        style={{ backgroundColor: color }}
        className={`${props.className} relative`}
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
        />
      </Link>
    )
  }

  return (
    <div style={{ backgroundColor: color }}>
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
