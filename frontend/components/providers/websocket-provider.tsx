'use client'

/**
 * WebSocket Provider
 *
 * Initializes and manages the WebSocket connection for real-time updates.
 * Wraps the application to provide real-time data to all child components.
 */

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import { getSocketClient } from '@/lib/websocket/socket-client'
import { useRealtimeStore } from '@/lib/stores/realtime-store'
import type { Socket } from 'socket.io-client'
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '@/lib/websocket/types'

// ============================================================================
// Context
// ============================================================================

interface WebSocketContextValue {
  isEnabled: boolean
}

const WebSocketContext = createContext<WebSocketContextValue>({
  isEnabled: false,
})

export const useWebSocket = () => useContext(WebSocketContext)

// ============================================================================
// Provider Props
// ============================================================================

interface WebSocketProviderProps {
  children: ReactNode
  enabled?: boolean
}

// ============================================================================
// Provider Component
// ============================================================================

export function WebSocketProvider({ children, enabled = true }: WebSocketProviderProps) {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
  const isInitialized = useRef(false)

  // Zustand store actions
  const setConnectionStatus = useRealtimeStore((state) => state.setConnectionStatus)
  const setStats = useRealtimeStore((state) => state.setStats)
  const updateRecommendations = useRealtimeStore((state) => state.updateRecommendations)
  const updateFacilities = useRealtimeStore((state) => state.updateFacilities)

  useEffect(() => {
    // Skip if disabled or already initialized
    if (!enabled || isInitialized.current) {
      return
    }

    console.log('🚀 Initializing WebSocket connection...')
    isInitialized.current = true

    // Get socket client instance
    const socketClient = getSocketClient({
      url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || window.location.origin,
    })

    // Connect to server
    const socket = socketClient.connect()
    socketRef.current = socket

    // Listen for connection status changes
    const unsubscribeStatus = socketClient.onStatusChange((status) => {
      console.log('📡 Connection status:', status)
      setConnectionStatus(status, socketClient.getReconnectAttempts())
    })

    // Subscribe to data events
    socket.on('stats:update', (payload) => {
      console.log('📊 Stats update received:', payload)
      setStats(payload.data)
    })

    socket.on('recommendations:update', (payload) => {
      console.log('📋 Recommendations update received:', payload)
      updateRecommendations(payload.delta)
    })

    socket.on('facilities:update', (payload) => {
      console.log('🏥 Facilities update received:', payload)
      updateFacilities(payload.delta)
    })

    socket.on('pong', (payload) => {
      const latency = Date.now() - payload.timestamp
      console.log(`🏓 Pong received (latency: ${latency}ms)`)
    })

    // Once connected, subscribe to all data rooms
    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket server')
      socketClient.subscribe(['stats', 'recommendations', 'facilities'])
    })

    // Cleanup on unmount
    return () => {
      console.log('🧹 Cleaning up WebSocket connection...')
      unsubscribeStatus()

      // Unsubscribe from rooms
      if (socket.connected) {
        socketClient.unsubscribe(['stats', 'recommendations', 'facilities'])
      }

      // Disconnect
      socketClient.disconnect()
      socketRef.current = null
      isInitialized.current = false
    }
  }, [enabled, setConnectionStatus, setStats, updateRecommendations, updateFacilities])

  return (
    <WebSocketContext.Provider value={{ isEnabled: enabled }}>
      {children}
    </WebSocketContext.Provider>
  )
}

// ============================================================================
// Hook to access socket directly (if needed)
// ============================================================================

export function useSocketInstance() {
  const socketClient = getSocketClient()
  return socketClient.getSocket()
}
