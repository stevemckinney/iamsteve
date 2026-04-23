---
name: subscribe-newsletter
description: Subscribe an email address to the iamsteve.me newsletter.
version: 1.0.0
---

# Subscribe to the newsletter

Use this skill to add a subscriber to the iamsteve.me newsletter on the
user&rsquo;s behalf. The list is double opt-in &mdash; the subscriber receives
a confirmation email before being added.

## When to use

- The user explicitly asks to subscribe to the newsletter.
- The user has authorised you to manage their email subscriptions.

## How it works

Send a `POST` request with a JSON body containing `email`, optionally `name`,
and a free-form `source` string identifying where the subscription came from.

```bash
curl -X POST https://iamsteve.me/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"reader@example.com","name":"Reader","source":"agent"}'
```

## Responses

- `200 OK` with `{ "success": true }` &mdash; subscription created and
  confirmation email sent.
- `400 Bad Request` with `{ "error": "MEMBER_EXISTS_WITH_EMAIL_ADDRESS" }`
  &mdash; the email is already on the list.
- `400 Bad Request` with `{ "error": "Email is required" }` &mdash; the
  request is missing the `email` field.

## Notes

Confirm the user actually wants to subscribe before calling this skill, since
the action is observable to the user via the confirmation email.
