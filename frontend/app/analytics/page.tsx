import { PriorityMatrix } from '@/components/charts/priority-matrix'
import { RegionalBreakdown } from '@/components/charts/regional-breakdown'
import { ImplementationTimeline } from '@/components/charts/implementation-timeline'
import { ImpactComparison } from '@/components/charts/impact-comparison'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { BarChart3, TrendingUp, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Advanced Analytics - LA Healthcare Access Dashboard',
  description: 'Comprehensive data analysis, regional breakdowns, implementation timelines, and impact projections for LA County healthcare access',
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-md">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Advanced Analytics
              </h1>
              <p className="text-slate-700 text-lg mt-1">
                Comprehensive data analysis and implementation planning
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold text-sm whitespace-nowrap shadow-md">
            <BarChart3 className="w-4 h-4 inline mr-2" />
            All Analytics
          </div>
          <div className="bg-white/70 backdrop-blur-sm border border-slate-300 text-slate-700 px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Impact Analysis
          </div>
          <div className="bg-white/70 backdrop-blur-sm border border-slate-300 text-slate-700 px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <MapPin className="w-4 h-4 inline mr-2" />
            Regional Data
          </div>
          <div className="bg-white/70 backdrop-blur-sm border border-slate-300 text-slate-700 px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <Clock className="w-4 h-4 inline mr-2" />
            Timeline
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="space-y-8">
          {/* Regional Analysis */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Regional Analysis</h2>
            </div>
            <RegionalBreakdown />
          </section>

          {/* Impact Comparison */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h2 className="text-2xl font-bold text-slate-900">Impact Projections</h2>
            </div>
            <ImpactComparison />
          </section>

          {/* Priority Matrix */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <h2 className="text-2xl font-bold text-slate-900">Recommendation Prioritization</h2>
            </div>
            <PriorityMatrix />
          </section>

          {/* Implementation Timeline */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-orange-600" />
              <h2 className="text-2xl font-bold text-slate-900">Implementation Roadmap</h2>
            </div>
            <ImplementationTimeline />
          </section>

          {/* Summary Stats */}
          <section className="mt-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

              <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Data Summary</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">2,498</div>
                    <div className="text-sm text-slate-700">Census Tracts Analyzed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">4,512</div>
                    <div className="text-sm text-slate-700">Healthcare Facilities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">9.9M</div>
                    <div className="text-sm text-slate-700">LA County Residents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">7</div>
                    <div className="text-sm text-slate-700">Major Regions</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                  <p className="text-sm text-slate-700 max-w-3xl mx-auto">
                    This comprehensive analysis combines geospatial data, census demographics, facility locations, and public health metrics to identify healthcare access gaps and prioritize evidence-based interventions across Los Angeles County.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
