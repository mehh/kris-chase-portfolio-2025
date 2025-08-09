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
          primary: "#b46633",
          "primary-content": "#ffffff",
          secondary: "#96442e",
          "secondary-content": "#ffffff",
          accent: "#ffff00",
          "accent-content": "#000000",
          neutral: "#171717",
          "neutral-content": "#ffffff",
          "base-100": "#161616",
          "base-200": "#171717",
          "base-300": "#1f1f1f",
          "base-content": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
    base: false,
    styled: true,
    utils: true,
  },
};

export default config;
