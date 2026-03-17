import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email'];

function json(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(payload));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed' });
  }

  const { GMAIL_USER, GMAIL_PASSWORD, SUPABASE_URL, SUPABASE_KEY } = process.env;

  if (!GMAIL_USER || !GMAIL_PASSWORD || !SUPABASE_URL || !SUPABASE_KEY) {
    return json(res, 500, {
      error: 'Missing configuration. Set GMAIL_USER, GMAIL_PASSWORD, SUPABASE_URL, and SUPABASE_KEY.',
    });
  }

  const payload = parseBody(req);
  const contact = {
    firstName: payload.firstName?.toString().trim() ?? '',
    lastName: payload.lastName?.toString().trim() ?? '',
    email: payload.email?.toString().trim() ?? '',
    company: payload.company?.toString().trim() ?? '',
    service: payload.service?.toString().trim() ?? '',
    message: payload.message?.toString().trim() ?? '',
  };

  const missingField = REQUIRED_FIELDS.find((field) => !contact[field]);
  if (missingField) {
    return json(res, 400, { error: `Missing required field: ${missingField}` });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(contact.email)) {
    return json(res, 400, { error: 'Please provide a valid email address.' });
  }

  const fullName = `${contact.firstName} ${contact.lastName}`.trim();
  const subject = `New consultation request from ${fullName}`;

  const text = [
    'New consultation request',
    `Name: ${fullName}`,
    `Email: ${contact.email}`,
    `Company: ${contact.company || 'Not provided'}`,
    `Service: ${contact.service || 'Not provided'}`,
    '',
    'Message:',
    contact.message || 'No message provided.',
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New consultation request</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(contact.company || 'Not provided')}</p>
      <p><strong>Service:</strong> ${escapeHtml(contact.service || 'Not provided')}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(contact.message || 'No message provided.')}</p>
    </div>
  `;

  // Initialize Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // Store submission in Supabase
  try {
    await supabase.from('contact_submissions').insert([
      {
        first_name: contact.firstName,
        last_name: contact.lastName,
        email: contact.email,
        company: contact.company,
        service: contact.service,
        message: contact.message,
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (dbError) {
    console.error('Supabase insertion error:', dbError);
    // Continue even if DB insertion fails; email is the priority
  }

  // Send email via Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER,
      replyTo: contact.email,
      subject,
      text,
      html,
    });
  } catch (emailError) {
    console.error('Email send error:', emailError);
    return json(res, 502, {
      error: 'Failed to send email. Please try again.',
    });
  }

  return json(res, 200, { ok: true });
}