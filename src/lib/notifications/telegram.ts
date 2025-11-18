const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // global fallback
const TELEGRAM_DEBUG = process.env.TELEGRAM_DEBUG === 'true';

// Optional per-form overrides so you can route to different channels
const CONTACT_TELEGRAM_CHAT_ID = process.env.CONTACT_TELEGRAM_CHAT_ID;
const PARTNERS_TELEGRAM_CHAT_ID = process.env.PARTNERS_TELEGRAM_CHAT_ID;
const DRUPAL_CANDIDATE_TELEGRAM_CHAT_ID = process.env.DRUPAL_CANDIDATE_TELEGRAM_CHAT_ID;
const PLAN_TELEGRAM_CHAT_ID = process.env.PLAN_TELEGRAM_CHAT_ID; // optional override for plan page views

function ensureConfigured() {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn(
      'Telegram alerts not configured. Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID.'
    );
    return false;
  }
  return true;
}

async function sendTelegramMessage({
  text,
  chatId,
  disableNotification = false,
  timeoutMs = 3000,
}: {
  text: string;
  chatId?: string | null;
  disableNotification?: boolean;
  timeoutMs?: number;
}): Promise<boolean> {
  if (!ensureConfigured()) return false;

  const cid = (chatId || TELEGRAM_CHAT_ID)!;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: cid,
        text,
        // no parse_mode to avoid needing to escape user input; send as plain text
        disable_notification: disableNotification,
      }),
      signal: controller.signal,
    });
    clearTimeout(t);
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {}
    const hasBooleanOk = (x: unknown): x is { ok: boolean } => {
      if (typeof x !== 'object' || x === null) return false;
      const val = (x as Record<string, unknown>).ok;
      return typeof val === 'boolean';
    };
    if (!res.ok || (hasBooleanOk(body) && body.ok === false)) {
      if (TELEGRAM_DEBUG) {
        console.error('Telegram send failed', {
          status: res.status,
          statusText: res.statusText,
          body,
        });
      }
      return false;
    }
    if (TELEGRAM_DEBUG) {
      console.log('Telegram send ok', { body });
    }
    return true;
  } catch (e) {
    if (TELEGRAM_DEBUG) {
      console.error('Telegram sendMessage error:', e);
    }
    return false;
  }
}

export async function sendContactTelegramAlert(payload: {
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
  const lines: string[] = [
    '📩 New Contact Submission',
    `Reason: ${payload.reason}`,
    `Persona: ${payload.persona ?? ''}`,
    `Persona Fit: ${
      payload.persona_fit === null ? '' : payload.persona_fit ? 'yes' : 'no'
    }`,
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
    `UA: ${payload.user_agent ?? ''}`,
    `At: ${payload.created_at}`,
  ];

  return await sendTelegramMessage({ text: lines.join('\n'), chatId: CONTACT_TELEGRAM_CHAT_ID });
}

export async function sendPartnerTelegramAlert(payload: {
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
  const lines: string[] = [
    '🤝 New Partner Submission',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone ?? ''}`,
    `Website: ${payload.website ?? ''}`,
    `Offering: ${payload.offering}`,
    `Classifications: ${payload.classifications}`,
    `Notes: ${payload.notes ?? ''}`,
    `UA: ${payload.user_agent ?? ''}`,
    `At: ${payload.created_at}`,
  ];

  return await sendTelegramMessage({ text: lines.join('\n'), chatId: PARTNERS_TELEGRAM_CHAT_ID });
}

export async function sendPlanViewTelegramAlert(payload: {
  path: string;
  title: string;
  at: string; // ISO timestamp
  ip?: string | null;
  ua?: string | null;
  ref?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  lat?: string | null;
  lon?: string | null;
  tz?: string | null;
  utm?: Record<string, string> | null;
}) {
  const lines: string[] = [
    '🛰️ 90-Day Plan Page View',
    `Path: ${payload.path}`,
    `Title: ${payload.title}`,
    `Ref: ${payload.ref ?? ''}`,
    `IP: ${payload.ip ?? ''}`,
    `Geo: ${[payload.city, payload.region, payload.country].filter(Boolean).join(', ')}`,
    `Coords: ${payload.lat ?? ''}, ${payload.lon ?? ''}`,
    `TZ: ${payload.tz ?? ''}`,
    `UA: ${payload.ua ?? ''}`,
    payload.utm ? `UTM: ${Object.entries(payload.utm).map(([k,v]) => `${k}=${v}`).join(' ')}` : '',
    `At: ${payload.at}`,
  ].filter(Boolean);

  return await sendTelegramMessage({ text: lines.join('\n'), chatId: PLAN_TELEGRAM_CHAT_ID });
}

export async function sendDrupalCandidateTelegramAlert(payload: {
  name: string;
  email: string;
  location: string;
  timezone: string;
  linkedin_url: string;
  portfolio_url: string | null;
  years_experience: number;
  drupal_versions: string;
  drupal_work_types: string;
  relevant_project_url: string;
  biggest_challenge: string;
  skills: string;
  hourly_rate: number;
  weekly_availability: number;
  can_start_dec1: boolean;
  resume_url: string;
  user_agent: string | null;
  created_at: string;
}) {
  const lines: string[] = [
    '💼 New Drupal Candidate Submission',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Location: ${payload.location}`,
    `Timezone: ${payload.timezone}`,
    `LinkedIn: ${payload.linkedin_url}`,
    payload.portfolio_url ? `Portfolio: ${payload.portfolio_url}` : '',
    `Years Experience: ${payload.years_experience}`,
    `Drupal Versions: ${payload.drupal_versions}`,
    `Work Types: ${payload.drupal_work_types}`,
    `Skills: ${payload.skills}`,
    `Hourly Rate: $${payload.hourly_rate}`,
    `Weekly Availability: ${payload.weekly_availability} hours`,
    `Can Start Dec 1: ${payload.can_start_dec1 ? 'Yes' : 'No'}`,
    `Relevant Project: ${payload.relevant_project_url}`,
    `Resume: ${payload.resume_url}`,
    `Biggest Challenge: ${payload.biggest_challenge.slice(0, 200)}${payload.biggest_challenge.length > 200 ? '...' : ''}`,
    `UA: ${payload.user_agent ?? ''}`,
    `At: ${payload.created_at}`,
  ].filter(Boolean);

  return await sendTelegramMessage({ text: lines.join('\n'), chatId: DRUPAL_CANDIDATE_TELEGRAM_CHAT_ID });
}
