/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          200: '#8F5835',
        },
        tan: {
          200: '#FFDBA1',
          300: '#C2A06E',
        },
      },
    },
  },
  plugins: [],
}