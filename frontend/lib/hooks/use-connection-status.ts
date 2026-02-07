'use client'

/**
 * useConnectionStatus Hook
 *
 * Provides access to WebSocket connection status and metadata.
 */

import { useRealtimeStore, selectConnectionStatus, selectIsConnected } from '../stores/realtime-store'
import type { ConnectionStatus } from '../websocket/types'

export interface UseConnectionStatusReturn {
  status: ConnectionStatus
  isConnected: boolean
  lastConnected: number | null
  reconnectAttempts: number
}

export function useConnectionStatus(): UseConnectionStatusReturn {
  const status = useRealtimeStore(selectConnectionStatus)
  const isConnected = useRealtimeStore(selectIsConnected)
  const lastConnected = useRealtimeStore((state) => state.lastConnected)
  const reconnectAttempts = useRealtimeStore((state) => state.reconnectAttempts)

  return {
    status,
    isConnected,
    lastConnected,
    reconnectAttempts,
  }
}
