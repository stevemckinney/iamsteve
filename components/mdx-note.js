'use client'
import { MDXContent } from '@content-collections/mdx/react'
import { components } from '@/components/mdx'
import { figureComponents } from '@/components/figure'
import styles from './mdx-note.module.css'

const noteComponents = {
  ...components,
  ...figureComponents,
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
  p: (props) => (
    <p
      className="md:text-lg lg:text-xl not-first:indent-8 [&>a]:indent-0 [.not-prose_&]:indent-0 [.not-prose_&]:text-base text-ui-body mb-2"
      {...props}
    />
  ),
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
