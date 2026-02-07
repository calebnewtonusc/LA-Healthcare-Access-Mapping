'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, BookOpen, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-900 dark:text-white" />
        ) : (
          <Menu className="w-6 h-6 text-slate-900 dark:text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-64 bg-white/95 dark:bg-dark-bg-secondary/95 backdrop-blur-xl border-l border-slate-200 dark:border-neon-cyan/30 shadow-2xl dark:shadow-neon-cyan z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                  <h2 className="font-bold text-slate-900 dark:text-dark-text-primary">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6 space-y-2">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:border-neon-cyan/50 border border-transparent transition-all group"
                  >
                    <Home className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors">Home</span>
                  </Link>

                  <Link
                    href="/analysis"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:border-neon-cyan/50 border border-transparent transition-all group"
                  >
                    <BookOpen className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors">Analysis</span>
                  </Link>

                  <Link
                    href="/recommendations"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:border-neon-cyan/50 border border-transparent transition-all group"
                  >
                    <BookOpen className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors">Recommendations</span>
                  </Link>

                  <Link
                    href="/methodology"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:border-neon-cyan/50 border border-transparent transition-all group"
                  >
                    <BookOpen className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors">Methodology</span>
                  </Link>

                  <Link
                    href="/data"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:border-neon-cyan/50 border border-transparent transition-all group"
                  >
                    <BookOpen className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors">Data & API</span>
                  </Link>

                  <Link
                    href="/resources"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:border-neon-cyan/50 border border-transparent transition-all group"
                  >
                    <ExternalLink className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-neon-cyan transition-colors">Resources</span>
                  </Link>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-600 dark:text-dark-text-muted text-center">
                    LA Healthcare Access Dashboard
                  </p>
                  <p className="text-xs text-slate-500 dark:text-dark-text-muted text-center mt-1">
                    Built by <a href="https://calebnewton.me" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-neon-cyan hover:underline">Caleb Newton</a>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
