import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/admin';

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
      // dynamic fields
      budget: body.budget ? String(body.budget) : null,
      start: body.start ? String(body.start) : null,
      role_type: body.roleType ? String(body.roleType) : null,
      comp_range: body.compRange ? String(body.compRange) : null,
      advisory_area: body.advisoryArea ? String(body.advisoryArea) : null,
      user_agent: req.headers.get('user-agent'),
      created_at: new Date().toISOString(),
    };

    const { error } = await supabaseAdmin
      .from('contact_submissions')
      .insert(payload);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Contact POST error:', err);
    return NextResponse.json({ ok: false, error: err?.message ?? 'Unknown error' }, { status: 500 });
  }
}
