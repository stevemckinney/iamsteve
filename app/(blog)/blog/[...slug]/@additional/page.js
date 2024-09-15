import Link from '@/components/link'
import Icon from '@/components/icon'
import Card from '@/components/card'
import { allPosts } from 'contentlayer/generated'
import siteMetadata from '@/content/metadata'
import { getPostFromParams } from '@/lib/utils/content'

function getRandomItem(category) {
  const allItems = allPosts.filter(
    (post) => post.status === 'open' && post.categories.includes(category)
  )
  const items = Array.from(allItems)
  return items[Math.floor(Math.random() * items.length)]
}

function Support() {
  return (
    <aside className="xl:row-span-1 bg-neutral-01-50 border border-1 border-neutral-01-200 rounded-lg flex flex-row flex-wrap content-center items-center gap-4 justify-between p-8 lg:-mx-8 col-content xl:col-start-3 xl:col-span-8 lg:row-span-1">
      <p className="p-0 m-0 text-base text-ui-body flex flex-col">
        <strong className="text-fern-1100 font-bold">
          Enjoying the reading experience?
        </strong>{' '}
        There's no ads, tracking or cookie banners, so your support is valued
      </p>
      <Link
        href={siteMetadata.bmc}
        className="flex shrink-0 grow-0 self-start flex-row rounded-sm items-center gap-2 text-base font-ui lowercase hover:opacity-70 transition duration-200 mt-1 pl-6 pr-5 py-2 bg-white shadow-[0_0_0_1px_theme('colors.neutral-01.200')]"
      >
        Buy me a coffee
        <span className="flex shrink-0 grow-0 items-center justify-center">
          <Icon icon="bmc" />
        </span>
      </Link>
    </aside>
  )
}

function NextPosts({ post }) {
  return (
    <aside className="xl:row-span-1 col-content lg:col-start-3 lg:col-span-8 flex flex-col gap-4 lg:-mx-8 lg:row-span-1">
      <h2 className="text-3xl font-display font-variation-bold leading-none lowercase text-fern-1100 m-0 lg:px-8">
        Next to read
      </h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card
          size="medium"
          image={false}
          frontmatter={getRandomItem(post.categories[0])}
        />
        <Card
          size="medium"
          image={false}
          frontmatter={getRandomItem(post.categories[0])}
        />
      </div>
    </aside>
  )
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default async function AdditionalContent({ params }) {
  const post = await getPostFromParams(params)

  if (!post) {
    return null
  }

  return (
    <>
      <Support />
      <NextPosts post={post} />
    </>
  )
}
