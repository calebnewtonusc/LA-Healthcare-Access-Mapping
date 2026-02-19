import { FileQuestion } from 'lucide-react'

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
