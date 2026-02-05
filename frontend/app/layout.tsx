import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LA Healthcare Access Dashboard',
  description: 'Interactive dashboard for Los Angeles County healthcare access analysis and policy recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50`}>
        {/* Clean Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              LA Healthcare Access Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Policy Recommendations & Analysis
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Clean Footer */}
        <footer className="mt-12 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-sm font-semibold text-gray-900">
              LA Healthcare Access Mapping Project v1.1.0
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Open source healthcare access analysis for Los Angeles County
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
