import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'

// images
import Image from 'next/image'
import Lettering from '@/images/lettering.svg'
import Intro320 from '@/images/introduction-320.svg';
import Intro394 from '@/images/introduction-394.svg';
import Intro734 from '@/images/introduction-734.svg';
import Intro960 from '@/images/introduction-960.svg';

// post display
const MAX_DISPLAY = 50

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div class="hero contain-medium contain-large mb2 mb4-d">
        <div class="hero-content">
          <h1 class="f3 f2-b f1-d mb0 primary hero-title">
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
