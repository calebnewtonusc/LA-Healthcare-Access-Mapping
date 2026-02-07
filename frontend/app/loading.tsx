export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-slate-200 rounded-lg w-3/4 mb-3"></div>
        <div className="h-6 bg-slate-200 rounded-lg w-1/2"></div>
      </div>

      {/* Key Findings Skeleton */}
      <div className="mb-10 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8">
        <div className="h-8 bg-slate-200 rounded-lg w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/70 rounded-xl p-5 border border-slate-200">
              <div className="h-6 bg-slate-200 rounded w-32 mb-3"></div>
              <div className="h-10 bg-slate-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Skeleton */}
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/40">
              <div className="h-6 bg-slate-200 rounded w-24 mb-3"></div>
              <div className="h-8 bg-slate-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Section Skeleton */}
      <div className="mb-10 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8">
        <div className="h-8 bg-slate-200 rounded-lg w-64 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white/70 rounded-xl p-6 border border-slate-200">
              <div className="h-6 bg-slate-200 rounded w-40 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-slate-200 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
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
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
          <div className="h-7 bg-slate-200 rounded w-48 mb-4"></div>
          <div className="h-96 bg-slate-200 rounded-xl"></div>
        </div>

        {/* Recommendations Skeleton */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
          <div className="h-7 bg-slate-200 rounded w-56 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/60 rounded-lg p-4 border border-slate-200">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Analysis Skeleton */}
      <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8">
        <div className="h-8 bg-slate-200 rounded-lg w-72 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/70 rounded-xl p-6 border border-slate-200 text-center">
              <div className="h-12 bg-slate-200 rounded w-32 mx-auto mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-40 mx-auto"></div>
            </div>
          ))}
        </div>
        <div className="bg-slate-100 rounded-xl p-6">
          <div className="h-6 bg-slate-200 rounded w-64 mb-4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-slate-200 rounded"></div>
            <div className="h-8 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
