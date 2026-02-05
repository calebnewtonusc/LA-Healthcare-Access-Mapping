import { KeyMetrics } from '@/components/key-metrics'
import { RecommendationsList } from '@/components/recommendations-list'
import { FacilityMapSection } from '@/components/facility-map-section'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getStats() {
  try {
    const res = await fetch(`${API_URL}/api/stats`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Error fetching stats:', error)
    return null
  }
}

async function getRecommendations() {
  try {
    const res = await fetch(`${API_URL}/api/recommendations`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.recommendations
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return null
  }
}

async function getFacilities() {
  try {
    const res = await fetch(`${API_URL}/api/facilities`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.facilities
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return null
  }
}

export default async function DashboardPage() {
  const [stats, recommendations, facilities] = await Promise.all([
    getStats(),
    getRecommendations(),
    getFacilities()
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Healthcare Access Analysis Dashboard
        </h2>
        <p className="text-gray-600">
          Comprehensive analysis of healthcare access gaps and policy recommendations for Los Angeles County
        </p>
      </div>

      {/* Key Metrics */}
      <KeyMetrics stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Map Section */}
        <FacilityMapSection facilities={facilities} />

        {/* Recommendations Section */}
        <RecommendationsList recommendations={recommendations} />
      </div>

      {/* Cost-Benefit Overview */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Financial Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {stats?.total_investment || '$645M'}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              10-Year Investment
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {stats?.net_benefit || '$3.5B'}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Net Benefit
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {stats?.roi || '540%'}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Return on Investment
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a
            href={`${API_URL}/api/reports/cost-benefit`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            View Full Cost-Benefit Analysis
          </a>
        </div>
      </div>

      {/* Additional Maps */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Interactive Maps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href={`${API_URL}/api/maps/facility-locations`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition"
          >
            <h4 className="font-bold text-lg mb-2">📍 Recommended Facility Locations</h4>
            <p className="text-sm text-gray-600">
              Interactive map showing 10 priority locations for new healthcare facilities
            </p>
          </a>
          <a
            href={`${API_URL}/api/maps/access-desert`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition"
          >
            <h4 className="font-bold text-lg mb-2">🗺️ Healthcare Access Heatmap</h4>
            <p className="text-sm text-gray-600">
              Visualization of access gaps across LA County
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}
