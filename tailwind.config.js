/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); // Import defaultTheme

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@heroicons/react/**/*.{js,ts,jsx,tsx}'

  ],
  theme: {
    extend: {
      fontFamily: {
        // Make Playfair Display the default font for the 'sans' utility class
        // We use '...defaultTheme.fontFamily.serif' as fallbacks because Playfair Display is a serif font.
        // If you prefer standard sans-serif fallbacks, you could use '...defaultTheme.fontFamily.sans'.
        sans: [`var(--font-playfair)`, ...defaultTheme.fontFamily.serif],

        // Geist Mono is still available if you want to create a `font-mono` utility for it:
        mono: [`var(--font-geist-mono)`, ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}