'use client'

import { motion } from 'framer-motion'
import { Users, Building2, FileText, MapPin } from 'lucide-react'
import { AnimatedNumber } from './ui/animated-number'

interface KeyMetricsProps {
  stats: {
    population_affected?: number
    population_served_by_facilities?: number
    num_recommendations?: number
    num_facilities?: number
    roi?: string
    net_benefit?: string
  } | null
}

export function KeyMetrics({ stats }: KeyMetricsProps) {
  const metrics = [
    {
      label: 'Population Affected',
      value: stats?.population_affected,
      icon: Users,
      gradientFrom: 'from-neon-cyan',
      gradientTo: 'to-blue-500',
      delay: 0
    },
    {
      label: 'Population Served',
      value: stats?.population_served_by_facilities,
      icon: Building2,
      gradientFrom: 'from-neon-green',
      gradientTo: 'to-green-600',
      delay: 0.1
    },
    {
      label: 'Policy Recommendations',
      value: stats?.num_recommendations,
      icon: FileText,
      gradientFrom: 'from-neon-purple',
      gradientTo: 'to-purple-600',
      delay: 0.2
    },
    {
      label: 'Recommended Facilities',
      value: stats?.num_facilities,
      icon: MapPin,
      gradientFrom: 'from-neon-pink',
      gradientTo: 'to-pink-600',
      delay: 0.3
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: metric.delay }}
          className="relative group"
        >
          {/* Gradient border glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-2xl blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-300" />

          {/* Glass card content */}
          <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-glass hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-text-secondary mb-2">{metric.label}</p>
                {metric.value !== undefined ? (
                  <p className={`text-4xl font-bold bg-gradient-to-r ${metric.gradientFrom} ${metric.gradientTo} bg-clip-text text-transparent`}>
                    <AnimatedNumber value={metric.value} />
                  </p>
                ) : (
                  <p className="text-2xl font-semibold text-text-muted">
                    Data Unavailable
                  </p>
                )}
              </div>
              <div className={`bg-gradient-to-br ${metric.gradientFrom} ${metric.gradientTo} p-3 rounded-full animate-float`}>
                <metric.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
