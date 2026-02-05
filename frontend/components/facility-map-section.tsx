'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, TrendingUp, ExternalLink } from 'lucide-react'
import { NeonBadge } from './ui/neon-badge'

interface Facility {
  geoid?: string
  tract_name?: string
  latitude?: number
  longitude?: number
  current_distance_km?: number
  population_served?: number
  median_income?: number
  priority_reason?: string
  estimated_impact?: number
}

interface FacilityMapSectionProps {
  facilities: Facility[] | null
}

export function FacilityMapSection({ facilities }: FacilityMapSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const getRankBadge = (index: number) => {
    if (index === 0) return { label: '1st', variant: 'high' as const }
    if (index === 1) return { label: '2nd', variant: 'medium' as const }
    if (index === 2) return { label: '3rd', variant: 'low' as const }
    return { label: `${index + 1}th`, variant: 'low' as const }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Recommended Facility Locations
      </h3>

      {/* Map Embed */}
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-300">
          <iframe
            src={`${API_URL}/api/maps/facility-locations`}
            className="w-full h-96"
            title="Facility Locations Map"
          />
        </div>

        <p className="text-xs text-gray-600 mt-3 text-center flex items-center justify-center gap-2">
          <MapPin className="w-3 h-3" />
          Interactive map showing 10 priority locations for new healthcare facilities
        </p>
      </div>

      {/* Facilities List */}
      {facilities && facilities.length > 0 && (
        <div>
          <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Top Priority Locations
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {facilities.slice(0, 5).map((facility, index) => {
              const badge = getRankBadge(index)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <NeonBadge variant={badge.variant}>
                          {badge.label}
                        </NeonBadge>
                        <span className="font-semibold text-gray-900">
                          {facility.tract_name?.split(';')[0] || `Census Tract ${facility.geoid}` || 'Census Tract'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{facility.estimated_impact?.toLocaleString() || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{facility.current_distance_km?.toFixed(1)}km away</span>
                        </div>
                      </div>
                      {facility.priority_reason && (
                        <div className="text-xs text-gray-500">
                          {facility.priority_reason}
                        </div>
                      )}
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          <div className="mt-4 text-center">
            <a
              href={`${API_URL}/api/maps/facility-locations`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors group"
            >
              View all {facilities.length} locations on interactive map
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
