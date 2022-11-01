const WufooForm = require('react-wufoo-embed')
import Social from '@/components/Social'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function Contact() {
  return (
    <>
      <PageSEO title={`Uses • ${siteMetadata.title}`} description={siteMetadata.description} />
      <div className="row subheader center contain contain-medium contain-large pb4">
        <h1 className="f4 f3-b f2-d warm mb0 text-center">Uses</h1>
      </div>

      <div className="contain">
        <div className="measure m-center pt4 pt6-d pb4 pb6-d">
          <p className="mb6">
            Everything (almost) I use associated with this website and my day to day work.
          </p>
          <section className="column mb6">
            <h2 className="f4 mb2">Design</h2>
            <dl className="f4">
              <dt>Figma</dt>
              <dd className="mb2">
                I use this for the majority of design work. Managing components and libraries,
                prototyping and sharing is by far the best in my opinion.
              </dd>
              <dt>Illustrator</dt>
              <dd className="mb2">
                I will always stand by Illustrator. It can’t be beaten for vector editing.
              </dd>
              <dt>Photoshop</dt>
              <dd className="mb2">
                For all the things Illustrator and Figma can’t do—which now is mostly photo editing.
              </dd>
              <dt>xScope</dt>
              <dd className="mb2">
                So many handy little tools that help designing. Rulers, colour blindness testing,
                etc. As well as the companion app xScope mirror.
              </dd>
              <dt>Sip</dt>
              <dd className="mb2">
                A real conveient way to pick colours and manage colour palettes.
              </dd>
              <dt>PixelSnap</dt>
              <dd className="mb2">
                Another convenient app, it’s super smart at getting the dimensions of objects.
              </dd>
            </dl>
          </section>
          <section className="column mb6">
            <h2 className="f4 mb2">Code</h2>
            <dl className="f4">
              <dt>Nova</dt>
              <dd className="mb2">
                I write all code in Nova, nothing beats a Panic app for quality. I like vscode but
                not the clunky side of it.
              </dd>
              <dt>Dash</dt>
              <dd className="mb2">
                An easy and convenient way to search documentation for pretty much every language.
              </dd>
              <dt>Apple Terminal</dt>
              <dd className="mb2">
                I use the{' '}
                <a
                  href="https://twitter.com/panic/status/558389225612005376?lang=en-gb"
                  className="secondary-hover link"
                >
                  Panic Palette
                </a>{' '}
                and zsh (using{' '}
                <a href="http://ohmyz.sh" className="secondary-hover link">
                  ohmyzsh
                </a>
                ).
              </dd>
              <dt>Git</dt>
              <dd className="mb0">
                I tend to use git through the Github desktop app and terminal.
              </dd>
            </dl>
          </section>
          <section className="column mb6">
            <h2 className="f4 mb2">Utility</h2>
            <dl className="f4">
              <dt>One Switch</dt>
              <dd className="mb2">For all of the switches that control centre can’t do.</dd>
              <dt>Gifox (gif recording)</dt>
              <dd className="mb2">
                A nice menu bar app for recording gifs. I use this to demonstrate things quickly in
                my posts.
              </dd>
              <dt>
                <a href="https://www.culturedcode.com/things/" className="secondary-hover">
                  Things
                </a>
              </dt>
              <dd className="mb2">
                Like Coda, I’ve been a long time user of Things. It’s the GTD (get things done) way
                of working I like about it, as I’m not that organised. It’s also wonderfully
                designed.
              </dd>
              <dt>
                <a href="https://ia.net/writer/" className="secondary-hover">
                  iA Writer
                </a>
              </dt>
              <dd className="mb2">
                A simple markdown editor. All posts start here then are copied and pasted into the
                CMS. Syncs with iCloud so I can write anywhere.
              </dd>
              <dt>Dropbox</dt>
              <dd className="mb2">
                Keeping all my valuable files backed up and accessible anywhere.
              </dd>
              <dt>Alfred</dt>
              <dd className="mb2">
                A spotlight replacement for Mac, with loads of handy features and workflows.
              </dd>
            </dl>
          </section>
          <section className="column">
            <h2 className="f4 mb2">Site</h2>
            <dl className="f4">
              <dt>
                <a
                  href="https://www.thedesignersfoundry.com/products/averta-standard"
                  className="secondary-hover"
                >
                  Averta from TDF
                </a>
              </dt>
              <dd className="mb2">I use Averta for headings.</dd>
              <dt>
                <a href="https://typekit.com/fonts/freight-text" className="secondary-hover">
                  Freight Text Pro from Tyepkit
                </a>
              </dt>
              <dd className="mb2">I use Freight Text Pro for body copy.</dd>
              <dt>Next.js</dt>
              <dd className="mb2">
                I finally moved this site to a static site generator. I chose Next as I felt it
                would be better suited for a blog over the likes of Gatsby—albeit I’m not 100% sure
                this is true still.
              </dd>
              <dt>Netlify</dt>
              <dd className="mb0">
                One of the biggest reasons I use a static site generator is to take advantage of
                hosts like Netlify. It’s a one stop solution for hosting your website and it makes
                everything a dream.
              </dd>
            </dl>
          </section>
        </div>
      </div>
    </>
  )
}
