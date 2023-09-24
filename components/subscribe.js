import Image from 'next/image'
import NewsletterForm from '@/components/newsletter-form'

const Subscribe = ({
  title = 'Get the articles',
  className,
  unique = 'footer',
}) => {
  return (
    <section className={`${className}`}>
      <div className="flex flex-col gap-4 w-[40.1315789474%]">
        <Image
          src="/images/illustration/spot/envelope.svg"
          width={96}
          height={96}
          className="drop-shadow-placed"
          alt="Illustration of a sealed envelope"
          role="presentation"
        />
        <h2 className="text-5xl font-display font-variation-bold lowercase fern-1100">
          {title}
        </h2>
        <p className="m-0 text-base text-ui-body">
          Join my email list and I’ll notify you when the latest posts go out—if
          that’s what you prefer. This happens monthly at most. You can
          unsubscribe anytime.
        </p>
      </div>
      <div className="w-[40.1315789474%]">
        <NewsletterForm unique={unique} />
      </div>
    </section>
  )
}

export default Subscribe
