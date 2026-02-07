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
      colors: {
        // Minimal professional color palette
        // Light mode backgrounds
        'bg-primary': '#ffffff',
        'bg-secondary': '#f9fafb',
        'bg-tertiary': '#f3f4f6',

        // Dark mode backgrounds - simple gray scale
        'dark-bg-primary': '#111827',  // Gray-900
        'dark-bg-secondary': '#1f2937',  // Gray-800
        'dark-bg-tertiary': '#374151',  // Gray-700

        // Single accent color - minimal blue
        'accent': '#2563eb',  // Blue-600
        'accent-hover': '#1d4ed8',  // Blue-700

        // Text colors
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
        'text-muted': '#9ca3af',
        'dark-text-primary': '#f9fafb',
        'dark-text-secondary': '#d1d5db',
        'dark-text-muted': '#9ca3af',

        // Legacy neon colors - all map to gray/blue for consistency
        'neon-cyan': '#2563eb',
        'neon-purple': '#2563eb',
        'neon-pink': '#2563eb',
        'neon-green': '#10b981',
      },
    },
  },
  plugins: [],
}
export default config
