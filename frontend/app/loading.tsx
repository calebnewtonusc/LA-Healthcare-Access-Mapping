// Reusable skeleton block with shimmer animation
function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div
      className={`skeleton-shimmer bg-slate-200 dark:bg-slate-700 rounded-lg ${className}`}
    />
  )
}

export default function Loading() {
  return (
    <div
      className="container mx-auto px-4 py-8 max-w-7xl"
      aria-label="Loading page content"
      aria-busy="true"
      role="status"
    >
      {/* Screen-reader announcement */}
      <span className="sr-only">Loading, please wait...</span>

      {/* Header Skeleton */}
      <div className="mb-8">
        <SkeletonBlock className="h-10 w-3/4 mb-3" />
        <SkeletonBlock className="h-6 w-1/2" />
      </div>

      {/* Key Findings Skeleton */}
      <div className="mb-10 bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-gray-700 rounded-2xl p-8">
        <SkeletonBlock className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['finding-1', 'finding-2', 'finding-3'].map((id) => (
            <div key={id} className="bg-white/70 dark:bg-dark-bg-tertiary/70 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <SkeletonBlock className="h-6 w-32 mb-3" />
              <SkeletonBlock className="h-10 w-24 mb-2" />
              <SkeletonBlock className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Skeleton */}
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['metric-1', 'metric-2', 'metric-3', 'metric-4'].map((id) => (
            <div key={id} className="bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-sm rounded-xl p-6 border border-white/40 dark:border-gray-700">
              <SkeletonBlock className="h-6 w-24 mb-3" />
              <SkeletonBlock className="h-8 w-32 mb-2" />
              <SkeletonBlock className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Section Skeleton */}
      <div className="mb-10 bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-gray-700 rounded-2xl p-8">
        <SkeletonBlock className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['comp-left', 'comp-right'].map((id) => (
            <div key={id} className="bg-white/70 dark:bg-dark-bg-tertiary/70 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <SkeletonBlock className="h-6 w-40 mb-4" />
              <div className="space-y-3">
                {['item-1', 'item-2', 'item-3', 'item-4'].map((jid) => (
                  <div key={jid} className="flex items-start gap-3">
                    <SkeletonBlock className="w-6 h-6 !rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <SkeletonBlock className="h-5 w-32" />
                      <SkeletonBlock className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maps and Recommendations Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Map Skeleton */}
        <div className="bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 dark:border-gray-700">
          <SkeletonBlock className="h-7 w-48 mb-4" />
          <SkeletonBlock className="h-96 w-full" />
        </div>

        {/* Recommendations Skeleton */}
        <div className="bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 dark:border-gray-700">
          <SkeletonBlock className="h-7 w-56 mb-4" />
          <div className="space-y-4">
            {['rec-1', 'rec-2', 'rec-3'].map((id) => (
              <div key={id} className="rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <SkeletonBlock className="h-6 w-3/4 mb-2" />
                <SkeletonBlock className="h-4 w-full mb-2" />
                <SkeletonBlock className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Analysis Skeleton */}
      <div className="bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-gray-700 rounded-2xl p-8">
        <SkeletonBlock className="h-8 w-72 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {['fin-1', 'fin-2', 'fin-3'].map((id) => (
            <div key={id} className="rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
              <SkeletonBlock className="h-12 w-32 mx-auto mb-2" />
              <SkeletonBlock className="h-4 w-40 mx-auto" />
            </div>
          ))}
        </div>
        <div className="bg-slate-100 dark:bg-dark-bg-tertiary rounded-xl p-6">
          <SkeletonBlock className="h-6 w-64 mb-4" />
          <div className="space-y-3">
            <SkeletonBlock className="h-8 w-full" />
            <SkeletonBlock className="h-8 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
