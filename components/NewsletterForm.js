import { useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

const NewsletterForm = ({ theme = 'form-warm' }) => {
  const inputEl = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    // https://emailoctopus.com/api/1.5/lists/:listId/contacts
    // https://emailoctopus.com/api/1.5/lists/76319206-f1ef-11eb-96e5-06b4694bee2a/contacts
    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      setMessage('Your e-mail address is invalid or you are already subscribed!')
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('Successfully! 🎉 You are now subscribed.')
  }

  return (
    <>
      <div className={theme}>
        <div
          id="mlb2-1003594"
          className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-1003594"
        >
          <div className="ml-form-align-center">
            <div className="ml-form-embedWrapper embedForm">
              <div className="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
                <form
                  className="form form-newsletter validate end ml-block-form ml-block-form"
                  action="https://app.mailerlite.com/webforms/submit/q7h2j4"
                  data-code="q7h2j4"
                  method="post"
                  target="_blank"
                >
                  <div className="field field-text field-third ml-field-group ml-field-name">
                    <label htmlFor="fields[name]" className="sans pb2 field-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="input input-text form-control"
                      name="fields[name]"
                      id="fields[name]"
                    />
                  </div>
                  <div className="field field-text field-two-thirds nml ml-field-group ml-field-email ml-validate-required">
                    <label htmlFor="fields[email]" className="sans pb2 field-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="input input-text form-control"
                      name="fields[email]"
                      id="fields[email]"
                      required
                    />
                  </div>
                  <input type="hidden" name="fields[marketing_permissions]" value="Email" />
                  <input type="hidden" name="fields[subfrom]" value="{current_url}" />
                  <input type="hidden" name="ml-submit" value="1" />
                  <div className="form-actions pt2 text-right ml-button-horizontal">
                    <button
                      type="submit"
                      aria-label="Subscribe to the newsletter"
                      className="button button-tertiary ml-hide-horizontal flex-auto"
                    >
                      Sign me up
                    </button>
                    <button
                      disabled="disabled"
                      aria-label="Loading: sending form submission"
                      style={{
                        display: 'none',
                      }}
                      type="button"
                      className="button button-t loading btn btn-block"
                    ></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="pt-2 text-sm text-red-500 w-72 sm:w-96 dark:text-red-400">{message}</div>
      )}
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
