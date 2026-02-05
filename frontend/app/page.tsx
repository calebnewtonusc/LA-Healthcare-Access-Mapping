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
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent mb-3">
          Healthcare Access Analysis Dashboard
        </h2>
        <p className="text-text-secondary text-lg">
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
      <div className="mt-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glass p-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent mb-6 text-center">
          Financial Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all group">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-br from-neon-cyan to-blue-500 p-3 rounded-full group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-blue-400 bg-clip-text text-transparent mb-2">
              {stats?.total_investment || '$645M'}
            </div>
            <div className="text-sm text-text-muted">
              10-Year Investment
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all group">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-br from-neon-green to-green-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-neon-green to-green-400 bg-clip-text text-transparent mb-2">
              {stats?.net_benefit || '$3.5B'}
            </div>
            <div className="text-sm text-text-muted">
              Net Benefit
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all group">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-br from-neon-purple to-purple-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                <Percent className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-purple-400 bg-clip-text text-transparent mb-2">
              {stats?.roi || '540%'}
            </div>
            <div className="text-sm text-text-muted">
              Return on Investment
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            href={`${API_URL}/api/reports/cost-benefit`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan to-neon-purple text-white px-8 py-3 rounded-xl hover:shadow-neon-cyan transition-all font-semibold group"
          >
            View Full Cost-Benefit Analysis
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Additional Maps */}
      <div className="mt-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glass p-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent mb-6">
          Interactive Maps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href={`${API_URL}/api/maps/facility-locations`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-neon-cyan/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-neon-cyan to-blue-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2 text-white flex items-center gap-2">
                  Recommended Facility Locations
                  <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-neon-cyan transition-colors" />
                </h4>
                <p className="text-sm text-text-secondary">
                  Interactive map showing 10 priority locations for new healthcare facilities
                </p>
              </div>
            </div>
          </a>
          <a
            href={`${API_URL}/api/maps/access-desert`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-neon-purple/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-neon-purple to-purple-600 p-3 rounded-lg group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2 text-white flex items-center gap-2">
                  Healthcare Access Heatmap
                  <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-neon-purple transition-colors" />
                </h4>
                <p className="text-sm text-text-secondary">
                  Visualization of access gaps across LA County
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
