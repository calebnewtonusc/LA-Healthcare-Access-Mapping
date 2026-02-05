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
      color: 'blue',
      delay: 0
    },
    {
      label: 'Population Served',
      value: stats?.population_served_by_facilities,
      icon: Building2,
      color: 'green',
      delay: 0.1
    },
    {
      label: 'Policy Recommendations',
      value: stats?.num_recommendations,
      icon: FileText,
      color: 'purple',
      delay: 0.2
    },
    {
      label: 'Recommended Facilities',
      value: stats?.num_facilities,
      icon: MapPin,
      color: 'pink',
      delay: 0.3
    },
  ]

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      number: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      number: 'text-green-600'
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      number: 'text-purple-600'
    },
    pink: {
      bg: 'bg-pink-50',
      iconBg: 'bg-pink-100',
      iconText: 'text-pink-600',
      number: 'text-pink-600'
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const colors = colorClasses[metric.color as keyof typeof colorClasses]
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: metric.delay }}
            className={`${colors.bg} border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                {metric.value !== undefined ? (
                  <p className={`text-4xl font-bold ${colors.number}`}>
                    <AnimatedNumber value={metric.value} />
                  </p>
                ) : (
                  <p className="text-2xl font-semibold text-gray-400">
                    Data Unavailable
                  </p>
                )}
              </div>
              <div className={`${colors.iconBg} p-3 rounded-full`}>
                <metric.icon className={`w-8 h-8 ${colors.iconText}`} />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
