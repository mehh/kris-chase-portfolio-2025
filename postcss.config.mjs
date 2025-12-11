// CRITICAL: Force disable native bindings to prevent Vercel build failures
// This must be set BEFORE any Tailwind imports
if (typeof process !== 'undefined') {
  process.env.TAILWIND_DISABLE_NATIVE = "1";
}

const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
