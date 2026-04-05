import { useRef, useState } from 'react'
import { cn } from '../../../lib/utils'
import ErrorBoundary from './ErrorBoundary'

function Button({ theme, className, children, ...props }: any) {
  const styleVariants: Record<string, string> = {
    dandelion: 'button-dandelion',
  }
  const base = 'select-none font-ui text-base/tight lowercase text-center'
  const style = `${styleVariants[theme] || ''} ${className || ''}`

  if (props.href) {
    return <a {...props} className={`${base} ${style}`}>{children}</a>
  }

  return (
    <button {...props} className={`${base} ${style}`}>
      <span>{children}</span>
    </button>
  )
}

function NewsletterForm({
  className = 'w-full',
  unique = 'footer',
  initialCount = 700,
}: {
  className?: string
  unique?: string
  initialCount?: number
}) {
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputName = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    const email = inputEmail.current?.value || ''
    const name = inputName.current?.value || ''

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

    try {
      const res = await fetch('/api/newsletter', {
        body: JSON.stringify({ email, name, source: '' }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const data = await res.json()

      if (res.status === 500) {
        setError(true)
        setMessage('The server cannot be reached to submit your request.')
      } else if (res.status === 400 && data.error === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
        setError(true)
        setMessage('This email is already subscribed to the newsletter.')
      } else if (!res.ok) {
        setError(true)
        setMessage('There was an error subscribing to the list.')
      } else {
        if (inputEmail.current) inputEmail.current.value = ''
        if (inputName.current) inputName.current.value = ''
        setError(false)
        setSubscribed(true)
        setMessage('Thank you for subscribing! Please check your inbox.')
      }
    } catch {
      setError(true)
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  const inputClasses = cn(
    'form-input', 'border-0', 'w-full', 'text-base',
    'bg-linear-to-b', 'from-[rgb(79_64_63/0.03)]', 'from-0%', 'to-[rgb(79_64_63/0)]', 'to-100%',
    'px-4', 'py-3', 'rounded-sm', 'placeholder-fern-1100/30',
    'shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_rgb(79_64_63/0.1)]',
    'dark:shadow-[inset_0_0_0_1px_var(--color-surface-02)]',
    'focus-visible:shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_rgb(79_127_218),0_0_0_6px_rgb(79_127_218/0.08)]',
    'dark:focus-visible:shadow-[0_-1px_var(--color-cornflour-600),0_0_0_6px_color-mix(in_srgb,_var(--color-cornflour-600),transparent_80%)]',
    'bg-input'
  )

  return (
    <div className={className}>
      {subscribed && (
        <div className="bg-grass-50/40 rounded-sm ring-1 ring-grass-400/40 text-grass-800 px-3 py-2 mb-8">
          {message && <p className="m-0 text-sm">{message}</p>}
        </div>
      )}
      {error && (
        <div className="bg-rio-50/40 rounded-sm ring-1 ring-rio-400/40 text-rio-800 px-3 py-2 mb-8">
          {message && <p className="m-0">{message}</p>}
        </div>
      )}
      <form className={cn('@container', 'flex', 'flex-col', 'gap-10')} onSubmit={subscribe}>
        <div className={cn('@container', 'flex', 'flex-col', '@xl:flex-row', 'gap-6')}>
          <div className={cn('flex', 'flex-col', '@xl:w-2/5')}>
            <label htmlFor={`input-name-${unique}`} className="font-sans text-base font-medium lowercase text-emphasis leading-none mb-1">First name</label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">What do you go by?</p>
            <input type="text" className={inputClasses} name="fields[first_name]" id={`input-name-${unique}`} ref={inputName} disabled={subscribed} />
          </div>
          <div className={cn('flex', 'flex-col', '@xl:w-3/5')}>
            <label htmlFor={`input-email-${unique}`} className="font-sans text-base font-medium lowercase text-emphasis leading-none mb-1">Email</label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">Your best email address</p>
            <input type="email" autoComplete="email" autoCapitalize="none" className={cn(inputClasses, emailError && 'border-red-500')} id={`input-email-${unique}`} name="email_address" ref={inputEmail} required disabled={subscribed} onChange={() => setEmailError('')} />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
        </div>
        <div className="flex flex-col flex-col-reverse @sm:flex-row gap-4 items-center justify-between">
          <p className="m-0 p-0 text-fern-700 flex-1 text-center @sm:text-left">Join {initialCount.toLocaleString()}+ designers</p>
          <Button theme="dandelion" aria-label="Subscribe to the newsletter" className="button-dandelion select-none w-full @sm:w-auto @sm:grow-0 flex-auto font-ui text-base/tight lowercase text-center" disabled={subscribed}>
            Sign me up
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function Subscribe({ title = 'Get the articles', className, unique = 'footer' }: { title?: string; className?: string; unique?: string }) {
  return (
    <section className={`${className || ''} flex flex-col items-center gap-8`}>
      <header className="flex flex-col gap-2 items-center">
        <div className="mb-2 illo-cool" style={{ width: 96, height: 96 }}>
          {/* Envelope illustration placeholder — port from components/illustration */}
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-variation-bold lowercase text-heading text-center">
          {title}
        </h2>
        <p className="m-0 text-base text-ui-body text-balance text-center max-w-[40ch]">
          Join the RSS alternative and I&rsquo;ll notify you when the latest posts go out. Unsubscribe at anytime.
        </p>
      </header>
      <ErrorBoundary>
        <NewsletterForm unique={unique} />
      </ErrorBoundary>
      <p className="text-ui-body text-balance text-sm text-center max-w-[55ch]">
        You will receive two emails to begin with. One to confirm your subscription and then your welcome email&mdash;thanks in advance!
      </p>
    </section>
  )
}
