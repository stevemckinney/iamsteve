import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)

/**
 * Lets the test runner import the same modules the bundler does: resolves the
 * `@/` alias from jsconfig.json, and adds the file extension Node insists on
 * but a bundler infers.
 */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const base = new URL(specifier.slice(2), root)
    const candidates = [
      base,
      new URL(`${base.href}.js`),
      new URL(`${base.href}/index.js`),
    ]
    const match = candidates.find((url) => existsSync(fileURLToPath(url)))
    return nextResolve((match ?? base).href, context)
  }

  try {
    return await nextResolve(specifier, context)
  } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND' || /\.[a-z]+$/.test(specifier)) {
      throw error
    }
    return nextResolve(`${specifier}.js`, context)
  }
}
