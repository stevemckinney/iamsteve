import Image from 'next/image'
import Link from 'next/link'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import Posts from '@/layouts/Posts'
import Card from '@/components/card'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Thanks({ posts }) {
  const expected = [160, 161, 157, 164, 165, 72]

  return (
    <>
      <PageSEO title={`Thanks for subscribing • ${siteMetadata.title}`} />
      <div className="row subheader center contain contain-medium contain-large pb4">
        <h1 className="f4 f3-b f2-d warm mb0 text-center">Subscription confirmed</h1>
      </div>
      <div className="contain contain-medium contain-large pt4 pt6-d pb4 pb6-d">
        <div className="flex center mb4">
          <Image src="/static/images/thanks.svg" width={738} height={616} alt="Thumbs up" />
        </div>

        <p className="f2-l text-center measure m-center">
          Your subscription has been confirmed. If you have any problems{' '}
          <Link href="/contact" className="link">
            let me know
          </Link>{' '}
          or reply to any of the emails you receive.
        </p>

        <Posts
          title="Here’s what you can expect"
          link="/blog"
          text="All posts"
          size="small"
          key="posts"
        >
          {!posts && 'No posts'}
          {posts &&
            posts
              .filter((post) => expected.includes(post.id))
              .map((frontmatter) => {
                return <Card kind="small" frontmatter={frontmatter} key={frontmatter.id} />
              })}
        </Posts>
      </div>
    </>
  )
}
