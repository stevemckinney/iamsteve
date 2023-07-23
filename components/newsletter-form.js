'use client'

import { NextResponse } from 'next/server'
import { useRef, useState } from 'react'

const NewsletterForm = ({ theme = 'form-warm', unique = 'footer' }) => {
  const inputEmail = useRef(null)
  const inputName = useRef(null)
  const inputSource = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    // https://emailoctopus.com/api/1.5/lists/:listId/contacts
    const res = await fetch(`/api/newsletter`, {
      body: JSON.stringify({
        email: inputEmail.current.value,
        name: inputName ? inputName.current.value : '',
        source: '',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (res.status === 500) {
      setError(true)
      setMessage(`The server cannot be reached to submit your request.`)
      return Promise.reject(`The server cannot be reached to submit your request.`)
    } else if (res.error) {
      setError(true)
      setMessage(`There was an error subscribing to the list.`)
      return Promise.reject(`There was an error subscribing to the list.`)
    }

    inputEmail.current.value = ''
    inputName.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('🎉 Thank you for subscribing! Please check your inbox.')
  }

  return (
    <>
      <div className={theme}>
        <div className="row-form">
          {subscribed && (
            <div
              className={`bg-secondary sans radius white`}
              style={{
                marginBottom: '24px',
                padding: '8px',
              }}
            >
              {message && <p className="m0">{message}</p>}
            </div>
          )}
          {error && (
            <div
              className={`bg-red sans radius white`}
              style={{
                marginBottom: '24px',
                padding: '8px',
              }}
            >
              {message && <p className="m0">{message}</p>}
            </div>
          )}
          <form className="form form-newsletter end" onSubmit={subscribe}>
            <div className="field field-text field-third ml-field-group ml-field-name">
              <label htmlFor={`input-name-${unique}`} className="sans pb2 field-label">
                First name
              </label>
              <input
                type="text"
                className="form-input px-4 py-3 rounded-lg"
                name="fields[first_name]"
                id={`input-name-${unique}`}
                ref={inputName}
                disabled={subscribed}
              />
            </div>
            <div className="field field-text field-two-thirds nml ml-field-group ml-field-email ml-validate-required">
              <label htmlFor={`input-email-${unique}`} className="sans pb2 field-label">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                className="form-input px-4 py-3 rounded-lg"
                id={`input-email-${unique}`}
                name="email_address"
                ref={inputEmail}
                required
                disabled={subscribed}
              />
            </div>
            <div className="form-actions pt2 text-right">
              <button
                type="submit"
                aria-label="Subscribe to the newsletter"
                className="button button-tertiary ml-hide-horizontal flex-auto"
                disabled={subscribed}
              >
                {subscribed ? 'Thank you!' : 'Sign me up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title }) => (
  <div className="flex items-center justify-center">
    <div className="p-6 bg-gray-100 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={title} />
    </div>
  </div>
)
