import { NextResponse } from 'next/server';
import { sendPlanViewTelegramAlert } from '@/lib/notifications/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function pick<T extends string>(obj: Record<string, string | null | undefined>, keys: T[]): Record<T, string | null> {
  return keys.reduce((acc, k) => {
    acc[k] = (obj[k] ?? null) as string | null;
    return acc;
  }, {} as Record<T, string | null>);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const h = req.headers;

    const path = typeof body.path === 'string' ? body.path : '';
    const title = typeof body.title === 'string' ? body.title : '';
    const ref = typeof body.ref === 'string' ? body.ref : (h.get('referer') || null);
    const utm = (typeof body.utm === 'object' && body.utm) ? body.utm as Record<string,string> : null;

    // IP and geo best-effort from common headers (Vercel/CF compatible)
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('cf-connecting-ip') || null;

    const geo = pick({
      country: h.get('x-vercel-ip-country') || h.get('cf-ipcountry') || null,
      region: h.get('x-vercel-ip-country-region') || null,
      city: h.get('x-vercel-ip-city') || null,
      lat: h.get('x-vercel-ip-latitude') || null,
      lon: h.get('x-vercel-ip-longitude') || null,
      tz: h.get('x-vercel-ip-timezone') || null,
    }, ['country','region','city','lat','lon','tz']);

    const ua = h.get('user-agent');

    const payload = {
      path,
      title,
      at: new Date().toISOString(),
      ip,
      ua,
      ref,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      lat: geo.lat,
      lon: geo.lon,
      tz: geo.tz,
      utm,
    };

    try {
      await sendPlanViewTelegramAlert(payload);
    } catch (e) {
      console.error('plan-view telegram failed', e);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('plan-view POST error:', err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
