#!/usr/bin/env node
/**
 * Serves the Vercel build output in .vercel/output on localhost, routed the
 * way Vercel routes it: the routes in config.json, the static files, then the
 * function for routes with prerender = false. The Vercel adapter has no
 * `astro preview`, so this stands in for it, for Playwright and for trying
 * endpoints by hand. vercel.json isn’t applied; phase 4 checks it on a
 * preview deployment.
 *
 *   node scripts/serve.mjs [--port 4321]
 *
 * The function reads its environment from .env and .env.local, as a build
 * does. Variables already set in the shell win.
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { Readable } from 'node:stream'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = path.join(ROOT, '.vercel/output')
const STATIC = path.join(OUTPUT, 'static')

const TYPES = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  json: 'application/json',
  xml: 'application/xml',
  txt: 'text/plain; charset=utf-8',
  md: 'text/markdown; charset=utf-8',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  ico: 'image/x-icon',
  mp4: 'video/mp4',
  webm: 'video/webm',
  woff: 'font/woff',
  woff2: 'font/woff2',
  pdf: 'application/pdf',
}

// A file in the static output for a path, as /about finds about/index.html
function staticFile(pathname) {
  let base
  try {
    base = path.join(STATIC, decodeURIComponent(pathname))
  } catch {
    return null
  }
  if (base !== STATIC && !base.startsWith(STATIC + path.sep)) return null
  for (const file of [base, path.join(base, 'index.html')]) {
    if (fs.statSync(file, { throwIfNoEntry: false })?.isFile()) return file
  }
  return null
}

function fileResponse(file, status, headers) {
  const extension = path.extname(file).slice(1).toLowerCase()
  return new Response(fs.readFileSync(file), {
    status,
    headers: {
      'content-type': TYPES[extension] ?? 'application/octet-stream',
      ...headers,
    },
  })
}

// Route headers (the immutable cache on /_astro, for example) go on every
// response the route matched, unless the response set its own
function withHeaders(response, headers) {
  const out = new Response(response.body, response)
  for (const [key, value] of Object.entries(headers)) {
    if (!out.headers.has(key)) out.headers.set(key, value)
  }
  return out
}

/**
 * A fetch-style handler for the build output: Request in, Response out.
 * scripts/parity.mjs uses it to render on-demand pages without a server.
 */
export async function createHandler() {
  const config = JSON.parse(
    fs.readFileSync(path.join(OUTPUT, 'config.json'), 'utf8')
  )
  const env = loadEnv('production', ROOT, '')
  for (const [key, value] of Object.entries(env)) process.env[key] ??= value

  const functions = new Map()
  const invoke = async (name, request) => {
    if (!functions.has(name)) {
      const folder = path.join(OUTPUT, 'functions', `${name}.func`)
      const { handler } = JSON.parse(
        fs.readFileSync(path.join(folder, '.vc-config.json'), 'utf8')
      )
      const module = import(pathToFileURL(path.join(folder, handler)).href)
      functions.set(
        name,
        module.then(({ default: entry }) => entry)
      )
    }
    const entry = await functions.get(name)
    return entry.fetch(request)
  }

  return async function handle(request) {
    const { pathname } = new URL(request.url)
    const headers = {}
    for (const route of config.routes) {
      if (route.handle === 'filesystem') {
        const file = staticFile(pathname)
        if (file) return fileResponse(file, 200, headers)
        continue
      }
      if (route.handle || !route.src) continue
      const match = new RegExp(route.src).exec(pathname)
      if (!match) continue
      const fill = (value) =>
        value.replace(/\$(\d+)/g, (_, index) => match[index] ?? '')
      for (const [key, value] of Object.entries(route.headers ?? {})) {
        headers[key.toLowerCase()] = fill(value)
      }
      if (route.continue) continue
      if (route.status && headers.location) {
        return new Response(null, { status: route.status, headers })
      }
      if (route.dest?.startsWith('/')) {
        const file = staticFile(fill(route.dest))
        if (file) return fileResponse(file, route.status ?? 200, headers)
        continue
      }
      if (route.dest) {
        return withHeaders(await invoke(route.dest, request), headers)
      }
    }
    return new Response('Not found', { status: 404 })
  }
}

function requestFrom(req, port) {
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    for (const item of [value].flat()) headers.append(key, item)
  }
  const url = `http://${req.headers.host ?? `localhost:${port}`}${req.url}`
  const hasBody = !['GET', 'HEAD'].includes(req.method)
  return new Request(url, {
    method: req.method,
    headers,
    ...(hasBody ? { body: Readable.toWeb(req), duplex: 'half' } : {}),
  })
}

async function serve(port) {
  const handle = await createHandler()
  const server = http.createServer(async (req, res) => {
    try {
      const response = await handle(requestFrom(req, port))
      for (const [key, value] of response.headers) {
        if (key !== 'set-cookie') res.setHeader(key, value)
      }
      const cookies = response.headers.getSetCookie()
      if (cookies.length) res.setHeader('set-cookie', cookies)
      res.writeHead(response.status)
      if (response.body && req.method !== 'HEAD') {
        Readable.fromWeb(response.body).pipe(res)
      } else res.end()
    } catch (error) {
      console.error(error)
      if (!res.headersSent) res.writeHead(500)
      res.end('Internal error')
    }
  })
  server.listen(port, () =>
    console.log(`Serving .vercel/output at http://localhost:${port}`)
  )
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!fs.existsSync(path.join(OUTPUT, 'config.json'))) {
    console.error('No .vercel/output: run pnpm exec astro build first')
    process.exit(1)
  }
  const flag = process.argv.findIndex((arg) => arg.startsWith('--port'))
  const value =
    flag === -1
      ? undefined
      : process.argv[flag].split('=')[1] ?? process.argv[flag + 1]
  await serve(Number(value ?? process.env.PORT ?? 4321))
}
