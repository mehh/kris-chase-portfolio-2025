// Ensure Tailwind uses the WASM fallback in environments where native bindings are unavailable
process.env.TAILWIND_DISABLE_NATIVE = process.env.TAILWIND_DISABLE_NATIVE || "1";

const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
