import { NextResponse } from 'next/server'

import siteMetadata from '@/content/metadata'

/**
 * Every API error uses one shape so an agent can branch on `error.code`
 * without parsing prose, and `error.hint` tells it what to do next.
 *
 * {
 *   "error": {
 *     "code": "EMAIL_REQUIRED",
 *     "message": "An email address is required.",
 *     "hint": "Send a JSON body with an \"email\" field.",
 *     "status": 400,
 *     "documentation": "https://iamsteve.me/openapi.json"
 *   }
 * }
 */
export function apiError({ status, code, message, hint, headers }) {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        hint,
        status,
        documentation: `${siteMetadata.siteUrl}/openapi.json`,
      },
    },
    {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        ...headers,
      },
    }
  )
}
