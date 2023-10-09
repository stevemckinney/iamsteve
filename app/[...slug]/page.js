import { notFound } from 'next/navigation'
import { allPages } from 'contentlayer/generated'

import { Mdx } from '@/components/mdx-components'

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
    <article className="grid grid-cols-subgrid col-content pt-12 pb-8 flex flex-col gap-8">
      <header className="col-start-1 col-end-7">
        <h1 className="text-7xl font-variation-extrabold font-display text-fern-1100 lowercase">
          {page.title}
        </h1>
        <p className="text-2xl text-ui-body">{page.description}</p>
      </header>
      <div className="col-content">
        <Mdx code={page.body.code} />
      </div>
    </article>
  )
}
