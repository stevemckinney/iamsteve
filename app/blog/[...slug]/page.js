import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx-components'
import TableOfContents from '@/components/toc'
import '../../../css/toc.scss'

import getAllPageViews from '../views'
import ViewCounter from '../counter'

// const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`

export const dynamic = 'force-static'
export const revalidate = 86400

import styles from './post.module.scss'

async function getPostFromParams(params) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({ params }) {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default async function PostPage({ params }) {
  const post = await getPostFromParams(params)
  const allViews = await getAllPageViews()

  if (!post) {
    notFound()
  }

  return (
    <article className={`grid layout gap-x-8 gap-y-0 col-start-1 col-end-[-1]`}>
      <header className="col-prose">
        <h1 className="font-display lowercase text-7xl text-fern-1100">{post.title}</h1>
        <ViewCounter allViews={allViews} slug={post.slugAsParams} trackView />
        {post.summary && <p className="text-xl text-ui-body">{post.summary}</p>}
      </header>
      <hr className="my-4 col-prose" />
      <TableOfContents />
      <div className={`${styles.prose} prose dark:prose-invert col-prose js-toc-content`}>
        <Mdx code={post.body.code} />
      </div>
    </article>
  )
}
