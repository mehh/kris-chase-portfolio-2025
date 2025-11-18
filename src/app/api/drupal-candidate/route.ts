import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/admin';
import { sendDrupalCandidateTelegramAlert } from '../../../lib/notifications/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Helper to sanitize string inputs
function sanitizeString(value: unknown, maxLength = 1000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

// Helper to sanitize URL
function sanitizeUrl(value: unknown): string | null {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    return url.toString();
  } catch {
    return null;
  }
}

// Helper to parse number
function parseNumber(value: unknown, min = 0, max?: number): number | null {
  if (value === null || value === undefined || value === '') return null;
  const num = typeof value === 'number' ? value : parseFloat(String(value));
  if (isNaN(num)) return null;
  if (num < min) return null;
  if (max !== undefined && num > max) return null;
  return num;
}

// Helper to parse boolean from yes/no string
function parseYesNo(value: unknown): boolean | null {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    if (lower === 'yes' || lower === 'true' || lower === '1') return true;
    if (lower === 'no' || lower === 'false' || lower === '0') return false;
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract file first
    const resumeFile = formData.get('resume') as File | null;
    let resumeUrl: string | null = null;

    // Upload resume to Supabase Storage if provided
    if (resumeFile && resumeFile.size > 0) {
      // Validate file type
      if (resumeFile.type !== 'application/pdf') {
        return NextResponse.json(
          { ok: false, error: 'Resume must be a PDF file' },
          { status: 400 }
        );
      }

      // Validate file size (10MB max)
      if (resumeFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { ok: false, error: 'Resume file size must be less than 10MB' },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedName = sanitizeString(formData.get('name') as string, 50)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .slice(0, 30);
      const fileExt = resumeFile.name.split('.').pop() || 'pdf';
      const fileName = `${sanitizedName}-${timestamp}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      // Convert File to ArrayBuffer
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabaseAdmin.storage
        .from('candidate-resumes')
        .upload(filePath, buffer, {
          contentType: 'application/pdf',
          upsert: false,
        });

      if (uploadError) {
        console.error('Supabase storage upload error:', uploadError);
        return NextResponse.json(
          { ok: false, error: 'Failed to upload resume. Please try again.' },
          { status: 500 }
        );
      }

      // Get public URL
      const { data: urlData } = supabaseAdmin.storage
        .from('candidate-resumes')
        .getPublicUrl(filePath);

      resumeUrl = urlData.publicUrl;
    }

    // Extract and sanitize form fields
    const name = sanitizeString(formData.get('name'), 200);
    const email = sanitizeString(formData.get('email'), 200);
    const location = sanitizeString(formData.get('location'), 200);
    const timezone = sanitizeString(formData.get('timezone'), 50);
    const linkedinUrl = sanitizeUrl(formData.get('linkedin_url'));
    const portfolioUrl = sanitizeUrl(formData.get('portfolio_url'));
    const yearsExperience = parseNumber(formData.get('years_experience'), 0);
    const drupalVersions = sanitizeString(formData.get('drupal_versions'), 50);
    const drupalWorkTypes = sanitizeString(formData.get('drupal_work_types'), 200);
    const relevantProjectUrl = sanitizeUrl(formData.get('relevant_project_url'));
    const biggestChallenge = sanitizeString(formData.get('biggest_challenge'), 2000);
    const skills = sanitizeString(formData.get('skills'), 200);
    const hourlyRate = parseNumber(formData.get('hourly_rate'), 0);
    const weeklyAvailability = parseNumber(formData.get('weekly_availability'), 0, 168);
    const canStartDec1 = parseYesNo(formData.get('can_start_dec1'));

    // Validation
    if (!name || !email || !location || !timezone || !linkedinUrl) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (yearsExperience === null) {
      return NextResponse.json(
        { ok: false, error: 'Years of experience is required' },
        { status: 400 }
      );
    }

    if (!drupalVersions) {
      return NextResponse.json(
        { ok: false, error: 'At least one Drupal version must be selected' },
        { status: 400 }
      );
    }

    if (!drupalWorkTypes) {
      return NextResponse.json(
        { ok: false, error: 'At least one type of Drupal work must be selected' },
        { status: 400 }
      );
    }

    if (!relevantProjectUrl) {
      return NextResponse.json(
        { ok: false, error: 'Relevant project URL is required' },
        { status: 400 }
      );
    }

    if (!biggestChallenge) {
      return NextResponse.json(
        { ok: false, error: 'Biggest challenge description is required' },
        { status: 400 }
      );
    }

    if (!skills) {
      return NextResponse.json(
        { ok: false, error: 'At least one skill must be selected' },
        { status: 400 }
      );
    }

    if (hourlyRate === null) {
      return NextResponse.json(
        { ok: false, error: 'Hourly rate is required' },
        { status: 400 }
      );
    }

    if (weeklyAvailability === null) {
      return NextResponse.json(
        { ok: false, error: 'Weekly availability is required' },
        { status: 400 }
      );
    }

    if (canStartDec1 === null) {
      return NextResponse.json(
        { ok: false, error: 'Please indicate if you can start Dec 1' },
        { status: 400 }
      );
    }

    if (!resumeUrl) {
      return NextResponse.json(
        { ok: false, error: 'Resume upload is required' },
        { status: 400 }
      );
    }

    // Build payload
    const payload = {
      name,
      email,
      location,
      timezone,
      linkedin_url: linkedinUrl,
      portfolio_url: portfolioUrl,
      years_experience: yearsExperience,
      drupal_versions: drupalVersions,
      drupal_work_types: drupalWorkTypes,
      relevant_project_url: relevantProjectUrl,
      biggest_challenge: biggestChallenge,
      skills,
      hourly_rate: hourlyRate,
      weekly_availability: weeklyAvailability,
      can_start_dec1: canStartDec1,
      resume_url: resumeUrl,
      user_agent: req.headers.get('user-agent') || null,
      created_at: new Date().toISOString(),
    };

    // Insert into Supabase
    const { error } = await supabaseAdmin.from('drupal_candidates').insert(payload);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    // Await Telegram send in prod to avoid function exit before request flushes
    try {
      const ok = await sendDrupalCandidateTelegramAlert(payload);
      if (!ok) {
        if (process.env.TELEGRAM_DEBUG === 'true') {
          console.error('Drupal candidate Telegram alert returned false');
        }
      }
    } catch (e) {
      console.error('Drupal candidate Telegram alert failed:', e);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Drupal candidate POST error:', err);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

