'use client'

import { forwardRef, useState } from 'react'
import * as Form from '@radix-ui/react-form'
import Button from '@/components/button'

const Submit = forwardRef(function Submit(props, forwardedRef) {
  return <Button {...props} ref={forwardedRef} />
})

const Label = forwardRef(function Label(props, forwardedRef) {
  return (
    <Form.Label className="font-ui text-base lowercase text-fern-1100 leading-none mb-1">
      {props.children}
    </Form.Label>
  )
})

const Input = forwardRef(function Input(props, forwardedRef) {
  return (
    <input
      {...props}
      ref={forwardedRef}
      className={`form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 focus-visible:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_127_218),_0_0_0_6px_rgb(79_127_218_/_0.08)] data-[invalid=true]:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_#E5542B,_0_0_0_5px_rgb(229_84_43_/_0.08)]`}
    />
  )
})

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const formData = new FormData(event.target)

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })

      if (response.ok) {
        setSubmitStatus('success')
        event.target.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form.Root
        className="w-full grid grid-cols-5 gap-8"
        data-netlify="true"
        name="contact"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <Form.Field className="col-span-2 flex flex-col relative" name="name">
          <div className="flex flex-col items-baseline justify-between">
            <Label>Name</Label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
              What do you go by?
            </p>
          </div>
          <Form.Control asChild>
            <Input type="name" required />
          </Form.Control>
          <Form.Message
            className="font-ui text-xs text-rio-600 absolute left-0 top-[100%] pt-2"
            match="valueMissing"
          >
            Please enter your name
          </Form.Message>
        </Form.Field>
        <Form.Field className="col-span-3 flex flex-col relative" name="email">
          <div className="flex flex-col items-baseline justify-between">
            <Label>Email</Label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
              So I can reply to you
            </p>
          </div>
          <Form.Control asChild>
            <Input type="email" required />
          </Form.Control>
          <Form.Message
            className="font-ui text-xs text-rio-600 absolute left-0 top-[100%] pt-2"
            match="valueMissing"
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            className="font-ui text-xs text-rio-600 absolute left-0 top-[100%] pt-2"
            match="typeMismatch"
          >
            Please provide a valid email
          </Form.Message>
        </Form.Field>
        <Form.Field className="col-span-5 flex flex-col relative" name="question">
          <div className="flex flex-col items-baseline justify-between">
            <Label>Message</Label>
            <p className="text-sm text-ui-body opacity-80 leading-none mb-3">
              How can I help?
            </p>
          </div>
          <Form.Control asChild>
            <textarea
              className={`form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 min-h-[11.5rem] focus-visible:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_127_218),_0_0_0_6px_rgb(79_127_218_/_0.08)] data-[invalid=true]:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_#E5542B,_0_0_0_5px_rgb(229_84_43_/_0.08)]`}
              required
            />
          </Form.Control>
          <Form.Message
            className="font-ui text-xs text-rio-600 absolute left-0 top-[100%] pt-2"
            match="valueMissing"
          >
            Please enter a message
          </Form.Message>
        </Form.Field>
        <Form.Submit asChild>
          <button
            className="button-dandelion select-none self-start min-w-fit font-ui text-base/snug lowercase text-dandelion-800 text-center bg-dandelion-300 active:bg-dandelion-400 rounded-sm transition duration-200 shadow-dandelion-placed hover:shadow-dandelion-picked active:shadow-reduced px-8 py-3 flex-auto [--ui-border-color:theme(colors.dandelion.600)] [--ui-border-color-hover:theme(colors.dandelion.700)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </Form.Submit>
      </Form.Root>

      {submitStatus === 'success' && (
        <p className="text-green-600 mt-4">Message sent successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-600 mt-4">Failed to send message. Please try again.</p>
      )}
    </>
  )
}

export default ContactForm
