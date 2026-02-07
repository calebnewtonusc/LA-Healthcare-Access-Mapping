/**
 * Background Polling Service
 *
 * Polls the external FastAPI backend at regular intervals to detect
 * changes in data and broadcasts updates via WebSocket to connected clients.
 *
 * This service acts as a bridge between the static FastAPI backend
 * and our real-time WebSocket system.
 */

import {
  broadcastStatsUpdate,
  broadcastRecommendationsUpdate,
  broadcastFacilitiesUpdate,
} from './socket-server'
import type { StatsData, Recommendation, Facility } from './types'

// ============================================================================
// Configuration
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const POLL_INTERVAL = 30000 // 30 seconds
const CHANGE_DETECTION_THRESHOLD = 0.01 // 1% change threshold

// ============================================================================
// State Management
// ============================================================================

let isRunning = false
let pollIntervalId: NodeJS.Timeout | null = null

// Cache previous data for change detection
let previousStats: StatsData | null = null
let previousRecommendations: Recommendation[] = []
let previousFacilities: Facility[] = []

// ============================================================================
// API Fetching Functions
// ============================================================================

async function fetchStats(): Promise<StatsData | null> {
  try {
    const response = await fetch(`${API_URL}/api/stats`, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      console.error(`Failed to fetch stats: ${response.status}`)
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching stats:', error)
    return null
  }
}

async function fetchRecommendations(): Promise<Recommendation[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/recommendations`, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      console.error(`Failed to fetch recommendations: ${response.status}`)
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return null
  }
}

async function fetchFacilities(): Promise<Facility[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/facilities`, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      console.error(`Failed to fetch facilities: ${response.status}`)
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return null
  }
}

// ============================================================================
// Change Detection Functions
// ============================================================================

function detectStatsChanges(newStats: StatsData): boolean {
  if (!previousStats) return true

  // Check if any numerical values changed significantly
  const keys = Object.keys(newStats) as (keyof StatsData)[]

  for (const key of keys) {
    const oldValue = previousStats[key]
    const newValue = newStats[key]

    // Skip if either value is undefined
    if (oldValue === undefined || newValue === undefined) continue

    // For numbers, check if change exceeds threshold
    if (typeof oldValue === 'number' && typeof newValue === 'number') {
      const percentChange = Math.abs((newValue - oldValue) / oldValue)
      if (percentChange > CHANGE_DETECTION_THRESHOLD) {
        console.log(`📊 Stats change detected in ${key}: ${oldValue} → ${newValue}`)
        return true
      }
    }

    // For strings, check for exact inequality
    if (typeof oldValue === 'string' && typeof newValue === 'string') {
      if (oldValue !== newValue) {
        console.log(`📊 Stats change detected in ${key}: ${oldValue} → ${newValue}`)
        return true
      }
    }
  }

  return false
}

function detectRecommendationsChanges(
  newRecommendations: Recommendation[]
): { updated: Recommendation[]; added: Recommendation[]; deleted: string[] } | null {
  // Create maps for efficient comparison
  const previousMap = new Map(
    previousRecommendations.map((rec) => [rec.id || rec.Title, rec])
  )
  const newMap = new Map(newRecommendations.map((rec) => [rec.id || rec.Title, rec]))

  const updated: Recommendation[] = []
  const added: Recommendation[] = []
  const deleted: string[] = []

  // Find updated and added
  for (const [id, newRec] of newMap.entries()) {
    const oldRec = previousMap.get(id)

    if (!oldRec) {
      // New recommendation
      added.push(newRec)
    } else if (JSON.stringify(oldRec) !== JSON.stringify(newRec)) {
      // Updated recommendation
      updated.push(newRec)
    }
  }

  // Find deleted
  for (const [id] of previousMap.entries()) {
    if (!newMap.has(id) && id) {
      deleted.push(id)
    }
  }

  // Return null if no changes
  if (updated.length === 0 && added.length === 0 && deleted.length === 0) {
    return null
  }

  console.log(
    `📋 Recommendations changes: ${updated.length} updated, ${added.length} added, ${deleted.length} deleted`
  )

  return { updated, added, deleted }
}

function detectFacilitiesChanges(
  newFacilities: Facility[]
): { updated: Facility[]; added: Facility[]; deleted: string[] } | null {
  // Create maps for efficient comparison
  const previousMap = new Map(
    previousFacilities.map((fac) => [fac.id || fac.geoid, fac])
  )
  const newMap = new Map(newFacilities.map((fac) => [fac.id || fac.geoid, fac]))

  const updated: Facility[] = []
  const added: Facility[] = []
  const deleted: string[] = []

  // Find updated and added
  for (const [id, newFac] of newMap.entries()) {
    const oldFac = previousMap.get(id)

    if (!oldFac) {
      // New facility
      added.push(newFac)
    } else if (JSON.stringify(oldFac) !== JSON.stringify(newFac)) {
      // Updated facility
      updated.push(newFac)
    }
  }

  // Find deleted
  for (const [id] of previousMap.entries()) {
    if (!newMap.has(id) && id) {
      deleted.push(id)
    }
  }

  // Return null if no changes
  if (updated.length === 0 && added.length === 0 && deleted.length === 0) {
    return null
  }

  console.log(
    `🏥 Facilities changes: ${updated.length} updated, ${added.length} added, ${deleted.length} deleted`
  )

  return { updated, added, deleted }
}

// ============================================================================
// Polling Function
// ============================================================================

async function pollBackend() {
  console.log('🔄 Polling backend for updates...')

  try {
    // Fetch all data in parallel
    const [stats, recommendations, facilities] = await Promise.all([
      fetchStats(),
      fetchRecommendations(),
      fetchFacilities(),
    ])

    // Check stats changes
    if (stats && detectStatsChanges(stats)) {
      broadcastStatsUpdate(stats)
      previousStats = stats
    }

    // Check recommendations changes
    if (recommendations) {
      const delta = detectRecommendationsChanges(recommendations)
      if (delta) {
        broadcastRecommendationsUpdate(delta)
        previousRecommendations = recommendations
      }
    }

    // Check facilities changes
    if (facilities) {
      const delta = detectFacilitiesChanges(facilities)
      if (delta) {
        broadcastFacilitiesUpdate(delta)
        previousFacilities = facilities
      }
    }

    console.log('✅ Polling completed successfully')
  } catch (error) {
    console.error('🔥 Error during polling:', error)
  }
}

// ============================================================================
// Service Control Functions
// ============================================================================

/**
 * Start the background polling service
 */
export function startPollingService() {
  if (isRunning) {
    console.warn('⚠️ Polling service already running')
    return
  }

  console.log(`🚀 Starting polling service (interval: ${POLL_INTERVAL}ms)`)
  isRunning = true

  // Do initial poll immediately
  pollBackend()

  // Set up interval
  pollIntervalId = setInterval(pollBackend, POLL_INTERVAL)
}

/**
 * Stop the background polling service
 */
export function stopPollingService() {
  if (!isRunning) {
    console.warn('⚠️ Polling service not running')
    return
  }

  console.log('🛑 Stopping polling service')
  isRunning = false

  if (pollIntervalId) {
    clearInterval(pollIntervalId)
    pollIntervalId = null
  }
}

/**
 * Check if polling service is running
 */
export function isPollingServiceRunning(): boolean {
  return isRunning
}

/**
 * Manually trigger a poll (for testing)
 */
export function triggerPoll() {
  console.log('🔧 Manually triggering poll...')
  return pollBackend()
}
