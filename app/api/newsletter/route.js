import { NextResponse } from 'next/server'

import { apiError } from '@/lib/agent/errors'

const API_URL = process.env.EMAILOCTOPUS_API_URL
const API_KEY = process.env.EMAILOCTOPUS_API_KEY
const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

export const POST = async (req) => {
  let body

  try {
    body = await req.json()
  } catch {
    return apiError({
      status: 400,
      code: 'INVALID_JSON',
      message: 'The request body could not be parsed as JSON.',
      hint: 'Send a JSON body and set Content-Type: application/json.',
    })
  }

  const { email, name, source } = body

  if (!email) {
    return apiError({
      status: 400,
      code: 'EMAIL_REQUIRED',
      message: 'An email address is required to subscribe.',
      hint: 'Include an "email" field in the JSON body.',
    })
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
    } else if (data.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      return apiError({
        status: 400,
        code: 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS',
        message: 'That email address is already subscribed.',
        hint: 'No action needed. Check the inbox for the confirmation email.',
      })
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'Subscription error:',
          data.error?.message || 'Unknown error'
        )
      }
      return apiError({
        status: res.status,
        code: 'SUBSCRIPTION_FAILED',
        message:
          data.error?.message || 'The subscription could not be created.',
        hint: 'Check the email address is valid, then try again.',
      })
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Subscription error:', error.message)
    }
    return apiError({
      status: 500,
      code: 'NEWSLETTER_UNAVAILABLE',
      message: 'The newsletter provider could not be reached.',
      hint: 'This is a temporary fault at our end. Retry in a few minutes.',
    })
  }
}
