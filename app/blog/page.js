import { cache } from 'react'
import { allPosts } from 'contentlayer/generated'

import { sortPosts } from '@/lib/utils/content'

import Card from '@/components/card'

export const dynamic = 'force-static'
export const revalidate = 86400

const getData = cache(async () => {
  // Create a Supabase client configured to use cookies

  const postsByDate = sortPosts(allPosts).filter((post) => post.status.includes('open'))

  return {
    postsByDate,
  }
})

export default async function Home() {
  const allData = await getData()
  const posts = allData.postsByDate

  return (
    <>
      <div className="grid col-container grid-cols-subgrid frame gap-y-8 pb-18 mt-[1.375rem]">
        <div className="grid grid-cols-3 col-content gap-8">
          {posts.map((post) => (
            <>
              <Card size="medium" frontmatter={post} image={true} key={post._id} />
            </>
          ))}
        </div>
      </div>
    </>
  )
}
