/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e2',
          100: '#fde4c3',
          200: '#fbc986',
          300: '#f9ae49',
          400: '#f7931e',
          500: '#e67e22',
          600: '#cc6b1b',
          700: '#a85615',
          800: '#854410',
          900: '#6b360c',
        },
        burger: {
          bun: '#d4a574',
          patty: '#5d4037',
          lettuce: '#4caf50',
          tomato: '#e53935',
          cheese: '#ffc107',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
