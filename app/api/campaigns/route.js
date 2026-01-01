/* eslint import/no-anonymous-default-export: "off" */
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  const API_URL = process.env.EMAILOCTOPUS_API_URL
  const API_KEY = process.env.EMAILOCTOPUS_API_KEY

  if (!API_URL || !API_KEY) {
    return NextResponse.json(
      { error: 'API configuration missing' },
      { status: 500 }
    )
  }

  const API_ROUTE = `${API_URL}campaigns?api_key=${API_KEY}&limit=12`

  try {
    const res = await fetch(API_ROUTE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Failed to fetch campaigns' },
        { status: res.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}
