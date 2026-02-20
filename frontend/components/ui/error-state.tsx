import { FileQuestion } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({
  title = "No data available",
  message = "Check back later or adjust your filters.",
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl"
      role="status"
      aria-live="polite"
    >
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-5 mb-4 w-fit">
        {icon ?? <FileQuestion className="w-10 h-10 text-gray-400 dark:text-gray-500" aria-hidden="true" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
        {message}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
