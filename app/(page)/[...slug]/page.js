import { notFound } from 'next/navigation'
import { allPages } from 'contentlayer/generated'

import { Mdx } from '@/components/mdx-components'
import { Header, Title, Column, Description } from '@/components/page'
import Image from '@/components/image'
import categories from '@/content/categories'

export const dynamic = 'force-static'
export const revalidate = 86400

async function getPageFromParams(params) {
  const slug = params?.slug?.join('/')
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata({ params }) {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    template: '%s • iamsteve',
    title: page.title,
    description: page.description,
    slot: page.slot,
  }
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }))
}

export default async function PagePage({ params }) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <>
      <Image
        src="/images/illustration/pencil-mono.svg"
        width={962}
        height={46}
        className={`col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden`}
        alt=" "
        aria-hidden="true"
      />
      <article className="grid grid-cols-subgrid col-container row-start-1 pb-18 gap-y-18">
        <Header>
          <Column className="md:col-span-1">
            <Title>Blog</Title>
            <Description>
              Tips and tutorials about the design and build of web interfaces
            </Description>
          </Column>
          {categories && (
            <ul className="md:col-span-1 grid grid-cols-2 gap-x-8 self-end list-categories -mb-2 lg:-mb-3">
              {categories.map((category) => {
                if (category.exclude === true || category.parent === true)
                  return
                return (
                  <li className="self-end" key={category.title}>
                    <Category
                      size={24}
                      badge={false}
                      className="py-2 md:py-3 text-base md:text-lg lg:text-xl text-fern-1100 transition-all duration-200 ease-linear font-ui lowercase leading-none rounded flex gap-2 items-center text-current"
                    >
                      {category.title}
                    </Category>
                  </li>
                )
              })}
            </ul>
          )}
        </Header>
        <Mdx code={page.body.code} />
      </article>
    </>
  )
}
