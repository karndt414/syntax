# Syntax Landing Page

## Contact Form Email Delivery

The consultation form now posts to a serverless endpoint at `/api/contact`, which relays the submission through Resend.

Create an `.env` file from `.env.example` and set these values:

- `RESEND_API_KEY`: your Resend API key.
- `CONTACT_TO_EMAIL`: the inbox that should receive consultation requests.
- `CONTACT_FROM_EMAIL`: the sender address used by Resend. For testing, `onboarding@resend.dev` works only within Resend's limits; for production, use a verified domain.
- `VITE_CONTACT_API_URL`: optional override if the frontend needs to call a different deployed API URL.

## Notes

- The frontend sends requests to `/api/contact` by default.
- The serverless function is designed for Vercel-style API routes inside this app directory.
- If you run only `vite` locally, the API route will not exist. Use your deployment environment, or point `VITE_CONTACT_API_URL` at a running backend endpoint.
