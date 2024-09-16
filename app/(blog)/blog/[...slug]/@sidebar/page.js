import { getPostFromParams } from '@/lib/utils/content'
import TableOfContents from '@/components/table-of-contents'
import NewsletterForm from '@/components/newsletter-form'

export default async function Sidebar({ params }) {
  const post = await getPostFromParams(params)

  if (!post) {
    return null
  }

  return (
    <aside className="max-lg:col-container lg:col-start-10 lg:col-span-2 xl:col-start-12 lg:row-span-5 xl:col-span-3 lg:h-screen lg:overflow-y-scroll sticky z-10 top-0 bottom-0 lg:right-0 lg:py-12 lg:-mt-12 flex flex-col lg:gap-12 lg:pb-16 lg:px-6 lg:-mx-6 lg:[mask-image:linear-gradient(180deg,transparent,_#000_64px,#000_calc(100%_-_10vh),_transparent)]">
      <section
        className="flex flex-col gap-2 relative"
        aria-labelledby="aside-contents"
      >
        {/* Mobile table of contents */}
        <div className="lg:hidden" aria-hidden="true">
          <TableOfContents headings={post.headings} />
        </div>

        {/* Desktop table of contents */}
        <div className="hidden lg:block">
          <TableOfContents headings={post.headings} open />
        </div>
      </section>
      <section
        className="flex flex-col gap-2 pb-12 max-lg:hidden"
        aria-labelledby="aside-subscribe"
      >
        <h2 className="font-bold" id="aside-subscribe">
          Subscribe
        </h2>
        <p className="mb-4">
          Get notified when the latest posts go out. Unsubscribe anytime.
        </p>
        <NewsletterForm />
      </section>
    </aside>
  )
}
