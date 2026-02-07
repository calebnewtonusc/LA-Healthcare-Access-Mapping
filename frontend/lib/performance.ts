// Performance monitoring utilities

export function measureWebVitals() {
  if (typeof window === 'undefined') return

  // Core Web Vitals measurement
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number }
        const lcp = lastEntry.renderTime || lastEntry.loadTime
        if (lcp && lcp < 2500) {
          console.log('✅ LCP (Largest Contentful Paint):', lcp.toFixed(2), 'ms - Good')
        } else if (lcp && lcp < 4000) {
          console.log('⚠️  LCP (Largest Contentful Paint):', lcp.toFixed(2), 'ms - Needs Improvement')
        } else if (lcp) {
          console.log('❌ LCP (Largest Contentful Paint):', lcp.toFixed(2), 'ms - Poor')
        }
      })
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime
          if (fid < 100) {
            console.log('✅ FID (First Input Delay):', fid.toFixed(2), 'ms - Good')
          } else if (fid < 300) {
            console.log('⚠️  FID (First Input Delay):', fid.toFixed(2), 'ms - Needs Improvement')
          } else {
            console.log('❌ FID (First Input Delay):', fid.toFixed(2), 'ms - Poor')
          }
        })
      })
      fidObserver.observe({ type: 'first-input', buffered: true })

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsScore = 0
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value
          }
        })
        if (clsScore < 0.1) {
          console.log('✅ CLS (Cumulative Layout Shift):', clsScore.toFixed(3), '- Good')
        } else if (clsScore < 0.25) {
          console.log('⚠️  CLS (Cumulative Layout Shift):', clsScore.toFixed(3), '- Needs Improvement')
        } else {
          console.log('❌ CLS (Cumulative Layout Shift):', clsScore.toFixed(3), '- Poor')
        }
      })
      clsObserver.observe({ type: 'layout-shift', buffered: true })
    } catch (error) {
      // Silently fail if performance APIs are not supported
    }
  }
}

// Prefetch critical resources
export function prefetchResources() {
  if (typeof window === 'undefined') return

  const resources = [
    '/api/stats',
    '/api/facilities',
    '/api/recommendations',
  ]

  resources.forEach((url) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)
  })
}

// Report bundle size in development
export function logBundleStats() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return

  setTimeout(() => {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const jsResources = resources.filter(r => r.name.endsWith('.js'))
    const cssResources = resources.filter(r => r.name.endsWith('.css'))

    const totalJsSize = jsResources.reduce((acc, r) => acc + (r.transferSize || 0), 0)
    const totalCssSize = cssResources.reduce((acc, r) => acc + (r.transferSize || 0), 0)

    console.log('📦 Bundle Stats:')
    console.log(`  JS: ${(totalJsSize / 1024).toFixed(2)} KB`)
    console.log(`  CSS: ${(totalCssSize / 1024).toFixed(2)} KB`)
    console.log(`  Total: ${((totalJsSize + totalCssSize) / 1024).toFixed(2)} KB`)
  }, 2000)
}
