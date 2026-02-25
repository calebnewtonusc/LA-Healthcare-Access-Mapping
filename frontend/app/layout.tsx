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
  description:
    'Educational geospatial analysis exploring healthcare facility access across 2,498 LA County census tracts. Interactive visualization project demonstrating GIS techniques and data science methods.',
  keywords:
    'healthcare access, Los Angeles County, GIS analysis, educational project, census data, healthcare facilities, geospatial analysis, data visualization, student research',
  authors: [{ name: 'Caleb Newton' }, { name: 'LA Healthcare Access Mapping Project' }],
  creator: 'Caleb Newton',
  publisher: 'LA Healthcare Access Mapping',
  metadataBase: new URL('https://la-healthcare-access-mapping.vercel.app'),
  openGraph: {
    title: 'LA Healthcare Access Dashboard - GIS Analysis & Educational Demo',
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
        alt: 'LA Healthcare Access Dashboard - Interactive maps and policy recommendations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LA Healthcare Access Dashboard - Educational GIS Project',
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
            <footer
              role="contentinfo"
              aria-label="Site footer"
              style={{
                marginTop: '80px',
                paddingTop: '56px',
                paddingBottom: '56px',
                background: '#ffffff',
                borderTop: '0.5px solid rgba(60, 60, 67, 0.12)',
              }}
            >
              <div
                className="container mx-auto px-4"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}
              >
                {/* Built-by pill */}
                <Link
                  href="/about"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 24px',
                    background: '#ffffff',
                    border: '0.5px solid rgba(60, 60, 67, 0.18)',
                    borderRadius: '999px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow =
                      '0 6px 24px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow =
                      '0 2px 16px rgba(0,0,0,0.08)'
                  }}
                >
                  <Image
                    src="/caleb-usc.jpg"
                    alt="Caleb Newton"
                    width={40}
                    height={40}
                    style={{
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center 30%',
                      border: '2px solid #34C759',
                    }}
                    loading="lazy"
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#8e8e93',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        fontWeight: 600,
                      }}
                    >
                      Built by
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
                    <span style={{ fontSize: '12px', color: '#007AFF', fontWeight: 500 }}>
                      University of Southern California
                    </span>
                  </div>
                </Link>

                {/* Footer nav links */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px 20px',
                  }}
                >
                  {[
                    { href: '/about', label: 'About' },
                    { href: '/methodology', label: 'Methodology' },
                    { href: '/limitations', label: 'Limitations' },
                    { href: '/privacy', label: 'Privacy' },
                    { href: '/terms', label: 'Terms' },
                    { href: '/accessibility', label: 'Accessibility' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        fontSize: '13px',
                        color: '#3a3a3c',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.color = '#007AFF'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.color = '#3a3a3c'
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* CC BY 4.0 badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      background: 'rgba(52, 199, 89, 0.10)',
                      border: '0.5px solid rgba(52, 199, 89, 0.30)',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#1c7a38',
                      textDecoration: 'none',
                      letterSpacing: '0.1px',
                    }}
                  >
                    CC BY 4.0
                  </a>
                  <span style={{ fontSize: '12px', color: '#8e8e93' }}>
                    &copy; {new Date().getFullYear()} Caleb Newton
                  </span>
                </div>
              </div>
            </footer>

            <BackToTop />
          </WebSocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
