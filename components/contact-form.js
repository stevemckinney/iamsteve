'use client'

import { useState, useEffect } from 'react'
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Button,
} from 'react-aria-components'
import Icon from '@/components/icon'

const RATE_LIMIT_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_SUBMISSIONS = 5 // Maximum submissions per hour
const MIN_WORD_COUNT = 8 // Minimum word count for the message
const FORM_DISABLED = true // Set this to true to disable the form

const fieldLabelClass =
  'font-ui text-base lowercase text-emphasis leading-none mb-1'
const inputClass =
  'form-input border-0 w-full text-base shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_rgb(79_64_63/0.1)] bg-linear-to-b from-[rgb(79_64_63/0.03)] from-0% to-[rgb(79_64_63/0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 focus-visible:shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_rgb(79_127_218),0_0_0_6px_rgb(79_127_218/0.08)] data-[invalid]:shadow-[0_-1px_rgb(79_64_63/0.2),0_0_0_1px_#E5542B,0_0_0_5px_rgb(229_84_43/0.08)]'
const errorClass = 'font-ui text-xs text-rio-600 absolute left-0 top-full pt-2'

const Toast = ({ open, onOpenChange, title, description }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => onOpenChange(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed top-6 right-6 z-300 w-96 max-w-[calc(100vw-3rem)]">
      <div className="shadow-placed flex flex-col gap-1 leading-tight bg-cornflour-0 rounded-md p-4 relative animate-[slideIn_200ms_ease-out]">
        <p className="font-medium m-0">{title}</p>
        <p className="m-0">{description}</p>
        <button
          onClick={() => onOpenChange(false)}
          className="w-6 h-6 flex items-center justify-center absolute top-0 right-0"
          aria-label="Close"
        >
          <Icon icon="close" size={16} />
        </button>
      </div>
    </div>
  )
}

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

  const handleMessageChange = (value) => {
    const words = value
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
    <>
      <Form
        className="w-full grid grid-cols-5 gap-8"
        data-netlify="true"
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
              type="text"
              name="title"
              id="title"
              tabIndex="-1"
              className="opacity-0 absolute w-0 h-0"
            />
          </label>
        </div>

        <TextField
          className="col-span-2 flex flex-col relative"
          name="name"
          isRequired
        >
          <div className="flex flex-col items-baseline justify-between">
            <Label className={fieldLabelClass}>Name</Label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
              What do you go by?
            </p>
          </div>
          <Input className={inputClass} />
          <FieldError className={errorClass}>Please enter your name</FieldError>
        </TextField>

        <TextField
          className="col-span-3 flex flex-col relative"
          name="email"
          type="email"
          isRequired
        >
          <div className="flex flex-col items-baseline justify-between">
            <Label className={fieldLabelClass}>Email</Label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
              So I can reply to you
            </p>
          </div>
          <Input className={inputClass} />
          <FieldError className={errorClass}>
            Please provide a valid email
          </FieldError>
        </TextField>

        <TextField
          className="col-span-5 flex flex-col relative"
          name="message"
          isRequired
          validate={(value) =>
            value
              .trim()
              .split(/\s+/)
              .filter((w) => w).length < MIN_WORD_COUNT
              ? `Message must be at least ${MIN_WORD_COUNT} words long`
              : null
          }
        >
          <div className="flex flex-col items-baseline justify-between">
            <Label className={fieldLabelClass}>Message</Label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
              How can I help?
            </p>
          </div>
          <TextArea
            className={`${inputClass} min-h-46`}
            onChange={(e) => handleMessageChange(e.target.value)}
          />
          <p className="text-sm text-ui-body opacity-80 leading-none mt-3">
            Enter at least {MIN_WORD_COUNT} words. Currently used: {wordCount}{' '}
            {wordCount === 1 ? 'word' : 'words'}.
          </p>
          <FieldError className={errorClass} />
        </TextField>

        <Button
          type="submit"
          className="button-dandelion self-start min-w-fit font-ui text-base/tight lowercase text-center select-none w-full @sm:w-auto @sm:grow-0 flex-auto"
          isDisabled={wordCount < MIN_WORD_COUNT}
        >
          Send
        </Button>
      </Form>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        title="Message sent"
        description="Your message has been sent successfully!"
      />
    </>
  )
}

export default ContactForm
