# PostHog Tracking Events Schema

This document describes all tracking events implemented across the application. All events follow the naming convention: `{category}_{action}_{object}`.

## Event Naming Convention

- **Format**: `{category}_{action}_{object}`
- **Examples**: `hero_cta_clicked`, `blog_post_viewed`, `nav_link_clicked`
- **Categories**: hero, nav, footer, blog, contact, page, scroll, performance, error

## Standard Properties

All events automatically include these properties via `src/lib/posthog/client.ts`:

- `page_path` - Current page path
- `page_title` - Document title
- `page_url` - Full URL
- `referrer` - Referrer URL or "direct"
- `user_agent` - Browser user agent
- `device_type` - "mobile" or "desktop"
- `browser` - Browser name (chrome, firefox, safari, edge, other)
- `session_id` - PostHog session ID (if available)
- `user_id` - PostHog distinct ID (if available)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` - UTM parameters (if present)

## Page View Events

### `$pageview`
**Description**: Automatic pageview tracking on every route change  
**Properties**: 
- Standard properties (see above)
- `page_name` (optional) - Custom page name

### `{page_name}_viewed`
**Description**: Page-specific view events with additional metadata  
**Events**:
- `home_viewed` - Homepage viewed
- `blog_listing_viewed` - Blog index page viewed
  - `post_count` - Total number of blog posts
  - `featured_count` - Number of featured posts
- `blog_post_viewed` - Individual blog post viewed
  - `post_slug` - Post slug
  - `post_title` - Post title
  - `post_category` - Post category
  - `post_tags` - Array of tags
  - `reading_time` - Estimated reading time in minutes
  - `word_count` - Word count
- `contact_viewed` - Contact page viewed
- `resume_viewed` - Resume page viewed
- `connect_viewed` - Connect page viewed
- `connect_60_viewed` - Connect 60-minute page viewed
- `partners_viewed` - Partners page viewed
- `testimonials_viewed` - Testimonials page viewed
  - `testimonial_count` - Number of testimonials
- `how_i_operate_viewed` - How I Operate page viewed
- `faq_viewed` - FAQ page viewed
  - `faq_count` - Number of FAQ items
- `listen_viewed` - Listen page viewed
- `aspect_90_day_plan_viewed` - Aspect 90-day plan page viewed
- `handoff_90_day_plan_viewed` - Handoff 90-day plan page viewed
- `tithely_90_day_plan_viewed` - Tithely 90-day plan page viewed
- `drupal_candidate_viewed` - Drupal candidate page viewed

## Hero Section Events

### `hero_persona_selected`
**Description**: User selected a persona pill (founders, cto, product, investor)  
**Properties**:
- `persona_id` - Persona identifier (founders, cto, product, investor)
- `persona_label` - Human-readable persona label
- `interaction_type` - "hover" or "click"

### `hero_cta_clicked`
**Description**: User clicked the primary CTA button in hero section  
**Properties**:
- `persona_id` - Current persona ID
- `persona_label` - Current persona label
- `cta_label` - CTA button text
- `cta_destination` - CTA destination URL

### `hero_stats_viewed`
**Description**: User hovered over a proof point/stat  
**Properties**:
- `stat_id` - Stat identifier
- `stat_label` - Stat label text
- `stat_value` - Stat numeric value
- `stat_suffix` - Stat suffix (%, +, etc.)
- `persona_id` - Current persona ID

## Navigation Events

### `nav_link_clicked`
**Description**: User clicked a navigation link  
**Properties**:
- `label` - Link label text
- `href` - Link destination
- `is_external` - Boolean indicating if link is external

### `nav_cta_clicked`
**Description**: User clicked the "Get in Touch" CTA in navigation  
**Properties**:
- `label` - "Get in Touch"
- `href` - Destination URL
- `is_external` - false

## Footer Events

### `footer_cta_clicked`
**Description**: User clicked the footer CTA button  
**Properties**:
- `destination` - CTA destination URL
- `cta_title` - CTA title text
- `page_path` - Current page path

### `footer_link_clicked`
**Description**: User clicked a footer link  
**Properties**:
- `label` - Link label
- `href` - Link destination
- `is_external` - Boolean

## Blog Events

### `blog_card_clicked`
**Description**: User clicked a blog card to view a post  
**Properties**:
- `post_slug` - Post slug
- `post_title` - Post title
- `post_category` - Post category
- `is_featured` - Boolean indicating if card is featured

### `blog_tools_link_clicked`
**Description**: User clicked the "Executive Tools" link on blog pages  
**Properties**:
- `context` - "blog_listing" or "blog_post"
- `url` - Link URL (https://exec-tech.tools)
- `post_slug` - Post slug (if on blog post page)

### `blog_shared`
**Description**: User shared a blog post  
**Properties**:
- `platform` - "x", "linkedin", or "copy_link"
- `post_slug` - Post slug
- `post_title` - Post title

### `blog_back_clicked`
**Description**: User clicked "Back to Blog" from a post  
**Properties**:
- `from_post_slug` - Post slug user was viewing
- `from_post_title` - Post title

### `blog_toc_clicked`
**Description**: User clicked a table of contents link  
**Properties**:
- `section_id` - Heading ID
- `section_text` - Heading text

### `blog_related_clicked`
**Description**: User clicked a related/adjacent post link  
**Properties**:
- `direction` - "previous" or "next"
- `from_post_slug` - Current post slug
- `to_post_slug` - Target post slug
- `to_post_title` - Target post title

### `blog_reading_time`
**Description**: User spent time reading a blog post (tracked on unmount)  
**Properties**:
- `post_slug` - Post slug
- `post_title` - Post title
- `estimated_reading_time` - Estimated time in seconds
- `actual_reading_time` - Actual time spent in seconds
- `reading_completion` - Percentage of estimated time (0-100)

## Contact Form Events

### `contact_viewed`
**Description**: Contact page was viewed  
**Properties**: Standard properties only

### `contact_form_started`
**Description**: User started filling out the contact form  
**Properties**:
- `reason` - Form reason (job, contract, advisory, other)

### `contact_step_viewed`
**Description**: User viewed a specific step in the contact form  
**Properties**:
- `step` - Current step number (1-4)
- `total_steps` - Total number of steps
- `persona` - Selected persona (if any)
- `qualifier` - Qualifier answer (yes/no, if any)

### `contact_step_next`
**Description**: User advanced to the next step  
**Properties**:
- `from_step` - Previous step number
- `to_step` - New step number
- `total_steps` - Total number of steps

### `contact_step_back`
**Description**: User went back to a previous step  
**Properties**:
- `from_step` - Current step number
- `to_step` - Previous step number
- `total_steps` - Total number of steps

### `contact_persona_selected`
**Description**: User selected a persona in the contact form  
**Properties**:
- `persona` - Selected persona value

### `contact_qualifier_selected`
**Description**: User answered the qualifier question  
**Properties**:
- `persona` - Current persona
- `fit` - Boolean indicating if persona fits (true/false)

### `contact_submit_attempted`
**Description**: User attempted to submit the contact form  
**Properties**:
- `reason` - Form reason
- `persona` - Selected persona

### `contact_submit_succeeded`
**Description**: Contact form was successfully submitted  
**Properties**:
- `reason` - Form reason
- `persona` - Selected persona
- `time_to_complete_seconds` - Time from start to submission
- `steps_taken` - Number of unique steps visited
- `unique_steps` - Array of step numbers visited
- `form_completed` - true

### `contact_form_completed`
**Description**: Contact form funnel completion event  
**Properties**:
- `reason` - Form reason
- `persona` - Selected persona
- `time_to_complete_seconds` - Total time to complete
- `steps_taken` - Number of steps visited
- `qualifier` - Qualifier answer

### `contact_submit_failed`
**Description**: Contact form submission failed  
**Properties**:
- `reason` - Form reason
- `message` - Error message

### `contact_success_shown`
**Description**: Success view was displayed after form submission  
**Properties**: Standard properties only

### `contact_success_cta_clicked`
**Description**: User clicked a CTA in the success view  
**Properties**:
- `target` - "connect" or "home"

## Engagement Events

### `scroll_depth_reached`
**Description**: User scrolled to a milestone depth  
**Properties**:
- `depth` - Milestone percentage (25, 50, 75, 100)
- `depth_percentage` - Actual scroll percentage
- `page_height` - Total page height in pixels
- `scroll_position` - Current scroll position

### `time_on_page`
**Description**: User spent a certain amount of time on page  
**Properties**:
- `seconds` - Total seconds elapsed
- `interval` - Milestone interval (10, 30, 60, 120, 300)

### `page_engagement`
**Description**: Final engagement metrics when user leaves page  
**Properties**:
- `total_time_seconds` - Total time on page
- `final_scroll_depth` - Final scroll depth percentage
- `reached_min_depth` - Boolean indicating if minimum depth was reached

## Performance Events

### `web_vital_measured`
**Description**: Core Web Vital metric was measured  
**Properties**:
- `metric` - Metric name ("LCP", "FID", "CLS", "TTFB")
- `value` - Metric value
- `unit` - Unit of measurement ("ms", "score")
- `rating` - Performance rating ("good", "needs-improvement", "poor")
- `shift_count` - Number of layout shifts (CLS only)

### `page_load_time`
**Description**: Page load performance metrics  
**Properties**:
- `load_time_ms` - Total load time
- `dom_content_loaded` - DOMContentLoaded time
- `first_paint` - First paint time
- `first_contentful_paint` - First contentful paint time

### `custom_performance_metric`
**Description**: Custom performance metric  
**Properties**:
- `metric_name` - Name of the metric
- `value` - Metric value
- `unit` - Unit of measurement

### `api_response_time`
**Description**: API endpoint response time  
**Properties**:
- `endpoint` - API endpoint path
- `method` - HTTP method
- `duration_ms` - Response time in milliseconds
- `status_code` - HTTP status code
- `rating` - Performance rating ("fast", "moderate", "slow")

## Error Events

### `javascript_error`
**Description**: JavaScript error occurred  
**Properties**:
- `error_message` - Error message
- `error_source` - Source file URL
- `error_line` - Line number
- `error_column` - Column number
- `error_stack` - Stack trace
- `error_type` - Error type/name

### `unhandled_promise_rejection`
**Description**: Unhandled promise rejection occurred  
**Properties**:
- `error_message` - Rejection reason/message
- `error_stack` - Stack trace
- `error_type` - Error type/name

### `api_error`
**Description**: API request error  
**Properties**:
- `endpoint` - API endpoint
- `method` - HTTP method
- `status_code` - HTTP status code
- `error_message` - Error message
- `error_category` - "server_error", "client_error", or "unknown"

### `page_not_found`
**Description**: 404 page not found  
**Properties**:
- `path` - Requested path
- `referrer` - Referrer URL

## Chat Widget Events

### `chat_opened`
**Description**: Chat widget was opened  
**Properties**:
- `path` - Current page path

### `chat_message_sent`
**Description**: User sent a message in chat  
**Properties**:
- `length` - Message length in characters

### `chat_response_stream_complete`
**Description**: Chat response streaming completed  
**Properties**:
- `question_length` - Original question length

### `chat_sources_fetched`
**Description**: Chat sources were fetched  
**Properties**:
- `count` - Number of sources

### `chat_error`
**Description**: Chat error occurred  
**Properties**:
- Error details (varies)

### `chat_suggestion_clicked`
**Description**: User clicked a chat suggestion  
**Properties**:
- `text` - Suggestion text
- `length` - Text length

## Resume Events

### `resume_download_clicked`
**Description**: User clicked resume download button  
**Properties**:
- `href` - Resume file path

### `resume_referral_landing`
**Description**: User landed on resume page with referral parameters  
**Properties**:
- `path` - Page path
- `query` - Query string
- UTM parameters (if present)
- Custom referral parameters (if present)

## Machine View Events

### `machine_toggle_clicked`
**Description**: User toggled the machine view  
**Properties**: Standard properties only

## External Link Events

### `external_link_clicked`
**Description**: User clicked an external link  
**Properties**:
- `url` - External URL
- `context` - Context where link was clicked (e.g., "footer", "blog_listing", "blog_post")
- `label` - Link label/text (optional)
- `post_slug` - Post slug (if on blog post)

## Server-Side Events

Server-side events use the same naming convention but are captured via `src/lib/posthog/server.ts`:

### `contact_submit_received`
**Description**: Contact form submission received on server  
**Properties**:
- `reason` - Form reason
- `persona` - Selected persona
- `persona_fit` - Qualifier answer
- Server context (IP, user agent, request ID, etc.)

### `contact_submit_stored`
**Description**: Contact form data stored successfully  
**Properties**:
- `reason` - Form reason
- Server context

### `contact_submit_store_failed`
**Description**: Failed to store contact form data  
**Properties**:
- `reason` - Form reason
- `error` - Error message
- Server context

### `contact_submit_server_error`
**Description**: Server error during contact form processing  
**Properties**:
- `message` - Error message
- Server context

### `chat_api_request`
**Description**: Chat API request received  
**Properties**:
- `length` - Message length
- `path` - API path
- Server context

### `chat_api_error`
**Description**: Chat API error  
**Properties**:
- `message` - Error message
- Server context

### `chat_sources_request`
**Description**: Chat sources API request received  
**Properties**:
- `length` - Message length
- `path` - API path
- Server context

### `chat_sources_returned`
**Description**: Chat sources returned successfully  
**Properties**:
- `count` - Number of sources
- Server context

### `chat_sources_error`
**Description**: Chat sources API error  
**Properties**:
- `message` - Error message
- Server context

## Implementation Notes

1. **Error Handling**: All tracking calls are wrapped in try-catch blocks to prevent breaking the application
2. **Performance**: Events are debounced where appropriate (scroll, hover)
3. **Privacy**: Email addresses are hashed before being used as distinct IDs
4. **Context**: All events automatically include page context via `src/lib/posthog/client.ts`
5. **Server Events**: Server-side events include additional context (IP, request ID, environment)

## Usage Examples

### Client-Side Tracking

```typescript
import { capture } from '@/lib/posthog/client';

// Simple event
capture('button_clicked', { button_id: 'submit' });

// Using the hook
import { useTracking } from '@/hooks/useTracking';
const { track } = useTracking();
track('custom_event', { property: 'value' });
```

### Server-Side Tracking

```typescript
import { captureServer } from '@/lib/posthog/server';

await captureServer('api_request', { endpoint: '/api/data' }, distinctId, headers);
```

### Scroll Tracking

```typescript
import { useScrollTracking } from '@/hooks/useScrollTracking';

useScrollTracking({ 
  trackScrollDepth: true, 
  trackTimeOnPage: true,
  minScrollDepth: 0.25 
});
```

## PostHog Dashboard Setup

Recommended dashboards to create:

1. **Conversion Funnel**: Contact form steps (viewed → started → step 1 → step 2 → step 3 → completed)
2. **Blog Engagement**: Blog discovery → read → share funnel
3. **CTA Performance**: Click-through rates for all CTAs
4. **Page Performance**: Core Web Vitals trends
5. **User Journey**: Most common navigation paths
6. **Error Monitoring**: JavaScript errors and API errors
