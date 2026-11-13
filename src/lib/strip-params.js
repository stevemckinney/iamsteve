// proxy.js answers a request carrying a tracking parameter with a 301 that
// drops just those parameters and keeps the rest of the query
// (/?utm_source=x&a=1 goes to /?a=1). A route in vercel.json can’t, as
// Vercel copies the request’s query onto a route’s Location, so the
// redirect would loop. The routes send those requests to a small function
// instead, and this integration writes it after each build, with the
// parameters the routes name
import fs from 'node:fs'

const source = (params) => `const params = ${JSON.stringify(params)}

export default {
  fetch(request) {
    const url = new URL(request.url)
    for (const param of params) url.searchParams.delete(param)
    return new Response(null, {
      status: 301,
      headers: { location: url.pathname + url.search },
    })
  },
}
`

export default function stripParams() {
  let root
  return {
    name: 'strip-params',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = config.root
      },
      'astro:build:done': () => {
        const { routes } = JSON.parse(
          fs.readFileSync(new URL('vercel.json', root), 'utf8')
        )
        const params = routes
          .filter((route) => route.dest === '_strip')
          .flatMap((route) => route.has.map(({ key }) => key))
        // Astro runs the adapter’s hooks first, so its function is there,
        // with the runtime it picked from the Node.js version
        const functions = new URL('.vercel/output/functions/', root)
        const { runtime } = JSON.parse(
          fs.readFileSync(
            new URL('_render.func/.vc-config.json', functions),
            'utf8'
          )
        )
        const folder = new URL('_strip.func/', functions)
        fs.mkdirSync(folder, { recursive: true })
        fs.writeFileSync(new URL('index.mjs', folder), source(params))
        fs.writeFileSync(
          new URL('.vc-config.json', folder),
          JSON.stringify({
            runtime,
            handler: 'index.mjs',
            launcherType: 'Nodejs',
          })
        )
      },
    },
  }
}
