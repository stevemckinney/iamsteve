import { NextResponse } from 'next/server'

const API_URL = process.env.EMAILOCTOPUS_API_URL
const API_KEY = process.env.EMAILOCTOPUS_API_KEY
const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

export const POST = async (req) => {
  console.log('POST handler called at:', new Date().toISOString())

  const { email, name, source } = await req.json()

  if (!email) {
    console.log('POST request missing email')
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
      console.log('Subscription successful for email:', email)
      return NextResponse.json({ success: true })
    } else if (data.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      console.log('Subscription attempt for existing member:', email)
      return NextResponse.json(
        { error: 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS' },
        { status: 400 }
      )
    } else {
      console.error('Subscription error:', data.error?.message || 'Unknown error')
      return NextResponse.json(
        { error: data.error?.message || 'Subscription failed' },
        { status: res.status }
      )
    }
  } catch (error) {
    console.error('Subscription error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
