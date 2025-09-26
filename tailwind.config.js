/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",   // all HTML files in root
    "./src/**/*.js", // if you have JS files using Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
