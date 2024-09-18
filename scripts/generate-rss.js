const fs = require('fs')
const path = require('path')
const { generateFeed } = await import('../lib/utils/rss.mjs')

async function generateRssFeed() {
  const { rss, atom, json } = await generateFeed()

  fs.writeFileSync('./public/feed.xml', rss)
  fs.writeFileSync('./public/atom.xml', atom)
  fs.writeFileSync('./public/feed.json', json)
}

generateRssFeed()
