'use client'

import { NextResponse } from 'next/server'
import { useRef, useState } from 'react'

const NewsletterForm = ({ className = 'w-full', unique = 'footer' }) => {
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
      return Promise.reject(
        `The server cannot be reached to submit your request.`
      )
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
      <div className={`${className}`}>
        {subscribed && (
          <div
            className={`bg-secondary sans radius white`}
            style={{
              marginBottom: '24px',
              padding: '8px',
            }}
          >
            {message && <p className="m-0">{message}</p>}
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
            {message && <p className="m-0">{message}</p>}
          </div>
        )}
        <form className="@container flex flex-col gap-10" onSubmit={subscribe}>
          <div className="@container flex flex-col @xl:flex-row gap-6">
            <div className="flex flex-col @xl:w-2/5">
              <label
                htmlFor={`input-name-${unique}`}
                className="font-ui text-base lowercase text-fern-1100 leading-none mb-1"
              >
                First name
              </label>
              <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
                What do you go by?
              </p>
              {/* linear-gradient(180deg, rgba(79, 64, 63, 0.03) 0%, rgba(79, 64, 63, 0.00) 100%), #FFF) */}
              <input
                type="text"
                className={`form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 focus-visible:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_127_218),_0_0_0_6px_rgb(79_127_218_/_0.08)]`}
                name="fields[first_name]"
                id={`input-name-${unique}`}
                ref={inputName}
                disabled={subscribed}
              />
            </div>
            <div className="flex flex-col @xl:w-3/5">
              <label
                htmlFor={`input-email-${unique}`}
                className="font-ui text-base lowercase text-fern-1100 leading-none mb-1"
              >
                Email
              </label>
              <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
                Your best email address
              </p>
              <input
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                className={`form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 focus-visible:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_127_218),_0_0_0_6px_rgb(79_127_218_/_0.08)]`}
                id={`input-email-${unique}`}
                name="email_address"
                ref={inputEmail}
                required
                disabled={subscribed}
              />
            </div>
          </div>
          <div className="flex flex-col flex-col-reverse @sm:flex-row gap-4 items-center justify-between">
            <p className="m-0 p-0 text-fern-600 flex-1 text-center @sm:text-left">
              Join 700+ designers
            </p>
            <button
              type="submit"
              aria-label="Subscribe to the newsletter"
              className="button-dandelion select-none w-full @sm:w-[auto] @sm:grow-0 font-ui text-base/snug lowercase text-dandelion-800 text-center bg-dandelion-300 active:bg-dandelion-400 rounded-sm transition duration-200 shadow-dandelion-placed hover:shadow-dandelion-picked active:shadow-dandelion-reduced px-8 py-3 flex-auto [--ui-border-color:theme(colors.dandelion.600)] [--ui-border-color-hover:theme(colors.dandelion.700)]"
              disabled={subscribed}
            >
              Sign me up
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewsletterForm
