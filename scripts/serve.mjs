#!/usr/bin/env node
/**
 * Serves the Vercel build output in .vercel/output on localhost, routed the
 * way Vercel routes it. The routes in vercel.json join the adapter’s
 * config.json as a Vercel build merges them, then the static files answer,
 * then the functions: the adapter’s, for routes with prerender = false, and
 * the one src/lib/strip-params.js writes. The Vercel adapter has no
 * `astro preview`, so this stands in for it, for Playwright,
 * scripts/edge-check.mjs and trying endpoints by hand. It follows Vercel
 * closely enough to catch mistakes in vercel.json, but only a preview
 * deployment settles how Vercel treats it.
 *
 *   node scripts/serve.mjs [--port 4321]
 *
 * The functions read their environment from .env and .env.local, as a build
 * does. Variables already set in the shell win.
 */
import fs from 'node:fs'
import http from 'node:http'
import { createRequire } from 'node:module'
import path from 'node:path'
import { Readable } from 'node:stream'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

// The adapter’s copy of Vercel’s routing code, which wrote config.json
const require = createRequire(import.meta.resolve('@astrojs/vercel'))
const { getTransformedRoutes, mergeRoutes } = require('@vercel/routing-utils')

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = path.join(ROOT, '.vercel/output')
const STATIC = path.join(OUTPUT, 'static')

// As Vercel serves them, where vercel.json doesn’t set one
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
  ico: 'image/vnd.microsoft.icon',
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

// Vercel sends ACAO * with static files. Route headers win over that and
// over the type the file’s extension gives
function fileResponse(file, status, headers) {
  const extension = path.extname(file).slice(1).toLowerCase()
  return new Response(fs.readFileSync(file), {
    status,
    headers: {
      'content-type': TYPES[extension] ?? 'application/octet-stream',
      'access-control-allow-origin': '*',
      ...headers,
    },
  })
}

// A function’s own headers win over route headers. Vercel’s CDN keeps
// s-maxage and stale-while-revalidate to itself when it caches a function’s
// response, as it did production’s GET 200s and 404s. proxy.js’s 301s and
// the OPTIONS 204 kept them, so whether _strip’s 301s do is for a preview
function withHeaders(response, headers, method) {
  const out = new Response(response.body, response)
  for (const [key, value] of Object.entries(headers)) {
    if (!out.headers.has(key)) out.headers.set(key, value)
  }
  const cached =
    ['GET', 'HEAD'].includes(method) && [200, 404].includes(out.status)
  const cache = out.headers.get('cache-control')
  if (cached && cache) {
    const kept = cache
      .split(',')
      .map((directive) => directive.trim())
      .filter(
        (directive) => !/^(s-maxage|stale-while-revalidate)=/i.test(directive)
      )
    if (kept.length) out.headers.set('cache-control', kept.join(', '))
    else out.headers.delete('cache-control')
  }
  return out
}

function read({ type, key }, request, url) {
  switch (type) {
    case 'host':
      return url.hostname
    case 'header':
      return request.headers.get(key)
    case 'query':
      return url.searchParams.get(key)
  }
  return null
}

// A has or missing condition. A value is a regular expression that has to
// match all of it, as in Next.js
function holds(condition, request, url) {
  const actual = read(condition, request, url)
  if (actual === null) return false
  const { value } = condition
  return value === undefined || new RegExp(`^${value}$`).test(actual)
}

// A route’s match, or null. Routes ignore case unless they say otherwise
function matchRoute(route, pathname, request, url) {
  const flags = route.caseSensitive ? '' : 'i'
  const match = new RegExp(route.src, flags).exec(pathname)
  if (!match) return null
  const { has = [], missing = [] } = route
  if (has.some((condition) => !holds(condition, request, url))) return null
  if (missing.some((condition) => holds(condition, request, url))) return null
  return match
}

/**
 * A fetch-style handler for the build output: Request in, Response out.
 * scripts/parity.mjs uses it to render on-demand pages without a server.
 */
export async function createHandler() {
  const config = JSON.parse(
    fs.readFileSync(path.join(OUTPUT, 'config.json'), 'utf8')
  )
  const vercel = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')
  )
  const { routes: userRoutes, error } = getTransformedRoutes(vercel)
  if (error) throw new Error(`vercel.json: ${error.message}`)
  // Within each phase, vercel.json’s routes go after the adapter’s continue
  // routes and before its others
  const routes = mergeRoutes({
    userRoutes,
    builds: [
      {
        use: '@astrojs/vercel',
        entrypoint: 'astro.config.mjs',
        routes: config.routes,
      },
    ],
  })
  const handles = routes.filter((route) => route.handle)
  if (handles.map(({ handle }) => handle).join() !== 'filesystem') {
    throw new Error('Only the filesystem phase is handled here')
  }
  const split = routes.indexOf(handles[0])
  const before = routes.slice(0, split)
  const after = routes.slice(split + 1)

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
    const url = new URL(request.url)
    const headers = {}
    let { pathname } = url

    // Every request runs the routes before the filesystem. Then a static
    // file answers, or the routes after it run
    for (const phase of [before, after]) {
      if (phase === after) {
        const file = staticFile(pathname)
        if (file) return fileResponse(file, 200, headers)
      }
      for (const route of phase) {
        const match = matchRoute(route, pathname, request, url)
        if (!match) continue
        const fill = (value) =>
          value.replace(/\$(\d+)/g, (_, index) => match[index] ?? '')
        // A later route’s header replaces an earlier one’s
        for (const [key, value] of Object.entries(route.headers ?? {})) {
          headers[key.toLowerCase()] = fill(value)
        }
        if (route.continue) continue
        if (!route.dest) {
          if (!route.status) break
          // Vercel carries the query over to a redirect
          if (
            headers.location &&
            url.search &&
            !headers.location.includes('?')
          ) {
            headers.location += url.search
          }
          // A redirect, or a status alone, as the 410s are
          return new Response(null, { status: route.status, headers })
        }
        const dest = fill(route.dest)
        if (!dest.startsWith('/')) {
          return withHeaders(
            await invoke(dest, request),
            headers,
            request.method
          )
        }
        const file = staticFile(dest)
        if (file) return fileResponse(file, route.status ?? 200, headers)
        // A rewrite to a missing file carries on with its path
        pathname = dest
        break
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
