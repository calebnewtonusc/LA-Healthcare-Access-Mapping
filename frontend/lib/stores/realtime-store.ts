/**
 * Real-Time Data Store (Zustand)
 *
 * Global state management for real-time WebSocket data updates.
 * Stores stats, recommendations, and facilities with update timestamps.
 */

import { create } from 'zustand'
import type {
  StatsData,
  Recommendation,
  Facility,
  ConnectionStatus,
} from '../websocket/types'

// ============================================================================
// Store State Interface
// ============================================================================

interface RealtimeState {
  // Connection status
  connectionStatus: ConnectionStatus
  lastConnected: number | null
  reconnectAttempts: number

  // Stats data
  stats: StatsData | null
  statsLastUpdated: number | null

  // Recommendations data
  recommendations: Recommendation[]
  recommendationsLastUpdated: number | null

  // Facilities data
  facilities: Facility[]
  facilitiesLastUpdated: number | null

  // UI state
  isFlashing: {
    stats: boolean
    recommendations: boolean
    facilities: boolean
  }

  // Actions
  setConnectionStatus: (status: ConnectionStatus, reconnectAttempts?: number) => void
  setStats: (stats: StatsData) => void
  updateRecommendations: (delta: {
    updated: Recommendation[]
    added: Recommendation[]
    deleted: string[]
  }) => void
  updateFacilities: (delta: {
    updated: Facility[]
    added: Facility[]
    deleted: string[]
  }) => void
  flashComponent: (component: 'stats' | 'recommendations' | 'facilities') => void
  resetStore: () => void
}

// ============================================================================
// Initial State
// ============================================================================

const initialState = {
  connectionStatus: 'disconnected' as ConnectionStatus,
  lastConnected: null,
  reconnectAttempts: 0,
  stats: null,
  statsLastUpdated: null,
  recommendations: [],
  recommendationsLastUpdated: null,
  facilities: [],
  facilitiesLastUpdated: null,
  isFlashing: {
    stats: false,
    recommendations: false,
    facilities: false,
  },
}

// ============================================================================
// Zustand Store
// ============================================================================

export const useRealtimeStore = create<RealtimeState>((set, get) => ({
  ...initialState,

  /**
   * Update connection status
   */
  setConnectionStatus: (status, reconnectAttempts = 0) => {
    set({
      connectionStatus: status,
      lastConnected: status === 'connected' ? Date.now() : get().lastConnected,
      reconnectAttempts,
    })
  },

  /**
   * Update stats data
   */
  setStats: (stats) => {
    set({
      stats,
      statsLastUpdated: Date.now(),
    })

    // Trigger flash animation
    get().flashComponent('stats')
  },

  /**
   * Update recommendations with delta changes
   */
  updateRecommendations: (delta) => {
    const currentRecommendations = get().recommendations

    // Create a map for efficient lookups
    const recommendationsMap = new Map(
      currentRecommendations.map((rec) => [rec.id || rec.Title, rec])
    )

    // Apply updates
    delta.updated.forEach((rec) => {
      const id = rec.id || rec.Title
      if (id) {
        recommendationsMap.set(id, rec)
      }
    })

    // Add new recommendations
    delta.added.forEach((rec) => {
      const id = rec.id || rec.Title
      if (id) {
        recommendationsMap.set(id, rec)
      }
    })

    // Delete recommendations
    delta.deleted.forEach((id) => {
      recommendationsMap.delete(id)
    })

    // Convert back to array
    const updatedRecommendations = Array.from(recommendationsMap.values())

    set({
      recommendations: updatedRecommendations,
      recommendationsLastUpdated: Date.now(),
    })

    // Trigger flash animation
    get().flashComponent('recommendations')
  },

  /**
   * Update facilities with delta changes
   */
  updateFacilities: (delta) => {
    const currentFacilities = get().facilities

    // Create a map for efficient lookups
    const facilitiesMap = new Map(
      currentFacilities.map((fac) => [fac.id || fac.geoid, fac])
    )

    // Apply updates
    delta.updated.forEach((fac) => {
      const id = fac.id || fac.geoid
      if (id) {
        facilitiesMap.set(id, fac)
      }
    })

    // Add new facilities
    delta.added.forEach((fac) => {
      const id = fac.id || fac.geoid
      if (id) {
        facilitiesMap.set(id, fac)
      }
    })

    // Delete facilities
    delta.deleted.forEach((id) => {
      facilitiesMap.delete(id)
    })

    // Convert back to array
    const updatedFacilities = Array.from(facilitiesMap.values())

    set({
      facilities: updatedFacilities,
      facilitiesLastUpdated: Date.now(),
    })

    // Trigger flash animation
    get().flashComponent('facilities')
  },

  /**
   * Trigger flash animation for a component
   */
  flashComponent: (component) => {
    set((state) => ({
      isFlashing: {
        ...state.isFlashing,
        [component]: true,
      },
    }))

    // Reset flash after 600ms
    setTimeout(() => {
      set((state) => ({
        isFlashing: {
          ...state.isFlashing,
          [component]: false,
        },
      }))
    }, 600)
  },

  /**
   * Reset store to initial state
   */
  resetStore: () => {
    set(initialState)
  },
}))

// ============================================================================
// Selectors (for optimized re-renders)
// ============================================================================

export const selectConnectionStatus = (state: RealtimeState) => state.connectionStatus
export const selectIsConnected = (state: RealtimeState) =>
  state.connectionStatus === 'connected'
export const selectStats = (state: RealtimeState) => state.stats
export const selectRecommendations = (state: RealtimeState) => state.recommendations
export const selectFacilities = (state: RealtimeState) => state.facilities
export const selectIsFlashingStats = (state: RealtimeState) => state.isFlashing.stats
export const selectIsFlashingRecommendations = (state: RealtimeState) =>
  state.isFlashing.recommendations
export const selectIsFlashingFacilities = (state: RealtimeState) =>
  state.isFlashing.facilities

// ============================================================================
// Helper Hooks
// ============================================================================

/**
 * Get time since last update in human-readable format
 */
export function useTimeSinceUpdate(
  type: 'stats' | 'recommendations' | 'facilities'
): string {
  const store = useRealtimeStore()
  const lastUpdated =
    type === 'stats'
      ? store.statsLastUpdated
      : type === 'recommendations'
        ? store.recommendationsLastUpdated
        : store.facilitiesLastUpdated

  if (!lastUpdated) return 'Never'

  const seconds = Math.floor((Date.now() - lastUpdated) / 1000)

  if (seconds < 10) return 'Just now'
  if (seconds < 60) return `${seconds}s ago`

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
