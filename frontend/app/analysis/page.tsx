import { Breadcrumbs } from '@/components/breadcrumbs'
import { KeyMetrics } from '@/components/key-metrics'
import { FacilityMapSection } from '@/components/facility-map-section'
import { RegionalBreakdown } from '@/components/charts/regional-breakdown'
import { ImpactComparison } from '@/components/charts/impact-comparison'
import { LazyIframe } from '@/components/ui/lazy-iframe'
import { BarChart3, MapPin, TrendingUp, Layers, Flame } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getStats() {
  try {
    const res = await fetch(`${API_URL}/api/stats`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
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
    return null
  }
}

export const metadata = {
  title: 'Data Analysis - LA Healthcare Access Dashboard',
  description: 'Comprehensive data analysis, interactive charts, regional breakdowns, and geospatial visualizations for LA County healthcare access',
}

export default async function AnalysisPage() {
  const [stats, facilities] = await Promise.all([
    getStats(),
    getFacilities()
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-primary transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-neon-cyan dark:to-neon-purple p-3 rounded-xl shadow-md dark:shadow-neon-cyan/30">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-dark-text-primary">
                Comprehensive Data Analysis
              </h1>
              <p className="text-slate-700 dark:text-dark-text-secondary text-lg mt-1">
                Interactive visualizations and detailed metrics across Los Angeles County
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-neon-cyan" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Overview Metrics</h2>
          </div>
          <KeyMetrics stats={stats} />
        </section>

        {/* Regional Breakdown */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-600 dark:text-neon-green" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Regional Analysis</h2>
          </div>
          <RegionalBreakdown />
        </section>

        {/* Impact Comparison */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-neon-purple" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Impact Projections</h2>
          </div>
          <ImpactComparison />
        </section>

        {/* Interactive Maps Section */}
        <section className="mb-12" id="maps">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary">Interactive Maps</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Facility Locations Map */}
            <FacilityMapSection facilities={facilities} />

            {/* Access Desert Heatmap */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 dark:from-neon-pink/10 dark:to-orange-400/10 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>

              <div className="relative bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-white/40 dark:border-neon-pink/30 rounded-2xl p-6 shadow-lg dark:shadow-neon-pink/10 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                    <Flame className="w-5 h-5 text-red-600 dark:text-neon-pink" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary">Healthcare Access Deserts</h3>
                </div>

                <div className="relative group/map">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 dark:from-neon-pink dark:to-orange-400 rounded-xl blur opacity-25 group-hover/map:opacity-50 transition-opacity"></div>

                  <div className="relative bg-slate-900 rounded-xl overflow-hidden border-2 border-white/20 dark:border-neon-pink/30 shadow-xl">
                    <LazyIframe
                      src={`${API_URL}/api/maps/access-desert`}
                      title="Healthcare Access Desert Heatmap"
                      className="w-full h-96 rounded-xl"
                    />
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-dark-text-secondary mt-4">
                  Heatmap showing healthcare access scores across census tracts. Red areas indicate access deserts (score &lt; 40).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Summary */}
        <section className="mt-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-neon-cyan/10 dark:via-neon-purple/10 dark:to-neon-pink/10 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

            <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-cyan/30 rounded-2xl p-8 shadow-lg dark:shadow-neon-cyan/20 transition-colors duration-300">
              <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-6 text-center">Analysis Summary</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-neon-cyan mb-1">2,498</div>
                  <div className="text-sm text-slate-700 dark:text-dark-text-secondary">Census Tracts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-neon-green mb-1">4,512</div>
                  <div className="text-sm text-slate-700 dark:text-dark-text-secondary">Healthcare Facilities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-neon-purple mb-1">9.9M</div>
                  <div className="text-sm text-slate-700 dark:text-dark-text-secondary">Residents Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">7</div>
                  <div className="text-sm text-slate-700 dark:text-dark-text-secondary">Major Regions</div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-dark-bg-tertiary border border-slate-200 dark:border-slate-700 rounded-lg p-4 transition-colors duration-300">
                <p className="text-sm text-slate-700 dark:text-dark-text-secondary text-center max-w-3xl mx-auto">
                  This analysis combines geospatial data, census demographics, and facility locations to create a comprehensive picture of healthcare access across Los Angeles County. Using advanced algorithms including KD-tree nearest neighbor search and proper CRS projections, we identified access gaps and optimal intervention strategies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
