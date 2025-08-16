import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ALERT_EMAIL_TO = process.env.ALERT_EMAIL_TO; // e.g. you@yourdomain.com (can be comma-separated for multiple)
// Use Resend's onboarding sender by default so this works without domain verification
const ALERT_EMAIL_FROM = process.env.ALERT_EMAIL_FROM || 'onboarding@resend.dev';

function getResendClient() {
  if (!RESEND_API_KEY) return null;
  try {
    return new Resend(RESEND_API_KEY);
  } catch (e) {
    console.error('Failed to init Resend:', e);
    return null;
  }
}

function ensureConfigured() {
  if (!RESEND_API_KEY || !ALERT_EMAIL_TO) {
    console.warn('Email alerts not configured. Missing RESEND_API_KEY or ALERT_EMAIL_TO.');
    return false;
  }
  return true;
}

export async function sendContactAlert(payload: {
  reason: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  persona: string | null;
  persona_fit: boolean | null;
  persona_question: string | null;
  budget: string | null;
  start: string | null;
  role_type: string | null;
  comp_range: string | null;
  advisory_area: string | null;
  user_agent: string | null;
  created_at: string;
}) {
  if (!ensureConfigured()) return;
  const resend = getResendClient();
  if (!resend) return;

  const subject = `New Contact Submission: ${payload.reason || 'General'}${payload.persona ? ` · ${payload.persona}` : ''}`;

  const lines: string[] = [
    `Reason: ${payload.reason}`,
    `Persona: ${payload.persona ?? ''}`,
    `Persona Fit: ${payload.persona_fit === null ? '' : payload.persona_fit ? 'yes' : 'no'}`,
    `Persona Question: ${payload.persona_question ?? ''}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company ?? ''}`,
    `Message: ${payload.message}`,
    `Budget: ${payload.budget ?? ''}`,
    `Start: ${payload.start ?? ''}`,
    `Role Type: ${payload.role_type ?? ''}`,
    `Comp Range: ${payload.comp_range ?? ''}`,
    `Advisory Area: ${payload.advisory_area ?? ''}`,
    `User-Agent: ${payload.user_agent ?? ''}`,
    `Created: ${payload.created_at}`,
  ];

  const text = lines.join('\n');
  const html = `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space: pre-wrap;">${
    lines.map((l) => l.replace(/</g, '&lt;')).join('\n')
  }</pre>`;

  await resend.emails.send({
    to: (ALERT_EMAIL_TO || '').split(',').map((s) => s.trim()).filter(Boolean),
    from: ALERT_EMAIL_FROM,
    subject,
    text,
    html,
  });
}

export async function sendPartnerAlert(payload: {
  name: string;
  email: string;
  phone: string | null;
  website: string | null;
  offering: string;
  classifications: string;
  notes: string | null;
  user_agent: string | null;
  created_at: string;
}) {
  if (!ensureConfigured()) return;
  const resend = getResendClient();
  if (!resend) return;

  const subject = `New Partner Submission: ${payload.name || payload.email}`;

  const lines: string[] = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone ?? ''}`,
    `Website: ${payload.website ?? ''}`,
    `Offering: ${payload.offering}`,
    `Classifications: ${payload.classifications}`,
    `Notes: ${payload.notes ?? ''}`,
    `User-Agent: ${payload.user_agent ?? ''}`,
    `Created: ${payload.created_at}`,
  ];

  const text = lines.join('\n');
  const html = `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space: pre-wrap;">${
    lines.map((l) => l.replace(/</g, '&lt;')).join('\n')
  }</pre>`;

  await resend.emails.send({
    to: (ALERT_EMAIL_TO || '').split(',').map((s) => s.trim()).filter(Boolean),
    from: ALERT_EMAIL_FROM,
    subject,
    text,
    html,
  });
}
