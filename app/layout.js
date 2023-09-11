import './global.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import siteMetadata from '@/content/siteMetadata'

import Header from '@/components/header'
import Sprite from '@/components/icon/sprite'
import Subscribe from '@/components/subscribe'
import Icon from '@/components/icon'
import Link from '@/components/link'

export const metadata = {
  metadataBase: new URL('https://iamsteve.me'),
  title: {
    default: 'iamsteve • design & code blog',
    template: '%s • iamsteve',
  },
  description: 'Tips and tutorials about the design and build of web interfaces.',
  openGraph: {
    title: 'iamsteve • design & code blog',
    description: 'Tips and tutorials about the design and build of web interfaces.',
    url: 'https://iamsteve.me',
    siteName: 'iamsteve',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    title: 'iamsteve.me • design & code blog',
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bvl2qse.css" />
      </head>
      <body
        className={`antialiased min-h-screen bg-neutral-01-100 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-x-hidden grid layout gap-x-8`}
      >
        <Sprite />
        <ModeToggle />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <main className="grid grid-cols-subgrid col-start-margin-start col-end-margin-end gap-y-18 pb-18">
            {children}
          </main>
          <aside className="grid grid-cols-subgrid gap-y-18 col-start-container-start col-end-container-end  rounded-xl bg-white shadow-picked py-32">
            <Subscribe className="flex justify-between col-start-content-start col-end-content-end items-end" />
            <hr className="col-content bg-rule h-[2px] border-0" />
            <div className="col-start-content-start col-span-5">
              <Icon icon="logo" className="text-fern-1100 mb-2" size={32} />
              <h3 className="font-display font-variation-bold text-xl lowercase mb-1">
                Thanks for reading
              </h3>
              <p className="text-ui-body text-base mb-2">
                Hi, I’m Steve McKinney, I write this publication focusing on the design and build of
                websites. The aim is to bridge the gap between Figma and building your design.
              </p>
              <p className="text-ui-body text-base">
                And explore the craft and technique behind creating websites. It started—and
                remains—a way to encourage self learning and sharing what I know.
              </p>
            </div>

            <div className="col-start-10 col-span-5 flex flex-row gap-8">
              <div className="list flex-1">
                <h3 className="font-display font-variation-bold text-xl lowercase">Site</h3>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      href="/blog"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="folder" /> Archive
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/design"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="pen" /> Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/code"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="code" /> Code
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/uses"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="settings" /> Uses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="person" /> About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="envelope" /> Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/newsletter"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="airplane" /> Newsletter
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="list flex-1">
                <h3 className="font-display font-variation-bold text-xl lowercase">Elsewhere</h3>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      href="x.com/irsteve"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="x" /> x.com
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="x.com/irsteve"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="figma" /> Figma
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="x.com/irsteve"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="github" /> Github
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="x.com/irsteve"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="linkedin" /> Linkedin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="x.com/irsteve"
                      className="flex flex-row gap-2 py-1 text-base font-ui text-ui-body lowercase"
                    >
                      <Icon icon="mastodon" /> Mastodon
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
          <footer className="col-content flex flex-row gap-8 py-12">
            <p className="flex flex-1 flex-row gap-1">
              <Icon icon="bee" /> Designed in Manchester using Figma & Next.js
            </p>
            <Link href="#top">Top</Link>
            <Link href="/feed.xml">RSS</Link>
            <p className="text-ui-body">
              {`©`} <Link href="/">{siteMetadata.title}</Link> {`${new Date().getFullYear()}`}
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
