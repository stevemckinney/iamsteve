'use client'
import React from 'react'
import { MDXContent } from '@content-collections/mdx/react'
import Image from '@/components/image'
import Icon from '@/components/icon'
import { noteFigureComponents } from '@/components/figure'
import { Chat, ChatMessage } from '@/components/chat'
import CodeFigure from '@/components/code/figure'
import styles from './note-mdx.module.css'

const noteComponents = {
  h2: (props) => (
    <h2
      className="text-lg lg:text-2xl/[1.16666667] font-variation-bold font-display lowercase text-heading mt-6 mb-2"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-base lg:text-xl font-variation-bold font-display lowercase text-heading mt-5 mb-2"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="text-base lg:text-xl font-variation-bold font-display lowercase text-heading mt-4 mb-2"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-surface-02 rounded-sm p-4 overflow-x-auto my-4"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="md:text-lg lg:text-xl not-first:indent-8 [&>a]:indent-0 [.not-prose_&]:indent-0 [.not-prose_&]:text-base text-ui-body mb-2"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className={
        props.style || props['data-line-numbers'] !== undefined
          ? undefined
          : 'font-mono bg-code text-code rounded-sm px-1'
      }
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-link underline [text-underline-offset:12.5%] [text-decoration-thickness:1.5px] [text-decoration-color:color-mix(in_oklch,currentcolor,transparent_60%)] hover:text-link-hover hover:no-underline has-[svg]:inline-flex has-[svg]:gap-0 has-[svg]:items-center has-[svg]:align-middle transition duration-200 ease-out"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-medium text-emphasis" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-l-cornflour-500 pl-4 my-4 text-ui-body"
      {...props}
    />
  ),
  img: (props) => <img className="rounded-sm my-4" {...props} />,
  Image,
  ...noteFigureComponents,
  Icon,
  Chat,
  ChatMessage,
  CodeFigure,
}

export function NoteMdx({ code }) {
  if (!code) {
    return <p>Failed to load content.</p>
  }
  return (
    <div className={`${styles.note} codeblock`}>
      <MDXContent code={code} components={noteComponents} />
    </div>
  )
}

export { noteComponents }
