'use server'

import { z } from 'zod'

// Matches MIN_WORD_COUNT in components/contact-form.js
const MIN_WORD_COUNT = 8

const schema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  message: z
    .string()
    .trim()
    .refine(
      (value) => value.split(/\s+/).filter(Boolean).length >= MIN_WORD_COUNT,
      `Message must be at least ${MIN_WORD_COUNT} words long`
    ),
})

// Checks the Turnstile token with Cloudflare
async function verify(token) {
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  )
  const data = await response.json()

  if (!data.success) {
    console.error('Turnstile check failed:', data['error-codes'])
  }

  return data.success
}

// Sends the message with Cloudflare Email Service
async function send({ name, email, message }) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/email/sending/send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_EMAIL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: process.env.CONTACT_TO,
        // Email Routing runs on this subdomain, so Proton keeps iamsteve.me
        from: 'contact@form.iamsteve.me',
        reply_to: email,
        subject: `Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    }
  )
  const data = await response.json()
  // Cloudflare can accept the request even when the recipient’s server bounces it
  const sent = data.success && !data.result?.permanent_bounces?.length

  if (sent) {
    console.log('Email sent:', data.result)
  } else {
    console.error('Email failed to send:', data.errors, data.result)
  }

  return sent
}

export async function sendMessage(formData) {
  // Only bots fill in the hidden field, so drop the message without saying
  if (formData.get('title')) {
    return { status: 'sent' }
  }

  const result = schema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      status: 'invalid',
      errors: z.flattenError(result.error).fieldErrors,
    }
  }

  try {
    if (
      process.env.NEXT_PUBLIC_ENABLE_TURNSTILE === 'true' &&
      !(await verify(formData.get('cf-turnstile-response')))
    ) {
      return { status: 'failed' }
    }

    return { status: (await send(result.data)) ? 'sent' : 'failed' }
  } catch (error) {
    console.error('Contact form error:', error)
    return { status: 'failed' }
  }
}
