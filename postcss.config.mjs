// CRITICAL: Force disable native bindings to prevent Vercel build failures
// This must be set BEFORE any Tailwind imports
// NAPI_RS_FORCE_WASI is the actual env var that @tailwindcss/oxide checks
if (typeof process !== 'undefined') {
  process.env.NAPI_RS_FORCE_WASI = "1";
  process.env.TAILWIND_DISABLE_NATIVE = "1";
}

const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
