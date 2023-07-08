import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import siteMetadata from '@/data/siteMetadata'

const NewsletterForm = ({ theme = 'form-warm', unique = 'footer' }) => {

  console.log('newsletter form')

  const inputEmail = useRef(null)
  const inputName = useRef(null)
  const inputSource = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const router = useRouter()

  const subscribe = async (e) => {
    e.preventDefault()
    console.log('e', e)

    // https://emailoctopus.com/api/1.5/lists/:listId/contacts
    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEmail.current.value,
        name: inputName ? inputName.current.value : '',
        source: router.asPath,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()

    console.log('res', res)

    if (error) {
      console.log(error)
      setError(true)
      setMessage(`There was an error subscribing to the list.`)
      return
    }

    inputEmail.current.value = ''
    inputName.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('Success! 🎉 You are now subscribed.')
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
              <p className="m0">Thank you for subscribing, please check your inbox!</p>
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
              <p className="m0">{message}</p>
            </div>
          )}
          <form className="form form-newsletter end" onSubmit={subscribe}>
            <div className="field field-text field-third ml-field-group ml-field-name">
              <label htmlFor={`input-name-${unique}`} className="sans pb2 field-label">
                First name
              </label>
              <input
                type="text"
                className="input input-text form-control"
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
                className="input input-text form-control"
                id={`input-email-${unique}`}
                name="email_address"
                ref={inputEmail}
                required
                disabled={subscribed}
              />
            </div>
            <input type="hidden" name="fields[marketing_permissions]" value="Email" />
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
