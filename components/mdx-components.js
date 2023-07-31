/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from '@/components/image'
import Pre from '@/components/Pre'
import CustomLink from '@/components/Link'
// import TOCInline from '@/components/TOCInline'
// import { BlogNewsletterForm } from './NewsletterForm'
import { useMDXComponent } from 'next-contentlayer/hooks'

const components = {
  Image,
  a: CustomLink,
  pre: Pre,
  // BlogNewsletterForm: BlogNewsletterForm,
}

export function Mdx({ code }) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
