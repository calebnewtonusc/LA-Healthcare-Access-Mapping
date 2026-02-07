import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import './globals.css'
import { MobileNav } from '@/components/mobile-nav'
import { BackToTop } from '@/components/back-to-top'
import { StructuredData } from '@/components/structured-data'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { WebSocketProvider } from '@/components/providers/websocket-provider'
import { ConnectionIndicator } from '@/components/ui/connection-indicator'
import { CookieConsent } from '@/components/cookie-consent'
import { ErrorBoundary } from '@/components/error-boundary'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'LA Healthcare Access Dashboard - Policy Recommendations & Analysis',
  description: 'Interactive dashboard analyzing healthcare facility access across 2,498 LA County census tracts. Features policy recommendations, ROI analysis, and geospatial mapping serving 9.9M residents.',
  keywords: 'healthcare access, Los Angeles County, policy recommendations, census data, healthcare facilities, HPSA, MUA, geospatial analysis, public health, healthcare equity',
  authors: [{ name: 'Caleb Newton' }, { name: 'LA Healthcare Access Mapping Project' }],
  creator: 'Caleb Newton',
  publisher: 'LA Healthcare Access Mapping',
  metadataBase: new URL('https://la-healthcare-access-mapping.vercel.app'),
  openGraph: {
    title: 'LA Healthcare Access Dashboard - Policy Recommendations & Analysis',
    description: 'Comprehensive analysis of healthcare access gaps across Los Angeles County with evidence-based policy recommendations and $645M investment opportunity.',
    url: 'https://la-healthcare-access-mapping.vercel.app',
    siteName: 'LA Healthcare Access Mapping',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LA Healthcare Access Dashboard - Interactive maps and policy recommendations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LA Healthcare Access Dashboard',
    description: 'Analyzing healthcare facility access across 2,498 LA County census tracts serving 9.9M residents',
    images: ['/og-image.png'],
    creator: '@calebnewtonusc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f8fafc', // slate-50
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check WebSocket enabled status - defaults to false for safety
  const isWebSocketEnabled = process.env.NEXT_PUBLIC_WEBSOCKET_ENABLED === 'true'

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to API domain for faster requests */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'} />

        {/* PWA & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LA Healthcare Access" />

        {/* Additional Performance Hints */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-primary transition-colors duration-300`}>
        <ThemeProvider>
          <WebSocketProvider enabled={isWebSocketEnabled}>
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <StructuredData />

          {/* Header */}
          <header role="banner" className="sticky top-0 z-50 bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <Link href="/" className="flex items-center gap-3" aria-label="LA Healthcare Access Dashboard - Home">
                    <Image
                      src="/logo.png"
                      alt="LA Healthcare Access Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                      priority
                    />
                    <div>
                      <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                        LA Healthcare Access Dashboard
                      </h1>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Policy Recommendations & Analysis
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  {/* Connection Indicator - only show when WebSocket is enabled */}
                  {isWebSocketEnabled && (
                    <ConnectionIndicator size="sm" className="hidden md:flex" />
                  )}
                  <ThemeToggle />
                  <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-6">
                    <Link
                      href="/"
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label="Navigate to Home page"
                    >
                      Home
                    </Link>
                    <Link
                      href="/analysis"
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label="Navigate to Data Analysis page"
                    >
                      Analysis
                    </Link>
                    <Link
                      href="/recommendations"
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label="Navigate to Policy Recommendations page"
                    >
                      Recommendations
                    </Link>
                    <Link
                      href="/methodology"
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label="Navigate to Methodology page"
                    >
                      Methodology
                    </Link>
                    <Link
                      href="/data"
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label="Navigate to Data and API documentation page"
                    >
                      Data & API
                    </Link>
                    <Link
                      href="/resources"
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label="Navigate to External Resources page"
                    >
                      Resources
                    </Link>
                  </nav>
                <MobileNav />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main id="main-content" role="main" aria-label="Main content" className="min-h-screen" tabIndex={-1}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>

          {/* Footer */}
          <footer role="contentinfo" aria-label="Site footer" className="mt-20 pt-12 pb-12 bg-gradient-to-br from-slate-100/80 to-slate-200/50 dark:from-dark-bg-secondary/80 dark:to-dark-bg-tertiary/50 border-t-2 border-slate-300 dark:border-slate-700 rounded-t-3xl transition-colors duration-300">
            <div className="container mx-auto px-4 flex flex-col items-center gap-6">
              {/* Academic Research Badge */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg px-6 py-3">
                <p className="text-sm text-blue-900 dark:text-blue-200 font-semibold text-center">
                  Academic Research Project • Educational Purposes
                </p>
              </div>

              {/* USC Affiliation & Author */}
              <div className="flex flex-col items-center gap-4">
                <Link
                  href="/about"
                  className="flex items-center gap-4 px-8 py-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full border-2 border-slate-300/60 dark:border-blue-400/30 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:border-blue-400/80 dark:hover:border-blue-400 transition-all duration-300 no-underline"
                >
                  <Image
                    src="/caleb-usc.jpg"
                    alt="Caleb Newton at USC"
                    width={48}
                    height={48}
                    className="rounded-full object-cover border-2 border-blue-500 shadow-lg"
                    style={{ objectPosition: 'center 30%' }}
                    loading="lazy"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-xs text-slate-500 dark:text-dark-text-muted uppercase tracking-wider font-semibold">
                      Student Researcher
                    </span>
                    <span className="text-base text-slate-900 dark:text-dark-text-primary font-bold">
                      Caleb Newton
                    </span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      University of Southern California
                    </span>
                  </div>
                </Link>
                <a
                  href="https://calebnewton.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Visit personal website →
                </a>
              </div>

              {/* Project Info */}
              <div className="text-center text-sm text-slate-700 dark:text-dark-text-secondary max-w-2xl">
                <p className="font-semibold text-slate-900 dark:text-dark-text-primary mb-2">
                  LA Healthcare Access Mapping
                </p>
                <p className="text-xs mb-3">
                  Independent research analyzing healthcare facility access across Los Angeles County
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
                  <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
                    About
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/methodology" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Methodology
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Privacy
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Terms
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/accessibility" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Accessibility
                  </Link>
                </div>
              </div>

              {/* License */}
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                <p>
                  Content licensed under{' '}
                  <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    CC BY 4.0
                  </a>
                </p>
              </div>
            </div>
          </footer>

          <BackToTop />
          <CookieConsent />
          </WebSocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
