This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

# Kris Chase Portfolio 2025

A performance‑tuned Next.js 15 (App Router) site featuring custom animations, AI chat with lightweight RAG, and modern DX tooling. This README documents the architecture, integrations, performance choices, and maintenance scripts.

## Stack
- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, DaisyUI, LightningCSS
- **Animation**: Framer Motion, GSAP
- **3D**: React Three Fiber + Three.js
- **Analytics**: PostHog (client + server capture)
- **Email**: Resend
- **DB**: Supabase (server-side admin client)
- **AI**: Vercel AI SDK (`ai`) + OpenAI provider (`@ai-sdk/openai`)

## Project structure
- Pages: `src/app/`
- Components: `src/components/`
- API routes: `src/app/api/`
- Libs: `src/lib/`
- Static: `public/`

## Notable components
- **Custom cursor** — `src/components/TargetCursor.tsx`
  - High‑performance cursor with GSAP; updates throttled via `requestAnimationFrame` and `gsap.quickTo`.
  - Hides over `iframe`/native areas via `data-cursor="native"`.
- **Three.js showcase** — `src/components/ThreeUp.tsx`
  - Lazily mounts `<Canvas>` only when visible (`useInView`).
  - Low‑power GL opts: `antialias: false`, `powerPreference: "low-power"`, constrained `dpr`.
- **Screensaver** — `src/components/Saver.tsx`
  - Canvas text bouncer after inactivity; cleans up RAF/listeners.
- **Page transition overlay** — `src/components/PageTransition.tsx`
- **Decorative background grid** — `src/components/GridScrollBackground.tsx`
  - Images load lazily; scroll‑linked transforms.
- **Smooth section transitions** — `src/components/SmoothScrollProvider.tsx`
- **Machine UI provider** — `src/components/machine/MachineViewProvider.tsx`
- **UnicornStudio splash** — `src/components/UnicornLoader.tsx`

## AI chat
- **Endpoints**:
  - `POST /api/chat` — streams text completions using OpenAI via Vercel AI SDK. See `src/app/api/chat/route.ts`.
  - `POST /api/chat/sources` — returns cited sources used for the answer. See `src/app/api/chat/sources/route.ts`.
- **Model**: `gpt-4o-mini`
- **RAG**: `src/lib/ragStore.ts`
  - Warms on first request: adds FAQs, markdown FAQ, and indexes key site routes using the current origin or `NEXT_PUBLIC_SITE_URL`.
- **Env**:
  - `OPENAI_API_KEY` — required for chat
  - `NEXT_PUBLIC_SITE_URL` — optional; used for indexing when origin not present

## Analytics (PostHog)
- Client setup in `src/app/providers.tsx` with `@posthog/react` and `posthog-js`.
  - Persists UTMs and initial referrer as super properties.
- Server events via lightweight capture helper `src/lib/posthog/server.ts` using REST `/capture`.
- **Env**:
  - `NEXT_PUBLIC_POSTHOG_KEY` (client)
  - `NEXT_PUBLIC_POSTHOG_HOST` (optional, default us cloud)
  - `POSTHOG_KEY` / `POSTHOG_HOST` (server, optional — falls back to public values)

## Contact pipeline
- **Route**: `POST /api/contact` (`src/app/api/contact/route.ts`)
  - Stores submissions to Supabase table `public.contact_submissions` via service role.
  - Sends alert email via Resend (fire‑and‑forget) from `src/lib/notifications/email.ts`.
  - Captures server analytics with PostHog.
- **Env**:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (server only)
  - `RESEND_API_KEY`
  - `ALERT_EMAIL_TO` (comma‑separated allowed)
  - `ALERT_EMAIL_FROM` (optional; defaults to `onboarding@resend.dev`)

## Embeds
- Jellypod player on `/listen` and `/resume` (iframes).
- Cal.com scheduler on `/connect`.
- Supercut video on `/contact`.
- All iframes include `loading="lazy"` and `data-cursor="native"`.

## Performance highlights
- Cursor input throttled with `requestAnimationFrame` + `gsap.quickTo` setters.
- R3F canvases lazily mounted only when in view; low‑power GL config.
- Large decorative images no longer `priority`; use `loading="lazy"`.
- Offscreen/expensive work deferred.

## Environment (.env.local)
```dotenv
# AI
OPENAI_API_KEY=
NEXT_PUBLIC_SITE_URL=

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
# Optional server-side override
POSTHOG_KEY=
POSTHOG_HOST=

# Supabase (server only)
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Email alerts (Resend)
RESEND_API_KEY=
ALERT_EMAIL_TO=you@example.com
ALERT_EMAIL_FROM=onboarding@resend.dev
```

## Scripts
- Dev: `npm run dev` (Turbopack)
- Build: `npm run build`
- Start: `npm start`
- Lint: `npm run lint`
- Fetch brands JSON/XML: `npm run fetch:brands`
- Fetch client logos (Clearbit + normalize): `npm run fetch:logos`

## Logo normalization (ImageMagick)
Script: `scripts/normalize-logos.zsh`

- Prepares consistent transparent tiles for brand walls:
  - Trim, resize into a content box, center on a fixed tile.
- Requirements: zsh, ImageMagick (`brew install imagemagick`).
- Defaults to `public/brands` and writes to `public/brands/brands_normalized`.

Usage:
```bash
# From project root
zsh scripts/normalize-logos.zsh

# Or specify a directory explicitly
zsh scripts/normalize-logos.zsh /absolute/path/to/public/brands
```

## Logo fetch + normalize (Clearbit)
Script: `scripts/fetch-logos.zsh`
 
- Downloads PNGs from Clearbit (`https://logo.clearbit.com/<domain>`) into `public/brands/raw`, then normalizes to white-on-transparent 240×120 tiles in `public/brands/brands_normalized`.
- Requirements: zsh, curl, ImageMagick (`brew install imagemagick`).
 
Usage:
```bash
# From project root (built-in mapping inside the script)
npm run fetch:logos
 
# Or fetch a single logo by slug + domain (outputs to brands_normalized/<slug>.png)
zsh scripts/fetch-logos.zsh travismathew travismathew.com
```

The script implements the same process as:
```zsh
cd "public/brands" || exit 1
OUT="brands_normalized" ; CONTENT_BOX="200x80" ; TILE="240x120"
mkdir -p "$OUT"
setopt null_glob
files=( *.[Pp][Nn][Gg] )
if command -v magick >/dev/null 2>&1; then MAGICK=magick
elif command -v convert >/dev/null 2>&1; then MAGICK=convert
else echo "ImageMagick not found. Install via: brew install imagemagick" ; exit 1
fi
i=0
for f in "${files[@]}"; do
  ((i++))
  echo "[$i/${#files}] Normalizing $f ..."
  "$MAGICK" "$f" -alpha on -trim +repage \
    -resize "$CONTENT_BOX" \
    -gravity center -background none -extent "$TILE" \
    "$OUT/${f:t}"
done
echo "Wrote $i files → $PWD/$OUT"
```

## Notes
- Engine: Node.js 20.x (`package.json#engines`).
- If this app lives inside another repo, prefer a single package manager to avoid nested lockfile warnings (we use Yarn at the root). Consider adding `.npmrc` with `package-lock=false` if using Yarn.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# kris-chase-portfolio-2025
