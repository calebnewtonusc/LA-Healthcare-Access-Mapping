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
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">LA Healthcare Access Dashboard</h1>
            <p className="text-sm text-blue-100">Policy Recommendations & Analysis</p>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-6 mt-12">
          <div className="container mx-auto text-center">
            <p className="text-sm">LA Healthcare Access Mapping Project v1.1.0</p>
            <p className="text-xs text-gray-400 mt-2">Open source healthcare access analysis for Los Angeles County</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
