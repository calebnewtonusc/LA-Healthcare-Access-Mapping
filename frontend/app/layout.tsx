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
      <body className={`${inter.className} bg-bg-primary text-text-primary`}>
        {/* Glassmorphism Header */}
        <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-glass">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
              LA Healthcare Access Dashboard
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Policy Recommendations & Analysis
            </p>
          </div>
        </header>

        {/* Main content with gradient overlay */}
        <main className="min-h-screen relative">
          {/* Ambient gradient background */}
          <div className="fixed inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            {children}
          </div>
        </main>

        {/* Glassmorphism Footer */}
        <footer className="relative mt-12 bg-white/5 backdrop-blur-lg border-t border-white/10 shadow-glass">
          {/* Gradient line at top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />

          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-sm font-semibold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              LA Healthcare Access Mapping Project v1.1.0
            </p>
            <p className="text-xs text-text-muted mt-2">
              Open source healthcare access analysis for Los Angeles County
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
