import './global.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import siteMetadata from '@/content/metadata'

import Header from '@/components/header'
import Sprite from '@/components/icon/sprite'
import Icon from '@/components/icon'
import Link from '@/components/link'
import FooterProfile from '@/components/footer-profile'

export const metadata = {
  metadataBase: new URL('https://iamsteve.me'),
  title: {
    default: 'iamsteve • design & code blog',
    template: '%s • iamsteve',
  },
  description:
    'Tips and tutorials about the design and build of web interfaces.',
  openGraph: {
    title: 'iamsteve • design & code blog',
    description:
      'Tips and tutorials about the design and build of web interfaces.',
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

const jsonLD = {
  '@context': 'http://schema.org',
  Organization: [
    {
      '@type': 'Organization',
      url: `${siteMetadata.siteUrl}`,
      logo: `${siteMetadata.siteUrl}/images/logo.svg`,
    },
  ],
}

export const viewport = {
  themeColor: 'black',
  'apple-mobile-web-app-status-bar-style': 'black-translucent',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
  shrinkToFit: 'no',
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="light overflow-x-hidden"
      style={{ colorScheme: 'light' }}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bvl2qse.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />
      </head>
      {/**
       * No gap-y-18 to create space between the footer because it throws off
       * the border alignment within the header
       */}
      <body
        className={`overflow-x-hidden antialiased min-w-screen min-h-screen bg-neutral-01-100 text-fern-1100 grid layout gap-x-4 md:gap-x-8 max-w-[1728px] mx-auto`}
      >
        <Sprite />
        <ModeToggle />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          {children}
          <FooterProfile />
          <footer className="col-content flex flex-col max-md:items-center md:flex-row gap-8 pt-18 pb-40 md:py-18">
            <p className="flex flex-1 max-md:flex-col max-md:items-center gap-1">
              <Icon icon="bee" /> Designed in Manchester using Figma & Next.js
            </p>
            <ul className="flex gap-8">
              <li>
                <Link
                  href="#top"
                  className="text-fern-1100 hover:text-dandelion-600 transition duration-200"
                >
                  Top
                </Link>
              </li>
              <li>
                <Link
                  href="/feed.xml"
                  className="text-fern-1100 hover:text-dandelion-600 transition duration-200"
                >
                  RSS
                </Link>
              </li>
              <li>
                <p className="text-ui-body">
                  {`©`}{' '}
                  <Link
                    href="/"
                    className="text-ui-body hover:text-dandelion-600 transition duration-200"
                  >
                    {siteMetadata.title}
                  </Link>{' '}
                  {`${new Date().getFullYear()}`}
                </p>
              </li>
            </ul>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
