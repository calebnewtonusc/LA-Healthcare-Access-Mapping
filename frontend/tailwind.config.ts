import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode backgrounds
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#141420',
        'bg-tertiary': '#1a1a2e',

        // Neon accents
        'neon-cyan': '#00f5ff',
        'neon-purple': '#b537f2',
        'neon-pink': '#ff2d95',
        'neon-green': '#39ff14',

        // Text colors
        'text-primary': '#ffffff',
        'text-secondary': '#a0aec0',
        'text-muted': '#64748b',

        // Legacy primary (keeping for compatibility)
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
        'gradient-primary': 'linear-gradient(135deg, #00f5ff 0%, #b537f2 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(181,55,242,0.1) 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(0,245,255,0.3), transparent 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-cyan': '0 0 10px rgba(0,245,255,0.5), 0 0 20px rgba(0,245,255,0.3)',
        'neon-purple': '0 0 10px rgba(181,55,242,0.5), 0 0 20px rgba(181,55,242,0.3)',
        'neon-pink': '0 0 10px rgba(255,45,149,0.5), 0 0 20px rgba(255,45,149,0.3)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgb(0 245 255), 0 0 10px rgb(0 245 255)'
          },
          '50%': {
            boxShadow: '0 0 10px rgb(0 245 255), 0 0 20px rgb(0 245 255), 0 0 30px rgb(0 245 255)'
          },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
