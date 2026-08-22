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
          orange: '#FF6B35', // Primary Sunset Orange
          teal: '#0F766E', // Deep Teal
          gold: '#F4B942', // Saffron Gold
          ivory: '#FFFDF8', // Warm Ivory
          forest: '#102A2A', // Deep Forest
          mint: '#F1F7F5', // Soft Mint
          green: '#2E8B57', // Success Green
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(16, 42, 42, 0.08)',
        'premium-hover': '0 20px 40px -15px rgba(16, 42, 42, 0.15)',
        'glass': '0 8px 32px 0 rgba(15, 118, 110, 0.08)',
      }
    },
  },
  plugins: [],
}
