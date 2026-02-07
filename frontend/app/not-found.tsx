import Link from 'next/link'
import { Home, MapPin, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>

          <div className="relative bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-12 shadow-xl text-center">
            {/* 404 Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full shadow-lg">
                <AlertCircle className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* 404 Text */}
            <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                <Home className="w-5 h-5" />
                Back to Dashboard
              </Link>

              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 bg-white/70 backdrop-blur-sm border border-slate-300 text-slate-700 px-6 py-3 rounded-xl hover:bg-white hover:border-slate-400 transition-all font-semibold shadow-sm hover:shadow-md"
              >
                <MapPin className="w-5 h-5" />
                View Resources
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-3">Quick Links:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/about" className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  Methodology
                </Link>
                <span className="text-slate-300">•</span>
                <Link href="/resources" className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  External Resources
                </Link>
                <span className="text-slate-300">•</span>
                <a
                  href="https://github.com/calebnewtonusc/la-healthcare-access-mapping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
