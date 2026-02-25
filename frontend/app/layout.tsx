import type { Metadata } from 'next'
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
import { ErrorBoundary } from '@/components/error-boundary'
import { ScrollProgress } from '@/components/scroll-progress'
import { ActiveNavLink } from '@/components/active-nav-link'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'LA Healthcare Access Dashboard: GIS Analysis & Educational Demo',
  description:
    'Educational geospatial analysis exploring healthcare facility access across 2,498 LA County census tracts. Interactive visualization project demonstrating GIS techniques and data science methods.',
  keywords:
    'healthcare access, Los Angeles County, GIS analysis, educational project, census data, healthcare facilities, geospatial analysis, data visualization, student research',
  authors: [{ name: 'Caleb Newton' }, { name: 'LA Healthcare Access Mapping Project' }],
  creator: 'Caleb Newton',
  publisher: 'LA Healthcare Access Mapping',
  metadataBase: new URL('https://la-healthcare-access-mapping.vercel.app'),
  openGraph: {
    title: 'LA Healthcare Access Dashboard: GIS Analysis & Educational Demo',
    description:
      'Educational geospatial analysis exploring healthcare access patterns across Los Angeles County. Interactive demonstration of GIS techniques and data visualization methods.',
    url: 'https://la-healthcare-access-mapping.vercel.app',
    siteName: 'LA Healthcare Access Mapping',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LA Healthcare Access Dashboard: Interactive maps and policy recommendations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LA Healthcare Access Dashboard: Educational GIS Project',
    description:
      'Interactive geospatial analysis exploring healthcare access across 2,498 LA County census tracts | Educational Demo',
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
  themeColor: '#f2f2f7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isWebSocketEnabled = process.env.NEXT_PUBLIC_WEBSOCKET_ENABLED === 'true'

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LA Healthcare Access" />
      </head>
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
          background: '#f2f2f7',
          color: '#1c1c1e',
          margin: 0,
        }}
      >
        <ThemeProvider>
          <WebSocketProvider enabled={isWebSocketEnabled}>
            <ScrollProgress />
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <StructuredData />

            {/* ── Header — 56px frosted glass ── */}
            <header
              role="banner"
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(242, 242, 247, 0.88)',
                backdropFilter: 'blur(20px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
                borderBottom: '0.5px solid rgba(60, 60, 67, 0.15)',
              }}
            >
              <div
                className="container mx-auto px-4"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                {/* Logo wordmark */}
                <Link
                  href="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    outline: 'none',
                  }}
                  aria-label="LA Healthcare Access Dashboard - Home"
                >
                  <Image
                    src="/logo.png"
                    alt="LA Healthcare Access Logo"
                    width={28}
                    height={28}
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: 800,
                      letterSpacing: '-0.5px',
                      lineHeight: 1,
                    }}
                  >
                    <span style={{ color: '#34C759' }}>LA Healthcare</span>
                    <span style={{ color: '#1c1c1e' }}> Access</span>
                  </span>
                </Link>

                {/* Right side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {isWebSocketEnabled && (
                    <ConnectionIndicator size="sm" className="hidden md:flex" />
                  )}

                  {/* Desktop nav links */}
                  <nav
                    aria-label="Main navigation"
                    className="hidden md:flex"
                    style={{ alignItems: 'center', gap: '2px', marginRight: '8px' }}
                  >
                    {[
                      { href: '/analysis', label: 'Analysis' },
                      { href: '/methodology', label: 'Methodology' },
                      { href: '/about', label: 'About' },
                    ].map(({ href, label }) => (
                      <ActiveNavLink
                        key={href}
                        href={href}
                        aria-label={`Navigate to ${label} page`}
                        className="nav-link-base relative px-3 py-1.5 rounded-lg transition-colors duration-150 hover:text-green-600"
                        activeClassName="nav-link-active"
                      >
                        {label}
                      </ActiveNavLink>
                    ))}
                  </nav>

                  <ThemeToggle />
                  <MobileNav />
                </div>
              </div>
            </header>

            {/* ── Main content ── */}
            <main
              id="main-content"
              role="main"
              aria-label="Main content"
              className="min-h-screen"
              tabIndex={-1}
            >
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>

            {/* ── Footer ── */}
            <SiteFooter />

            <BackToTop />
          </WebSocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
