import './global.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import siteMetadata from '@/content/metadata'

import Header from '@/components/header'
import Sprite16 from '@/components/icon/sprite-16'
import Sprite24 from '@/components/icon/sprite-24'
import Logo from '@/components/icon/logo'
import Icon from '@/components/icon'
import Link from '@/components/link'
import FooterProfile from '@/components/footer-profile'

export const metadata = {
  metadataBase: new URL('https://iamsteve.me'),
  short_title: 'iamsteve',
  title: {
    default: 'iamsteve • design & code blog',
    template: '%s • iamsteve',
  },
  description:
    'Tips and tutorials about the design and build of web interfaces.',
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'iamsteve • design & code blog',
    description:
      'Tips and tutorials about the design and build of web interfaces.',
    url: './',
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
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteMetadata.siteUrl}/#organization`,
      name: 'iamsteve',
      url: `${siteMetadata.siteUrl}`,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}/images/logo.svg`,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteMetadata.siteUrl}/#website`,
      url: `${siteMetadata.siteUrl}`,
      name: 'iamsteve',
      description:
        'Tips and tutorials about the design and build of web interfaces.',
      publisher: {
        '@id': `${siteMetadata.siteUrl}/#organization`,
      },
    },
    {
      '@type': 'Person',
      '@id': `${siteMetadata.siteUrl}/#person`,
      name: 'Steve McKinney',
      url: 'https://iamsteve.me',
      sameAs: [
        'https://twitter.com/irsteve',
        'https://instagram.com/stevemckinney',
        'https://uk.linkedin.com/in/steve-mckinney-5b5836102',
      ],
      homeLocation: {
        '@type': 'City',
        name: 'Manchester',
      },
      jobTitle: 'User interface designer',
      worksFor: {
        '@id': `${siteMetadata.siteUrl}/#organization`,
      },
    },
  ],
}

export const viewport = {
  themeColor: 'rgb(241 232 228)', //'rgb(241 232 228)',
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
      className="light"
      style={{ colorScheme: 'light' }}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="iamsteve" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-title" content="iamsteve" />
        <meta name="mobile-web-app-capable" content="yes" />
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
        className={`antialiased overflow-x-clip min-w-screen min-h-screen bg-[url(/images/texture.png)] bg-[172px_auto] bg-blend-multiply bg-neutral-01-150 text-fern-1100 pt-[env(safe-area-inset-top,0)]`}
      >
        <Sprite16 />
        <Sprite24 />
        <Logo />
        <div className="grid layout relative gap-x-4 xl:gap-x-6 2xl:gap-x-8 max-w-[1728px] mx-auto items-baseline">
          <ModeToggle />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Header />
            {children}
            <FooterProfile />
            <footer className="col-content flex flex-col max-md:items-center md:flex-row gap-8 pt-18 pb-18 md:py-18">
              <p className="flex flex-1 max-md:flex-col max-md:items-center gap-1 text-balance text-center">
                <Icon icon="bee" /> Designed in Manchester using Figma & Next.js
              </p>
              <ul className="flex gap-8">
                <li>
                  <Link
                    href="#top"
                    className="text-fern-1100 hover:text-dandelion-600 transition duration-200 ease-linear"
                  >
                    Top
                  </Link>
                </li>
                <li>
                  <Link
                    href="/feed.xml"
                    className="text-fern-1100 hover:text-dandelion-600 transition duration-200 ease-linear"
                  >
                    RSS
                  </Link>
                </li>
                <li>
                  <p className="text-ui-body">
                    {`©`}{' '}
                    <Link
                      href="/"
                      className="text-ui-body hover:text-dandelion-600 transition duration-200 ease-linear"
                    >
                      {siteMetadata.title}
                    </Link>{' '}
                    {`${new Date().getFullYear()}`}
                  </p>
                </li>
              </ul>
            </footer>
            <div className="col-container relative -top-4 pb-24 flex flex-row items-center gap-8">
              <span
                className="flex-1 bg-[url(/images/dash.svg)] h-[2px]"
                aria-hidden="true"
              />
              <Icon icon="logo" className="text-fern-1100" size={32} />
              <span
                className="flex-1 bg-[url(/images/dash.svg)] h-[2px]"
                aria-hidden="true"
              />
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
