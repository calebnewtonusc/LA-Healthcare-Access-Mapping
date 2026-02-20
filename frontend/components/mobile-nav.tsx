'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X, Home, BookOpen, Info, ChevronDown } from 'lucide-react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Close on Escape key press and trap focus inside panel
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      }

      // Focus trap
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-900 dark:text-white" />
        ) : (
          <Menu className="w-6 h-6 text-slate-900 dark:text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm z-40 md:hidden"
              />

              {/* Menu Panel */}
              <m.div
                ref={menuRef}
                id="mobile-nav-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-72 bg-white/95 dark:bg-dark-bg-secondary/95 backdrop-blur-xl border-l border-slate-200 dark:border-neon-cyan/30 shadow-2xl dark:shadow-neon-cyan z-50 md:hidden"
              >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                  <h2 className="font-bold text-slate-900 dark:text-dark-text-primary">Navigation</h2>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5 text-slate-600 dark:text-dark-text-secondary" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6 space-y-1 overflow-y-auto" aria-label="Mobile navigation">
                  {/* Primary Navigation */}
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Home className="w-5 h-5 text-slate-500 dark:text-dark-text-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-dark-text-primary transition-colors">Home</span>
                  </Link>

                  <Link
                    href="/analysis"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <BookOpen className="w-5 h-5 text-slate-500 dark:text-dark-text-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-dark-text-primary transition-colors">Analysis</span>
                  </Link>

                  <Link
                    href="/methodology"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <BookOpen className="w-5 h-5 text-slate-500 dark:text-dark-text-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-dark-text-primary transition-colors">Methodology</span>
                  </Link>

                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Info className="w-5 h-5 text-slate-500 dark:text-dark-text-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                    <span className="font-medium text-slate-700 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-dark-text-primary transition-colors">About</span>
                  </Link>

                  {/* More Section (Collapsible) */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
                      aria-expanded={showMore}
                      aria-controls="mobile-nav-more"
                    >
                      <span className="font-medium text-slate-600 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-dark-text-primary transition-colors text-sm">
                        More Pages
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 dark:text-dark-text-secondary transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    {showMore && (
                      <div id="mobile-nav-more" className="mt-1 space-y-1 pl-4">
                        {[
                          { href: '/recommendations', label: 'Recommendations' },
                          { href: '/data', label: 'Data & API' },
                          { href: '/resources', label: 'Resources' },
                          { href: '/limitations', label: 'Limitations' },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
                          >
                            <span className="text-sm text-slate-600 dark:text-dark-text-secondary group-hover:text-slate-900 dark:group-hover:text-dark-text-primary transition-colors">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
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
              </m.div>
            </>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  )
}
