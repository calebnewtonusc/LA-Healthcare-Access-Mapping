'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, MapPin, RefreshCw } from 'lucide-react'

interface LazyIframeProps {
  src: string
  title: string
  className?: string
}

export function LazyIframe({ src, title, className = '' }: LazyIframeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '100px', // Load 100px before entering viewport
        threshold: 0.01
      }
    )

    if (iframeRef.current) {
      observer.observe(iframeRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
  }

  return (
    <div ref={iframeRef} className={`relative ${className}`}>
      {isVisible ? (
        <>
          {/* Loading overlay shown while iframe loads */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm z-10 rounded-xl">
              <div className="text-center">
                <div className="relative mx-auto mb-3 w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-600"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
                <MapPin className="w-4 h-4 text-blue-500 mx-auto mb-1 animate-pulse" aria-hidden="true" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Loading map...</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-800 z-10 rounded-xl">
              <div className="text-center p-6 max-w-xs">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3 w-fit mx-auto mb-3">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Map unavailable</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  The backend API may be offline. Maps are generated server-side and require the API to be running.
                </p>
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  aria-label="Retry loading map"
                >
                  <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                  Try again
                </button>
              </div>
            </div>
          )}

          <iframe
            key={hasError ? 'retry' : 'initial'} // force remount on retry
            src={src}
            className={`w-full h-full ${hasError ? 'invisible' : ''}`}
            title={title}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => { setHasError(true); setIsLoading(false) }}
            aria-label={title}
          />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl">
          <div className="text-center">
            <div className="relative mx-auto mb-3 w-10 h-10">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-600"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
