const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // global fallback

// Optional per-form overrides so you can route to different channels
const CONTACT_TELEGRAM_CHAT_ID = process.env.CONTACT_TELEGRAM_CHAT_ID;
const PARTNERS_TELEGRAM_CHAT_ID = process.env.PARTNERS_TELEGRAM_CHAT_ID;

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
}: {
  text: string;
  chatId?: string | null;
  disableNotification?: boolean;
}) {
  if (!ensureConfigured()) return;

  const cid = (chatId || TELEGRAM_CHAT_ID)!;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
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
    });
  } catch (e) {
    console.error('Telegram sendMessage failed:', e);
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

  await sendTelegramMessage({ text: lines.join('\n'), chatId: CONTACT_TELEGRAM_CHAT_ID });
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

  await sendTelegramMessage({ text: lines.join('\n'), chatId: PARTNERS_TELEGRAM_CHAT_ID });
}
