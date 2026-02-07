'use client'

/**
 * useRealtimeFacilities Hook
 *
 * Provides access to real-time facilities data with flash animation state.
 * Automatically updates when new data is received via WebSocket.
 */

import {
  useRealtimeStore,
  selectFacilities,
  selectIsFlashingFacilities,
} from '../stores/realtime-store'
import type { Facility } from '../websocket/types'

export interface UseRealtimeFacilitiesReturn {
  facilities: Facility[]
  isFlashing: boolean
  lastUpdated: number | null
}

export function useRealtimeFacilities(): UseRealtimeFacilitiesReturn {
  const facilities = useRealtimeStore(selectFacilities)
  const isFlashing = useRealtimeStore(selectIsFlashingFacilities)
  const lastUpdated = useRealtimeStore((state) => state.facilitiesLastUpdated)

  return {
    facilities,
    isFlashing,
    lastUpdated,
  }
}
