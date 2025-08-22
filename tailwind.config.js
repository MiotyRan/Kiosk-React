/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1e40af',
        secondary: '#16a34a', 
        tertiary: '#eab308',
        accent: '#f59e0b',
        success: '#22c55e',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'bounce-in': 'bounce-in 0.4s ease-out',
        'slide-in-up': 'slideInUp 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'confetti-fall': 'confetti-fall 3s ease-in-out',
        'shimmer': 'shimmer 2s infinite',
      },
      backdropBlur: {
        '20': '20px',
      },
      screens: {
        '22inch': '1920px',
      }
    },
  },
  plugins: [],
}