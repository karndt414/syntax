-- Run this in Supabase SQL editor.

create table if not exists public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- Replace this with the owner email used by your admin sign-in.
-- You can also replace this check with a different user-id based rule.
create policy "public can read site content"
on public.site_content
for select
using (true);

create policy "owner can upsert site content"
on public.site_content
for all
using (auth.jwt() ->> 'email' = 'owner@example.com')
with check (auth.jwt() ->> 'email' = 'owner@example.com');

insert into public.site_content (key, data)
values ('homepage', '{}'::jsonb)
on conflict (key) do nothing;

-- Create a storage bucket for editable uploaded assets.
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy "public can read site assets"
on storage.objects
for select
using (bucket_id = 'site-assets');

create policy "owner can manage site assets"
on storage.objects
for all
using (
  bucket_id = 'site-assets'
  and auth.jwt() ->> 'email' = 'owner@example.com'
)
with check (
  bucket_id = 'site-assets'
  and auth.jwt() ->> 'email' = 'owner@example.com'
);
