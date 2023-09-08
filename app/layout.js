import './global.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'

import Header from '@/components/header'
import Sprite from '@/components/icon/sprite'

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
        className={`antialiased min-h-screen bg-neutral-01-100 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-x-hidden`}
      >
        <Sprite />
        <ModeToggle />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <main className="grid layout gap-x-8 gap-y-18">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
