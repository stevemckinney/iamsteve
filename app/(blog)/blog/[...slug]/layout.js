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
      <article
        className={`isolate grid row-start-1 col-container grid-cols-subgrid relative`}
      >
        <hr className="absolute z-[11] top-0 left-0 right-0 col-container lg:hidden w-full h-[2px] bg-[url(/images/dash.svg)] border-none" />
        {sidebar}
        <hr className="relative col-container lg:hidden w-full h-[2px] bg-[url(/images/dash.svg)] border-none" />
        {post}
      </article>
      {additional}
    </>
  )
}
