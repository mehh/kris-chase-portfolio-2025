import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/admin';
import { sendPartnerAlert } from '../../../lib/notifications/email';
import { sendPartnerTelegramAlert } from '../../../lib/notifications/telegram';
import { identifyServer } from '@/lib/posthog/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      name: String(body.name ?? ''),
      email: String(body.email ?? ''),
      phone: body.phone ? String(body.phone) : null,
      website: body.website ? String(body.website) : null,
      offering: String(body.offering ?? ''),
      classifications: String(body.classifications ?? ''),
      notes: body.notes ? String(body.notes) : null,
      user_agent: req.headers.get('user-agent'),
      created_at: new Date().toISOString(),
    };

    // Identify user with name and email if provided
    const distinctId = req.headers.get('x-posthog-distinct-id');
    if (payload.name && payload.email && distinctId) {
      identifyServer(distinctId, {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        website: payload.website,
      }, req.headers);
    }

    const { error } = await supabaseAdmin
      .from('partner_submissions')
      .insert(payload);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Fire-and-forget partner alert email
    sendPartnerAlert(payload).catch((e) => {
      console.error('Partner alert email failed:', e);
    });

    // Await Telegram send in prod to avoid function exit before request flushes
    try {
      const ok = await sendPartnerTelegramAlert(payload);
      if (!ok) {
        if (process.env.TELEGRAM_DEBUG === 'true') {
          console.error('Partner Telegram alert returned false');
        }
      }
    } catch (e) {
      console.error('Partner Telegram alert failed:', e);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Partners POST error:', err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
