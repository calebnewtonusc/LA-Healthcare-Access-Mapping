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
        // Light mode backgrounds
        'bg-primary': '#ffffff',
        'bg-secondary': '#f8f9fa',
        'bg-tertiary': '#e9ecef',

        // Dark mode backgrounds
        'dark-bg-primary': '#0a0a0f',
        'dark-bg-secondary': '#141420',
        'dark-bg-tertiary': '#1a1a2e',

        // Neon accents (enhanced for dark mode)
        'neon-cyan': '#00f5ff',     // Bright cyan
        'neon-purple': '#b537f2',   // Vibrant purple
        'neon-pink': '#ff2d95',     // Hot pink
        'neon-green': '#39ff14',    // Electric green

        // Professional versions for light mode
        'pro-blue': '#2563eb',
        'pro-purple': '#7c3aed',
        'pro-pink': '#db2777',
        'pro-green': '#059669',

        // Text colors
        'text-primary': '#111827',
        'text-secondary': '#4b5563',
        'text-muted': '#9ca3af',
        'dark-text-primary': '#ffffff',
        'dark-text-secondary': '#a0aec0',
        'dark-text-muted': '#64748b',

        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00f5ff 0%, #b537f2 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(124,58,237,0.05) 100%)',
        'gradient-card-dark': 'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(181,55,242,0.1) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(181, 55, 242, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 45, 149, 0.5)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px var(--neon-cyan), 0 0 10px var(--neon-cyan)' },
          '50%': { boxShadow: '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan), 0 0 30px var(--neon-cyan)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
export default config
