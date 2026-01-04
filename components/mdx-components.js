'use client'
import React, { useState } from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import dynamic from 'next/dynamic'

import Image from '@/components/image'
import Link from '@/components/link'
import ContactForm from '@/components/contact-form'
import Icon from '@/components/icon'
import Social from '@/components/social'
import Card from '@/components/card'
import Notepad from '@/components/notepad'
import NewsletterForm from '@/components/newsletter-form'
import CodePen from '@/components/codepen'

// Dynamically import heavy post-specific components
const BentoGridShell = dynamic(
  () => import('@/components/posts/0175-bento-grid'),
  {
    loading: () => <div className="animate-pulse bg-neutral-01-100 rounded-lg h-96">Loading...</div>,
    ssr: true,
  }
)

const Prose = ({ children }) => {
  return <div className="prose">{children}</div>
}

const Blockquote = (props) => {
  const { style } = props
  const styleVariants = {
    notice: 'border-l-2 border-l-fern-500 pl-4 -ml-4',
    signpost: '',
    afterthought:
      'md:text-lg lg:text-xl border-l border-l-neutral-01-500/20 pl-4 mb-3 text-lg text-ui-body/60 italic',
  }
  return (
    <blockquote className={styleVariants[style]}>{props.children}</blockquote>
  )
}

const Shortcut = ({ children }) => {
  const specialKeys = {
    // Left-aligned keys (items-start justify-end)
    tab: {
      symbol: '⇥',
      label: 'Tab',
      className: 'min-w-16 items-start justify-end',
    },
    shift: {
      symbol: '⇧',
      label: 'Shift',
      className: 'min-w-24 items-start justify-end',
    },
    caps: {
      symbol: '⇪',
      label: 'Caps lock',
      className: 'min-w-18 items-start justify-end',
    },
    esc: {
      symbol: '⎋',
      label: 'Esc',
      className: 'min-w-12 items-start justify-end',
    },

    // Right-aligned keys with space-between (items-end justify-between)
    ctrl: {
      symbol: '⌃',
      label: 'Control',
      className: 'min-w-16 items-end justify-between',
    },
    control: {
      symbol: '⌃',
      label: 'Control',
      className: 'min-w-16 items-end justify-between',
    },
    opt: {
      symbol: '⌥',
      label: 'Option',
      className: 'min-w-16 items-end justify-between',
    },
    option: {
      symbol: '⌥',
      label: 'Option',
      className: 'min-w-16 items-end justify-between',
    },
    alt: {
      symbol: '⌥',
      label: 'Alt',
      className: 'min-w-16 items-end justify-between',
    },
    cmd: {
      symbol: '⌘',
      label: 'Command',
      className: 'min-w-20 items-end justify-between',
    },
    command: {
      symbol: '⌘',
      label: 'Command',
      className: 'min-w-20 items-end justify-between',
    },
    delete: {
      symbol: '⌫',
      label: 'Delete',
      className: 'min-w-16 items-end justify-between',
    },
    backspace: {
      symbol: '⌫',
      label: 'Delete',
      className: 'min-w-16 items-end justify-between',
    },

    // Other special keys (centered)
    return: {
      symbol: '↵',
      label: 'Return',
      className: 'min-w-16 items-center justify-center',
    },
    enter: {
      symbol: '↵',
      label: 'Enter',
      className: 'min-w-16 items-center justify-center',
    },
    space: {
      symbol: '␣',
      label: 'Space',
      className: 'min-w-18 items-center justify-center',
    },
  }

  const createAriaLabel = (keys) => {
    if (typeof keys === 'string') return keys
    return Array.isArray(keys)
      ? keys.join(' plus ')
      : Children.toArray(keys).join(' plus ')
  }

  const formatKey = (key) => {
    const lowercaseKey = key.toLowerCase()
    if (specialKeys[lowercaseKey]) {
      return {
        symbol: specialKeys[lowercaseKey].symbol,
        label: specialKeys[lowercaseKey].label,
        className: specialKeys[lowercaseKey].className,
        isSpecial: true,
      }
    }
    return {
      symbol: key,
      className: 'min-w-12 items-center justify-center',
      isSpecial: false,
    }
  }

  const keys =
    typeof children === 'string'
      ? children.split(' ')
      : Children.toArray(children)

  const ariaLabel = `Keyboard shortcut: ${createAriaLabel(keys)}`

  return (
    <kbd className="flex gap-2" aria-label={ariaLabel} role="text">
      {keys.map((key, index) => {
        const { symbol, label, className, isSpecial } = formatKey(key)
        return (
          <kbd
            key={index}
            className={`
              relative flex flex-col gap-2
              ${className}
              px-2 py-2
              bg-neutral-01-100 shadow-picked rounded-sm
              text-fern-900
            `}
            aria-hidden="true"
          >
            <span className="text-2xl leading-none">{symbol}</span>
            {isSpecial && (
              <span className="text-xs leading-none font-sans">{label}</span>
            )}
          </kbd>
        )
      })}
    </kbd>
  )
}

const ComparisonImages = ({
  children,
  description = 'Compare states',
  options = [
    { label: 'Before', value: 0 },
    { label: 'After', value: 1 },
  ],
  contextLabel, // New prop for the context label
}) => {
  // Find default option index or fallback to 0
  const defaultIndex = options.findIndex((opt) => opt.default) || 0
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const nextIndex = (activeIndex + 1) % options.length
      setActiveIndex(nextIndex)
    }
  }

  // Validate and limit options
  const validOptions = options.slice(0, 5)
  const images = React.Children.toArray(children)

  return (
    <div
      className="flex flex-col gap-1 bg-neutral-01-100/80 dark:bg-surface shadow-placed dark:shadow-[inset_0_0_0_1px_var(--color-surface)] p-1 -mx-1 sm:-mx-9 rounded-[28px]"
      role="region"
      aria-label={description}
    >
      {/* Segmented control */}
      <div className="flex w-full gap-3 p-1 items-center ml-4 relative">
        {/* Context label */}
        {contextLabel && (
          <span className="text-sm text-heading/60 pt-2 pb-1.5 order-last">
            {contextLabel}
          </span>
        )}
        <div
          className="flex gap-px items-center justify-end bg-[url(/images/texture.png)] bg-size-[172px_auto] bg-blend-multiply bg-canvas shadow-[inset_0_0_0_1px_rgb(162_143_140/.24),_inset_0_1px_1px_-0.5px_rgb(162_143_140/.2),_inset_0_1px_3px_-1.5px_rgb(162_143_140/.2),_inset_0_2px_4px_-2px_rgb(162_143_140/.2),_inset_0_3px_6px_-3px_rgb(162_143_140/.2),_0_1px_rgb(252_249_248/1),_0_1px_1px_rgb(252_249_248/1)] dark:shadow-[inset_0_0_0_1px_var(--color-surface-raised)] rounded-[10px] p-1"
          role="tablist"
          aria-label="View options"
        >
          {validOptions.map((option, index) => (
            <React.Fragment key={index}>
              <button
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`view-${index}`}
                className={`
                  transition-all duration-200 rounded-[7px] shadow-[0_0_0_0_rgb(0_0_0/0)] hover:text-heading active:shadow-[0_0_0_0_rgb(0_0_0/0)] active:bg-[light-dark(var(--color-neutral-01-200),var(--color-fern-1300))] active:scale-[.99375] bg-clip-padding transition duration-200 ease-in
                  text-sm pt-2 pb-1.5 px-4 text-ui-body
                  ${
                    activeIndex === index
                      ? 'bg-surface shadow-placed dark:shadow-[inset_0_0_0_1px_var(--color-surface-raised)]'
                      : ''
                  }
                `}
                onClick={() => setActiveIndex(index)}
              >
                {option.label}
              </button>
              {index < validOptions.length - 1 && (
                <div
                  className={`
                    h-4 w-px bg-neutral-01-500/20
                    transition-opacity duration-200
                    ${
                      activeIndex === index || activeIndex === index + 1
                        ? 'opacity-0'
                        : 'opacity-100'
                    }
                  `}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        className="rounded-lg overflow-hidden grid grid-cols-1 grid-rows-1 before:content-[''] before:rounded-lg before:mix-blend-soft-light before:shadow-[inset_0_0_0_1px_black]  before:z-10 before:col-start-1 before:row-start-1 after:content-[''] after:rounded-lg after:mix-blend-soft-light after:shadow-[inset_0_0_0_1px_black] after:z-10 after:col-start-1 after:row-start-1 after:opacity-50"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {images.map((image, index) => {
          const imageProps = image?.props || {}
          return (
            <div
              key={index}
              id={`view-${index}`}
              role="tabpanel"
              aria-labelledby={`button-${index}`}
              className={`col-start-1 row-start-1`}
            >
              <Image
                {...imageProps}
                alt={
                  imageProps.alt ||
                  `${description} - ${validOptions[index]?.label || ''} state`
                }
                className={`transition-opacity duration-1000 linear data-[active=true]:delay-0
                  data-[active=false]:delay-150 w-full`}
                data-active={activeIndex === index}
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                  objectFit: 'contain',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Screen reader instructions */}
      <span className="sr-only">
        Use the segmented control above to switch between views. Currently
        showing {validOptions[activeIndex]?.label} state.
      </span>
    </div>
  )
}

const Images = ({ children, align, compare = false, options, ...props }) => {
  if (compare) {
    return (
      <ComparisonImages options={options} {...props}>
        {children}
      </ComparisonImages>
    )
  }

  return (
    <div
      className={`flex col-container grid-cols-subgrid gap-4 overscroll-contain-x overflow-x-auto py-4 -my-4 prose-exclude images px-6 sm:px-12 -mx-6 sm:[mask:linear-gradient(90deg,transparent_0%,#000_32px,#000_calc(100%-32px),transparent_100%)]`}
    >
      <div className="shrink-0 max-sm:hidden sm:basis-1/5" aria-hidden="true" />
      {children}
    </div>
  )
}

const components = {
  Image,
  Icon,
  Card,
  Link,
  // Campaigns: Campaigns,
  NewsletterForm: NewsletterForm,
  Notepad: Notepad,
  Prose: Prose,
  ContactForm: ContactForm,
  Social,
  // wrapper: ({ components, ...rest }) => (
  //   <div className="col-content" {...rest} />
  // ),
  Content: (props) => <div {...props} />,
  h2: (props) => (
    <h2
      className="font-display font-variation-bold text-2xl lg:text-3xl leading-3xl lowercase mt-4 mb-2"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display font-variation-bold text-xl lg:text-2xl leading-2xl lowercase mt-4 mb-1 [column-span:all]"
      {...props}
    />
  ),
  a: (props) => (
    <Link
      {...props}
      className="text-heading md:text-lg lg:text-xl underline underline-offset-2 hover:text-dandelion-600 transition duration-200 ease-linear"
    />
  ),
  p: (props) => (
    <p
      className="text-ui-body md:text-lg lg:text-xl mb-3 break-inside-avoid"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="text-ui-body md:text-lg lg:text-xl list-outside list-[square] [li::marker]-[theme('colors.neutral-03.400')] mb-3"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote className={`border-l-2 border-l-cornflour-500 pl-4 -ml-4`}>
      {props.children}
    </blockquote>
  ),
  Blockquote,
  Gallery: (props) => (
    <div className="grid gap-2 grid-cols-6 grid-flow-dense">
      {props.children}
    </div>
  ),
  GalleryFigure: (props) => (
    <figure
      className={`flex flex-col items-center justify-center p-4 self-start rounded-lg bg-surface shadow-placed ${props.className}`}
    >
      {props.children}
    </figure>
  ),
  GalleryFigcaption: (props) => (
    <figcaption className="text-heading/60 font-body leading-normal pt-4 pb-2 *:underline *:text-base">
      {props.children}
    </figcaption>
  ),
  Sandbox: (props) => <div className="sandbox">{props.children}</div>,
}

const postComponents = {
  h1: (props) => <h1 {...props} className="text-2xl font-bold" />,
  h2: (props) => <h2 {...props} className="text-xl" />,
  p: (props) => <p {...props} className="mt-2" />,
  ul: (props) => (
    <ul
      className="text-ui-body md:text-lg lg:text-xl list-inside sm:list-outside list-[square] [li::marker]-[theme('colors.neutral-03.400')] mb-3"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="text-ui-body md:text-lg lg:text-xl list-inside sm:list-outside list-decimal [li::marker]-[theme('colors.neutral-03.400')] mb-3"
      {...props}
    />
  ),
  li: (props) => <li {...props} />,
  Image,
  a: (props) => <Link {...props} />,
  Shortcut,
  Link,
  Icon,
  Prose: Prose,
  blockquote: (props) => (
    <blockquote className={`border-l-2 border-l-cornflour-500 pl-4 -ml-4`}>
      {props.children}
    </blockquote>
  ),
  Blockquote,
  Images,
  BentoGridShell,
  CodePen,
  Fig: (props) => (
    <span className="text-heading/40 uppercase">Fig. {props.children}</span>
  ),
  LinkFigma: (props) => (
    <Link
      href={props.href}
      className={`flex flex-1 justify-center items-center gap-2 select-none font-ui text-base/tight lowercase text-center button-dandelion w-full @sm:w-auto @sm:grow-0 flex-auto`}
    >
      <Icon icon="figma" size={16} className="text-current shrink-0" />{' '}
      {props.children}
    </Link>
  ),
  LinkGithub: (props) => (
    <Link
      href={props.href}
      className={`flex flex-1 justify-center items-center gap-2 select-none font-ui text-base/tight lowercase text-center button-dandelion w-full @sm:w-auto @sm:grow-0 flex-auto`}
    >
      <Icon icon="github" size={16} className="text-current shrink-0" />{' '}
      {props.children}
    </Link>
  ),
  Demo: (
    src,
    className = `-mx-6 col-content h-[33vmax] overflow-hidden bg-fern-1100 p-1.5`,
    zoom = `.5`
  ) => {
    const style = { '--zoom': zoom }
    return (
      <div
        className={`demo sm:rounded-lg overflow-clip ${className}`}
        style={style}
      >
        <iframe
          src={src.src}
          className={`sm:rounded-[2.35rem] ring ring-fern-800 origin-top-left w-[calc(1/var(--zoom)*100%)] h-[calc(1/var(--zoom)*100%)] transform-gpu scale-(--zoom)`}
        ></iframe>
      </div>
    )
  },
}

function MDXWrapper({ code }) {
  const Component = useMDXComponent(code)

  if (!code || !Component) {
    return <p>No content available.</p>
  }

  return <Component components={postComponents} />
}

// Memoize MDX component to prevent unnecessary re-renders
const MDXComponent = React.memo(function MDXComponent({ code }) {
  const Component = useMDXComponent(code)

  if (!Component) {
    console.error('Failed to create MDX component')
    return <p>Failed to load content.</p>
  }

  try {
    return <Component components={components} />
  } catch (error) {
    console.error('Error rendering MDX:', error)
    return <p>Failed to render content. Error: {error.message}</p>
  }
})

export function MDX({ code }) {
  return <MDXComponent code={code} />
}

// Memoize PostMdx component to prevent unnecessary re-renders
const PostMdxComponent = React.memo(function PostMdxComponent({ code }) {
  const Component = useMDXComponent(code)

  if (!Component) {
    console.error('Failed to create MDX component')
    return <p>Failed to load content.</p>
  }

  try {
    return <Component components={postComponents} />
  } catch (error) {
    console.error('Error rendering MDX:', error)
    return <p>Failed to render content. Error: {error.message}</p>
  }
})

export function PostMdx({ code }) {
  return <PostMdxComponent code={code} />
}

export { postComponents, components }
