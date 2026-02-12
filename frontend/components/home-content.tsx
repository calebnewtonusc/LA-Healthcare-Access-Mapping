'use client'

import Link from 'next/link'
import { BarChart3, MapPin, Lightbulb, Database, ExternalLink, AlertTriangle, Clock, ArrowRight, Share2, BookOpen, Building2 } from 'lucide-react'
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
              <Link href="/limitations" className="underline hover:text-yellow-900 dark:hover:text-yellow-100 font-semibold">
                See full list of limitations →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Simple Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          LA Healthcare Access Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-2">
          GIS Analysis & Visualization Project | Educational Demo
        </p>
        <p className="text-base text-gray-500 dark:text-gray-500 max-w-3xl mx-auto">
          Interactive geospatial analysis exploring healthcare facility access across Los Angeles County's{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-300">2,498 census tracts</span>, serving{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-300">9.9 million residents</span>
        </p>
      </div>

      {/* How to Use This Dashboard */}
      <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4">How to Use This Dashboard</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
              <span className="text-xl">✅</span> Great for:
            </h3>
            <ul className="text-sm text-blue-900 dark:text-blue-200 space-y-1.5">
              <li>• Learning GIS analysis techniques</li>
              <li>• Exploring visualization methods</li>
              <li>• Understanding spatial access concepts</li>
              <li>• Educational discussions about healthcare equity</li>
              <li>• Portfolio demonstration of technical skills</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
              <span className="text-xl">❌</span> Not suitable for:
            </h3>
            <ul className="text-sm text-blue-900 dark:text-blue-200 space-y-1.5">
              <li>• Policy decisions or planning documents</li>
              <li>• Grant applications or funding requests</li>
              <li>• Official healthcare access assessments</li>
              <li>• Real-world investment decisions</li>
              <li>• Replacing community engagement</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-blue-200 dark:border-blue-700">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
            📍 For Official Data & Policy Recommendations:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://data.hrsa.gov/tools/shortage-area/hpsa-find"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              HRSA HPSA Finder <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="http://publichealth.lacounty.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              LA County Department of Public Health <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Key Findings - Simplified */}
      <div className="mb-12 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Key Findings</h2>
        <p className="text-center text-sm text-yellow-700 dark:text-yellow-400 mb-6 font-medium">
          ⚠️ These are illustrative estimates with ±30-50% uncertainty
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Healthcare Facilities Analyzed</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {(stats?.total_facilities || 4512).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Across LA County (Oct 2024 data)</div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Potential Access Gaps</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {(stats?.access_desert_population || 80831).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Residents living &gt;5km from nearest facility</div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Average Distance</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {(stats?.avg_distance_km || 0.88).toFixed(2)} km
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Straight-line distance (not travel time)</div>
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

      {/* Next Steps Section */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">What's Next?</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            You've explored the data. Here's how you can dive deeper or share this work with others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Explore Analysis */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Explore the Analysis</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Dive into interactive visualizations, regional breakdowns, and discover which areas face the greatest access challenges.
              </p>
              <Link
                href="/analysis"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors group-hover:gap-3"
              >
                View Analysis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Learn GIS Techniques */}
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Learn GIS Techniques</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Understand the methodology behind spatial access analysis, including data sources, calculations, and limitations.
              </p>
              <Link
                href="/methodology"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors group-hover:gap-3"
              >
                View Methodology
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Share with Educators */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
                  <Share2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Share with Educators</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Perfect for GIS courses, public health education, or data visualization workshops. All code and data sources are documented.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:?subject=LA Healthcare Access Dashboard&body=Check out this educational GIS analysis project: [URL]"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Share via Email
                  <Share2 className="w-4 h-4" />
                </a>
                <Link
                  href="/data"
                  className="inline-flex items-center gap-2 bg-green-100 hover:bg-green-200 dark:bg-green-800/30 dark:hover:bg-green-800/50 text-green-700 dark:text-green-300 px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  View API Docs
                </Link>
              </div>
            </div>
          </div>

          {/* Official Resources */}
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg">
                  <Building2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Official Resources</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                For real-world healthcare decisions, consult validated data from HRSA, LA County DPH, and other official agencies.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://data.hrsa.gov/tools/shortage-area/hpsa-find"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  HRSA HPSA Finder
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="http://publichealth.lacounty.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-100 hover:bg-orange-200 dark:bg-orange-800/30 dark:hover:bg-orange-800/50 text-orange-700 dark:text-orange-300 px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  LA County DPH
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gray-50 dark:bg-dark-bg-secondary border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Explore?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
            Start with the interactive analysis or jump straight to the methodology to see how it all works.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/analysis"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
            >
              <BarChart3 className="w-5 h-5" />
              Start Exploring
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/recommendations"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 dark:bg-dark-bg-tertiary dark:hover:bg-dark-bg-secondary text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
            >
              <Lightbulb className="w-5 h-5" />
              View Recommendations
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
