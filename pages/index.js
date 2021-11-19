import { useEffect } from 'react'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Subscribe from '@/components/Subscribe'
import Posts from '@/layouts/Posts'

// images
import Image from 'next/image'
import Lettering from '@/images/lettering.svg'
import Intro320 from '@/images/introduction-320.svg';
import Intro394 from '@/images/introduction-394.svg';
import Intro734 from '@/images/introduction-734.svg';
import Intro960 from '@/images/introduction-960.svg';

// pull in the posts
// import Posts from '@/layouts/Posts'
import Card from '@/components/card'
export const POSTS_PER_PAGE = 5
export const MAX_DISPLAY = 5

// View count
import { PageViews, views } from '@/components/PageViews';

function viewsSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

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
          <Image src="/static/images/introduction-320.svg" width={320} height={254} className="hero-image-320" />
          <Image src="/static/images/introduction-394.svg" width={394} height={296} className="hero-image-394" />
          <Image src="/static/images/introduction-734.svg" width={734} height={312} className="hero-image-734" />
          <Image src="/static/images/introduction-960.svg" width={960} height={404} className="hero-image-960" />
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
          .slice(0, POSTS_PER_PAGE)
        }
      </Posts>

      {siteMetadata.newsletter.provider !== '' && (
        <Subscribe />
      )}

      <Posts title="Popular in design" link="/design" text="Explore design" size="small">
        {posts
          .filter((post) => post.tags.includes('Design'))
          .map((frontmatter) => {
            return (
              <>
                <div key={frontmatter.id}>
                  <Card kind="small" frontmatter={frontmatter} key={frontmatter.id} />
                </div>
              </>
            )
          })
          .slice(0, POSTS_PER_PAGE)
        }
      </Posts>

      <Posts title="Popular in code" link="/code" text="Explore code" size="small">
        {!posts && <div>No posts!</div>}
        {posts
          .filter((post) => post.tags.includes('Code'))
          .map((frontmatter) => {
            return (
              <>
                <div key={frontmatter.id}>
                {views(frontmatter.slug)}
                <Card kind="small" frontmatter={frontmatter} key={frontmatter.id} />
                </div>
              </>
            )
          })
          .sort(
            (a, b) => {
              // console.log(views(a.slug));
              return views(a.slug) - views(b.slug)
            }
          )
          .slice(0, POSTS_PER_PAGE)
        }
      </Posts>
    </>
  )
}
