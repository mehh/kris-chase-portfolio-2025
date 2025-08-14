import { createClient } from '@supabase/supabase-js';

// Server-side client with Service Role for trusted inserts via API routes.
// NEVER expose the service role key to the browser.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: { schema: 'public' },
  }
);
