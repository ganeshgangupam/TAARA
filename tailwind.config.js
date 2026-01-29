/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#c1121f',
          dark: '#ae1f23',
          offWhite: '#f9f9f9',
          charcoal: '#1a1a1a',
          champagne: '#e8dcca', // Subtle champagne
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
