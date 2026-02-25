import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          "'SF Pro Display'",
          "'SF Pro Text'",
          "'Helvetica Neue'",
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        // Apple iOS/macOS system backgrounds
        'bg-primary': '#f2f2f7',
        'bg-secondary': '#ffffff',
        'bg-tertiary': '#e5e5ea',

        // Dark mode backgrounds (keep existing gray scale)
        'dark-bg-primary': '#111827',
        'dark-bg-secondary': '#1f2937',
        'dark-bg-tertiary': '#374151',

        // iOS system accent colors
        'accent': '#34C759',           // iOS green — healthcare primary
        'accent-hover': '#2db34a',
        'accent-blue': '#007AFF',      // iOS blue — links/CTAs
        'accent-purple': '#AF52DE',    // iOS purple
        'accent-orange': '#FF9500',    // iOS orange — warnings
        'accent-red': '#FF3B30',       // iOS red — errors

        // Text colors — Apple HIG
        'text-primary': '#1c1c1e',
        'text-secondary': '#3a3a3c',
        'text-muted': '#8e8e93',
        'dark-text-primary': '#f9fafb',
        'dark-text-secondary': '#d1d5db',
        'dark-text-muted': '#9ca3af',

        // Legacy aliases — mapped to Apple equivalents
        'neon-cyan': '#007AFF',
        'neon-purple': '#AF52DE',
        'neon-pink': '#FF2D55',
        'neon-green': '#34C759',
      },
      borderRadius: {
        'card': '16px',
        'featured': '20px',
      },
      boxShadow: {
        'apple-sm': '0 1px 6px rgba(0,0,0,0.07)',
        'apple-md': '0 4px 24px rgba(0,0,0,0.10)',
        'apple-lg': '0 8px 40px rgba(0,0,0,0.13)',
      },
    },
  },
  plugins: [],
}
export default config
