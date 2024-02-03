import Image from 'next/image'
import NewsletterForm from '@/components/newsletter-form'

const Subscribe = ({
  title = 'Get the articles',
  className,
  unique = 'footer',
}) => {
  return (
    <section className={`${className} flex flex-col items-center gap-8`}>
      <header className={`flex flex-col gap-2 items-center`}>
        <Image
          src="/images/illustration/spot/envelope.svg"
          width={96}
          height={96}
          alt="Illustration of a sealed envelope"
          className="mb-2"
        />
        <h2 className="text-3xl sm:text-5xl font-display font-variation-bold lowercase text-fern-1100 text-center">
          {title}
        </h2>
        <p className="m-0 text-base text-ui-body text-balance text-center max-w-[55ch]">
          Join the RSS alternative and I’ll notify you when the latest posts go
          out. Unsubscribe at anytime.
        </p>
      </header>
      <NewsletterForm unique={unique} />
      <p className="text-ui-body text-balance text-sm text-center max-w-[55ch]">
        You will receive two emails to begin with. One to confirm your
        subscription and then your welcome email—thanks in advance!
      </p>
    </section>
  )
}

export default Subscribe
