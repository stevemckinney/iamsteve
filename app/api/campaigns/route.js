/* eslint import/no-anonymous-default-export: "off" */
import { NextResponse } from 'next/server'

import { apiError } from '@/lib/agent/errors'

export const GET = async (req) => {
  const API_URL = process.env.EMAILOCTOPUS_API_URL
  const API_KEY = process.env.EMAILOCTOPUS_API_KEY

  if (!API_URL || !API_KEY) {
    return apiError({
      status: 500,
      code: 'NEWSLETTER_NOT_CONFIGURED',
      message: 'The newsletter provider is not configured on this deployment.',
      hint: 'Read the published issues at https://iamsteve.me/newsletter instead.',
    })
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
      return apiError({
        status: res.status,
        code: 'CAMPAIGNS_UNAVAILABLE',
        message: data.error?.message || 'The issue list could not be fetched.',
        hint: 'This is a temporary fault at our end. Retry in a few minutes.',
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    return apiError({
      status: 500,
      code: 'CAMPAIGNS_UNAVAILABLE',
      message: error.message || 'The issue list could not be fetched.',
      hint: 'This is a temporary fault at our end. Retry in a few minutes.',
    })
  }
}
