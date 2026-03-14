'use client'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { noteComponents } from '@/components/note-mdx'
import { Chat, ChatMessage } from '@/components/chat'
import styles from '@/components/note-mdx.module.css'

// Override noteComponents for the feed context (no text size bump)
const mdxComponents = {
  ...noteComponents,
  p: (props) => (
    <p
      className="not-first:indent-8 [&>a]:indent-0 [.not-prose_&]:indent-0 [.not-prose_&]:text-base text-ui-body mb-2"
      {...props}
    />
  ),
  Chat,
  ChatMessage,
}

export function NoteFeedContent({ code }) {
  const MDXContent = useMDXComponent(code)
  return (
    <div className={styles.note}>
      <MDXContent components={mdxComponents} />
    </div>
  )
}
