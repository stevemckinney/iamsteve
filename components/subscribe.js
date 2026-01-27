import { Envelope } from '@/components/illustration'
import ErrorBoundary from '@/components/error-boundary'
import Newsletter from '@/components/newsletter'

const Subscribe = ({
  title = 'Get the articles',
  className,
  unique = 'footer',
}) => {
  return (
    <section className={`${className} flex flex-col items-center gap-8`}>
      <header className={`flex flex-col gap-2 items-center`}>
        <Envelope width={96} height={96} className="mb-2 illo-cool" />
        <h2 className="text-3xl sm:text-5xl font-display font-variation-bold lowercase text-heading text-center">
          {title}
        </h2>
        <p className="m-0 text-base text-ui-body text-balance text-center max-w-[40ch]">
          Join the RSS alternative and I'll notify you when the latest posts go
          out. Unsubscribe at anytime.
        </p>
      </header>
      <ErrorBoundary>
        <Newsletter unique={unique} />
      </ErrorBoundary>
      <p className="text-ui-body text-balance text-sm text-center max-w-[55ch]">
        You will receive two emails to begin with. One to confirm your
        subscription and then your welcome email—thanks in advance!
      </p>
    </section>
  )
}

export default Subscribe
