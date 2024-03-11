const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')
const siteMetadata = require('../content/metadata')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'app/*.js',
    'content/blog/**/*.mdx',
    'content/blog/**/*.md',
    'public/tag/**/*.xml',
    'public/category/**/*.xml',
    '!app/layout.js',
    '!app/sitemap.js',
    '!app/not-found.js',
    '!app/_*.js',
    '!app/api',
    '!global.css',
    '!robots.txt',
    '!favicon.ico',
    '!node_modules/**/*',
    '!public/**/*',
  ])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('app/page.js', '/')
                  .replace('content/pages/', '/')
                  .replace(/^(content\/blog\/)(?:\d{4}-)?/, '$1')
                  .replace('content/blog', '/blog')
                  .replace('public/', '/')
                  .replace('.js', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '')
                  .replace(/\/index$/, '')
                const route = path === '/index' ? '' : path

                var stats = fs.statSync(page)
                var mtime = stats.mtime

                if (
                  page === `app/404.js` ||
                  page === `app/blog/[...slug].js` ||
                  page === `app/[...slug]/page.js`
                ) {
                  return
                }
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route.replace(
                  /^(blog\/)(?:\d{4}-)?/,
                  '$1'
                )}</loc>
                            <lastmod>${mtime}</lastmod>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
