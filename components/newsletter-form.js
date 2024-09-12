'use client'

import { useRef, useState, useEffect } from 'react'
import Button from '@/components/button'

const NewsletterForm = ({ className = 'w-full', unique = 'footer' }) => {
  const inputEmail = useRef(null)
  const inputName = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState(null)
  const [emailError, setEmailError] = useState('')

  const roundDownToNearest10 = (num) => Math.floor(num / 10) * 10

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const response = await fetch('/api/newsletter')
        if (!response.ok) {
          throw new Error('Failed to fetch subscriber count')
        }
        const data = await response.json()
        if (data.subscriberCount) {
          setSubscriberCount(roundDownToNearest10(data.subscriberCount))
        }
      } catch (error) {
        console.error('Failed to fetch subscriber count:', error)
        setSubscriberCount(700) // Fallback
      }
    }

    fetchSubscriberCount()
  }, [])

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const subscribe = async (e) => {
    e.preventDefault()

    const email = inputEmail.current.value
    const name = inputName.current.value

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setEmailError('')

    if (!name.trim()) {
      setError(true)
      setMessage('Please enter your name')
      return
    }

    const res = await fetch(`/api/newsletter`, {
      body: JSON.stringify({
        email,
        name,
        source: '',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const data = await res.json()

    if (res.status === 500) {
      setError(true)
      setMessage(`The server cannot be reached to submit your request.`)
    } else if (
      res.status === 400 &&
      data.error === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS'
    ) {
      setError(true)
      setMessage(`This email is already subscribed to the newsletter.`)
    } else if (!res.ok) {
      setError(true)
      setMessage(`There was an error subscribing to the list.`)
    } else {
      inputEmail.current.value = ''
      inputName.current.value = ''
      setError(false)
      setSubscribed(true)
      setMessage('Thank you for subscribing! Please check your inbox.')
    }
  }

  return (
    <>
      <div className={`${className}`}>
        {subscribed && (
          <div
            className={`bg-grass-50/40 rounded-sm ring-1 ring-grass-400/40 text-grass-800 px-3 py-2 mb-8`}
          >
            {message && <p className="m-0 text-sm">{message}</p>}
          </div>
        )}
        {error && (
          <div
            className={`bg-rio-50/40 rounded-sm ring-1 ring-rio-400/40 text-rio-800 px-3 py-2 mb-8`}
          >
            {message && <p className="m-0">{message}</p>}
          </div>
        )}
        <form className="@container flex flex-col gap-10" onSubmit={subscribe}>
          <div className="@container flex flex-col @xl:flex-row gap-6">
            <div className="flex flex-col @xl:w-2/5">
              <label
                htmlFor={`input-name-${unique}`}
                className="font-sans text-base font-medium lowercase text-fern-1100 leading-none mb-1"
              >
                First name
              </label>
              <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
                What do you go by?
              </p>
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
                className="font-sans text-base font-medium lowercase text-fern-1100 leading-none mb-1"
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
                className={`form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 focus-visible:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_127_218),_0_0_0_6px_rgb(79_127_218_/_0.08)] ${
                  emailError ? 'border-red-500' : ''
                }`}
                id={`input-email-${unique}`}
                name="email_address"
                ref={inputEmail}
                required
                disabled={subscribed}
                onChange={() => setEmailError('')}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-col-reverse @sm:flex-row gap-4 items-center justify-between">
            <p className="m-0 p-0 text-fern-600 flex-1 text-center @sm:text-left">
              Join{' '}
              {subscriberCount !== null
                ? `${subscriberCount.toLocaleString()}+`
                : '700+'}{' '}
              designers
            </p>
            <Button
              theme="dandelion"
              aria-label="Subscribe to the newsletter"
              className="button-dandelion select-none w-full @sm:w-[auto] @sm:grow-0 flex-auto button-dandelion font-ui text-base/tight lowercase text-center"
              disabled={subscribed}
            >
              Sign me up
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewsletterForm
