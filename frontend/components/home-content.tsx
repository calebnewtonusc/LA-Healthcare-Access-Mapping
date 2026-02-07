'use client'

import Link from 'next/link'
import { BarChart3, MapPin, Lightbulb, Database, ExternalLink, AlertTriangle, Clock } from 'lucide-react'
import { useRealtimeStats } from '@/lib/hooks/use-realtime-stats'

interface Stats {
  total_facilities: number
  census_tracts: number
  total_population: number
  access_desert_population: number
  avg_distance_km: number
  facility_density: number
  roi?: string
}

export function HomeContent({ stats: ssrStats }: { stats: Stats | null }) {
  const { stats: realtimeStats } = useRealtimeStats()
  const stats = realtimeStats || ssrStats

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Educational Research Disclaimer */}
      <div className="mb-10 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
              Educational Research Project
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              This dashboard represents <strong>independent student research</strong> for educational purposes.
              It has not been peer-reviewed or validated by public health experts.
              Data estimates have <strong>±30-50% uncertainty</strong>.{' '}
              <Link href="/about" className="underline hover:text-yellow-900">
                See limitations
              </Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Simple Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          LA Healthcare Access Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive geospatial analysis of healthcare facility access across Los Angeles County, serving{' '}
          <span className="font-semibold text-gray-900 dark:text-white">9.9 million residents</span> across{' '}
          <span className="font-semibold text-gray-900 dark:text-white">2,498 census tracts</span>
        </p>
      </div>

      {/* Key Findings - Simplified */}
      <div className="mb-12 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Key Findings</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Access Deserts Identified</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {(stats?.access_desert_population || 80831).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Residents living &gt;5km from nearest facility</div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Projected ROI</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">539%</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">10-year return on $645M investment</div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Population Impact</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3M+</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">People would benefit from improvements</div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/analysis"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded font-medium transition-colors"
          >
            Explore Full Analysis →
          </Link>
        </div>
      </div>

      {/* Quick Stats - Minimal */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {(stats?.total_facilities || 4512).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Healthcare Facilities</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {(stats?.census_tracts || 2498).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Census Tracts</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {(stats?.avg_distance_km || 0.88).toFixed(2)} km
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Avg Distance</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {(stats?.facility_density || 4.5).toFixed(1)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Per 10K Residents</div>
        </div>
      </div>

      {/* Data Freshness */}
      <div className="mb-10 text-center text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center gap-2 flex-wrap">
        <Clock className="w-3 h-3" />
        <span>Data: 2020 Census • Oct 2024 Facility Data</span>
        <span>•</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <span>•</span>
        <span className="text-yellow-600 dark:text-yellow-500">±30% uncertainty</span>
      </div>

      {/* Navigation - Clean Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Explore the Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/analysis" className="block p-4 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Data Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Interactive charts and regional breakdowns</p>
              </div>
            </div>
          </Link>

          <Link href="/recommendations" className="block p-4 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Policy Recommendations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Evidence-based interventions and ROI analysis</p>
              </div>
            </div>
          </Link>

          <Link href="/methodology" className="block p-4 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Methodology</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Technical implementation details</p>
              </div>
            </div>
          </Link>

          <Link href="/data" className="block p-4 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Data & API</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Complete data dictionary and API docs</p>
              </div>
            </div>
          </Link>

          <Link href="/resources" className="block p-4 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">External Resources</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Curated tools and facility locators</p>
              </div>
            </div>
          </Link>

          <Link href="/analysis#maps" className="block p-4 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Interactive Maps</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Facility locations and access heatmaps</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
