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
        // Simple, professional color palette
        // Light mode backgrounds
        'bg-primary': '#ffffff',
        'bg-secondary': '#f8f9fa',

        // Dark mode backgrounds
        'dark-bg-primary': '#0f172a',  // Slate-900
        'dark-bg-secondary': '#1e293b',  // Slate-800

        // Single accent color - professional blue
        'accent': '#3b82f6',  // Blue-500
        'accent-hover': '#2563eb',  // Blue-600

        // Text colors
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
        'text-muted': '#9ca3af',
        'dark-text-primary': '#f1f5f9',
        'dark-text-secondary': '#cbd5e1',
        'dark-text-muted': '#94a3b8',

        // Legacy support for existing neon color references (map to blue)
        'neon-cyan': '#3b82f6',
        'neon-purple': '#3b82f6',
        'neon-pink': '#3b82f6',
        'neon-green': '#3b82f6',
      },
    },
  },
  plugins: [],
}
export default config
