import { AlertCircle, RefreshCw, FileQuestion } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message?: string
  retry?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  retry
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center" role="alert" aria-live="assertive">
      <AlertCircle className="w-16 h-16 text-red-500 dark:text-red-400 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md">
        {message}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center gap-2"
          aria-label="Retry loading data"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  )
}

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title = "No data available",
  message = "Check back later or adjust your filters.",
  icon
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center" role="status" aria-live="polite">
      {icon || <FileQuestion className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" aria-hidden="true" />}
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
        {message}
      </p>
    </div>
  )
}
