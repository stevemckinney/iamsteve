import { notFound } from 'next/navigation'
import { Header, Title, Column, Description } from '@/components/page'
import Link from '@/components/link'
import Image from '@/components/image'
import PageHeader from '@/components/page-header'
import PageTitle from '@/components/page-title'
import Notepad from '@/components/notepad'
import NewsletterForm from '@/components/newsletter-form'
import Card from '@/components/card'
import Campaigns from '../newsletter/campaigns'
import { posts } from '@/.velite'

export default async function NewsletterPage({ data, Post }) {
  const includedPosts = [160, 161, 157, 164, 165, 72]
  const posts = posts
    .filter((post) => post.status === 'open')
    .filter((post) => includedPosts.includes(post.id))

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
      <Header>
        <Column className="md:col-span-1">
          <Title>Thanks</Title>
          <Description>Your subscription has been confirmed.</Description>
        </Column>
      </Header>
      <article className="grid grid-cols-subgrid col-content pb-18 gap-y-18">
        <div className="col-start-content-start max-lg:col-end-content-end lg:col-span-5 xl:col-span-7 2xl:col-span-6">
          <div className="sticky top-8 flex flex-col gap-8">
            <section className="flex flex-col gap-4">
              ## You’ll receive a follow up email
              <div className="bg-white shadow-placed px-10 py-8 rounded-lg flex flex-col gap-4">
                Your subscription has been confirmed. There will be a follow up
                email to your confirmation email welcoming you to the
                newsletter. If you have any problems{' '}
                <Link href="/contact" className="link">
                  let me know
                </Link>{' '}
                or reply to any of the emails you receive.
              </div>
            </section>
            <Notepad>
              <Notepad.Header>Previous issues</Notepad.Header>
              <Notepad.Body>
                <Campaigns />
              </Notepad.Body>
            </Notepad>
          </div>
        </div>
        <div className="col-start-content-start col-end-content-end lg:col-start-6 xl:col-start-9 2xl:col-start-8 flex flex-col gap-4">
          ## What you can expect
          {posts.map((post) => (
            <Card size="small" frontmatter={post} key={post.id} />
          ))}
        </div>
      </article>
    </>
  )
}
