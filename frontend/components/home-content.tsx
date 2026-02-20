'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart3, MapPin, Lightbulb, Database, ExternalLink, AlertTriangle, Clock, ArrowRight, Share2, BookOpen, Building2, CheckCircle, X } from 'lucide-react'
import { useRealtimeStats } from '@/lib/hooks/use-realtime-stats'

interface Stats {
  total_facilities?: number
  census_tracts?: number
  total_population?: number
  access_desert_population?: number
  avg_distance_km?: number
  facility_density?: number
  roi?: string
}

// ---- Sub-components ----

function ResearchDisclaimer() {
  const [dismissed, setDismissed] = useState(false)

  // On mount check if user already dismissed in this session
  useEffect(() => {
    try {
      if (sessionStorage.getItem('disclaimer-dismissed') === '1') {
        setDismissed(true)
      }
    } catch { /* sessionStorage may be blocked */ }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try { sessionStorage.setItem('disclaimer-dismissed', '1') } catch { /* ignore */ }
  }

  if (dismissed) return null

  return (
    <div
      className="mb-10 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-lg"
      role="note"
      aria-label="Educational research disclaimer"
    >
      <div className="flex gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
            Educational Research Project
          </h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            This dashboard represents <strong>independent student research</strong> for educational purposes.
            It has not been peer-reviewed or validated by public health experts.
            Data estimates have <strong>±30-50% uncertainty</strong>.{' '}
            <Link href="/limitations" className="underline hover:text-yellow-900 dark:hover:text-yellow-100 font-semibold">
              See full list of limitations
            </Link>
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss disclaimer"
          className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 transition-colors p-0.5 rounded focus-visible:ring-2 focus-visible:ring-yellow-500"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function DashboardTitle() {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 uppercase tracking-wider">
        Educational Research Project
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
        LA Healthcare Access Dashboard
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-3">
        GIS Analysis &amp; Visualization Project — Interactive Educational Demo
      </p>
      <p className="text-base text-gray-500 dark:text-gray-500 max-w-3xl mx-auto leading-relaxed">
        Geospatial analysis exploring healthcare facility access across Los Angeles County&apos;s{' '}
        <span className="font-semibold text-blue-700 dark:text-blue-400 tabular-nums">2,498 census tracts</span>,
        serving an estimated{' '}
        <span className="font-semibold text-blue-700 dark:text-blue-400">9.9 million residents</span>
      </p>
    </div>
  )
}

function UsageGuide() {
  return (
    <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-6">
      <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4">How to Use This Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Great for:
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
            <X className="w-5 h-5" /> Not suitable for:
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
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" /> For Official Data & Policy Recommendations:
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
  )
}

function KeyFindings({ stats }: { stats: Stats | null }) {
  return (
    <div className="mb-12 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Key Findings</h2>
      <p className="text-center text-sm text-yellow-700 dark:text-yellow-400 mb-6 font-medium flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4" /> These are illustrative estimates with ±30-50% uncertainty
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center p-5 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-sm transition-shadow">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Healthcare Facilities Analyzed</div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-1 tabular-nums">
            {(stats?.total_facilities || 4512).toLocaleString()}
          </div>
          <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Across LA County (Oct 2024 data)</div>
        </div>

        <div className="text-center p-5 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800 hover:shadow-sm transition-shadow">
          <div className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">Potential Access Gaps</div>
          <div className="text-3xl font-bold text-red-900 dark:text-red-200 mb-1 tabular-nums">
            {(stats?.access_desert_population || 80831).toLocaleString()}
          </div>
          <div className="text-xs text-red-600/70 dark:text-red-400/70">Residents living &gt;5km from nearest facility</div>
        </div>

        <div className="text-center p-5 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800 hover:shadow-sm transition-shadow">
          <div className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">Average Distance</div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-200 mb-1 tabular-nums">
            {(stats?.avg_distance_km || 0.88).toFixed(2)} km
          </div>
          <div className="text-xs text-green-600/70 dark:text-green-400/70">Straight-line distance (not travel time)</div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/analysis"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Explore Full Analysis
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function QuickStats({ stats }: { stats: Stats | null }) {
  const items = [
    { value: (stats?.total_facilities || 4512).toLocaleString(), label: 'Healthcare Facilities', color: 'text-blue-600 dark:text-blue-400' },
    { value: (stats?.census_tracts || 2498).toLocaleString(), label: 'Census Tracts', color: 'text-purple-600 dark:text-purple-400' },
    { value: `${(stats?.avg_distance_km || 0.88).toFixed(2)} km`, label: 'Avg Distance', color: 'text-green-600 dark:text-green-400' },
    { value: (stats?.facility_density || 4.5).toFixed(1), label: 'Per 10K Residents', color: 'text-orange-600 dark:text-orange-400' },
  ]

  return (
    <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Quick statistics overview">
      {items.map((item) => (
        <div
          key={item.label}
          className="text-center p-4 bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200"
        >
          <div className={`text-2xl font-bold tabular-nums ${item.color}`}>
            {item.value}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

const navItems = [
  {
    href: '/analysis',
    icon: BarChart3,
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    label: 'Data Analysis',
    desc: 'Interactive charts and regional breakdowns',
  },
  {
    href: '/recommendations',
    icon: Lightbulb,
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    label: 'Policy Recommendations',
    desc: 'Evidence-based interventions and ROI analysis',
  },
  {
    href: '/methodology',
    icon: Database,
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-50 dark:bg-purple-900/20',
    label: 'Methodology',
    desc: 'Technical implementation details',
  },
  {
    href: '/data',
    icon: Database,
    iconColor: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-50 dark:bg-teal-900/20',
    label: 'Data & API',
    desc: 'Complete data dictionary and API docs',
  },
  {
    href: '/resources',
    icon: ExternalLink,
    iconColor: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-50 dark:bg-green-900/20',
    label: 'External Resources',
    desc: 'Curated tools and facility locators',
  },
  {
    href: '/analysis#maps',
    icon: MapPin,
    iconColor: 'text-red-600 dark:text-red-400',
    iconBg: 'bg-red-50 dark:bg-red-900/20',
    label: 'Interactive Maps',
    desc: 'Facility locations and access heatmaps',
  },
]

function DashboardNav() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Explore the Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group block p-4 bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-blue-900/20 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label={`Navigate to ${item.label}`}
            >
              <div className="flex items-start gap-3">
                <div className={`${item.iconBg} p-2 rounded-lg shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-4 h-4 ${item.iconColor}`} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{item.desc}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function NextSteps() {
  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">What&apos;s Next?</h2>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          You&apos;ve explored the data. Here&apos;s how you can dive deeper or share this work with others.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
  )
}

// ---- Main component ----

export function HomeContent({ stats: ssrStats }: { stats: Stats | null }) {
  const { stats: realtimeStats } = useRealtimeStats()
  const stats = realtimeStats || ssrStats

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <ResearchDisclaimer />
      <DashboardTitle />
      <UsageGuide />
      <KeyFindings stats={stats} />
      <QuickStats stats={stats} />

      <div className="mb-10 text-center text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center gap-2 flex-wrap">
        <Clock className="w-3 h-3" />
        <span>Data: 2020 Census • Oct 2024 Facility Data</span>
        <span>•</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <span>•</span>
        <span className="text-yellow-600 dark:text-yellow-500">±30% uncertainty</span>
      </div>

      <DashboardNav />
      <NextSteps />
    </div>
  )
}
