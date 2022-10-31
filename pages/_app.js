import '/assets/sass/global.scss'
import '@/css/prism.css'

import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import Head from 'next/head'

import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, viewport-fit=cover, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="preload"
          href="/static/fonts/averta/avertastd-semibold-webfont.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/static/fonts/averta/avertastd-bold-webfont.woff2"
          as="font"
          crossOrigin=""
        />
        <link rel="stylesheet" href="https://use.typekit.net/jqc3tao.css" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper subtle="true">
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
