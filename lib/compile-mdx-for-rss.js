/**
 * Compile MDX to RSS-friendly HTML
 *
 * This module compiles MDX content with custom component renderers
 * that output standard HTML suitable for RSS feeds.
 */

import { rssComponents } from './rss-components.js'
import { marked } from 'marked'

/**
 * Simple JSX component parser and replacer
 * Extracts component usage from MDX and replaces with HTML equivalents
 */
function transformComponent(match, componentName, propsString, children) {
  const component = rssComponents[componentName]
  if (!component) {
    // Unknown component - return as-is or strip
    console.warn(`RSS: Unknown component <${componentName}>`)
    return children || ''
  }

  // Parse props from JSX syntax
  const props = parseProps(propsString)

  // If component has children, add them to props
  if (children) {
    props.children = children
  }

  try {
    return component(props)
  } catch (error) {
    console.error(`RSS: Error rendering ${componentName}:`, error)
    return children || ''
  }
}

/**
 * Parse JSX props string into object
 * Handles: prop="value", prop={123}, prop={true}, prop
 */
function parseProps(propsString) {
  if (!propsString) return {}

  const props = {}

  // Match prop="value" or prop='value'
  const stringProps = propsString.matchAll(/(\w+)=["']([^"']+)["']/g)
  for (const [, key, value] of stringProps) {
    props[key] = value
  }

  // Match prop={value} for numbers, booleans, objects
  const jsxProps = propsString.matchAll(/(\w+)=\{([^}]+)\}/g)
  for (const [, key, value] of jsxProps) {
    try {
      // Try to evaluate simple values
      if (value === 'true') props[key] = true
      else if (value === 'false') props[key] = false
      else if (/^\d+$/.test(value)) props[key] = parseInt(value)
      else if (/^\d+\.\d+$/.test(value)) props[key] = parseFloat(value)
      else props[key] = value // Keep as string if can't parse
    } catch {
      props[key] = value
    }
  }

  // Match boolean props (just the prop name with no value)
  const boolProps = propsString.matchAll(/\s(\w+)(?=\s|$|\/)/g)
  for (const [, key] of boolProps) {
    if (!props[key]) {
      props[key] = true
    }
  }

  return props
}

/**
 * Main compilation function
 * Transforms MDX with JSX components to plain HTML
 */
export async function compileMdxForRss(mdxContent) {
  let html = mdxContent

  // List of known custom components to transform
  const knownComponents = Object.keys(rssComponents)
  const componentPattern = knownComponents.join('|')

  // Transform self-closing components: <Component prop="value" />
  const selfClosingRegex = new RegExp(`<(${componentPattern})\\s+([^>]*?)\\/>`,'gs')
  html = html.replace(selfClosingRegex, (match, componentName, propsString) => {
    return transformComponent(match, componentName, propsString, null)
  })

  // Transform components with children: <Component>...</Component>
  const withChildrenRegex = new RegExp(`<(${componentPattern})(\\s+[^>]*?)?>([^]*?)<\\/\\1>`, 'gs')
  html = html.replace(withChildrenRegex, (match, componentName, propsString, children) => {
    return transformComponent(match, componentName, propsString, children)
  })

  // Now run through a markdown processor to convert markdown to HTML
  // We'll use a simple marked-like conversion
  // Note: You might want to use 'marked' here for full markdown support

  return html
}

/**
 * Simplified version that uses marked for markdown conversion
 * This is what we'll use in practice since marked is already a dependency
 */
export function compileMdxForRssWithMarked(mdxContent) {
  // First, transform JSX components to HTML
  let content = mdxContent

  // List of known custom components to transform
  const knownComponents = Object.keys(rssComponents)
  const componentPattern = knownComponents.join('|')

  // Transform self-closing components
  const selfClosingRegex = new RegExp(`<(${componentPattern})\\s+([^>]*?)\\/>`,'gs')
  content = content.replace(selfClosingRegex, (match, componentName, propsString) => {
    return transformComponent(match, componentName, propsString, null)
  })

  // Transform components with children
  const withChildrenRegex = new RegExp(`<(${componentPattern})(\\s+[^>]*?)?>([^]*?)<\\/\\1>`, 'gs')
  content = content.replace(withChildrenRegex, (match, componentName, propsString, children) => {
    return transformComponent(match, componentName, propsString, children)
  })

  // Then use marked to convert markdown to HTML
  return marked(content)
}
