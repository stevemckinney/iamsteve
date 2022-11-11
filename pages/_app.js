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

// fonts
import localFont from '@next/font/local'

// Font files can be colocated inside of `pages`
// avertastd-bold-webfont.woff2
// avertastd-semibold-webfont.woff2
// avertastd-regularitalic-webfont.woff2
// avertastd-regular-webfont.woff2
const Averta = localFont({
  src: [
    {
      path: '@/public/static/fonts/averta/avertastd-regular-webfont.woff2',
      weight: 400,
    },
    {
      path: '@/public/static/fonts/averta/avertastd-regularitalic-webfont.woff2',
      style: 'italic',
      weight: 400,
    },
    {
      path: '@/public/static/fonts/averta/avertastd-semibold-webfont.woff2',
      weight: 600,
    },
    {
      path: '@/public/static/fonts/averta/avertastd-bold-webfont.woff2',
      weight: 700,
    }
  ],
  variable: '--font-heading'
})

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <LayoutWrapper>{page}</LayoutWrapper>)

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, viewport-fit=cover, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="stylesheet" href="https://use.typekit.net/jqc3tao.css" />
      </Head>
      <style jsx global>{`
        :root {
          --font-heading: ${Averta.style.fontFamily};
        }
      `}</style>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}
