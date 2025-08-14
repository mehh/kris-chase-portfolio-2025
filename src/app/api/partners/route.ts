import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/admin';

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

    const { error } = await supabaseAdmin
      .from('partner_submissions')
      .insert(payload);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Partners POST error:', err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
