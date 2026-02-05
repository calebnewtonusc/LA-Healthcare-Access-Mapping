import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
            <h1 className="text-2xl font-bold text-slate-900">
              LA Healthcare Access Dashboard
            </h1>
            <p className="text-sm text-slate-700 mt-1">
              Policy Recommendations & Analysis
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Glassmorphic Footer */}
        <footer className="mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 opacity-20"></div>
          <div className="relative backdrop-blur-md bg-white/70 border-t border-white/50 shadow-sm">
            <div className="container mx-auto px-4 py-6 text-center">
              <p className="text-sm font-semibold text-slate-900">
                LA Healthcare Access Mapping Project v1.1.0
              </p>
              <p className="text-xs text-slate-700 mt-2">
                Open source healthcare access analysis for Los Angeles County
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
