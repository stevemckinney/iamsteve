import Image from '@/components/image'
import { Header, Title } from '@/components/page'
import Notepad from '@/components/notepad'
import Newsletter from '@/components/newsletter'
import Card from '@/components/card'
import Campaigns from './campaigns'
import ErrorBoundary from '@/components/error-boundary'
import { allPosts } from 'contentlayer/generated'
export const revalidate = 2592000

export default async function NewsletterPage({ data, Post }) {
  const includedPosts = [165, 164, 72, 157, 160]
  const posts = allPosts
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
      <article className="grid grid-cols-subgrid col-content pb-18 gap-y-18">
        <Header className="col-content">
          <Title>Newsletter</Title>
          {/* <p className="text-2xl text-ui-body max-w-[34ch]">
            Get notified when new articles are published
          </p> */}
        </Header>
        <div className="col-start-content-start max-lg:col-end-content-end lg:col-span-5 xl:col-span-7 2xl:col-span-6 flex flex-col gap-8">
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
              <ErrorBoundary>
                <Newsletter />
              </ErrorBoundary>
            </div>
          </section>
          <Notepad>
            <Notepad.Header>Previous issues</Notepad.Header>
            <Notepad.Body>
              <Campaigns />
            </Notepad.Body>
          </Notepad>
        </div>
        <div className="col-start-content-start col-end-content-end lg:col-start-6 xl:col-start-9 2xl:col-start-8 flex flex-col gap-4">
          <h2 className="text-3xl font-display font-variation-bold leading-none lowercase text-fern-1100 m-0">
            What you can expect
          </h2>
          {posts.map((post) => (
            <Card size="small" frontmatter={post} key={post.id} />
          ))}
        </div>
      </article>
    </>
  )
}
