/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "**/*/index.html",
    "**/*.{js,ts,jsx,tsx,vue}",
    "!**/node_modules/**",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: " 0px 0px 4px -1px var(--neutral-300)",
        "soft-active": "0px 0px 5px -1px var(--primary-500)",
      },

      colors: {
        "brand-main": "#414066",
        "off-color": "red",

        primary: {
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          DEFAULT: "var(--primary-DEFAULT)",
        },

        neutral: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
        },

        // box-shadow: 0px 0px 4px -1px $primary-5;
      },
    },
  },
  plugins: [],
};
