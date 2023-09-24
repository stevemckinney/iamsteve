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
          <FooterProfile />
          <footer className="col-content flex flex-row gap-8 py-18">
            <p className="flex flex-1 flex-row gap-1">
              <Icon icon="bee" /> Designed in Manchester using Figma & Next.js
            </p>
            <Link href="#top">Top</Link>
            <Link href="/feed.xml">RSS</Link>
            <p className="text-ui-body">
              {`©`} <Link href="/">{siteMetadata.title}</Link>{' '}
              {`${new Date().getFullYear()}`}
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
