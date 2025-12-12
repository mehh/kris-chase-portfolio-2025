-- Create table to cache AI-generated blog post summaries
-- This saves money by avoiding regenerating summaries on every page load

CREATE TABLE IF NOT EXISTS public.blog_post_summaries (
  id BIGSERIAL PRIMARY KEY,
  post_slug TEXT NOT NULL UNIQUE,
  summary_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups by slug
CREATE INDEX IF NOT EXISTS idx_blog_post_summaries_slug ON public.blog_post_summaries(post_slug);

-- Index for cleanup queries (optional, for finding old summaries)
CREATE INDEX IF NOT EXISTS idx_blog_post_summaries_updated_at ON public.blog_post_summaries(updated_at DESC);

-- Add comment
COMMENT ON TABLE public.blog_post_summaries IS 'Caches AI-generated summaries for blog posts to reduce API costs';
