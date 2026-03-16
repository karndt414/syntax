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

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return json(res, 500, {
      error: 'Missing email configuration. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.',
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

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: contact.email,
      subject,
      text,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    return json(res, 502, {
      error: 'Email provider rejected the request.',
      details: resendError,
    });
  }

  return json(res, 200, { ok: true });
}