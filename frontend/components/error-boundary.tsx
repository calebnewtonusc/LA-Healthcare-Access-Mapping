'use client'

import { Component, ReactNode } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error | undefined
  errorInfo?: string | undefined
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

    this.setState({
      errorInfo: errorInfo.componentStack,
    })

    // TODO: Log to error tracking service (e.g., Sentry, LogRocket)
    // logErrorToService(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-primary flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {/* Error Card */}
            <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                  <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" aria-hidden="true" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-dark-text-primary mb-3">
                Something Went Wrong
              </h1>

              {/* Description */}
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                An unexpected error occurred while rendering this page. Our team has been notified
                and will investigate the issue.
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-h-64 overflow-auto">
                  <h3 className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">
                    Error Details (Development Only):
                  </h3>
                  <pre className="text-xs text-red-800 dark:text-red-300 font-mono whitespace-pre-wrap break-words">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo && (
                    <>
                      <h4 className="text-sm font-semibold text-red-900 dark:text-red-200 mt-3 mb-2">
                        Component Stack:
                      </h4>
                      <pre className="text-xs text-red-800 dark:text-red-300 font-mono whitespace-pre-wrap break-words">
                        {this.state.errorInfo}
                      </pre>
                    </>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors font-semibold"
                  aria-label="Reload page and try again"
                >
                  <RefreshCw className="w-5 h-5" aria-hidden="true" />
                  Reload Page
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors font-semibold"
                >
                  <Home className="w-5 h-5" aria-hidden="true" />
                  Back to Home
                </Link>
              </div>

              {/* Help Text */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  If this problem persists, please{' '}
                  <a
                    href="mailto:calebnew@usc.edu?subject=Dashboard Error Report"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    report the issue
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>Tip:</strong> Try clearing your browser cache or using a different browser
                if the problem continues.
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
