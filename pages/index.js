import { useEffect } from 'react'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Subscribe from '@/components/Subscribe'
import Posts from '@/layouts/Posts'
import Icon from '@/components/icon'

// images
import Image from 'next/image'
import Lettering from '@/images/lettering.svg'
import Intro320 from '@/images/introduction-320.svg'
import Intro394 from '@/images/introduction-394.svg'
import Intro734 from '@/images/introduction-734.svg'
import Intro960 from '@/images/introduction-960.svg'

// pull in the posts
// import Posts from '@/layouts/Posts'
import Card from '@/components/card'
export const POSTS_PER_PAGE = 5
export const MAX_DISPLAY = 5

// View count
import { PageViews, views } from '@/components/PageViews'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Home({ initialDisplayPosts, posts, pagination }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="hero contain-medium contain-large mb2 mb4-d">
        <div className="hero-content">
          <h1 className="f3 f2-b f1-d mb0 primary hero-title">
            <Lettering />
          </h1>
        </div>
        <div className="hero-image">
          <Image
            src="/static/images/introduction-320.svg"
            width={320}
            height={254}
            className="hero-image-320"
          />
          <Image
            src="/static/images/introduction-394.svg"
            width={394}
            height={296}
            className="hero-image-394"
          />
          <Image
            src="/static/images/introduction-734.svg"
            width={734}
            height={312}
            className="hero-image-734"
          />
          <Image
            src="/static/images/introduction-960.svg"
            width={960}
            height={404}
            className="hero-image-960"
          />
        </div>
      </div>

      <Posts title="Latest posts" link="/blog" size="medium">
        {posts
          .filter((post) => post)
          .map((frontmatter) => {
            return (
              <>
                <Card kind="medium" frontmatter={frontmatter} key={frontmatter.id} />
              </>
            )
          })
          .slice(0, POSTS_PER_PAGE)}
        <a
          href="/blog"
          className="link-icon warm secondary-hover card-permalink semibold sans center f2-l"
        >
          All posts{' '}
          <span className="icon icon-medium icon-right secondary mr6">
            <Icon kind="right" />
          </span>
        </a>
      </Posts>

      {siteMetadata.newsletter.provider !== '' && <Subscribe />}

      <Posts title="Popular in design" link="/category/design" text="Explore design" size="small">
        {posts
          .filter((post) => post.tags.includes('Design'))
          .sort((a, b) => {
            views(b.slug) - views(a.slug)
          })
          .map((frontmatter) => {
            return <Card kind="small" frontmatter={frontmatter} key={frontmatter.id} />
          })
          .sort((a, b) => views(b.slug) - views(a.slug))
          .slice(0, POSTS_PER_PAGE)}
        <a
          href="/category/design"
          className="link-icon warm secondary-hover card-permalink semibold sans center f5-l"
        >
          Explore design{' '}
          <span className="icon icon-medium icon-right secondary mr6">
            <Icon kind="right" />
          </span>
        </a>
      </Posts>

      <Posts title="Popular in code" link="/category/code" text="Explore code" size="small">
        {!posts && <div>No posts!</div>}
        {posts
          .filter((post) => post.tags.includes('Code'))
          .sort((a, b) => {
            views(b.slug) - views(a.slug)
          })
          .map((frontmatter) => {
            return <Card kind="small" frontmatter={frontmatter} key={frontmatter.id} />
          })
          .slice(0, POSTS_PER_PAGE)}
        <a
          href="/category/design"
          className="link-icon warm secondary-hover card-permalink semibold sans center f5-l"
        >
          Explore code{' '}
          <span className="icon icon-medium icon-right secondary mr6">
            <Icon kind="right" />
          </span>
        </a>
      </Posts>
    </>
  )
}
