# Syntax Site + Supabase CMS

The public site now loads all displayed content from Supabase and includes an owner-only admin view at `/admin`.

## What is editable

- Navbar labels and CTA
- Hero text, rotating words, stats, image URL, badge text
- Client marquee list and colors
- Services cards (text, icon path, image URL)
- Process section text, steps, and image URL
- Business model cards and CTA text
- Team members (text and optional image URL)
- Consultation section text, benefits, image URL, button labels
- Footer text, links, services list, and contact info

## Environment variables

Create a `.env` file and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_OWNER_EMAIL`
- `GMAIL_USER`
- `GMAIL_PASSWORD`
- `SUPABASE_URL`
- `SUPABASE_KEY`

Notes:

- The `VITE_` keys are used by the frontend CMS/admin.
- The non-`VITE_` keys are used by the `/api/contact` backend handler.

## Supabase setup

1. Open Supabase SQL editor.
2. Run the SQL script in `supabase/schema.sql`.
3. Replace `owner@example.com` in policies with your real owner email.
4. Confirm there is a public storage bucket named `site-assets`.

## Admin access

1. Visit `/admin`.
2. Sign in with magic link using `VITE_OWNER_EMAIL`.
3. Edit section JSON blocks.
4. Save to update the live site content.

Image upload in admin:

- Uploads to Supabase Storage bucket `site-assets`.
- Set a target path such as `hero.imageUrl` or `services.items.0.image`.
- Upload writes the public URL into the selected content field.

## Local development

- Install dependencies: `npm install`
- Start frontend: `npm run dev`
- For local API routes (`/api/contact`), run `vercel dev` or run an API on `http://localhost:3000`.
- Vite is configured to proxy `/api` requests to `http://localhost:3000` in dev.

## Contact form notes

- Frontend posts to `/api/contact`.
- API sends email via Gmail and records submissions in Supabase.
- If `/api/contact` returns 404 in local dev, start `vercel dev`.
