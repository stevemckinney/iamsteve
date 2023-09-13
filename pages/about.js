// TODO: next/image, fix image dimensions
import Image from 'next/legacy/image'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function About() {
  return (
    <>
      <PageSEO title={`About • ${siteMetadata.title}`} description={siteMetadata.description} />
      <div className="row subheader between contain contain-medium contain-large pb4">
        <h1 className="f4 f3-b f2-d warm mb0 text-left">About</h1>
        <nav className="flex-auto flex end sans warm-l1 nav-in-page">
          <Link href="#site" className="warm-hover">
            Site
          </Link>
          <Link href="#examples" className="warm-hover">
            Examples
          </Link>
          <Link href="#author" className="warm-hover">
            Author
          </Link>
          <Link href="#history" className="warm-hover">
            History
          </Link>
        </nav>
      </div>

      <div className="contain">
        <div className="measure m-center pt6 pt7-d pb6">
          <article id="site" className="mb6">
            <h2 className="f1-l text-center m-center mb4 primary" style={{ maxWidth: '480px' }}>
              Building your designs&nbsp;shouldn’t be&nbsp;about&nbsp;compromise
            </h2>

            <p className="mb4 f3-l">
              I’m Steve McKinney, I write this blog about the design and build of websites. It’s a place to explore the craft of web design. From design through to code it’s all part of the design process.
            </p>

            <h3 className="f2-l mb2 pt2">Who is this for?</h3>
            <p className="mb4 f3-l">Either you’re a developer wanting to improve their visual design skills, or a designer with some coding experience. You’re someone who understands the value of not only good design, but the requirement of making it look visually appealing too. Through sharing what I know and continue to learn, I hope to meet this need.</p>

            <p className="mb4 f3-l">
              What drives my writing is hearing things like “you can’t expect your designs to look
              the same as they do in <em>design app</em>”. And while that comes from a good place, I
              find it avoids the visual polish every website needs.
            </p>
                
            <h3 className="f2-l mb2 pt2">It started out with writing weekly without an aim</h3>

            <p className="mb4 f3-l">
              I made the decision to start writing this blog <em>consistently</em> in January 2015.
              Every week, for two years, a blog post went out. I started out writing about anything
              I was interested in, as long as it was related to websites.
            </p>

            <p className="mb4 f3-l">
              It became clear to me over those two years, there was a lack of content focusing on
              the visual side of design.
            </p>

            <h3 className="f2-l mb2 pt2">Focusing on designing &amp; coding beautiful websites</h3>

            <p className="mb4 f3-l">
              I knew focusing on visual design would be a good start. I begun narrowing down to only
              designing with Illustrator and launched a redesign of the website. Things improved
              steadily, but I felt limited and ignoring a part of making websites.
            </p>

            <p className="mb4 f3-l">
              The thing being coding, at least the HTML and CSS part. Understanding how to build
              websites is part of my unique advantage.
            </p>

            <h3 className="f2-l mb2 pt2">A new goal to be able to work with in depth content</h3>

            <p className="mb4 f3-l">
              During the last few months of posting weekly, I thought about the focus of the website
              and taking a break. The realisation of posting weekly, with limited time, meant I
              couldn’t do certain posts. I wanted to change.
            </p>

            <blockquote className="mb4">
              <p className="f3 f2-b f4">
                My vision for this website is to; teach ‘web’ related design topics. Help you
                understand why and develop your own rationale.
              </p>
            </blockquote>

            <h2 className="f2 mb2 pt6">Changing aim over the years</h2>

            <p className="mb4 f3-l">I made a decision to start writing this blog <em>consistently</em> in January 2015. Every week, for two years, a blog post went out. I started out writing about anything I was interested in, as long as it was related to websites.</p>

            <p className="mb4 f3-l">It became clear to me over those two years, there was a lack of content focusing on the visual side of design. It’s tough to teach, that’s why, or maybe that’s just me.</p>

            <p className="mb4 f3-l">As a designer, it’s the thing I aspire to be best at. And having this website as a place to explore and challenge myself. Through an approach where I consider the decisions I’m making—some of these are routine but are valuable.</p>

            <p className="mb4 f3-l">I’ve accepted I’ll always be figuring things out, but with a vision in mind I can work towards my goal.</p>
          </article>

          <aside className="blockquote">
            <p className="f3 f2-b f4 mb0">
              You may be interested in what the site is built with and the tools I use. You can find
              those on{' '}
              <Link href="/uses" className="link">
                the uses page
              </Link>
              .
            </p>
          </aside>

          <article id="examples">
            <h2 className="f2 mb2 pt6">Best posts</h2>

            <p className="mb4 f3-l">
              These are a mixture of my most popular posts and what I believe are my best.
            </p>

            <ul className="list-custom-bullet list-nudge f3-l">
              <li>
                <Link href="/blog/creating-custom-stroke-width-profiles-in-illustrator">
                  Creating custom stroke width profiles in Illustrator
                </Link>
              </li>
              <li>
                <Link href="/blog/horizontal-scrolling-responsive-menu">
                  Creating a horizontal scrolling responsive menu
                </Link>
              </li>
              <li>
                <Link href="/blog/get-up-to-speed-with-css-shapes">
                  Get up to speed with CSS shapes
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-use-kerning-tracking">
                  How to use kerning &amp; tracking
                </Link>
              </li>
              <li>
                <Link href="/blog/a-guide-to-vertical-rhythm">A guide to vertical rhythm</Link>
              </li>
              <li>
                <Link href="/blog/search-overlay-with-smooth-reveal-animation">
                  Search overlay with smooth reveal animation
                </Link>
              </li>
            </ul>
          </article>

          <article id="author">
            <h2 className="f2 mb2 pt6">About me</h2>

            <p className="mb4 f3-l">
              I’m a designer based in Manchester. I specialise in visual design and user experience for websites. I’ve been doing this professionally for over 12 years. I’ve worked with a large variety of clients in differing industries. With differing needs, shops, subscriptions, services and marketing.
            </p>

            <p className="mb4 f3-l">I enjoy being involved along the whole timeline of a project. I’m someone who likes to get the best understanding possible and helps influence the solution. It helps build trust and avoids surprises. Looking at design end to end allows for decisions to be made quickly.</p>

            <p className="mb4 f3-l">Personally, I’ve been making websites from a young age. I learnt to code alongside designing—it was just part of the process. Debates like should designers code weren’t a thing when I was 13.</p>

            <p className="mb4 f3-l">As a designer, someone might ask if you have a personal style. I do feel I have a personal style, I enjoy serif typefaces, use of colour, an illustration style that has some depth but is generally flat. However, I will always design for the audience, goals and systems that are already in place.</p>

            <p className="mb4 f3-l">I think it’s an enjoyment of creating things on the web. Be it icons, animation, illustration, CSS or JavaScript.</p>
          </article>

          <article role="article" className="mb4 mb6-b" id="history">
            <h2 className="f2 mb2 pt6">Design history</h2>
            <p className="mb4 f3-l">
              Here is the design history of this website. Version two onwards I have written about.{' '}
              <a
                href="http://dribbble.com/stevemckinney/projects/10419-My-site"
                title="Previous versions of my site taking shape on Dribbble"
              >
                Dribbble
              </a>{' '}
              has some iterations of previous designs.
            </p>

            <figure className="old-design mb6">
              <Image
                src="/static/images/about/v1_2x.jpg"
                width={480}
                height={400}
                alt=""
                className="radius mb2"
              />
              <figcaption>Version one, 2009.</figcaption>
            </figure>

            <figure className="old-design mb6">
              <Image
                src="/static/images/about/v2_2x.jpg"
                width={480}
                height={400}
                alt=""
                className="radius mb2"
              />
              <figcaption>
                <Link href="/blog/redesign">Version two, 2010.</Link>
              </figcaption>
            </figure>

            <figure className="old-design mb6">
              <Image
                src="/static/images/about/v3_2x.jpg"
                width={480}
                height={400}
                alt=""
                className="radius mb2"
              />
              <figcaption>
                <Link href="/blog/about_the_redesign_v3">Version three, early 2011.</Link>
              </figcaption>
            </figure>

            <figure className="old-design mb6">
              <Image
                src="/static/images/about/v4_2x.jpg"
                width={480}
                height={400}
                alt=""
                className="radius mb2"
              />
              <figcaption>
                <Link href="/blog/about_version_4">Version four, mid 2011.</Link>
              </figcaption>
            </figure>

            <figure className="old-design mb6">
              <Image
                src="/static/images/about/iamsteve-v5.png"
                width={1440}
                height={1706}
                alt=""
                className="radius mb2"
              />
              <figcaption>
                <Link href="/blog/about_version_5">Version five, late 2012.</Link>
              </figcaption>
            </figure>
          </article>
        </div>
      </div>
    </>
  )
}
