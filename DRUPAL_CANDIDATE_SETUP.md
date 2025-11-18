# Drupal Candidate Intake Form - Setup Guide

This document outlines the setup and deployment steps for the Drupal Candidate Intake form.

## Overview

The Drupal Candidate Intake form is located at `/drupal-candidate` and allows candidates to submit their information, experience, and resume for Drupal project opportunities.

## Features

- Comprehensive form with validation
- PDF resume upload to Supabase Storage
- Data stored in Supabase `drupal_candidates` table
- Clean, responsive UI matching the partners page design
- Success and error state handling

## Supabase Setup

### Table Schema

The `drupal_candidates` table has been created with the following structure:

```sql
CREATE TABLE public.drupal_candidates (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  timezone TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  portfolio_url TEXT,
  years_experience NUMERIC(4, 1) NOT NULL,
  drupal_versions TEXT NOT NULL,
  drupal_work_types TEXT NOT NULL,
  relevant_project_url TEXT NOT NULL,
  biggest_challenge TEXT NOT NULL,
  skills TEXT NOT NULL,
  hourly_rate NUMERIC(10, 2) NOT NULL,
  weekly_availability INTEGER NOT NULL CHECK (weekly_availability >= 0 AND weekly_availability <= 168),
  can_start_dec1 BOOLEAN NOT NULL,
  resume_url TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Indexes:**
- `idx_drupal_candidates_email` on `email`
- `idx_drupal_candidates_created_at` on `created_at DESC`

### Storage Bucket

The `candidate-resumes` storage bucket has been created with:
- **Public access**: Enabled (for public URL generation)
- **File size limit**: 10MB
- **Allowed MIME types**: `application/pdf` only

**Bucket Configuration:**
- Bucket ID: `candidate-resumes`
- Public: `true`
- File size limit: 10485760 bytes (10MB)
- Allowed MIME types: `['application/pdf']`

## Environment Variables

The following environment variables are required (already configured in your project):

### Required (Already Set)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for server-side operations

These are the same variables used by other forms in your application (partners, contact).

### Optional (For Admin Pages)
- `ADMIN_PASSWORD` - Password to access admin pages at `/admin/drupal-candidates` and `/admin/partners`

See `ADMIN_PAGES_SETUP.md` for more information about the admin pages.

## Local Development

1. **Ensure environment variables are set** in `.env.local`:
   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Test the form**:
   - Navigate to `http://localhost:3000/drupal-candidate`
   - Fill out the form and submit
   - Check Supabase dashboard to verify:
     - Data appears in `drupal_candidates` table
     - Resume file appears in `candidate-resumes` storage bucket

## Production Deployment on Vercel

### Step 1: Verify Environment Variables

Ensure the following environment variables are set in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify these variables exist:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Deploy

The form is ready to deploy. Simply push to your main branch or deploy via Vercel CLI:

```bash
# If using Vercel CLI
vercel --prod

# Or push to main branch (if auto-deploy is enabled)
git push origin main
```

### Step 3: Verify Deployment

After deployment:

1. **Test the form**:
   - Visit `https://yourdomain.com/drupal-candidate`
   - Submit a test form with a PDF resume
   - Verify submission appears in Supabase

2. **Check Supabase**:
   - Go to Supabase Dashboard → Table Editor → `drupal_candidates`
   - Verify new submission appears
   - Go to Storage → `candidate-resumes`
   - Verify PDF file was uploaded

3. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Check `/api/drupal-candidate` function logs for any errors

## Form Fields

### Required Fields
- Name
- Email
- Location
- Timezone
- LinkedIn URL
- Years of Drupal Experience
- Drupal Versions (at least one)
- Types of Drupal Work (at least one)
- Link to Most Relevant Project
- Biggest Challenge Solved in Drupal
- Skills (at least one)
- Hourly Rate
- Weekly Availability
- Can Start Dec 1? (Yes/No)
- Resume (PDF only, max 10MB)

### Optional Fields
- Portfolio URL

## Validation

The form includes both client-side and server-side validation:

- **Client-side**: HTML5 validation + custom file validation
- **Server-side**: 
  - All required fields validated
  - Email format validation
  - URL format validation
  - File type validation (PDF only)
  - File size validation (10MB max)
  - Number range validation (weekly availability: 0-168 hours)

## Security

- All inputs are sanitized before storage
- File uploads are validated for type and size
- Service role key is server-side only (never exposed to client)
- SQL injection protection via parameterized queries
- XSS protection via input sanitization

## Troubleshooting

### File Upload Fails

1. **Check bucket exists**: Verify `candidate-resumes` bucket exists in Supabase Storage
2. **Check bucket permissions**: Ensure bucket is public or service role has access
3. **Check file size**: Ensure file is under 10MB
4. **Check file type**: Ensure file is a PDF

### Form Submission Fails

1. **Check API route logs**: Look for errors in Vercel function logs
2. **Check Supabase connection**: Verify environment variables are correct
3. **Check table exists**: Verify `drupal_candidates` table exists
4. **Check required fields**: Ensure all required fields are filled

### Database Errors

1. **Check table schema**: Verify table structure matches expected schema
2. **Check indexes**: Ensure indexes are created for performance
3. **Check constraints**: Verify CHECK constraints are working correctly

## API Endpoint

**POST** `/api/drupal-candidate`

**Request**: `multipart/form-data`

**Response**:
```json
{
  "ok": true
}
```

**Error Response**:
```json
{
  "ok": false,
  "error": "Error message"
}
```

## Telegram Notifications

The form sends Telegram push notifications when a new candidate submits their information, similar to the contact and partnership forms.

### Configuration

The form uses the same Telegram configuration as your other forms:

**Required:**
- `TELEGRAM_BOT_TOKEN` - Your Telegram bot token
- `TELEGRAM_CHAT_ID` - Default chat ID for notifications

**Optional:**
- `DRUPAL_CANDIDATE_TELEGRAM_CHAT_ID` - Override to send Drupal candidate notifications to a different chat/channel
- `TELEGRAM_DEBUG` - Set to `true` for debug logging

### Notification Content

The Telegram notification includes:
- Candidate name and email
- Location and timezone
- LinkedIn and portfolio URLs
- Years of experience
- Drupal versions and work types
- Skills
- Hourly rate and weekly availability
- Can start Dec 1 status
- Relevant project URL
- Resume URL
- Biggest challenge (truncated to 200 chars)
- User agent and timestamp

### Setup

If you haven't already set up Telegram notifications:

1. Create a Telegram bot via [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Get your chat ID (send a message to your bot, then visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`)
4. Add to `.env.local`:
   ```dotenv
   TELEGRAM_BOT_TOKEN=your-bot-token
   TELEGRAM_CHAT_ID=your-chat-id
   # Optional: route Drupal candidates to a different channel
   DRUPAL_CANDIDATE_TELEGRAM_CHAT_ID=your-drupal-candidates-chat-id
   ```

## Files Created

- `src/app/drupal-candidate/page.tsx` - Main form component
- `src/app/drupal-candidate/layout.tsx` - Page layout with metadata
- `src/app/api/drupal-candidate/route.ts` - API route handler

## Next Steps

1. ✅ Table created in Supabase
2. ✅ Storage bucket created
3. ✅ Form UI implemented
4. ✅ API route implemented
5. ⏭️ Test locally
6. ⏭️ Deploy to production
7. ⏭️ Monitor submissions

## Support

For issues or questions:
- Check Vercel function logs
- Check Supabase dashboard
- Review this documentation
- Contact: kris@krischase.com

