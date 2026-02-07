'use client'

/**
 * useRealtimeStats Hook
 *
 * Provides access to real-time stats data with flash animation state.
 * Automatically updates when new data is received via WebSocket.
 */

import { useRealtimeStore, selectStats, selectIsFlashingStats } from '../stores/realtime-store'
import type { StatsData } from '../websocket/types'

export interface UseRealtimeStatsReturn {
  stats: StatsData | null
  isFlashing: boolean
  lastUpdated: number | null
}

export function useRealtimeStats(): UseRealtimeStatsReturn {
  const stats = useRealtimeStore(selectStats)
  const isFlashing = useRealtimeStore(selectIsFlashingStats)
  const lastUpdated = useRealtimeStore((state) => state.statsLastUpdated)

  return {
    stats,
    isFlashing,
    lastUpdated,
  }
}
