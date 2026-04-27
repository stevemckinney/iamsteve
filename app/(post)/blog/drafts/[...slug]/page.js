import { notFound } from 'next/navigation'
import { allPosts } from 'content-collections'
import Icon from '@/components/icon'

import PostBody from '../../[...slug]/post-body'

export const dynamic = 'force-dynamic'

export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default async function DraftPostPreview(props) {
  const params = await props.params
  const slug = params?.slug?.join('/')

  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    notFound()
  }

  const banner = (
    <div className="col-content mb-8">
      <div className="shadow-placed flex gap-3 leading-tight bg-cornflour-0 dark:bg-cornflour-900 rounded-md p-4">
        <Icon
          icon="square-info"
          className="text-cornflour-900 dark:text-cornflour-100 flex-[0_0_auto]"
          variant="default"
        />
        <div className="flex flex-col">
          <p className="p-0 m-0 font-body text-sm text-cornflour-900 dark:text-cornflour-100">
            <strong>Viewing draft post</strong>
          </p>
          <p className="p-0 m-0 font-body text-sm text-cornflour-900 dark:text-cornflour-200">
            This post is not publicly visible
          </p>
        </div>
      </div>
    </div>
  )

  return <PostBody post={post} showViews={false} banner={banner} />
}
