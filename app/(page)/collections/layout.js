import { notFound } from 'next/navigation'
import { allPages } from 'contentlayer/generated'

import { Mdx } from '@/components/mdx-components'
import { Header, Title, Column, Description } from '@/components/page'
import Image from '@/components/image'
import collections from '@/content/collections'

export const dynamic = 'force-static'
export const revalidate = 86400

export default function CollectionsLayout({ children, searchParams }) {
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
      <Header className="col-start-content-start row-start-1 col-span-4">
        <Column className="md:col-span-1">
          <Title className="text-2xl xs:text-4xl lg:text-5xl">
            Collections
          </Title>
          <Description>
            Curated links for everything from inspiration to type and
            illustration.
          </Description>
          <ul>
            {collections.map((collection) => (
              <li>{collection.title}</li>
            ))}
          </ul>
        </Column>
      </Header>
      <section className="flex flex-col gap-8 col-container col-start-7 row-start-1 pb-18 gap-y-10 lg:gap-y-18">
        {children}
      </section>
    </>
  )
}
