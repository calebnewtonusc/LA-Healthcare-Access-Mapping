/**
 * WebSocket Event Types
 *
 * Defines all event types and payloads for real-time communication
 * between the Socket.io server and clients.
 */

// ============================================================================
// Connection Status Types
// ============================================================================

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting' | 'error'

export interface ConnectionStatusPayload {
  status: ConnectionStatus
  timestamp: number
  message?: string
}

// ============================================================================
// Stats Data Types
// ============================================================================

export interface StatsData {
  total_facilities?: number
  census_tracts?: number
  total_population?: number
  population_affected?: number
  population_served_by_facilities?: number
  access_desert_population?: number
  avg_distance_km?: number
  facility_density?: number
  roi?: string
  net_benefit?: string
  num_recommendations?: number
  num_facilities?: number
}

export interface StatsUpdatePayload {
  type: 'stats:update'
  timestamp: number
  data: StatsData
}

// ============================================================================
// Recommendations Data Types
// ============================================================================

export interface Recommendation {
  id?: string
  Priority?: string
  Title?: string
  Category?: string
  Affected_Population?: number
  Estimated_Cost?: string
  Timeline?: string
  Expected_Impact?: string
  Description?: string
  Implementation_Steps?: string[]
}

export interface RecommendationsDelta {
  updated: Recommendation[]
  added: Recommendation[]
  deleted: string[] // IDs of deleted recommendations
}

export interface RecommendationsUpdatePayload {
  type: 'recommendations:update'
  timestamp: number
  delta: RecommendationsDelta
}

// ============================================================================
// Facilities Data Types
// ============================================================================

export interface Facility {
  id?: string
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

export interface FacilitiesDelta {
  updated: Facility[]
  added: Facility[]
  deleted: string[] // IDs of deleted facilities
}

export interface FacilitiesUpdatePayload {
  type: 'facilities:update'
  timestamp: number
  delta: FacilitiesDelta
}

// ============================================================================
// Client-to-Server Events
// ============================================================================

export interface SubscribePayload {
  rooms: ('stats' | 'recommendations' | 'facilities')[]
}

export interface UnsubscribePayload {
  rooms: ('stats' | 'recommendations' | 'facilities')[]
}

export interface PingPayload {
  timestamp: number
}

// ============================================================================
// Server-to-Client Event Map
// ============================================================================

export interface ServerToClientEvents {
  'stats:update': (payload: StatsUpdatePayload) => void
  'recommendations:update': (payload: RecommendationsUpdatePayload) => void
  'facilities:update': (payload: FacilitiesUpdatePayload) => void
  'connection:status': (payload: ConnectionStatusPayload) => void
  'pong': (payload: { timestamp: number }) => void
}

// ============================================================================
// Client-to-Server Event Map
// ============================================================================

export interface ClientToServerEvents {
  'subscribe': (payload: SubscribePayload) => void
  'unsubscribe': (payload: UnsubscribePayload) => void
  'ping': (payload: PingPayload) => void
}

// ============================================================================
// Socket.io Type Helpers
// ============================================================================

export type EventType =
  | 'stats:update'
  | 'recommendations:update'
  | 'facilities:update'
  | 'connection:status'
  | 'subscribe'
  | 'unsubscribe'
  | 'ping'
  | 'pong'

export type UpdatePayload =
  | StatsUpdatePayload
  | RecommendationsUpdatePayload
  | FacilitiesUpdatePayload

// ============================================================================
// WebSocket Configuration
// ============================================================================

export interface WebSocketConfig {
  url: string
  reconnectionAttempts?: number
  reconnectionDelay?: number
  reconnectionDelayMax?: number
  timeout?: number
}

export const DEFAULT_WEBSOCKET_CONFIG: WebSocketConfig = {
  url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3000',
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  timeout: 20000,
}
