/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "**/*/index.html",
    "**/*.{js,ts,jsx,tsx,vue}",
    "!**/node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        "brand-main": "#414066",
      },
    },
  },
  plugins: [],
};
