import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" href="/static/favicons/apple-touch-icon.png" />
          <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#ff7e6d" />
          <meta name="msapplication-TileColor" content="#543243" />
          <meta name="theme-color" content="#543243" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body className="antialiased bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
