const WufooForm = require('react-wufoo-embed')
import Image from 'next/image'
import Social from '@/components/Social'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function Contact() {
  return (
    <>
      <PageSEO title={`Contact • ${siteMetadata.title}`} description={siteMetadata.description} />
      <div className="row subheader center contain contain-medium contain-large pb4">
        <h1 className="f2-l warm mb0 text-center">Contact</h1>
      </div>

      <div className="row row-normal row-padding between contain contain-medium contain-large m-center">
        <article className="column column-4-b mb4 mb0-b">
          <h2 className="f3-l mb2">Feedback</h2>
          <p className="mb4">
            Feedback is really helpful, as I will be able to improve posts further. It also helps me
            to focus on the right topics. If you have any feedback or suggestions, I’ll be grateful
            for you taking the time.
          </p>
          <h2 className="f4-l mb2">Issues with a post</h2>
          <p className="mb2">
            If you’re stuck with a post, I’ll be happy to <em>steer</em> you in the right direction.
            The following will help speed things up:
          </p>
          <ul className="list-custom-bullet list-nudge mb4 f4-l">
            <li>Describe the problem</li>
            <li>What you’re trying to achieve</li>
            <li>
              If it’s code related{' '}
              <a href="https://codepen.io/pen/" className="link">
                make a CodePen
              </a>
            </li>
            <li>Provide any links to work so I can see errors</li>
            <li>
              <strong>Don’t</strong> send login details by email
            </li>
          </ul>
          <h2 className="f3-l mb2">Promoting</h2>
          <p className="mb4">
            If you’re trying to promote a product, service or build links, it’s very unlikely it’s
            relevant (based upon previous experience). I encourage you to think twice about sending
            a message. I don’t take readers time & attention for granted.
          </p>
          <h2 className="f3-l mb2">Hiring me</h2>
          <p className="mb4">
            I’m not available to take on any projects at the moment. However, if you do feel it may
            be something of interest, feel free to send a message.
          </p>
          <h2 className="f3-l mb2">Find me elsewhere</h2>
          <p className="mb0">
            <Social />
          </p>
        </article>
        <article className="column column-4-b">
          <h2 className="f3-l mb2">Send a message</h2>
          <p className="mb4">
            I <em>aim</em> to respond to every email. I welcome feedback, things you’ve made and
            questions. For any reason, if you do not receive a reply, it’s possible something has
            gone wrong&thinsp;—&thinsp;so feel free to try again.
          </p>
          <WufooForm userName="stevemckinney" formHash="s1i8dkdm0llchoe" />
        </article>
      </div>
    </>
  )
}
