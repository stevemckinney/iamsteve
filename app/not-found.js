import Link from '@/components/link'

export default function NotFound() {
  return (
    <div className="col-content pt-12 pb-8 flex flex-col gap-8">
      <h1 className="text-7xl font-variation-extrabold font-display text-fern-1100">
        404
      </h1>
      <p className="mb-2 text-ui-body max-w-prose">
        There’s a chance you’re here because a redirect went wrong or I guess
        you’ve made a typo, no problem. If you believe the page should be here,
        please <Link href="/contact">contact me</Link>.
      </p>
      <Link
        href="/"
        className="button-dandelion font-ui text-base/snug lowercase text-dandelion-800 text-center bg-dandelion-300 rounded-sm transition duration-200 shadow-placed hover:shadow-picked px-8 py-3 flex-auto [--ui-border-color:theme(colors.dandelion.600)] self-start"
      >
        Back to homepage
      </Link>
    </div>
  )
}
