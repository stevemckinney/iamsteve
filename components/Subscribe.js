import Image from 'next/image'
import NewsletterForm from '@/components/NewsletterForm'

const Subscribe = ({ title = 'Subscribe to the newsletter', theme = 'cool' }) => {
  return (
    <section
      className={`row row-${theme} row-padding between items-center contain contain-medium contain-large subscribe`}
    >
      <div className="column column-4-b mb4 mb0-b subscribe-image">
        <Image
          src="/static/images/subscribe.svg"
          alt="true"
          role="presentation"
          width={488}
          height={336}
        />
      </div>
      <div className="column column-6-b column-4-d">
        <h2 className="f1-l chunky secondary mb2 mb4-b">Get the articles</h2>
        <p className="mb2">
          <strong>It’s my aim to help you be a better designer</strong>. Join my monthly<em>ish</em>{' '}
          email list and I’ll send new tutorials to help you design & code beautiful websites.
        </p>
        <p className="mb4">
          I also do the occasional design critique, which you get access to for being a
          subscriber—send a design through after subscribing. Also, there’s some older templates and
          post files included. You can unsubscribe anytime.
        </p>
        <NewsletterForm theme={`form-${theme}`} />
      </div>
    </section>
  )
}

export default Subscribe
