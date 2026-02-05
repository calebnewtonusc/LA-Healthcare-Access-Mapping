'use client'

interface KeyMetricsProps {
  stats: {
    population_affected?: number
    population_served_by_facilities?: number
    num_recommendations?: number
    num_facilities?: number
    roi?: string
    net_benefit?: string
  } | null
}

export function KeyMetrics({ stats }: KeyMetricsProps) {
  const metrics = [
    {
      label: 'Population Affected',
      value: stats?.population_affected?.toLocaleString() || '3,007,726',
      icon: '👥',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      label: 'Population Served',
      value: stats?.population_served_by_facilities?.toLocaleString() || '320,530',
      icon: '🏥',
      color: 'bg-green-100 text-green-800'
    },
    {
      label: 'Policy Recommendations',
      value: stats?.num_recommendations?.toString() || '5',
      icon: '📋',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      label: 'Recommended Facilities',
      value: stats?.num_facilities?.toString() || '10',
      icon: '📍',
      color: 'bg-orange-100 text-orange-800'
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
            </div>
            <div className={`text-4xl p-3 rounded-full ${metric.color}`}>
              {metric.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
