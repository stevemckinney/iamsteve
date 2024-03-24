/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from '@/components/image'
import Link from '@/components/link'
// import Campaigns from '@/components/campaigns'
// import Pre from '@/components/Pre'
// import CustomLink from '@/components/Link'
// import TOCInline from '@/components/TOCInline'
import ContactForm from '@/components/contact-form'
import Icon from '@/components/icon'
import Social from '@/components/social'
import Card from '@/components/card'
import Notepad from '@/components/notepad'
import NewsletterForm from '@/components/newsletter-form'
import { useMDXComponent } from 'next-contentlayer/hooks'

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

const Images = (props) => {
  const { children, align } = props
  const alignments = {
    center: 'justify-center',
    left: 'justify-start',
    right: 'justify-end',
  }

  return (
    <div
      className={`flex col-container grid-cols-subgrid gap-4 overscroll-contain-x overflow-x-auto py-4 -my-4 prose-exclude images px-6 sm:px-12 -mx-6 sm:[mask:linear-gradient(90deg,_transparent_0%,_#000_32px,_#000_calc(100%_-_32px),_transparent_100%)]`}
    >
      <div
        className="flex-shrink-0 max-sm:hidden sm:basis-1/5"
        aria-hidden="true"
      />
      {children}
    </div>
  )
}

const components = {
  Image,
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
      className="text-fern-1100 md:text-lg lg:text-xl underline underline-offset-2 hover:text-dandelion-600 transition duration-200 ease-linear"
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
      className={`flex flex-col items-center justify-center p-4 self-start rounded-lg bg-white shadow-placed ${props.className}`}
    >
      {props.children}
    </figure>
  ),
  GalleryFigcaption: (props) => (
    <figcaption className="text-ui-body font-body leading-normal pt-4 pb-2 [&>*]:underline [&>*]:text-base">
      {props.children}
    </figcaption>
  ),
}

const postComponents = {
  Image,
  a: (props) => <Link {...props} />,
  Link,
  Prose: Prose,
  blockquote: (props) => (
    <blockquote className={`border-l-2 border-l-cornflour-500 pl-4 -ml-4`}>
      {props.children}
    </blockquote>
  ),
  Blockquote,
  Images,
}

export function MDX({ code }) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}

export function PostMdx({ code }) {
  const Component = useMDXComponent(code)

  return <Component components={postComponents} />
}

export { postComponents, components }
