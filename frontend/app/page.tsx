import { KeyMetrics } from '@/components/key-metrics'
import { RecommendationsList } from '@/components/recommendations-list'
import { FacilityMapSection } from '@/components/facility-map-section'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { DollarSign, TrendingUp, Percent, MapPin, Flame, ExternalLink } from 'lucide-react'

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
      {/* Academic Disclaimer Banner */}
      <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-yellow-800 text-center">
          <span className="font-bold">Academic Research Project</span> • For educational purposes •
          Analysis based on public datasets • Not official LA County policy •
          <a href="/about" className="underline hover:text-yellow-900 ml-1">View methodology & sources</a>
        </p>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Healthcare Access Analysis Dashboard
        </h2>
        <p className="text-gray-600 text-lg">
          Comprehensive analysis of healthcare access gaps and policy recommendations for Los Angeles County
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mb-10">
        <KeyMetrics stats={stats} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Map Section */}
        <FacilityMapSection facilities={facilities} />

        {/* Recommendations Section */}
        <RecommendationsList recommendations={recommendations} />
      </div>

      {/* Cost-Benefit Overview */}
      <div className="mt-10 bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Financial Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center hover:shadow-md transition-all group">
            <div className="flex justify-center mb-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {stats?.total_investment || 'N/A'}*
            </div>
            <div className="text-sm text-gray-600">
              10-Year Investment (Est.)
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center hover:shadow-md transition-all group">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats?.net_benefit || 'N/A'}*
            </div>
            <div className="text-sm text-gray-600">
              Net Benefit (Est.)
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center hover:shadow-md transition-all group">
            <div className="flex justify-center mb-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Percent className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {stats?.roi || 'N/A'}*
            </div>
            <div className="text-sm text-gray-600">
              Return on Investment (Est.)
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 max-w-2xl mx-auto">
            * Financial estimates based on industry averages and public health cost-benefit models.
            Actual costs and benefits may vary. <a href="/about" className="text-blue-600 hover:underline">View full methodology</a>
          </p>
        </div>
      </div>

      {/* Healthcare Access Heatmap */}
      <div className="mt-10 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="w-6 h-6 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-900">
            Healthcare Access Heatmap
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Visualization of healthcare access gaps across LA County. Darker areas indicate census tracts with limited access to healthcare facilities.
        </p>
        <div className="relative">
          {/* Map iframe */}
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-300">
            <iframe
              src={`${API_URL}/api/maps/access-desert`}
              className="w-full h-[500px]"
              title="Healthcare Access Desert Heatmap"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
