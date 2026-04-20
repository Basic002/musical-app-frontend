/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night-bg': '#0F172A',
        'night-card': '#1E293B',
        'neon-violet': '#8B5CF6',
        'neon-cyan': '#22D3EE',
        'night-text': '#94A3B8',
      },
    },
  },
  plugins: [],
}