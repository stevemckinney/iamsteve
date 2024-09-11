// eslint-disable-next-line import/no-anonymous-default-export
import { NextResponse } from 'next/server'

const API_URL = process.env.EMAILOCTOPUS_API_URL
const API_KEY = process.env.EMAILOCTOPUS_API_KEY
const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

// Cache to store the subscriber count and last fetch time
let cachedSubscriberCount = null
let lastFetchTime = null

// Cache duration in milliseconds (1 week)
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000

async function fetchSubscriberCount() {
  const API_ROUTE = `${API_URL}lists/${LIST_ID}?api_key=${API_KEY}`

  const res = await fetch(API_ROUTE, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()

  return data.counts.subscribed
}

export const GET = async () => {
  const currentTime = Date.now()

  // Check if cache is valid
  if (cachedSubscriberCount && lastFetchTime && currentTime - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json({ subscriberCount: cachedSubscriberCount })
  }

  try {
    // Fetch new data if cache is invalid or doesn't exist
    const subscriberCount = await fetchSubscriberCount()

    // Update cache
    cachedSubscriberCount = subscriberCount
    lastFetchTime = currentTime

    return NextResponse.json({ subscriberCount })
  } catch (error) {
    console.error('Failed to fetch subscriber count:', error)
    return NextResponse.json({ error: 'Failed to fetch subscriber count' }, { status: 500 })
  }
}

export const POST = async (req) => {
  const { email, name, source } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const config = {
    api_key: API_KEY,
    email_address: email,
    fields: {
      FirstName: name,
      Source: source,
    },
    status: 'PENDING',
  }

  const API_ROUTE = `${API_URL}lists/${LIST_ID}/contacts`

  try {
    const res = await fetch(API_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })

    const data = await res.json()

    if (res.ok) {
      return NextResponse.json({ success: true })
    } else if (data.error.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      return NextResponse.json({ error: 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS' }, { status: 400 })
    } else {
      return NextResponse.json({ error: data.error.message }, { status: res.status })
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
