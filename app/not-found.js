import Link from '@/components/link'

export default function NotFound() {
  return (
    <div className="col-content pt-12 pb-16 flex flex-col gap-8">
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
        className="button-dandelion self-start font-ui text-base/snug lowercase text-dandelion-800 text-center bg-dandelion-300 active:bg-dandelion-400 rounded-sm transition duration-200 shadow-dandelion-placed hover:shadow-dandelion-picked active:shadow-dandelion-reduced px-8 py-3 flex-auto [--ui-border-color:theme(colors.dandelion.600)] [--ui-border-color-hover:theme(colors.dandelion.700)]"
      >
        Back to homepage
      </Link>
    </div>
  )
}
