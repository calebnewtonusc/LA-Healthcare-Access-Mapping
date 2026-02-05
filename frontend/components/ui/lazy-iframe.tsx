'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyIframeProps {
  src: string
  title: string
  className?: string
}

export function LazyIframe({ src, title, className = '' }: LazyIframeProps) {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <div ref={iframeRef} className={className}>
      {isVisible ? (
        <iframe
          src={src}
          className="w-full h-full"
          title={title}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-100/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto mb-3"></div>
            <p className="text-sm text-slate-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
