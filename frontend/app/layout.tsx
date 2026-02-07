import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { MobileNav } from '@/components/mobile-nav'
import { BackToTop } from '@/components/back-to-top'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LA Healthcare Access Dashboard',
  description: 'Interactive dashboard for Los Angeles County healthcare access analysis and policy recommendations',
  keywords: 'healthcare access, Los Angeles County, policy recommendations, census data, healthcare facilities',
  authors: [{ name: 'LA Healthcare Access Mapping Project' }],
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
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to API domain for faster requests */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'} />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100`}>
        {/* Glassmorphic Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <h1 className="text-2xl font-bold text-slate-900">
                    LA Healthcare Access Dashboard
                  </h1>
                  <p className="text-sm text-slate-700 mt-1">
                    Policy Recommendations & Analysis
                  </p>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <nav className="hidden md:flex items-center gap-6">
                  <Link
                    href="/"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Methodology
                  </Link>
                  <Link
                    href="/resources"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
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
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-20 pt-12 pb-12 bg-gradient-to-br from-slate-100/80 to-slate-200/50 border-t-2 border-slate-300 rounded-t-3xl">
          <div className="container mx-auto px-4 flex flex-col items-center gap-6">
            <a
              href="https://calebnewton.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-8 py-6 bg-white/70 backdrop-blur-sm rounded-full border-2 border-slate-300/60 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:border-slate-400/80 transition-all duration-300 no-underline"
            >
              <img
                src="/caleb-usc.jpg"
                alt="Caleb Newton at USC"
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-500 shadow-lg"
                style={{ objectPosition: 'center 30%' }}
              />
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Built by
                </span>
                <span className="text-base text-slate-900 font-bold">
                  Caleb Newton
                </span>
              </div>
            </a>
            <div className="text-center text-sm text-slate-700">
              <p className="font-semibold text-slate-900 mb-1">LA Healthcare Access Mapping</p>
              <p className="text-xs">Evidence-based policy recommendations for underserved communities</p>
            </div>
          </div>
        </footer>

        <BackToTop />
      </body>
    </html>
  )
}
