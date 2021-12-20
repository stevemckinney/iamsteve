import { useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

const NewsletterForm = ({ theme = 'form-warm' }) => {
  const inputEmail = useRef(null)
  const inputName = useRef(null)
  const inputSource = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    // https://emailoctopus.com/api/1.5/lists/:listId/contacts
    // https://emailoctopus.com/api/1.5/lists/76319206-f1ef-11eb-96e5-06b4694bee2a/contacts
    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEmail.current.value,
        name: inputName ? inputName.current.value : '',
        source: inputSource ? inputSource.current.value : '',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      console.log(error)
      setError(true)
      setMessage('Your e-mail address is invalid or you are already subscribed!')
      return
    }

    inputEmail.current.value = ''
    inputName.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('Successfully! 🎉 You are now subscribed.')
  }

  return (
    <>
      <div className={theme}>
        <div className="row-form">
          {subscribed && (
            <div className={`bg-secondary sans radius white`} style={{
              marginBottom: "24px",
              padding: "8px"
            }}>
              <p className="m0">Thank you for subscribing, please check your inbox!</p>
            </div>
          )}
          {error && (
            <div className={`bg-red sans radius white`} style={{
              marginBottom: "24px",
              padding: "8px"
            }}>
              <p className="m0">{message}</p>
            </div>
          )}
          <form
            className="form form-newsletter end"
            onSubmit={subscribe}
          >
            <div className="field field-text field-third ml-field-group ml-field-name">
              <label htmlFor="input-name" className="sans pb2 field-label">
                First name
              </label>
              <input
                type="text"
                className="input input-text form-control"
                name="fields[first_name]"
                id="input-name"
                ref={inputName}
              />
            </div>
            <div className="field field-text field-two-thirds nml ml-field-group ml-field-email ml-validate-required">
              <label htmlFor="input-email" className="sans pb2 field-label">
                Email
              </label>
              <input
                autoComplete="email"
                className="input input-text form-control"
                id="input-email"
                name="email_address"
                ref={inputEmail}
                required
                type="email"
                disabled={subscribed}
              />
            </div>
            <input type="hidden" name="fields[marketing_permissions]" value="Email" />
            <input type="hidden" ref={inputSource} name="fields[source]" value="{current_url}" />
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
