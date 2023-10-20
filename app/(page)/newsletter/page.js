import { notFound } from 'next/navigation'
import PageHeader from '@/components/page-header'
import PageTitle from '@/components/page-title'
import Notepad from '@/components/notepad'
import NewsletterForm from '@/components/newsletter-form'
import Card from '@/components/card'
import Campaigns from './campaigns'
import { allPosts } from 'contentlayer/generated'

export default async function NewsletterPage({ data, Post }) {
  const includedPosts = [165, 164, 72, 157, 160]
  const posts = allPosts
    .filter((post) => post.status === 'open')
    .filter((post) => includedPosts.includes(post.id))

  return (
    <article className="grid grid-cols-subgrid col-content pt-12 pb-18 gap-18">
      <PageHeader>
        <PageTitle>Newsletter</PageTitle>
        {/* <p className="text-2xl text-ui-body max-w-[34ch]">Subscribe</p> */}
      </PageHeader>
      <div className="col-start-content-start col-span-6 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-display font-variation-bold leading-none lowercase text-fern-1100 m-0">
            Get the articles
          </h2>
          <div className="bg-white shadow-placed px-10 py-8 rounded-lg flex flex-col gap-4">
            <p>
              Join my email list and I’ll notify you when the latest posts go
              out—if that’s what you prefer. This happens monthly at most. You
              can unsubscribe anytime.
            </p>
            <NewsletterForm />
          </div>
        </section>
        <Notepad>
          <Notepad.Header>Previous issues</Notepad.Header>
          <Notepad.Body>
            <Campaigns />
          </Notepad.Body>
        </Notepad>
      </div>
      <div className="col-start-8 col-end-content-end flex flex-col gap-4">
        <h2 className="text-3xl font-display font-variation-bold leading-none lowercase text-fern-1100 m-0">
          What you can expect
        </h2>
        {posts.map((post) => (
          <Card size="small" frontmatter={post} key={post.id} />
        ))}
      </div>
    </article>
  )
}
