import { notFound } from 'next/navigation'
import { allPages } from 'contentlayer/generated'

import { Mdx } from '@/components/mdx-components'
import PageHeader from '@/components/page-header'
import PageTitle from '@/components/page-title'
import Image from '@/components/image'

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
        className={`col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed`}
        alt=""
        role="presentation"
      />
      <article className="grid grid-cols-subgrid col-content pb-18 gap-18">
        <PageHeader>
          <PageTitle>{page.title}</PageTitle>
          <p className="text-2xl text-ui-body max-w-[34ch]">
            {page.description}
          </p>
        </PageHeader>
        <Mdx code={page.body.code} />
      </article>
    </>
  )
}
