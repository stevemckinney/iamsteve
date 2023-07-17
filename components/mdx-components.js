/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from '@/components/image'
import CustomLink from '@/components/Link'
import TOCInline from '@/components/TOCInline'
import Pre from '@/components/Pre'
// import { BlogNewsletterForm } from './NewsletterForm'
import { useMDXComponent } from "next-contentlayer/hooks"

const components = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  // BlogNewsletterForm: BlogNewsletterForm,
}

export function Mdx({ code }) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
