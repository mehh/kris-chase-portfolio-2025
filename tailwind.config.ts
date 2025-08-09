const config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kris: {
          bg: "#161616",
          fg: "#ffffff",
          primary: "#b46633",
          secondary: "#96442e",
          accent: "#ffff00",
          neutral: "#171717",
        },
      },
      fontFamily: {
        sans: ["var(--font-questrial)", "system-ui", "sans-serif"],
        heading: ["var(--font-chakra)", "system-ui", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        kris: {
          "primary": "#96442e",
          "primary-content": "#ffffff",
          "secondary": "#000000",
          "secondary-content": "#ffffff",
          "accent": "#96442e",
          "accent-content": "#ffffff",
          "neutral": "#000000",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f5f5f5",
          "base-300": "#e5e5e5",
          "base-content": "#000000",
          "info": "#96442e",
          "info-content": "#ffffff",
          "success": "#96442e",
          "success-content": "#ffffff",
          "warning": "#96442e",
          "warning-content": "#ffffff",
          "error": "#000000",
          "error-content": "#ffffff",
        },
      },
    ],
    base: false,
    styled: true,
    utils: true,
  },
};

export default config;
