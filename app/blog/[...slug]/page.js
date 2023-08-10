import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx-components'

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
    <article className={`${styles.prose} prose dark:prose-invert grid layout`}>
      <header className="col-prose">
        <h1>{post.title}</h1>
        <ViewCounter allViews={allViews} slug={post.slugAsParams} trackView />
        {post.summary && <p>{post.summary}</p>}
      </header>
      <hr className="my-4 col-prose" />
      <div className="col-prose">
        <Mdx code={post.body.code} />
      </div>
    </article>
  )
}
