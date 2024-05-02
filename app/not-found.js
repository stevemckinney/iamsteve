import Link from '@/components/link'
import Button from '@/components/button'

export default function NotFound() {
  return (
    <div className="grid grid-cols-subgrid col-container flex flex-col relative frame frame-24 lg:frame-40 lg:frame-outset-top-md 2xl:frame-outset-top py-12 lg:pt-10 lg:pb-[5.5rem] gap-y-4 max-lg:px-4 pt-12 pb-16 flex flex-col gap-8 mb-10 md:mb-18">
      <h1 className="col-content text-7xl font-variation-extrabold font-display text-fern-1100">
        404
      </h1>
      <p className="col-content mb-2 text-ui-body max-w-prose">
        There’s a chance you’re here because a redirect went wrong or I guess
        you’ve made a typo, no problem. If you believe the page should be here,
        please{' '}
        <Link href="/contact" className="text-underline">
          contact me
        </Link>
        .
      </p>
      <Button
        href="/"
        theme="dandelion"
        className="col-content max-w-[max-content] self-start flex-auto"
      >
        Back to homepage
      </Button>
    </div>
  )
}
