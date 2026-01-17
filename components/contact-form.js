'use client'

import { useState, useEffect } from 'react'
import * as Form from '@radix-ui/react-form'
import * as Toast from '@radix-ui/react-toast'
import Icon from '@/components/icon'

const RATE_LIMIT_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_SUBMISSIONS = 5 // Maximum submissions per hour
const MIN_WORD_COUNT = 8 // Minimum word count for the message
const FORM_DISABLED = true // Set this to true to disable the form

const Label = ({ children, ...props }) => (
  <Form.Label
    className="font-ui text-base lowercase text-emphasis leading-none mb-1"
    {...props}
  >
    {children}
  </Form.Label>
)

const Input = ({ ...props }) => (
  <Form.Control asChild>
    <input
      {...props}
      className="form-input border-0 w-full text-base shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_rgb(79_64_63/0.1)] bg-linear-to-b from-[rgb(79_64_63/0.03)] from-0% to-[rgb(79_64_63/0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 focus-visible:shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_rgb(79_127_218),0_0_0_6px_rgb(79_127_218/0.08)] data-[invalid=true]:shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_#E5542B,0_0_0_5px_rgb(229_84_43/0.08)]"
    />
  </Form.Control>
)

const ContactForm = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    checkRateLimit()
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('success') === 'true') {
      setToastOpen(true)
    }
  }, [])

  const checkRateLimit = () => {
    const submissions = JSON.parse(
      localStorage.getItem('formSubmissions') || '[]'
    )
    const now = Date.now()
    const recentSubmissions = submissions.filter(
      (time) => now - time < RATE_LIMIT_DURATION
    )
    setIsRateLimited(recentSubmissions.length >= MAX_SUBMISSIONS)
  }

  const updateRateLimit = () => {
    const submissions = JSON.parse(
      localStorage.getItem('formSubmissions') || '[]'
    )
    submissions.push(Date.now())
    localStorage.setItem('formSubmissions', JSON.stringify(submissions))
    checkRateLimit()
  }

  const handleMessageChange = (event) => {
    const words = event.target.value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    setWordCount(words.length)
  }
  if (isRateLimited || FORM_DISABLED) {
    return (
      <div className="flex w-full p-12 shadow-placed dark:shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-cornflour-900),transparent_50%)] col-prose flex gap-3 leading-tight bg-cornflour-0 dark:bg-cornflour-900/30 rounded-md p-4 justify-center rounded-sm">
        <p className="m-0 text-cornflour-900 dark:text-cornflour-300/80">
          Form currently unavailable.
        </p>
      </div>
    )
  }

  return (
    <Toast.Provider swipeDirection="right">
      <Form.Root
        className="w-full grid grid-cols-5 gap-8"
        data-netlify="true"
        netlify
        name="contact"
        method="POST"
        action="/contact?success=true"
      >
        <input type="hidden" name="form-name" value="contact" />

        {/* Honeypot field */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="title">
            Title
            <input
              type="radio"
              name="title"
              id="title"
              tabIndex="-1"
              className="opacity-0 absolute w-0 h-0"
            />
          </label>
        </div>

        <Form.Field className="col-span-2 flex flex-col relative" name="name">
          <div className="flex flex-col items-baseline justify-between">
            <Label htmlFor="name">Name</Label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
              What do you go by?
            </p>
          </div>
          <Input type="text" required name="name" id="name" />
          <Form.Message
            className="font-ui text-xs text-rio-600 absolute left-0 top-full pt-2"
            match="valueMissing"
          >
            Please enter your name
          </Form.Message>
        </Form.Field>

        <Form.Field className="col-span-3 flex flex-col relative" name="email">
          <div className="flex flex-col items-baseline justify-between">
            <Label htmlFor="email">Email</Label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
              So I can reply to you
            </p>
          </div>
          <Input type="email" required name="email" id="email" />
          <Form.Message
            className="font-ui text-xs text-rio-600 absolute left-0 top-full pt-2"
            match="valueMissing"
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            className="font-ui text-xs text-rio-600 absolute left-0 top-full pt-2"
            match="typeMismatch"
          >
            Please provide a valid email
          </Form.Message>
        </Form.Field>

        <Form.Field
          className="col-span-5 flex flex-col relative"
          name="message"
        >
          <div className="flex flex-col items-baseline justify-between">
            <Label htmlFor="message">Message</Label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
              How can I help?
            </p>
          </div>
          <Form.Control asChild>
            <textarea
              className="form-input border-0 w-full text-base shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_rgb(79_64_63/0.1)] bg-linear-to-b from-[rgb(79_64_63/0.03)] from-0% to-[rgb(79_64_63/0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 min-h-46 focus-visible:shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_rgb(79_127_218),0_0_0_6px_rgb(79_127_218/0.08)] data-[invalid=true]:shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_#E5542B,0_0_0_5px_rgb(229_84_43/0.08)]"
              required
              name="message"
              id="message"
              onChange={handleMessageChange}
            />
          </Form.Control>
          <p className="text-sm text-ui-body opacity-80 leading-none mt-3">
            Enter at least {MIN_WORD_COUNT} words. Currently used: {wordCount}{' '}
            {wordCount === 1 ? 'word' : 'words'}.
          </p>
          <Form.Message
            className="font-ui text-xs text-rio-600 absolute left-0 top-full pt-2"
            match="valueMissing"
          >
            Please enter a message
          </Form.Message>
          <Form.Message
            className="font-ui text-xs text-rio-600 absolute left-0 top-full pt-2"
            match={(value) => value.trim().split(/\s+/).length < MIN_WORD_COUNT}
          >
            Message must be at least {MIN_WORD_COUNT} words long
          </Form.Message>
        </Form.Field>

        <Form.Submit asChild>
          <button
            className="button-dandelion self-start min-w-fit font-ui text-base/tight lowercase text-center button-dandelion button-dandelion select-none w-full @sm:w-auto @sm:grow-0 flex-auto"
            disabled={wordCount < MIN_WORD_COUNT}
          >
            Send
          </button>
        </Form.Submit>
      </Form.Root>

      <Toast.Root
        className="shadow-placed col-prose flex flex-col gap-1 leading-tight bg-cornflour-0 rounded-md p-4 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut relative"
        open={toastOpen}
        onOpenChange={setToastOpen}
      >
        <Toast.Title className="font-medium">Message sent</Toast.Title>
        <Toast.Description asChild>
          <p className="m-0">Your message has been sent successfully!</p>
        </Toast.Description>
        <Toast.Action asChild altText="Close toast">
          <button className="w-6 h-6 flex items-center justify-center absolute top-0 right-0">
            <Icon icon="close" size={16} />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:--spacing(6)] fixed top-0 right-0 flex flex-col p-(--viewport-padding) gap-4 w-96 max-w-[100vw] list-none z-300 outline-hidden" />
    </Toast.Provider>
  )
}

export default ContactForm
