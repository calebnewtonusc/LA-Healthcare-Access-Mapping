'use client'

/**
 * useRealtimeRecommendations Hook
 *
 * Provides access to real-time recommendations data with flash animation state.
 * Automatically updates when new data is received via WebSocket.
 */

import {
  useRealtimeStore,
  selectRecommendations,
  selectIsFlashingRecommendations,
} from '../stores/realtime-store'
import type { Recommendation } from '../websocket/types'

export interface UseRealtimeRecommendationsReturn {
  recommendations: Recommendation[]
  isFlashing: boolean
  lastUpdated: number | null
}

export function useRealtimeRecommendations(): UseRealtimeRecommendationsReturn {
  const recommendations = useRealtimeStore(selectRecommendations)
  const isFlashing = useRealtimeStore(selectIsFlashingRecommendations)
  const lastUpdated = useRealtimeStore((state) => state.recommendationsLastUpdated)

  return {
    recommendations,
    isFlashing,
    lastUpdated,
  }
}
