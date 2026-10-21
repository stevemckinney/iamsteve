'use client'
import dynamic from 'next/dynamic'

// Loads the demo and its CSS only on the post that uses it. Imported straight
// into a server component, its stylesheet would block every post.
export default dynamic(() => import('@/components/posts/0175-bento-grid'), {
  loading: () => (
    <div className="animate-pulse bg-neutral-01-100 rounded-lg h-96">
      Loading...
    </div>
  ),
  ssr: true,
})
