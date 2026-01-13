import { cache } from 'react'
import { allPosts } from 'contentlayer/generated'
import { sortPosts } from '@/lib/utils/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header, Title, Column, Description } from '@/components/page'
import Icon from '@/components/icon'

export const metadata = {
  title: 'Draft posts',
  description: 'Posts in progress',
}

export const dynamic = 'force-dynamic'

const getData = cache(async () => {
  const draftPosts = sortPosts(
    allPosts.filter((post) => post.status === 'draft')
  )

  return {
    draftPosts,
  }
})

export default async function DraftsIndex(props) {
  // Check for draft parameter
  const searchParams = await props.searchParams
  const showDrafts = searchParams?.draft === 'true'

  // Redirect to 404 if draft parameter is not present
  if (!showDrafts) {
    notFound()
  }

  const { draftPosts } = await getData()

  return (
    <>
      <Header>
        <Column className="md:col-span-1">
          <Title>Draft posts</Title>
          <Description>Posts in progress</Description>
        </Column>
      </Header>

      <div className="col-content">
        <div className="shadow-placed flex gap-3 leading-tight bg-cornflour-0 rounded-md p-4 mb-8">
          <Icon
            icon="square-info"
            className="text-cornflour-900 flex-[0_0_auto]"
          />
          <div className="flex flex-col">
            <p className="p-0 m-0 font-body text-sm text-cornflour-900">
              <strong>Draft posts listing</strong>
            </p>
            <p className="p-0 m-0 font-body text-sm text-cornflour-900">
              These posts are not publicly visible
            </p>
          </div>
        </div>

        {draftPosts.length > 0 ? (
          <ul className="list-none p-0 m-0 flex flex-col gap-4">
            {draftPosts.map((post) => (
              <li
                key={post._id}
                className="p-4 border border-neutral-01-200 rounded-md hover:border-neutral-01-300 transition-colors"
              >
                <Link
                  href={`${post.slug}?draft=true`}
                  className="text-heading hover:text-fern-900 transition-colors no-underline"
                >
                  <span className="font-mono text-sm text-neutral-01-600">
                    {String(post.id).padStart(4, '0')}
                  </span>
                  <h2 className="text-lg font-display font-variation-bold mt-1 mb-0">
                    {post.title}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-01-600">No draft posts found</p>
        )}
      </div>
    </>
  )
}
