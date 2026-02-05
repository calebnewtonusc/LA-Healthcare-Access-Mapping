'use client'

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Recommended Facility Locations
      </h3>

      {/* Map Embed */}
      <div className="mb-4">
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
          <iframe
            src={`${API_URL}/api/maps/facility-locations`}
            className="w-full h-full"
            title="Facility Locations Map"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Interactive map showing 10 priority locations for new healthcare facilities
        </p>
      </div>

      {/* Facilities List */}
      {facilities && facilities.length > 0 && (
        <div>
          <h4 className="font-bold text-lg text-gray-800 mb-3">
            Top Priority Locations
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {facilities.slice(0, 5).map((facility, index) => (
              <div
                key={index}
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">
                      #{index + 1} Census Tract {facility.census_tract}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Pop: {facility.estimated_impact?.toLocaleString() || 'N/A'} •{' '}
                      Distance: {facility.distance_to_nearest_facility_km?.toFixed(1)}km
                    </div>
                    {facility.priority_reason && (
                      <div className="text-xs text-gray-500 mt-1">
                        {facility.priority_reason}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl ml-2">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📍'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <a
              href={`${API_URL}/api/maps/facility-locations`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              View all {facilities.length} locations on interactive map →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
