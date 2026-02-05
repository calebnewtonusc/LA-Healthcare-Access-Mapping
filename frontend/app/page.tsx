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
      <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 backdrop-blur">
        <p className="text-sm text-yellow-200 text-center">
          <span className="font-bold">Academic Research Project</span> • For educational purposes •
          Analysis based on public datasets • Not official LA County policy •
          <a href="/about" className="underline hover:text-yellow-100 ml-1">View methodology & sources</a>
        </p>
      </div>

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
              {stats?.total_investment || 'N/A'}*
            </div>
            <div className="text-sm text-text-muted">
              10-Year Investment (Est.)
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all group">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-br from-neon-green to-green-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-neon-green to-green-400 bg-clip-text text-transparent mb-2">
              {stats?.net_benefit || 'N/A'}*
            </div>
            <div className="text-sm text-text-muted">
              Net Benefit (Est.)
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all group">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-br from-neon-purple to-purple-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                <Percent className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-purple-400 bg-clip-text text-transparent mb-2">
              {stats?.roi || 'N/A'}*
            </div>
            <div className="text-sm text-text-muted">
              Return on Investment (Est.)
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs text-text-muted max-w-2xl mx-auto">
            * Financial estimates based on industry averages and public health cost-benefit models.
            Actual costs and benefits may vary. <a href="/about" className="text-neon-cyan hover:underline">View full methodology</a>
          </p>
        </div>
      </div>

      {/* Healthcare Access Heatmap */}
      <div className="mt-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glass p-6">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="w-6 h-6 text-neon-purple" />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Healthcare Access Heatmap
          </h3>
        </div>
        <p className="text-sm text-text-secondary mb-4">
          Visualization of healthcare access gaps across LA County. Darker areas indicate census tracts with limited access to healthcare facilities.
        </p>
        <div className="relative">
          {/* Neon border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-purple to-neon-pink rounded-2xl blur opacity-75" />

          {/* Map iframe */}
          <div className="relative bg-bg-secondary rounded-2xl overflow-hidden border border-white/10">
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
