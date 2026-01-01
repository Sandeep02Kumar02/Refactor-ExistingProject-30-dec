/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burger-orange': '#FF6B35',
        'burger-red': '#D62828',
        'burger-yellow': '#F7B801',
        'burger-brown': '#4A3728',
        'burger-cream': '#FFF8F0',
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
