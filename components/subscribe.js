import Image from 'next/image'
import NewsletterForm from '@/components/newsletter-form'

const Subscribe = ({
  title = 'Get the articles',
  className,
  unique = 'footer',
}) => {
  return (
    <section className={`${className}`}>
      <div className="flex flex-col gap-2 lg:gap-4 w-full max-lg:col-end-content-end col-start-content-start col-span-6 2xl:col-span-5">
        <Image
          src="/images/illustration/spot/envelope.svg"
          width={96}
          height={96}
          className="max-lg:w-[48px] max-lg:h-[48px] drop-shadow-placed"
          alt="Illustration of a sealed envelope"
          role="presentation"
        />
        <h2 className="text-2xl lg:text-5xl font-display font-variation-bold lowercase fern-1100">
          {title}
        </h2>
        <p className="m-0 text-base text-ui-body">
          Join my email list and I’ll notify you when the latest posts go out—if
          that’s what you prefer. This happens monthly at most. You can
          unsubscribe anytime.
        </p>
      </div>
      <div className="col-content lg:col-start-7 2xl:col-start-8 lg:col-end-content-end">
        <NewsletterForm unique={unique} />
      </div>
    </section>
  )
}

export default Subscribe
