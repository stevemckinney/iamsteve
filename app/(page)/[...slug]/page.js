import { notFound } from 'next/navigation'
import { allPages } from 'contentlayer/generated'

import { MDX } from '@/components/mdx-components'
import { Header, Title, Column, Description } from '@/components/page'
import { PencilMono } from '@/components/illustration'
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

export async function generateMetadata(props) {
  const params = await props.params
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    template: '%s • iamsteve',
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }))
}

export default async function PagePage(props) {
  const params = await props.params
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <>
      <PencilMono
        width={962}
        height={46}
        className={`col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden`}
      />
      <article className="grid grid-cols-subgrid col-container row-start-1 lg:pb-18 gap-y-10 lg:gap-y-18">
        <Header>
          <Column className="md:col-span-1">
            <Title>{page.title}</Title>
            <Description>{page.description}</Description>
          </Column>
          {page.slot && (
            <Column className="md:col-span-1 self-end">
              <MDX code={page.slot.code} />
            </Column>
          )}
        </Header>
        <MDX code={page.body.code} />
      </article>
    </>
  )
}
