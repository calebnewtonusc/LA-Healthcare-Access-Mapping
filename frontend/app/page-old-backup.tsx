import { KeyMetrics } from '@/components/key-metrics'
import { RecommendationsList } from '@/components/recommendations-list'
import { FacilityMapSection } from '@/components/facility-map-section'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { LazyIframe } from '@/components/ui/lazy-iframe'
import { DollarSign, TrendingUp, Percent, MapPin, Flame, ExternalLink, AlertCircle, Target, Zap, Users, Building2, ArrowRight, CheckCircle } from 'lucide-react'

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

      {/* Key Findings Hero Section */}
      <div className="mb-10 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Key Findings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-red-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Access Deserts</h4>
                    <p className="text-3xl font-bold text-red-600 mt-2">80,831</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700">Residents living more than 5km from the nearest healthcare facility</p>
              </div>
            </div>

            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-green-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">ROI Projection</h4>
                    <p className="text-3xl font-bold text-green-600 mt-2">539%</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700">Expected 10-year return on healthcare infrastructure investment</p>
              </div>
            </div>

            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-blue-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Population Impact</h4>
                    <p className="text-3xl font-bold text-blue-600 mt-2">3M+</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700">People would benefit from recommended infrastructure improvements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-10">
        <KeyMetrics stats={stats} />
      </div>

      {/* Impact Comparison: Current vs Recommended */}
      <div className="mb-10 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-blue-50 to-slate-100 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-3 rounded-xl shadow-md">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Current State vs. Recommended Improvements</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current State */}
            <div className="relative group/current">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 rounded-xl blur opacity-30 group-hover/current:opacity-50 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-red-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h4 className="font-bold text-lg text-slate-900">Current Situation</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded-full p-1.5 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">80,831 residents</p>
                      <p className="text-sm text-slate-700">Living in healthcare access deserts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded-full p-1.5 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">4.5 facilities/10K</p>
                      <p className="text-sm text-slate-700">Current facility density</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded-full p-1.5 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Limited access</p>
                      <p className="text-sm text-slate-700">For low-income and remote areas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded-full p-1.5 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">High ER utilization</p>
                      <p className="text-sm text-slate-700">For preventable conditions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended State */}
            <div className="relative group/recommended">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 rounded-xl blur opacity-30 group-hover/recommended:opacity-50 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-green-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-lg text-slate-900">With Recommendations</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">40-60% reduction</p>
                      <p className="text-sm text-slate-700">In access desert population</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">10 new facilities</p>
                      <p className="text-sm text-slate-700">Strategically located in underserved areas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Mobile & telehealth</p>
                      <p className="text-sm text-slate-700">Immediate access for vulnerable populations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">3M+ people served</p>
                      <p className="text-sm text-slate-700">Improved preventive care access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Learn More About Our Methodology
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 p-3 rounded-xl shadow-md">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Financial Analysis & ROI Projection
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-blue-200 rounded-xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats?.total_investment || '$645M'}
                </div>
                <div className="text-sm text-slate-700 font-medium">
                  Total Investment Required
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  10-year projection
                </div>
              </div>
            </div>
            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-green-200 rounded-xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {stats?.net_benefit || '$4.1B'}
                </div>
                <div className="text-sm text-slate-700 font-medium">
                  Estimated Savings
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  over 10 years
                </div>
              </div>
            </div>
            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-purple-200 rounded-xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Percent className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {stats?.roi || '539%'}
                </div>
                <div className="text-sm text-slate-700 font-medium">
                  Return on Investment
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  10-year ROI
                </div>
              </div>
            </div>
          </div>

          {/* ROI Visual Breakdown */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Investment vs. Savings Comparison
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-700 font-medium">Investment Required</span>
                  <span className="font-bold text-blue-600">$645M</span>
                </div>
                <div className="h-8 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-3" style={{width: '15%'}}>
                    <span className="text-xs text-white font-semibold">15%</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-700 font-medium">Estimated Savings</span>
                  <span className="font-bold text-green-600">$4.1B</span>
                </div>
                <div className="h-8 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end pr-3" style={{width: '100%'}}>
                    <span className="text-xs text-white font-semibold">100%</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-4 text-center">
              For every $1 invested, an estimated <strong className="text-green-700">$6.39 in healthcare savings</strong> is expected over 10 years
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-700 max-w-2xl mx-auto">
              Financial estimates based on industry averages and public health cost-benefit models.
              Actual costs and benefits may vary. <a href="/about" className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors">View full methodology</a>
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
