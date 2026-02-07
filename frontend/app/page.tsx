import Link from 'next/link'
import { BarChart3, MapPin, Lightbulb, Code2, Database, ExternalLink, Zap, TrendingUp, Users, Building2, AlertCircle, Target, ArrowRight } from 'lucide-react'

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

export default async function HomePage() {
  const stats = await getStats()

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Academic Disclaimer */}
      <div className="mb-6 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-xl p-4 shadow-md">
          <p className="text-sm text-slate-800 text-center">
            <span className="font-bold text-slate-900">Academic Research Project</span> • For educational purposes •
            Analysis based on public datasets • Not official LA County policy •
            <Link href="/methodology" className="underline text-slate-700 hover:text-blue-600 ml-1 transition-colors">View methodology & sources</Link>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
          LA Healthcare Access Dashboard
        </h1>
        <p className="text-xl text-slate-700 max-w-3xl mx-auto">
          Comprehensive geospatial analysis of healthcare facility access across Los Angeles County, serving <span className="font-bold text-blue-600">9.9 million residents</span> across <span className="font-bold text-purple-600">2,498 census tracts</span>
        </p>
      </div>

      {/* Key Findings Hero */}
      <div className="mb-12 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

        <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-md">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Key Findings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-red-200 rounded-2xl p-6 shadow-sm text-center">
                <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Access Deserts Identified</h3>
                <p className="text-4xl font-bold text-red-600 mb-2">{stats?.access_desert_population || '80,831'}</p>
                <p className="text-sm text-slate-700">Residents living &gt;5km from nearest healthcare facility</p>
              </div>
            </div>

            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-sm text-center">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Projected ROI</h3>
                <p className="text-4xl font-bold text-green-600 mb-2">{stats?.roi || '539%'}</p>
                <p className="text-sm text-slate-700">10-year return on $645M infrastructure investment</p>
              </div>
            </div>

            <div className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 shadow-sm text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Population Impact</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">3M+</p>
                <p className="text-sm text-slate-700">People would benefit from recommended improvements</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/analysis"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl text-lg"
            >
              Explore Full Analysis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">{stats?.total_facilities || '4,512'}</div>
          <div className="text-sm text-slate-700">Healthcare Facilities</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">{stats?.census_tracts || '2,498'}</div>
          <div className="text-sm text-slate-700">Census Tracts Analyzed</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">{stats?.avg_distance_km || '0.88'} km</div>
          <div className="text-sm text-slate-700">Avg Distance to Facility</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">{stats?.facility_density || '4.5'}</div>
          <div className="text-sm text-slate-700">Facilities per 10K</div>
        </div>
      </div>

      {/* Navigation Hub */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Explore the Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Analysis */}
          <Link href="/analysis" className="group">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all h-full">
                <div className="bg-blue-100 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Data Analysis</h3>
                <p className="text-slate-700 text-sm mb-4">Interactive charts, regional breakdowns, and impact visualizations</p>
                <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  View Analysis <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* Recommendations */}
          <Link href="/recommendations" className="group">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all h-full">
                <div className="bg-green-100 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Policy Recommendations</h3>
                <p className="text-slate-700 text-sm mb-4">Evidence-based interventions, implementation timeline, and ROI analysis</p>
                <div className="flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  View Recommendations <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* Methodology */}
          <Link href="/methodology" className="group">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all h-full">
                <div className="bg-purple-100 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                  <Code2 className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Methodology</h3>
                <p className="text-slate-700 text-sm mb-4">KD-tree algorithms, CRS projections, and technical implementation details</p>
                <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  View Methodology <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* Data & API */}
          <Link href="/data" className="group">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all h-full">
                <div className="bg-orange-100 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                  <Database className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Data & API</h3>
                <p className="text-slate-700 text-sm mb-4">Complete data dictionary, live API endpoints, and integration guides</p>
                <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Access Data <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* Resources */}
          <Link href="/resources" className="group">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all h-full">
                <div className="bg-indigo-100 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                  <ExternalLink className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">External Resources</h3>
                <p className="text-slate-700 text-sm mb-4">Official HPSA/MUA tools, facility locators, and government datasets</p>
                <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  View Resources <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* Maps (Analytics subpage) */}
          <Link href="/analysis#maps" className="group">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-green-100 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all h-full">
                <div className="bg-teal-100 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Interactive Maps</h3>
                <p className="text-slate-700 text-sm mb-4">Facility locations, access desert heatmaps, and regional analysis</p>
                <div className="flex items-center text-teal-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  View Maps <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Ready to Dive Deeper?</h3>
        <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
          Explore comprehensive data analysis, evidence-based policy recommendations, and technical methodology behind this healthcare access study.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            <BarChart3 className="w-5 h-5" />
            Start with Analysis
          </Link>
          <Link
            href="/recommendations"
            className="inline-flex items-center gap-2 bg-white border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all font-semibold shadow-sm hover:shadow-md"
          >
            <Lightbulb className="w-5 h-5" />
            View Recommendations
          </Link>
        </div>
      </div>
    </div>
  )
}
