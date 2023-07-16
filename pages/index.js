import { useEffect } from 'react'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { SupabaseAdmin } from '@/lib/supabase-admin'

// components
import LayoutWrapper from '@/components/LayoutWrapper'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Subscribe from '@/components/Subscribe'
import Posts from '@/layouts/Posts'
import Card from '@/components/card'
import SearchLayout from '@/layouts/SearchLayout'
import Icon from '@/components/icon/index.js'
import Search from '@/components/Search'

// images
import Image from 'next/image'
import Lettering from '@/images/lettering.svg'
import Intro320 from '@/images/introduction-320.svg'
import Intro394 from '@/images/introduction-394.svg'
import Intro734 from '@/images/introduction-734.svg'
import Intro960 from '@/images/introduction-960.svg'

// utils
import mergeDataByID from '@/lib/utils/mergeData'
import { PageViews, views } from '@/components/PageViews'

// pull in the posts
// import Posts from '@/layouts/Posts'
export const POSTS_PER_PAGE = 8
export const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const { data: dbPosts } = await SupabaseAdmin.from('pages').select()
  const content = posts
    .filter((post) => post.status.includes('open'))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const views = dbPosts?.map(({ id, slug, view_count }) => ({
    id,
    slug,
    view_count,
  }))

  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  const mergedData = mergeDataByID(posts, views)

  return { props: { initialDisplayPosts, posts, mergedData, pagination } }
}

const Home = ({ initialDisplayPosts, posts, mergedData, pagination }) => {
  // can't figure out how to sort posts, so taking the current order
  // and will manually update over time
  const designPosts = [83, 148, 140, 87, 130, 77, 139, 168, 124, 79]
  const codePosts = [72, 88, 112, 24, 113, 80, 64, 76, 137, 49, 114]

  return (
    <>
      <PageSEO
        title={`${siteMetadata.title} • design & code blog`}
        description={siteMetadata.description}
      />
      <div className="hero contain-medium contain-large mb2 mb4-d">
        <div className="hero-content">
          <h1 className="f3 f2-b f1-d mb0 primary hero-title">
            <Lettering />
          </h1>
        </div>
        <div className="hero-image">
          <Image
            src="/static/images/introduction-320.svg"
            alt=""
            aria-hidden="true"
            width={320}
            height={254}
            className="hero-image-320"
            priority={true}
          />
          <Image
            src="/static/images/introduction-394.svg"
            alt=""
            aria-hidden="true"
            width={394}
            height={296}
            className="hero-image-394"
            priority={true}
          />
          <Image
            src="/static/images/introduction-734.svg"
            alt=""
            aria-hidden="true"
            width={734}
            height={312}
            className="hero-image-734"
            priority={true}
          />
          <Image
            src="/static/images/introduction-960.svg"
            alt="An illustration of a desk setup with a computer and various stationery and apps found on it"
            width={960}
            height={404}
            className="hero-image-960"
            priority={true}
          />
        </div>
      </div>

      <Posts title="Latest posts" link="/blog" size="medium" key="latest">
        {!posts && 'No posts'}
        {posts &&
          posts
            .filter((post) => post)
            .map((frontmatter) => {
              return <Card kind="medium" frontmatter={frontmatter} key={frontmatter.fileroot} />
            })
            .slice(0, POSTS_PER_PAGE)}
        <Link
          href="/blog"
          className="link-icon warm secondary-hover card-permalink semibold sans center f2-l"
          key="more-posts"
        >
          All posts{' '}
          <span className="icon icon-medium icon-right secondary mr6">
            <Icon kind="right" />
          </span>
        </Link>
      </Posts>

      {siteMetadata.newsletter.provider !== '' && <Subscribe unique="home" />}

      <Posts
        title="Popular in design"
        link="/category/design"
        text="Explore design"
        size="small"
        key="design"
        position="top"
      >
        {!mergedData && 'No posts'}
        {mergedData &&
          mergedData
            .filter((post) => post.categories.includes('Design'))
            .sort((a, b) => b.view_count - a.view_count)
            .slice(0, POSTS_PER_PAGE)
            .map((frontmatter) => {
              return <Card kind="small" frontmatter={frontmatter} key={frontmatter.id} />
            })}
        <Link
          href="/category/design"
          className="link-icon warm secondary-hover card-permalink semibold sans center f5-l"
          key="more-design"
        >
          Explore design{' '}
          <span className="icon icon-medium icon-right secondary mr6">
            <Icon kind="right" />
          </span>
        </Link>
      </Posts>

      <Posts
        title="Popular in code"
        link="/category/code"
        text="Explore code"
        size="small"
        key="code"
        position="bottom"
      >
        {!mergedData && 'No posts'}
        {mergedData &&
          mergedData
            .filter((post) => post.categories.includes('Code'))
            .sort((a, b) => b.view_count - a.view_count)
            .slice(0, POSTS_PER_PAGE)
            .map((frontmatter) => {
              return <Card kind="small" frontmatter={frontmatter} key={frontmatter.id} />
            })}
        <Link
          href="/category/design"
          className="link-icon warm secondary-hover card-permalink semibold sans center f5-l"
          key="more-code"
        >
          Explore code{' '}
          <span className="icon icon-medium icon-right secondary mr6">
            <Icon kind="right" />
          </span>
        </Link>
      </Posts>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <LayoutWrapper subtle={true}>{page}</LayoutWrapper>
}

export default Home
