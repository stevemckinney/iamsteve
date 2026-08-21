import assert from 'node:assert/strict'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

import { GET } from '@/app/openapi.json/route'

const root = fileURLToPath(new URL('../', import.meta.url))
const spec = await (await GET()).json()

/** Every route.js under app/api, as the path an agent would call. */
function apiRoutesOnDisk(dir = path.join(root, 'app', 'api'), prefix = '/api') {
  const routes = []
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (entry === 'route.js') {
      routes.push(prefix)
    } else if (statSync(full).isDirectory()) {
      const segment = entry
        .replace(/^\[\.\.\.(.+)\]$/, '{...$1}')
        .replace(/^\[(.+)\]$/, '{$1}')
      routes.push(...apiRoutesOnDisk(full, `${prefix}/${segment}`))
    }
  }
  return routes
}

test('the document declares itself as OpenAPI 3.1 for this site', () => {
  assert.equal(spec.openapi, '3.1.0')
  assert.equal(spec.info.title, 'iamsteve.me')
  assert.ok(spec.info.version)
  assert.deepEqual(
    spec.servers.map((server) => server.url),
    ['https://iamsteve.me']
  )
})

test('the response is served as JSON an agent can fetch cross-origin', async () => {
  const response = await GET()

  assert.equal(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
  assert.equal(response.headers.get('access-control-allow-origin'), '*')
})

test('every operation is addressable and documented', () => {
  const operationIds = new Set()

  for (const [route, methods] of Object.entries(spec.paths)) {
    assert.ok(route.startsWith('/'), `${route} is not root-relative`)

    for (const [method, operation] of Object.entries(methods)) {
      const where = `${method.toUpperCase()} ${route}`
      assert.ok(operation.operationId, `${where} has no operationId`)
      assert.ok(operation.summary, `${where} has no summary`)
      assert.ok(
        Object.keys(operation.responses ?? {}).length > 0,
        `${where} documents no responses`
      )
      assert.ok(
        !operationIds.has(operation.operationId),
        `${operation.operationId} is used twice`
      )
      operationIds.add(operation.operationId)
    }
  }
})

test('every path parameter is declared', () => {
  for (const [route, methods] of Object.entries(spec.paths)) {
    const templated = [...route.matchAll(/\{(\w+)\}/g)].map((match) => match[1])

    for (const [method, operation] of Object.entries(methods)) {
      const declared = (operation.parameters ?? [])
        .filter((parameter) => parameter.in === 'path')
        .map((parameter) => parameter.name)

      assert.deepEqual(
        declared.sort(),
        templated.sort(),
        `${method.toUpperCase()} ${route} declares the wrong path parameters`
      )
    }
  }
})

test('every $ref resolves', () => {
  const refs = [...JSON.stringify(spec).matchAll(/"\$ref":"([^"]+)"/g)].map(
    (match) => match[1]
  )

  assert.ok(refs.length > 0)

  for (const ref of refs) {
    const resolved = ref
      .replace(/^#\//, '')
      .split('/')
      .reduce((node, key) => node?.[key], spec)
    assert.ok(resolved, `${ref} does not resolve`)
  }
})

test('the error schema is the one the API actually returns', () => {
  const error = spec.components.schemas.Error.properties.error

  assert.deepEqual(error.required.sort(), ['code', 'hint', 'message', 'status'])
  for (const key of ['code', 'message', 'hint', 'status', 'documentation']) {
    assert.ok(error.properties[key], `the error schema is missing ${key}`)
  }
})

test('the documented API surface matches the routes that exist', () => {
  const onDisk = apiRoutesOnDisk()
    // The catch-all only exists to answer unknown paths in JSON.
    .filter((route) => !route.includes('{...'))
    .sort()
  const documented = Object.keys(spec.paths)
    .filter((route) => route.startsWith('/api/'))
    .sort()

  assert.deepEqual(documented, onDisk)
})

test('the discovery documents are described too', () => {
  for (const route of [
    '/llms.txt',
    '/feed.xml',
    '/sitemap.xml',
    '/openapi.json',
    '/.well-known/api-catalog',
    '/.well-known/agent-skills/index.json',
  ]) {
    assert.ok(spec.paths[route], `${route} is not described`)
  }
})
