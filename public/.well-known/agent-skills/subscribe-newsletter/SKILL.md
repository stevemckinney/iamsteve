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

`200 OK` returns `{ "success": true }` &mdash; the subscription was created and
the confirmation email sent.

Every failure returns the same JSON shape, so branch on `error.code` rather
than on the message text.

```json
{
  "error": {
    "code": "MEMBER_EXISTS_WITH_EMAIL_ADDRESS",
    "message": "That email address is already subscribed.",
    "hint": "No action needed. Check the inbox for the confirmation email.",
    "status": 400,
    "documentation": "https://iamsteve.me/openapi.json"
  }
}
```

| Code                               | Status | Meaning                               |
| ---------------------------------- | ------ | ------------------------------------- |
| `EMAIL_REQUIRED`                   | 400    | The body is missing the `email` field |
| `INVALID_JSON`                     | 400    | The body could not be parsed as JSON  |
| `MEMBER_EXISTS_WITH_EMAIL_ADDRESS` | 400    | The address is already on the list    |
| `SUBSCRIPTION_FAILED`              | 4xx    | The provider rejected the address     |
| `NEWSLETTER_UNAVAILABLE`           | 500    | The provider could not be reached     |

The full request and response schemas are published at
[/openapi.json](https://iamsteve.me/openapi.json).

## Notes

Confirm the user actually wants to subscribe before calling this skill, since
the action is observable to the user via the confirmation email.
