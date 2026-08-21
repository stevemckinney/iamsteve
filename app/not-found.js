import Link from '@/components/link'
import Button from '@/components/button'
import { recoveryLinks } from '@/lib/agent/not-found'

export default function NotFound() {
  return (
    <div className="grid grid-cols-subgrid col-container flex flex-col relative gap-8 pb-7.5">
      <h1 className="col-content text-7xl font-variation-extrabold font-display text-heading">
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
        className="col-content max-w-max self-start flex-auto"
      >
        Back to homepage
      </Button>
      <section
        className="col-content flex flex-col gap-4"
        aria-labelledby="recovery"
      >
        <h2
          id="recovery"
          className="font-display text-heading text-2xl font-variation-bold lowercase"
        >
          Where to look next
        </h2>
        <ul className="flex flex-col gap-2 text-ui-body max-w-prose">
          {recoveryLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-underline">
                  {link.title}
                </Link>
                &thinsp;&mdash;&thinsp;{link.description}
              </li>
            ))}
        </ul>
      </section>
    </div>
  )
}
