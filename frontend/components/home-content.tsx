'use client'

import Link from 'next/link'
import { BarChart3, MapPin, Lightbulb, Code2, Database, ExternalLink, Zap, Users, AlertCircle, Target, ArrowRight, AlertTriangle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedNumber } from './ui/animated-number'
import { staggerContainer, slideUpFadeIn, buttonHover, iconRotate, popIn } from '@/lib/animations'
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
  // Real-time data
  const { stats: realtimeStats } = useRealtimeStats()

  // Merge SSR stats with real-time stats (real-time takes precedence)
  const stats = realtimeStats || ssrStats
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Educational Research Disclaimer - Prominent */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideUpFadeIn}
        className="mb-8"
      >
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-lg shadow-md">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                Educational Research Project
              </h3>
              <div className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
                <p>
                  This dashboard represents <strong>independent student research</strong> for educational purposes.
                  It has not been peer-reviewed or validated by public health experts.
                  Data estimates have <strong>±30-50% uncertainty</strong>.{' '}
                  <Link href="/about" className="underline hover:text-yellow-900 dark:hover:text-yellow-100 font-semibold">
                    See limitations
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideUpFadeIn}
        transition={{ delay: 0.1 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-dark-text-primary mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neon-cyan dark:to-neon-purple bg-clip-text text-transparent">
          LA Healthcare Access Dashboard
        </h1>
        <p className="text-xl text-slate-700 dark:text-dark-text-secondary max-w-3xl mx-auto">
          Comprehensive geospatial analysis of healthcare facility access across Los Angeles County, serving{' '}
          <span className="font-bold text-blue-600 dark:text-neon-cyan">9.9 million residents</span> across{' '}
          <span className="font-bold text-purple-600 dark:text-neon-purple">2,498 census tracts</span>
        </p>
      </motion.div>

      {/* Key Findings Hero */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideUpFadeIn}
        transition={{ delay: 0.2 }}
        className="mb-12 relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-neon-cyan/10 dark:via-neon-purple/10 dark:to-neon-pink/10 rounded-3xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>

        <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-cyan/30 rounded-3xl p-8 shadow-xl dark:shadow-neon-cyan/20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-neon-cyan dark:to-neon-purple p-3 rounded-xl shadow-md">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-dark-text-primary">Key Findings</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <motion.div variants={popIn} className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 dark:from-neon-pink/20 dark:to-red-500/20 rounded-2xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative bg-white/70 dark:bg-dark-bg-tertiary/70 backdrop-blur-sm border border-red-200 dark:border-neon-pink/30 rounded-2xl p-6 shadow-sm text-center hover:shadow-neon-pink/20 dark:hover:shadow-neon-pink transition-all"
              >
                <motion.div
                  className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-neon-pink" />
                </motion.div>
                <h3 className="font-bold text-slate-900 dark:text-dark-text-primary text-lg mb-2">Access Deserts Identified</h3>
                <p className="text-4xl font-bold text-red-600 dark:text-neon-pink mb-2">
                  <AnimatedNumber value={stats?.access_desert_population || 80831} separator="," />
                </p>
                <p className="text-sm text-slate-700 dark:text-dark-text-secondary">Residents living &gt;5km from nearest healthcare facility</p>
              </motion.div>
            </motion.div>

            <motion.div variants={popIn} className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 dark:from-neon-green/20 dark:to-green-500/20 rounded-2xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative bg-white/70 dark:bg-dark-bg-tertiary/70 backdrop-blur-sm border border-green-200 dark:border-neon-green/30 rounded-2xl p-6 shadow-sm text-center hover:shadow-neon-green/20 dark:hover:shadow-neon-green transition-all"
              >
                <motion.div
                  className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  whileHover="hover"
                  initial="rest"
                  variants={iconRotate}
                >
                  <Target className="w-8 h-8 text-green-600 dark:text-neon-green" />
                </motion.div>
                <h3 className="font-bold text-slate-900 dark:text-dark-text-primary text-lg mb-2">Projected ROI</h3>
                <p className="text-4xl font-bold text-green-600 dark:text-neon-green mb-2">
                  <AnimatedNumber value={539} suffix="%" />
                </p>
                <p className="text-sm text-slate-700 dark:text-dark-text-secondary">10-year return on $645M infrastructure investment</p>
              </motion.div>
            </motion.div>

            <motion.div variants={popIn} className="relative group/card">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-neon-cyan/20 dark:to-blue-500/20 rounded-2xl blur opacity-20 group-hover/card:opacity-40 transition-opacity"></div>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative bg-white/70 dark:bg-dark-bg-tertiary/70 backdrop-blur-sm border border-blue-200 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-sm text-center hover:shadow-neon-cyan/20 dark:hover:shadow-neon-cyan transition-all"
              >
                <motion.div
                  className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  <Users className="w-8 h-8 text-blue-600 dark:text-neon-cyan" />
                </motion.div>
                <h3 className="font-bold text-slate-900 dark:text-dark-text-primary text-lg mb-2">Population Impact</h3>
                <p className="text-4xl font-bold text-blue-600 dark:text-neon-cyan mb-2">
                  <AnimatedNumber value={3} suffix="M+" />
                </p>
                <p className="text-sm text-slate-700 dark:text-dark-text-secondary">People would benefit from recommended improvements</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="text-center">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonHover}
              className="inline-block"
            >
              <Link
                href="/analysis"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neon-cyan dark:to-neon-purple text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 dark:hover:shadow-neon-cyan transition-all font-semibold shadow-lg hover:shadow-xl text-lg"
              >
                Explore Full Analysis
                <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <motion.div variants={slideUpFadeIn} className="bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-white/40 dark:border-neon-cyan/20 rounded-2xl p-6 shadow-lg dark:shadow-neon-cyan/10 text-center hover:scale-105 transition-transform">
          <div className="text-3xl font-bold text-blue-600 dark:text-neon-cyan mb-1">
            <AnimatedNumber value={stats?.total_facilities || 4512} separator="," />
          </div>
          <div className="text-sm text-slate-700 dark:text-dark-text-secondary">Healthcare Facilities</div>
        </motion.div>
        <motion.div variants={slideUpFadeIn} className="bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-white/40 dark:border-neon-purple/20 rounded-2xl p-6 shadow-lg dark:shadow-neon-purple/10 text-center hover:scale-105 transition-transform">
          <div className="text-3xl font-bold text-purple-600 dark:text-neon-purple mb-1">
            <AnimatedNumber value={stats?.census_tracts || 2498} separator="," />
          </div>
          <div className="text-sm text-slate-700 dark:text-dark-text-secondary">Census Tracts Analyzed</div>
        </motion.div>
        <motion.div variants={slideUpFadeIn} className="bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-white/40 dark:border-neon-green/20 rounded-2xl p-6 shadow-lg dark:shadow-neon-green/10 text-center hover:scale-105 transition-transform">
          <div className="text-3xl font-bold text-green-600 dark:text-neon-green mb-1">
            <AnimatedNumber value={stats?.avg_distance_km || 0.88} decimals={2} suffix=" km" />
          </div>
          <div className="text-sm text-slate-700 dark:text-dark-text-secondary">Avg Distance to Facility</div>
        </motion.div>
        <motion.div variants={slideUpFadeIn} className="bg-white/70 dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-white/40 dark:border-orange-400/20 rounded-2xl p-6 shadow-lg dark:shadow-orange-400/10 text-center hover:scale-105 transition-transform">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            <AnimatedNumber value={stats?.facility_density || 4.5} decimals={1} />
          </div>
          <div className="text-sm text-slate-700 dark:text-dark-text-secondary">Facilities per 10K</div>
        </motion.div>
      </motion.div>

      {/* Data Freshness Indicator for Quick Stats */}
      <div className="mb-12 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Data: 2020 Census • Oct 2024 Facility Data</span>
        </div>
        <span>•</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <span>•</span>
        <span className="text-yellow-600 dark:text-yellow-400 font-medium">±30% uncertainty</span>
      </div>

      {/* Navigation Hub */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideUpFadeIn}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text-primary mb-6 text-center">Explore the Dashboard</h2>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Analysis */}
          <motion.div variants={slideUpFadeIn} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link href="/analysis" className="group block h-full">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-neon-cyan/20 dark:to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-cyan/30 rounded-2xl p-6 shadow-lg group-hover:shadow-xl dark:group-hover:shadow-neon-cyan/50 transition-all h-full">
                  <motion.div
                    className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <BarChart3 className="w-7 h-7 text-blue-600 dark:text-neon-cyan" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">Data Analysis</h3>
                  <p className="text-slate-700 dark:text-dark-text-secondary text-sm mb-4">Interactive charts, regional breakdowns, and impact visualizations</p>
                  <div className="flex items-center text-blue-600 dark:text-neon-cyan font-semibold text-sm group-hover:gap-2 transition-all">
                    View Analysis <motion.div whileHover={{ x: 5 }}><ArrowRight className="w-4 h-4 ml-1" /></motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Recommendations */}
          <motion.div variants={slideUpFadeIn} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link href="/recommendations" className="group block h-full">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-neon-green/20 dark:to-green-500/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-green/30 rounded-2xl p-6 shadow-lg group-hover:shadow-xl dark:group-hover:shadow-neon-green/50 transition-all h-full">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                    <Lightbulb className="w-7 h-7 text-green-600 dark:text-neon-green" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">Policy Recommendations</h3>
                  <p className="text-slate-700 dark:text-dark-text-secondary text-sm mb-4">Evidence-based interventions, implementation timeline, and ROI analysis</p>
                  <div className="flex items-center text-green-600 dark:text-neon-green font-semibold text-sm group-hover:gap-2 transition-all">
                    View Recommendations <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Methodology */}
          <motion.div variants={slideUpFadeIn} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link href="/methodology" className="group block h-full">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-neon-purple/20 dark:to-neon-pink/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-purple/30 rounded-2xl p-6 shadow-lg group-hover:shadow-xl dark:group-hover:shadow-neon-purple/50 transition-all h-full">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                    <Code2 className="w-7 h-7 text-purple-600 dark:text-neon-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">Methodology</h3>
                  <p className="text-slate-700 dark:text-dark-text-secondary text-sm mb-4">KD-tree algorithms, CRS projections, and technical implementation details</p>
                  <div className="flex items-center text-purple-600 dark:text-neon-purple font-semibold text-sm group-hover:gap-2 transition-all">
                    View Methodology <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Data & API */}
          <motion.div variants={slideUpFadeIn} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link href="/data" className="group block h-full">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-400/20 dark:to-amber-400/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-orange-400/30 rounded-2xl p-6 shadow-lg group-hover:shadow-xl dark:group-hover:shadow-orange-400/50 transition-all h-full">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                    <Database className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">Data & API</h3>
                  <p className="text-slate-700 dark:text-dark-text-secondary text-sm mb-4">Complete data dictionary with 7 RESTful endpoints and integration guides</p>
                  <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold text-sm group-hover:gap-2 transition-all">
                    View Data & API <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Resources */}
          <motion.div variants={slideUpFadeIn} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link href="/resources" className="group block h-full">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-400/20 dark:to-cyan-400/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-teal-400/30 rounded-2xl p-6 shadow-lg group-hover:shadow-xl dark:group-hover:shadow-teal-400/50 transition-all h-full">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                    <ExternalLink className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">External Resources</h3>
                  <p className="text-slate-700 dark:text-dark-text-secondary text-sm mb-4">20+ curated tools, HPSA/MUA finders, and facility locators</p>
                  <div className="flex items-center text-teal-600 dark:text-teal-400 font-semibold text-sm group-hover:gap-2 transition-all">
                    View Resources <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Interactive Maps */}
          <motion.div variants={slideUpFadeIn} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link href="/analysis#maps" className="group block h-full">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-neon-pink/20 dark:to-rose-400/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-md border border-white/60 dark:border-neon-pink/30 rounded-2xl p-6 shadow-lg group-hover:shadow-xl dark:group-hover:shadow-neon-pink/50 transition-all h-full">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-xl w-14 h-14 mb-4 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-pink-600 dark:text-neon-pink" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">Interactive Maps</h3>
                  <p className="text-slate-700 dark:text-dark-text-secondary text-sm mb-4">Facility locations and access desert heatmaps with custom legends</p>
                  <div className="flex items-center text-pink-600 dark:text-neon-pink font-semibold text-sm group-hover:gap-2 transition-all">
                    View Maps <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
