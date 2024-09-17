import { allPosts } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default function BlogPostLayout({
  children,
  post,
  sidebar,
  additional,
}) {
  return (
    <>
      {children}
    </>
  )
}
