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
import Notepad from '@/components/notepad'
import NewsletterForm from '@/components/newsletter-form'
import { useMDXComponent } from 'next-contentlayer/hooks'

const Prose = ({ children }) => {
  return <div className="prose">{children}</div>
}

const components = {
  Image,
  a: (props) => <Link {...props} />,
  // Campaigns: Campaigns,
  NewsletterForm: NewsletterForm,
  Notepad: Notepad,
  Prose: Prose,
  ContactForm: ContactForm,
  // wrapper: ({ components, ...rest }) => (
  //   <div className="col-content" {...rest} />
  // ),
  Content: (props) => <div {...props} />,
  h2: (props) => (
    <h3
      className="font-display font-variation-bold text-2xl lg:text-3xl leading-3xl lowercase mt-4 mb-1"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display font-variation-bold text-xl lg:text-2xl leading-2xl lowercase mt-4 mb-1"
      {...props}
    />
  ),
  p: (props) => <p className="text-ui-body lg:text-lg mb-2" {...props} />,
  ul: (props) => (
    <ul
      className="text-ui-body lg:text-lg list-outside list-disc mb-2"
      {...props}
    />
  ),
  Gallery: (props) => (
    <div className="grid col-margin sm:col-content gap-2 grid-flow-col auto-cols-auto overflow-auto snap-x snap-always overscroll-x-contain">
      {props.children}
    </div>
  ),
  GalleryFigure: (props) => (
    <figure
      className={`flex flex-col items-center justify-center p-4 self-start rounded-lg mb-8 bg-white shadow-placed ${props.className}`}
    >
      {props.children}
    </figure>
  ),
  GalleryFigcaption: (props) => (
    <figcaption className="text-ui-body font-body leading-normal p-4 min-w-[320px] [&>*]:underline [&>*]:text-base">
      {props.children}
    </figcaption>
  ),
}

const postComponents = {
  Image,
  a: (props) => <Link {...props} />,
  Prose: Prose,
}

export function Mdx({ code }) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}

export function PostMdx({ code }) {
  const Component = useMDXComponent(code)

  return <Component components={postComponents} />
}
