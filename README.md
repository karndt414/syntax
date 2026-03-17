# Syntax Landing Page

## Contact Form Email Delivery & Submission Tracking

The consultation form posts to a serverless endpoint at `/api/contact`, which sends emails via Gmail and stores submissions in Supabase.

### Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file from `.env.example` and set these values:
   - `GMAIL_USER`: your Gmail address
   - `GMAIL_PASSWORD`: a Gmail app password (not your regular password)
   - `SUPABASE_URL`: your Supabase project URL
   - `SUPABASE_KEY`: your Supabase anon key

### Gmail App Password Setup

1. Enable 2-factor authentication on your Google account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Find "App passwords" → select Mail and Windows Computer
4. Copy the generated password and use it as `GMAIL_PASSWORD`

### Supabase Setup

1. Create a table `contact_submissions` with columns:
   - `id` (uuid, primary key)
   - `first_name` (text)
   - `last_name` (text)
   - `email` (text)
   - `company` (text)
   - `service` (text)
   - `message` (text)
   - `created_at` (timestamp)

### Vercel Deployment

Set these environment variables in your Vercel project settings:
- `GMAIL_USER`
- `GMAIL_PASSWORD`
- `SUPABASE_URL`
- `SUPABASE_KEY`

### Notes

- The frontend sends requests to `/api/contact` by default
- The serverless API routes run on Vercel
- If you run only `vite` locally without Vercel functions, the contact form won't work. Use `vercel dev` for local testing with functions
- Form submissions are logged to Supabase and emails are sent to your Gmail address
