'use client'

interface Recommendation {
  Priority?: string
  Title?: string
  Category?: string
  Affected_Population?: number
  Estimated_Cost?: string
  Timeline?: string
  Expected_Impact?: string
}

interface RecommendationsListProps {
  recommendations: Recommendation[] | null
}

const priorityColors: Record<string, string> = {
  'Critical': 'bg-red-100 text-red-800 border-red-200',
  'High': 'bg-orange-100 text-orange-800 border-orange-200',
  'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Low': 'bg-green-100 text-green-800 border-green-200',
}

const categoryIcons: Record<string, string> = {
  'Infrastructure': '🏗️',
  'Transportation': '🚌',
  'Equity': '⚖️',
  'Service Expansion': '📈',
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Policy Recommendations
        </h3>
        <p className="text-gray-600">Loading recommendations...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Policy Recommendations
      </h3>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-lg text-gray-800 flex-1">
                {categoryIcons[rec.Category || ''] || '📌'} {rec.Title}
              </h4>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  priorityColors[rec.Priority || 'Medium']
                }`}
              >
                {rec.Priority}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mt-3">
              <div>
                <span className="text-gray-600">Category:</span>
                <p className="font-semibold text-gray-800">{rec.Category}</p>
              </div>
              <div>
                <span className="text-gray-600">Affected Population:</span>
                <p className="font-semibold text-gray-800">
                  {rec.Affected_Population?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Cost:</span>
                <p className="font-semibold text-gray-800">{rec.Estimated_Cost}</p>
              </div>
              <div>
                <span className="text-gray-600">Timeline:</span>
                <p className="font-semibold text-gray-800">{rec.Timeline}</p>
              </div>
            </div>

            {rec.Expected_Impact && (
              <div className="mt-3 text-sm">
                <span className="text-gray-600">Expected Impact:</span>
                <p className="text-gray-700 mt-1">{rec.Expected_Impact}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
