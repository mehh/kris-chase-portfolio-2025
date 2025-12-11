# Vercel Build Fix for Tailwind CSS v4 Native Bindings

## Problem
Builds fail with "Failed to load native binding" error from `@tailwindcss/oxide` on first attempt, but succeed on retry. This is a race condition where native bindings aren't available when PostCSS tries to load them.

## Root Cause
The `@tailwindcss/oxide` package checks for `NAPI_RS_FORCE_WASI`, NOT `TAILWIND_DISABLE_NATIVE`. The `TAILWIND_DISABLE_NATIVE` env var is checked elsewhere, but by the time that check happens, the oxide package has already tried to load native bindings.

## Solution Applied

### 1. Environment Variable Configuration
- ✅ `.npmrc` - Sets `NAPI_RS_FORCE_WASI=1` and `TAILWIND_DISABLE_NATIVE=1` during npm install
- ✅ `vercel.json` - Sets both env vars in Vercel build environment
- ✅ `package.json` build script - Sets both env vars in build command
- ✅ `postcss.config.mjs` - Forces env vars before PostCSS loads
- ✅ `next.config.ts` - Sets env vars before any imports

### 2. Additional Steps Required

**IMPORTANT: You must also set these in Vercel Project Settings:**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add TWO environment variables:
   - **Name:** `NAPI_RS_FORCE_WASI` **Value:** `1` (This is the one oxide actually checks!)
   - **Name:** `TAILWIND_DISABLE_NATIVE` **Value:** `1`
   - **Environment:** Production, Preview, and Development (all)
4. Save and redeploy

**Note:** The `NAPI_RS_FORCE_WASI=1` environment variable is the critical one that `@tailwindcss/oxide` actually checks. Without this, the build will still fail even if `TAILWIND_DISABLE_NATIVE=1` is set.

### 3. If Issue Persists

If the build still fails, try:

1. **Clear Vercel Build Cache:**
   - Go to Deployments → Click on failed deployment → "Redeploy" → Check "Clear cache"

2. **Verify Node.js Version:**
   - Ensure `package.json` has `"engines": { "node": "20.x" }`
   - Vercel should use Node 20.x (matches your config)

3. **Alternative: Use Tailwind CSS v3**
   - If v4 continues to cause issues, consider downgrading to v3 until v4 stabilizes

## Files Modified
- `.npmrc` (new)
- `vercel.json` (new)
- `postcss.config.mjs` (updated)
- `next.config.ts` (updated)
- `package.json` (build script already had env var)

