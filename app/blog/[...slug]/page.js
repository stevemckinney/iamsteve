import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx-components'

import getAllPageViews from '../views'
import ViewCounter from '../counter'

// const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`

export const dynamic = 'force-static'
export const revalidate = 86400

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
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      <ViewCounter allViews={allViews} slug={post.slugAsParams} trackView />
      {post.summary && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">{post.summary}</p>
      )}
      <hr className="my-4" />
      <Mdx code={post.body.code} />
    </article>
  )
}
