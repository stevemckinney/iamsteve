import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <>
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
              I’m Steve McKinney, I write this blog about the design and build of websites. My main
              aim is to teach you how to implement your designs as you intend. With this I cover a
              mixture of how to design visually appealing websites and building them with
              maintainable CSS.
            </p>

            <p className="mb4 f3-l">
              What drives my writing is hearing things like “you can’t expect your designs to look
              the same as they do in <em>design app</em>”. And while that comes from a good place,
              it’s a free ride to forgive things like spacing inconsistencies, not adding visual
              flourishes and avoiding refinements for your responsive breakpoints.
            </p>

            <h3 className="f2-l mb2 pt2">Who is this for?</h3>
            <p className="mb4 f3-l">
              Either you’re a developer wanting to improve their visual design skills, or a designer
              with some coding experience. You’re someone who understands the value of not only good
              design, but the requirement of making it look visually appealing too. Through sharing
              what I know and continue to learn, I hope to meet this need.
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
                My vision for this website is to; teach in depth ‘web’ related design topics. Help
                you understand why and develop your own rationale. Using Illustrator and CSS as the
                core tools.
              </p>
            </blockquote>

            <h2 className="f2 mb2 pt6">A mixture of practical tutorials and tips</h2>

            <p className="mb4 f3-l">
              I aim to make no assumptions, as you can find yourself wanting the ‘why’. That
              rationale can help you to understand better and begin to form your own opinions, or
              provide references to research further. However, with this in mind, I do feel each
              tutorial is around an intermediate level.
            </p>

            <p className="mb4 f3-l">
              With the vast majority of tutorials focused around Illustrator it obviously means
              other applications do appear to be excluded. Designs should always be possible to
              replicate, but this is something I am aware of.
            </p>

            <p className="mb4 f3-l">
              Some tutorials will feature CSS (using SCSS), and some will feature JavaScript. There
              are a mixture of articles from quick tips, to in depth design tutorials.
            </p>

            <p className="mb4 f3-l">
              The aim is to help improve workflow efficiency and build up visual design skill. Code
              adds additional justification and is usually the best way to communicate extra
              details.
            </p>

            <p className="mb4 f3-l">
              There’s a lot of decisions that get missed, because they’re routine as a designer. I
              want to communicate these decisions to both developers and designers to bridge that
              gap.
            </p>

            <p className="mb4 f3-l">
              I&#8217;m certainly still figuring things out, but with a vision in mind I can work
              towards my goal.
            </p>
          </article>

          <aside className="blockquote">
            <p className="f3 f2-b f4 mb0">
              You may be interested in what the site is built with and the tools I use. You can find
              those on{' '}
              <a href="{site_url}uses" className="link">
                the uses page
              </a>
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
              I’m a designer based in Manchester. I specialise in visual design and user experience
              for websites. I’ve been doing this professionally for over eight years. I’ve worked
              with a large variety of clients in differing industries. With differing needs, shops,
              subscriptions, services and marketing.
            </p>

            <p className="mb4 f3-l">
              I enjoy being involved along the whole timeline of a project. The earlier the better,
              I’m someone who likes to get the best understanding possible. This not only helps me
              provide the best solution and justification for the work but build trust. When a
              designer isn’t able to build trust with the client, it results in unnecessary
              revisions and a feeling of not being understood.
            </p>

            <p className="mb4 f3-l">
              Personally, I’ve been doing this since I was a kid. In which I’ve always deemed myself
              a “web designer” but that’s like calling yourself a webmaster these days. I sit
              somewhere in the middle of being a visual designer and UX designer. Anyway, I’m
              someone who has always designed websites with the intention of being usable and
              visually appealing.
            </p>

            <p className="mb4 f3-l">
              Starting at a young age has given me an advantage, as I learnt to code alongside
              designing. I saw it as part of the process, should designers code wasn’t a thing when
              I was 13. I have found there is mixed opinions on my skill from this, I don’t see
              myself as a “designer who knows a bit of code” or a “front end developer who knows a
              bit of design”.
            </p>

            <p className="mb4 f3-l">
              I do have a personal style, however, I will always design for the audience and goals
              in mind. It’s important the user is put first, as they are the ones who are buying or
              using your service. I know it’s a balance nonetheless.
            </p>

            <p className="mb4 f3-l">
              I enjoy drawing, illustration and hand lettering. I also have a bit of knack for
              website performance and this website serves as a way I can try out techniques. I’m
              also a dog lover, if it wasn’t obvious, see the logo, the illustrations in the footer
              and some article images… everywhere.
            </p>
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
                src="/static/images/blog/about/v1_2x.jpg"
                width={480}
                height={400}
                alt=""
                className="radius mb2"
              />
              <figcaption>Version one, 2009.</figcaption>
            </figure>

            <figure className="old-design mb6">
              <Image
                src="/static/images/blog/about/v2_2x.jpg"
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
                src="/static/images/blog/about/v3_2x.jpg"
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
                src="/static/images/blog/Linkbout/v4_2x.jpg"
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
                src="/static/images/blog/about/iamsteve-v5.png"
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
