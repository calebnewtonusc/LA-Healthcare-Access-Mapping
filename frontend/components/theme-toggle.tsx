'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { LazyMotion, domAnimation, m } from 'framer-motion'

function subscribe() {
  return () => {}
}

function getSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const { theme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40"
        aria-label="Toggle theme"
        suppressHydrationWarning
      >
        <div className="w-5 h-5" suppressHydrationWarning />
      </button>
    )
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-bg-primary"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-5 h-5">
          <m.div
            initial={false}
            animate={{
              scale: theme === 'dark' ? 0 : 1,
              opacity: theme === 'dark' ? 0 : 1,
              rotate: theme === 'dark' ? 90 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Sun className="w-5 h-5 text-amber-500" />
          </m.div>
          <m.div
            initial={false}
            animate={{
              scale: theme === 'dark' ? 1 : 0,
              opacity: theme === 'dark' ? 1 : 0,
              rotate: theme === 'dark' ? 0 : -90,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Moon className="w-5 h-5 text-neon-cyan" />
          </m.div>
        </div>

        {/* Glow effect on hover in dark mode */}
        {theme === 'dark' && (
          <m.div
            className="absolute inset-0 rounded-lg bg-neon-cyan/20 blur-md -z-10 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
        )}
      </m.button>
    </LazyMotion>
  )
}
