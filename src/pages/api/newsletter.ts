export const prerender = false

import type { APIRoute } from 'astro'

const EMAILOCTOPUS_API_URL = import.meta.env.EMAILOCTOPUS_API_URL || process.env.EMAILOCTOPUS_API_URL
const EMAILOCTOPUS_API_KEY = import.meta.env.EMAILOCTOPUS_API_KEY || process.env.EMAILOCTOPUS_API_KEY
const EMAILOCTOPUS_LIST_ID = import.meta.env.EMAILOCTOPUS_LIST_ID || process.env.EMAILOCTOPUS_LIST_ID

export const POST: APIRoute = async ({ request }) => {
  const { email, name, source } = await request.json()

  if (!email || !name) {
    return new Response(JSON.stringify({ error: 'Email and name required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const response = await fetch(
      `${EMAILOCTOPUS_API_URL}/lists/${EMAILOCTOPUS_LIST_ID}/contacts`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: EMAILOCTOPUS_API_KEY,
          email_address: email,
          fields: { FirstName: name },
          tags: source ? [source] : [],
        }),
      }
    )

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to subscribe' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
