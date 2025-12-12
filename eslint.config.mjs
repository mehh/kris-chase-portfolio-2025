import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "public/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["scripts/**/*.{js,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-useless-escape": "warn",
    },
  },
  {
    files: ["src/lib/**/*.{js,ts}", "src/app/api/**/*.{js,ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "no-undef": "off", // TypeScript handles this
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
        NodeJS: "readonly",
        EventListener: "readonly",
        AddEventListenerOptions: "readonly",
        NodeListOf: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-undef": "off", // TypeScript handles undefined variables
      "no-unused-vars": "off", // Use TypeScript version instead
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "react-hooks/set-state-in-effect": "warn", // Downgrade to warning
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn", // Allow impure functions for animation configs
      "react/no-unknown-property": [
        "error",
        {
          ignore: [
            "jsx",
            "global",
            "position",
            "args",
            "wireframe",
            "intensity",
            "transparent",
            "emissive",
            "shininess",
            "attach",
          ],
        },
      ],
      "no-redeclare": "warn",
      "react/no-unsafe": "off", // Allow impure functions during render for certain cases
      "no-useless-escape": "off", // Often needed in regex patterns and strings
      "no-empty": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
