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
          orange: '#FF7A00',        // Primary sunset orange
          'orange-light': '#FF8A00', // Lighter orange accent
          secondary: '#E85D04',      // Deep orange secondary
          teal: '#E85D04',           // Alias for secondary (legacy compatibility)
          gold: '#F5A623',           // Saffron gold highlights
          ivory: '#FFFDF8',          // Warm off-white background
          cream: '#FAF7F0',          // Soft cream background
          forest: '#171717',         // Primary dark text
          brown: '#2A211C',          // Rich brown text
          muted: '#6B625B',          // Muted supporting text
          border: '#E8DED2',         // Warm beige borders
          'soft-orange': '#FFF1E3',  // Soft orange tint backgrounds
          mint: '#FAF7F0',           // Warm off-white alternative
          green: '#3F6B38',          // Success green
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(42, 33, 28, 0.08)',
        'premium-hover': '0 20px 40px -15px rgba(42, 33, 28, 0.15)',
        'glass': '0 8px 32px 0 rgba(255, 122, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
