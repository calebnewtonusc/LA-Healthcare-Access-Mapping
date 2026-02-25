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

export const metadata: Metadata = {
  title: 'LA Healthcare Access Dashboard - GIS Analysis & Educational Demo',
  description: 'Educational geospatial analysis exploring healthcare facility access across 2,498 LA County census tracts. Interactive visualization project demonstrating GIS techniques and data science methods.',
  keywords: 'healthcare access, Los Angeles County, GIS analysis, educational project, census data, healthcare facilities, geospatial analysis, data visualization, student research',
  authors: [{ name: 'Caleb Newton' }, { name: 'LA Healthcare Access Mapping Project' }],
  creator: 'Caleb Newton',
  publisher: 'LA Healthcare Access Mapping',
  metadataBase: new URL('https://la-healthcare-access-mapping.vercel.app'),
  openGraph: {
    title: 'LA Healthcare Access Dashboard - GIS Analysis & Educational Demo',
    description: 'Educational geospatial analysis exploring healthcare access patterns across Los Angeles County. Interactive demonstration of GIS techniques and data visualization methods.',
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
    title: 'LA Healthcare Access Dashboard - Educational GIS Project',
    description: 'Interactive geospatial analysis exploring healthcare access across 2,498 LA County census tracts | Educational Demo',
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
      </head>
      <body
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
          background: '#f2f2f7',
          color: '#1c1c1e',
        }}
      >
        <ThemeProvider>
          <WebSocketProvider enabled={isWebSocketEnabled}>
            <ScrollProgress />
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <StructuredData />

            {/* Header — frosted glass navbar */}
            <header
              role="banner"
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                background: 'rgba(242, 242, 247, 0.88)',
                backdropFilter: 'blur(20px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
                borderBottom: '0.5px solid rgba(60, 60, 67, 0.15)',
              }}
            >
              <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Link
                      href="/"
                      className="flex items-center gap-3 group rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{ outline: 'none' }}
                      aria-label="LA Healthcare Access Dashboard - Home"
                    >
                      <Image
                        src="/logo.png"
                        alt="LA Healthcare Access Logo"
                        width={36}
                        height={36}
                        className="object-contain group-hover:scale-105 transition-transform duration-200"
                        priority
                      />
                      <div>
                        <h1
                          style={{
                            fontSize: '16px',
                            fontWeight: 800,
                            letterSpacing: '-0.4px',
                            color: '#1c1c1e',
                            lineHeight: 1.2,
                            margin: 0,
                          }}
                        >
                          LA Healthcare Access
                        </h1>
                        <p
                          style={{
                            fontSize: '11px',
                            color: '#8e8e93',
                            margin: 0,
                            letterSpacing: '0.1px',
                          }}
                        >
                          GIS Analysis &amp; Educational Demo
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="flex items-center gap-4">
                    {isWebSocketEnabled && (
                      <ConnectionIndicator size="sm" className="hidden md:flex" />
                    )}
                    <ThemeToggle />
                    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
                      {[
                        { href: '/', label: 'Home' },
                        { href: '/analysis', label: 'Analysis' },
                        { href: '/methodology', label: 'Methodology' },
                        { href: '/about', label: 'About' },
                      ].map(({ href, label }) => (
                        <ActiveNavLink
                          key={href}
                          href={href}
                          aria-label={`Navigate to ${label} page`}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150"
                          style={{
                            color: '#3a3a3c',
                            textDecoration: 'none',
                          }}
                          activeClassName="text-green-600 font-semibold"
                        >
                          {label}
                        </ActiveNavLink>
                      ))}
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

            {/* Footer — clean white on #f2f2f7 */}
            <footer
              role="contentinfo"
              aria-label="Site footer"
              style={{
                marginTop: '80px',
                paddingTop: '48px',
                paddingBottom: '48px',
                background: '#ffffff',
                borderTop: '0.5px solid rgba(60, 60, 67, 0.12)',
              }}
            >
              <div className="container mx-auto px-4 flex flex-col items-center gap-6">
                {/* Academic Research Badge */}
                <div
                  style={{
                    background: 'rgba(52, 199, 89, 0.08)',
                    border: '1px solid rgba(52, 199, 89, 0.25)',
                    borderRadius: '999px',
                    padding: '6px 18px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#1c7a38',
                      margin: 0,
                      letterSpacing: '0.3px',
                    }}
                  >
                    Academic Research Project &bull; Educational Purposes
                  </p>
                </div>

                {/* USC Affiliation & Author */}
                <div className="flex flex-col items-center gap-4">
                  <Link
                    href="/about"
                    className="flex items-center gap-4 no-underline transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      padding: '16px 28px',
                      background: '#ffffff',
                      border: '0.5px solid rgba(60, 60, 67, 0.18)',
                      borderRadius: '999px',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                    }}
                  >
                    <Image
                      src="/caleb-usc.jpg"
                      alt="Caleb Newton at USC"
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                      style={{ objectPosition: 'center 30%', border: '2px solid #34C759' }}
                      loading="lazy"
                    />
                    <div className="flex flex-col items-start gap-0.5">
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#8e8e93',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: 600,
                        }}
                      >
                        Student Researcher
                      </span>
                      <span
                        style={{
                          fontSize: '15px',
                          color: '#1c1c1e',
                          fontWeight: 700,
                          letterSpacing: '-0.2px',
                        }}
                      >
                        Caleb Newton
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          color: '#007AFF',
                          fontWeight: 500,
                        }}
                      >
                        University of Southern California
                      </span>
                    </div>
                  </Link>
                  <a
                    href="https://calebnewton.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '13px',
                      color: '#007AFF',
                      textDecoration: 'none',
                    }}
                    className="hover:underline"
                  >
                    Visit personal website &rarr;
                  </a>
                </div>

                {/* Project Info */}
                <div className="text-center max-w-2xl">
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#1c1c1e',
                      marginBottom: '6px',
                      letterSpacing: '-0.2px',
                    }}
                  >
                    LA Healthcare Access Mapping
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#8e8e93',
                      marginBottom: '14px',
                    }}
                  >
                    Independent research analyzing healthcare facility access across Los Angeles County
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {[
                      { href: '/about', label: 'About' },
                      { href: '/limitations', label: 'Limitations' },
                      { href: '/methodology', label: 'Methodology' },
                      { href: '/privacy', label: 'Privacy' },
                      { href: '/terms', label: 'Terms' },
                      { href: '/accessibility', label: 'Accessibility' },
                    ].map((link, i, arr) => (
                      <span key={link.href} className="flex items-center gap-3">
                        <Link
                          href={link.href}
                          style={{ fontSize: '12px', color: '#007AFF', textDecoration: 'none' }}
                          className="hover:underline"
                        >
                          {link.label}
                        </Link>
                        {i < arr.length - 1 && (
                          <span style={{ color: 'rgba(60,60,67,0.25)', fontSize: '12px' }}>|</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* License */}
                <p style={{ fontSize: '11px', color: '#8e8e93', margin: 0 }}>
                  Content licensed under{' '}
                  <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007AFF', textDecoration: 'none' }}
                    className="hover:underline"
                  >
                    CC BY 4.0
                  </a>
                </p>
              </div>
            </footer>

            <BackToTop />
          </WebSocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
