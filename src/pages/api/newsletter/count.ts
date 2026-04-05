export const prerender = false

import type { APIRoute } from 'astro'

const EMAILOCTOPUS_API_URL = import.meta.env.EMAILOCTOPUS_API_URL || process.env.EMAILOCTOPUS_API_URL
const EMAILOCTOPUS_API_KEY = import.meta.env.EMAILOCTOPUS_API_KEY || process.env.EMAILOCTOPUS_API_KEY
const EMAILOCTOPUS_LIST_ID = import.meta.env.EMAILOCTOPUS_LIST_ID || process.env.EMAILOCTOPUS_LIST_ID

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(
      `${EMAILOCTOPUS_API_URL}/lists/${EMAILOCTOPUS_LIST_ID}?api_key=${EMAILOCTOPUS_API_KEY}`
    )

    const data = await response.json()
    const count = data?.counts?.subscribed || 700

    // Round down to nearest 10
    const rounded = Math.floor(count / 10) * 10

    return new Response(JSON.stringify({ count: rounded }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return new Response(JSON.stringify({ count: 700 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
