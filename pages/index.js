import { useEffect } from 'react'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import NewsletterForm from '@/components/NewsletterForm'
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
import PageViews, { views } from '@/components/PageViews';

function removeSlugID(slug) {
  if (!isNaN(slug.substring(0, 5))) {
    slug = slug.replace(slug.substring(0, 6), "");
  }
  
  return slug;
}

function viewsSortDesc(a, b) {
  if (views(a) > views(b)) return -1
  if (views(a) < views(b)) return 1
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
      
      <Posts title="Latest posts" link="/blog">
        {posts
          .filter((post) => post)
          .map((frontmatter) => {
            return (
              <>
                <div>
                  {frontmatter.slug}
                  <Card kind="medium" frontmatter={frontmatter} key={frontmatter.id} />
                </div>
              </>
            )
          })
          .slice(0, POSTS_PER_PAGE)
        }
      </Posts>
      
      {siteMetadata.newsletter.provider !== '' && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        )}
      
      <Posts title="Popular in design" link="/design">
        {posts
          .sort(
            (a, b) => {
              console.log(a.slug, b.slug)
            }
          )
          .filter((post) => post.tags.includes('Design'))
          .map((frontmatter) => {
            return (
              <>
                <div>
                  {frontmatter.slug}
                  <Card kind="medium" frontmatter={frontmatter} key={frontmatter.id} />
                </div>
              </>
            )
          })
          .slice(0, POSTS_PER_PAGE)
        }
      </Posts>
      
      <Posts title="Popular in code" link="/design">
        {posts
          .sort(
            (a, b) => {
              console.log(a, b)
            }
          )
          .filter((post) => post.tags.includes('Code'))
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
      
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
