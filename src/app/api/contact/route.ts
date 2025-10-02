import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/admin';
import { sendContactAlert } from '../../../lib/notifications/email';
import { captureServer } from '@/lib/posthog/server';
import { sendContactTelegramAlert } from '../../../lib/notifications/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic shape validation
    const payload = {
      reason: String(body.reason ?? ''),
      name: String(body.name ?? ''),
      email: String(body.email ?? ''),
      company: body.company ? String(body.company) : null,
      message: String(body.message ?? ''),
      // persona step fields
      persona: body.persona ? String(body.persona) : null,
      persona_fit:
        typeof body.persona_fit === 'boolean'
          ? (body.persona_fit as boolean)
          : typeof body.persona_fit === 'string'
          ? body.persona_fit === 'true'
          : null,
      persona_question: body.persona_question ? String(body.persona_question) : null,
      // dynamic fields
      budget: body.budget ? String(body.budget) : null,
      start: body.start ? String(body.start) : null,
      role_type: body.roleType ? String(body.roleType) : null,
      comp_range: body.compRange ? String(body.compRange) : null,
      advisory_area: body.advisoryArea ? String(body.advisoryArea) : null,
      user_agent: req.headers.get('user-agent'),
      created_at: new Date().toISOString(),
    };

    const distinctId = req.headers.get('x-posthog-distinct-id') || undefined;
    // Fire-and-forget server capture for received submission
    captureServer('contact_submit_received', { reason: payload.reason, persona: payload.persona, persona_fit: payload.persona_fit }, distinctId);

    const { error } = await supabaseAdmin
      .from('contact_submissions')
      .insert(payload);

    if (error) {
      console.error('Supabase insert error:', error);
      captureServer('contact_submit_store_failed', { reason: payload.reason, error: error.message }, distinctId);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    captureServer('contact_submit_stored', { reason: payload.reason }, distinctId);

    // Fire-and-forget email alert; do not block user response
    // and do not fail the request if the email fails.
    sendContactAlert(payload).catch((e) => {
      console.error('Contact alert email failed:', e);
    });

    // Await Telegram send in prod to avoid function exit before request flushes
    try {
      const ok = await sendContactTelegramAlert(payload);
      if (!ok) {
        if (process.env.TELEGRAM_DEBUG === 'true') {
          console.error('Contact Telegram alert returned false');
        }
      }
    } catch (e) {
      console.error('Contact Telegram alert failed:', e);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Contact POST error:', err);
    const distinctId = req.headers.get('x-posthog-distinct-id') || undefined;
    captureServer('contact_submit_server_error', { message }, distinctId);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
