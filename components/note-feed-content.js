'use client'
import { MDXContent } from '@content-collections/mdx/react'
import { noteComponents } from '@/components/mdx-note'
import styles from '@/components/mdx-note.module.css'

// Override noteComponents for the feed context (no text size bump)
const mdxComponents = {
  ...noteComponents,
  p: (props) => (
    <p
      className="not-first:indent-8 [&>a]:indent-0 [.not-prose_&]:indent-0 [.not-prose_&]:text-base text-ui-body mb-2"
      {...props}
    />
  ),
}

export function NoteFeedContent({ code }) {
  return (
    <div className={`${styles.note} codeblock`}>
      <MDXContent code={code} components={mdxComponents} />
    </div>
  )
}
