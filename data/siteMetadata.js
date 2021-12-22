const siteMetadata = {
  title: 'iamsteve',
  author: 'Steve',
  headerTitle: 'iamsteve',
  description: 'Design and code blog',
  language: 'en-gb',
  theme: 'light',
  siteUrl: 'https://iamsteve.me',
  siteRepo: 'https://github.com/stevemckinney/iamsteve',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'steve@iamsteve.me',
  github: 'https://github.com/stevemckinney',
  twitter: 'https://twitter.com/irsteve',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com',
  locale: 'en-GB',
  analytics: {
    // supports plausible, simpleAnalytics or googleAnalytics
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit
    // Please add your .env file and modify it according to your selection
    provider: 'emailoctopus',
  },
}

module.exports = siteMetadata
