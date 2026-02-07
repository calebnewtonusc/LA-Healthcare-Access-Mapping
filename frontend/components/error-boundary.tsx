'use client'

import { Component, ReactNode } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-primary flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 dark:from-neon-pink/20 dark:to-orange-400/20 rounded-2xl blur-sm opacity-40"></div>

              <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-pink/30 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-neon-pink" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">
                    Something went wrong
                  </h2>
                </div>

                <p className="text-slate-700 dark:text-dark-text-secondary mb-6">
                  We encountered an error while loading this component. Please try refreshing the page.
                </p>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                    <p className="text-xs font-mono text-red-800 dark:text-red-300 break-all">
                      {this.state.error.message}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => window.location.reload()}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neon-cyan dark:to-neon-purple text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 dark:hover:shadow-neon-cyan transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-neon-cyan focus:ring-offset-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
