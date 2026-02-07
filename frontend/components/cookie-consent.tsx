'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a consent choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay to avoid layout shift
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)

    // Initialize analytics here if needed
    // Example: window.plausible?.enable()
    console.log('Cookies accepted - analytics can be initialized')
  }

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)

    // Ensure analytics are disabled
    console.log('Cookies rejected - analytics will not be initialized')
  }

  const dismissBanner = () => {
    // Allow users to dismiss without making a choice (will show again on next visit)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-start gap-4">
          {/* Cookie Icon */}
          <div className="flex-shrink-0 pt-1">
            <Cookie
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              id="cookie-consent-title"
              className="font-semibold text-gray-900 dark:text-dark-text-primary mb-2 text-base"
            >
              We Value Your Privacy
            </h3>
            <p
              id="cookie-consent-description"
              className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-3xl"
            >
              This site uses minimal analytics cookies to improve user experience and understand
              how visitors interact with our healthcare access dashboard.{' '}
              <strong>No personal health information is collected.</strong> You can choose to
              accept or reject these cookies. See our{' '}
              <Link
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Privacy Policy
              </Link>{' '}
              for details.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={acceptCookies}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors font-semibold text-sm"
                aria-label="Accept cookies and enable analytics"
              >
                Accept Cookies
              </button>
              <button
                onClick={rejectCookies}
                className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors font-semibold text-sm"
                aria-label="Reject cookies and disable analytics"
              >
                Reject Cookies
              </button>
              <Link
                href="/privacy"
                className="px-5 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={dismissBanner}
            className="flex-shrink-0 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Dismiss cookie banner (will show again on next visit)"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
