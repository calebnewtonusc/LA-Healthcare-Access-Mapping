import { KeyMetrics } from '@/components/key-metrics'
import { RecommendationsList } from '@/components/recommendations-list'
import { FacilityMapSection } from '@/components/facility-map-section'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { LazyIframe } from '@/components/ui/lazy-iframe'
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
      <div className="mb-6 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-xl p-4 shadow-md">
          <p className="text-sm text-slate-800 text-center">
            <span className="font-bold text-slate-900">Academic Research Project</span> • For educational purposes •
            Analysis based on public datasets • Not official LA County policy •
            <a href="/about" className="underline text-slate-700 hover:text-blue-600 ml-1 transition-colors">View methodology & sources</a>
          </p>
        </div>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-3">
          Healthcare Access Analysis Dashboard
        </h2>
        <p className="text-slate-700 text-lg">
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
      <div className="mt-10 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Financial Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-3">
                  <div className="bg-slate-100/80 backdrop-blur-sm p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {stats?.total_investment || 'N/A'}*
                </div>
                <div className="text-sm text-slate-700">
                  10-Year Investment (Est.)
                </div>
              </div>
            </div>
            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-3">
                  <div className="bg-slate-100/80 backdrop-blur-sm p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {stats?.net_benefit || 'N/A'}*
                </div>
                <div className="text-sm text-slate-700">
                  Net Benefit (Est.)
                </div>
              </div>
            </div>
            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-3">
                  <div className="bg-slate-100/80 backdrop-blur-sm p-3 rounded-full">
                    <Percent className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {stats?.roi || 'N/A'}*
                </div>
                <div className="text-sm text-slate-700">
                  Return on Investment (Est.)
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-700 max-w-2xl mx-auto">
              * Financial estimates based on industry averages and public health cost-benefit models.
              Actual costs and benefits may vary. <a href="/about" className="text-slate-700 hover:text-blue-600 underline transition-colors">View full methodology</a>
            </p>
          </div>
        </div>
      </div>

      {/* Healthcare Access Heatmap */}
      <div className="mt-10 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-100/80 backdrop-blur-sm p-2 rounded-lg">
              <Flame className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Healthcare Access Heatmap
            </h3>
          </div>
          <p className="text-sm text-slate-700 mb-4">
            Visualization of healthcare access gaps across LA County. Darker areas indicate census tracts with limited access to healthcare facilities.
          </p>
          <div className="relative">
            {/* Map iframe with glassmorphic border */}
            <div className="relative group/map">
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl blur opacity-30 group-hover/map:opacity-50 transition-opacity"></div>
              <div className="relative bg-slate-50/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/40 shadow-sm">
                <LazyIframe
                  src={`${API_URL}/api/maps/access-desert`}
                  className="w-full h-[500px]"
                  title="Healthcare Access Desert Heatmap"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
