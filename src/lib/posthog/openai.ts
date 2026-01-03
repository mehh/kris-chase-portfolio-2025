/**
 * PostHog-wrapped OpenAI client for LLM analytics
 * Automatically captures $ai_generation and $ai_embedding events
 */

import { OpenAI } from '@posthog/ai';
import { PostHog } from 'posthog-node';

const POSTHOG_KEY = process.env.POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.POSTHOG_HOST || process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

let phClient: PostHog | null = null;
let openaiClient: OpenAI | null = null;

/**
 * Get or create the PostHog client instance
 */
function getPostHogClient(): PostHog | null {
  if (!POSTHOG_KEY) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('PostHog key not found - LLM analytics will be disabled');
    }
    return null;
  }

  if (!phClient) {
    phClient = new PostHog(POSTHOG_KEY, {
      host: POSTHOG_HOST,
    });
  }

  return phClient;
}

/**
 * Get or create the PostHog-wrapped OpenAI client
 * This client automatically captures LLM events to PostHog
 */
export function getPostHogOpenAIClient(apiKey?: string): OpenAI | null {
  const openaiApiKey = apiKey || process.env.OPENAI_API_KEY;
  
  if (!openaiApiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('OpenAI API key not found');
    }
    return null;
  }

  const ph = getPostHogClient();
  if (!ph) {
    // Return a regular OpenAI client if PostHog is not configured
    // This allows the app to work even without PostHog
    return null;
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: openaiApiKey,
      posthog: ph,
    });
  }

  return openaiClient;
}

/**
 * Shutdown PostHog client (call this when the app is shutting down)
 * This ensures all events are flushed before the process exits
 */
export async function shutdownPostHog(): Promise<void> {
  if (phClient) {
    await phClient.shutdown();
    phClient = null;
    openaiClient = null;
  }
}

