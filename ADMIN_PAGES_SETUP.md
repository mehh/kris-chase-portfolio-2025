# Admin Pages Setup Guide

This document outlines the password-protected admin pages for viewing form submissions.

## Overview

Admin pages have been created to view and manage form submissions:

1. **Admin Dashboard** (`/admin`) - Main dashboard linking to all admin pages
2. **Contact Submissions** (`/admin/contact`) - View contact form submissions
3. **Partner Submissions** (`/admin/partners`) - View partner/freelancer registrations
4. **Drupal Candidates** (`/admin/drupal-candidates`) - View Drupal candidate intake submissions

All pages are password-protected and provide:
- Full table view of all submissions
- Search/filter functionality
- Sortable columns
- Expandable rows to view all details
- CSV export functionality

## Password Protection

The admin pages use a simple password-based authentication system. The password is stored in an environment variable.

### Environment Variable

Add the following to your `.env.local` file:

```dotenv
ADMIN_PASSWORD=your-secure-password-here
```

**Important**: 
- Use a strong, unique password
- Never commit this password to version control
- Set this in Vercel environment variables for production

### How It Works

1. User visits an admin page
2. They are prompted for a password
3. Password is verified against `ADMIN_PASSWORD` environment variable
4. If correct, they can view the data
5. Password is stored in `sessionStorage` for the session

## Admin Pages

### Admin Dashboard (`/admin`)

The main admin dashboard provides a central hub to access all admin pages. It features:
- Password-protected login
- Card-based navigation to all admin sections
- Quick links to public forms
- Clean, modern UI matching your site design

### Contact Submissions (`/admin/contact`)

**Features:**
- View all contact form submissions
- Search by: name, email, company, message, reason, persona
- Sort by: name, email, reason, persona, created date
- Expandable rows showing:
  - Full contact information
  - Message content
  - Persona details
  - Additional information (budget, start date, role type, etc.)
  - User agent
- Export to CSV

**Columns:**
- Name
- Email
- Reason
- Persona
- Submitted Date
- Actions (View/Hide details)

### Partner Submissions (`/admin/partners`)

**Features:**
- View all Drupal candidate submissions
- Search by: name, email, location, Drupal versions, skills
- Sort by: name, email, location, years experience, hourly rate, can start Dec 1, created date
- Expandable rows showing:
  - Full contact information
  - Experience details
  - Project links
  - Resume download link
- Export to CSV

**Columns:**
- Name
- Email
- Location
- Years Experience
- Hourly Rate
- Can Start Dec 1
- Submitted Date
- Actions (View/Hide details)

### Partner Submissions (`/admin/partners`)

**Features:**
- View all partner/freelancer submissions
- Search by: name, email, service offering, classifications, notes
- Sort by: name, email, service offering, classifications, created date
- Expandable rows showing:
  - Full contact information
  - Service details
  - Notes
  - User agent
- Export to CSV

**Columns:**
- Name
- Email
- Service Offering
- Classifications
- Submitted Date
- Actions (View/Hide details)

## API Endpoints

### GET `/api/admin/drupal-candidates`

Fetches all Drupal candidate submissions.

**Query Parameters:**
- `password` (required): Admin password

**Response:**
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      // ... all candidate fields
    }
  ]
}
```

### GET `/api/admin/contact`

Fetches all contact form submissions.

**Query Parameters:**
- `password` (required): Admin password

**Response:**
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      // ... all contact fields
    }
  ]
}
```

### GET `/api/admin/partners`

Fetches all partner submissions.

**Query Parameters:**
- `password` (required): Admin password

**Response:**
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane@example.com",
      // ... all partner fields
    }
  ]
}
```

## Usage

### Local Development

1. **Set the password** in `.env.local`:
   ```dotenv
   ADMIN_PASSWORD=your-password-here
   ```

2. **Start the dev server**:
   ```bash
   npm run dev
   ```

3. **Visit the admin dashboard**:
   - `http://localhost:3000/admin`
   - Or directly access individual pages:
     - `http://localhost:3000/admin/contact`
     - `http://localhost:3000/admin/partners`
     - `http://localhost:3000/admin/drupal-candidates`

4. **Enter the password** when prompted

### Production (Vercel)

1. **Set environment variable** in Vercel:
   - Go to Project Settings → Environment Variables
   - Add `ADMIN_PASSWORD` with your secure password
   - Deploy or redeploy

2. **Visit the admin dashboard**:
   - `https://yourdomain.com/admin`
   - Or directly access individual pages:
     - `https://yourdomain.com/admin/contact`
     - `https://yourdomain.com/admin/partners`
     - `https://yourdomain.com/admin/drupal-candidates`

3. **Enter the password** when prompted

## Features

### Search/Filter

- Real-time search as you type
- Searches across multiple fields simultaneously
- Case-insensitive matching

### Sorting

- Click column headers to sort
- Click once: ascending
- Click twice: descending
- Click three times: remove sort

### Expandable Rows

- Click "View" to expand a row and see all details
- Click "Hide" to collapse
- Only one row expanded at a time

### CSV Export

- Click "Export CSV" button
- Downloads all visible (filtered) results
- Includes all fields
- Filename includes date: `drupal-candidates-2024-01-15.csv`

## Security Considerations

1. **Password Storage**: Password is stored in `sessionStorage` (client-side) for convenience. This means:
   - Password persists for the browser session
   - Password is cleared when browser is closed
   - Password is not sent in every request (only when needed)

2. **API Protection**: API routes verify the password on each request

3. **Environment Variable**: Never commit `ADMIN_PASSWORD` to version control

4. **HTTPS**: Always use HTTPS in production to protect password transmission

5. **Strong Password**: Use a strong, unique password for production

## Troubleshooting

### "Invalid password" error

- Verify `ADMIN_PASSWORD` is set in environment variables
- Check that the password matches exactly (case-sensitive)
- Clear `sessionStorage` and try again

### No data showing

- Check that submissions exist in Supabase
- Verify API routes are working (check browser console)
- Check Vercel function logs for errors

### CSV export not working

- Check browser console for errors
- Ensure pop-up blocker isn't blocking the download
- Try a different browser

## Files Created

- `src/lib/admin-auth.ts` - Password verification utility
- `src/app/api/admin/contact/route.ts` - API route for contact submissions
- `src/app/api/admin/drupal-candidates/route.ts` - API route for candidates
- `src/app/api/admin/partners/route.ts` - API route for partners
- `src/app/admin/page.tsx` - Main admin dashboard
- `src/app/admin/contact/page.tsx` - Contact submissions admin page
- `src/app/admin/drupal-candidates/page.tsx` - Drupal candidates admin page
- `src/app/admin/partners/page.tsx` - Partners admin page

## Next Steps

1. ✅ Admin pages created
2. ✅ Password protection implemented
3. ✅ Search and sort functionality added
4. ✅ CSV export added
5. ⏭️ Set `ADMIN_PASSWORD` environment variable
6. ⏭️ Test locally
7. ⏭️ Deploy to production

## Support

For issues or questions:
- Check browser console for errors
- Check Vercel function logs
- Verify environment variables are set
- Contact: kris@krischase.com

