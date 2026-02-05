'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, TrendingUp, ExternalLink } from 'lucide-react'
import { NeonBadge } from './ui/neon-badge'

interface Facility {
  census_tract?: string
  latitude?: number
  longitude?: number
  distance_to_nearest_facility_km?: number
  population?: number
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
    if (index === 0) return { label: '1st', variant: 'cyan' as const }
    if (index === 1) return { label: '2nd', variant: 'purple' as const }
    if (index === 2) return { label: '3rd', variant: 'pink' as const }
    return { label: `${index + 1}th`, variant: 'green' as const }
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glass p-6">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent mb-4">
        Recommended Facility Locations
      </h3>

      {/* Map Embed with neon glow */}
      <div className="mb-6">
        <div className="relative">
          {/* Neon border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink rounded-2xl blur opacity-75" />

          {/* Map iframe with backdrop */}
          <div className="relative bg-bg-secondary rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src={`${API_URL}/api/maps/facility-locations`}
              className="w-full h-96"
              title="Facility Locations Map"
            />
          </div>
        </div>

        <p className="text-xs text-text-muted mt-3 text-center flex items-center justify-center gap-2">
          <MapPin className="w-3 h-3" />
          Interactive map showing 10 priority locations for new healthcare facilities
        </p>
      </div>

      {/* Facilities List */}
      {facilities && facilities.length > 0 && (
        <div>
          <h4 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-neon-cyan" />
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
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-neon-cyan/50 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <NeonBadge variant={badge.variant}>
                          {badge.label}
                        </NeonBadge>
                        <span className="font-semibold text-white">
                          Census Tract {facility.census_tract}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary mb-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{facility.estimated_impact?.toLocaleString() || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{facility.distance_to_nearest_facility_km?.toFixed(1)}km away</span>
                        </div>
                      </div>
                      {facility.priority_reason && (
                        <div className="text-xs text-text-muted">
                          {facility.priority_reason}
                        </div>
                      )}
                    </div>
                    <div className="bg-gradient-to-br from-neon-cyan to-neon-purple p-2 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity">
                      <MapPin className="w-5 h-5 text-white" />
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
              className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple text-sm font-medium transition-colors group"
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
