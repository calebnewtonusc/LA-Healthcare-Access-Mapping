/**
 * Socket.io Client Singleton
 *
 * Manages the WebSocket connection to the server with automatic
 * reconnection, exponential backoff, and event handling.
 */

import { io, Socket } from 'socket.io-client'
import {
  DEFAULT_WEBSOCKET_CONFIG,
} from './types'
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  ConnectionStatus,
  WebSocketConfig,
} from './types'

type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>

class SocketClient {
  private socket: SocketInstance | null = null
  private config: WebSocketConfig
  private connectionStatus: ConnectionStatus = 'disconnected'
  private statusCallbacks: Set<(status: ConnectionStatus) => void> = new Set()
  private reconnectAttempts = 0

  constructor(config: Partial<WebSocketConfig> = {}) {
    this.config = { ...DEFAULT_WEBSOCKET_CONFIG, ...config }
  }

  /**
   * Initialize and connect to the Socket.io server
   */
  connect(): SocketInstance {
    if (this.socket?.connected) {
      console.log('♻️ Socket already connected')
      return this.socket
    }

    console.log('🔌 Connecting to WebSocket server...')

    this.socket = io(this.config.url, {
      reconnection: true,
      reconnectionAttempts: this.config.reconnectionAttempts,
      reconnectionDelay: this.config.reconnectionDelay,
      reconnectionDelayMax: this.config.reconnectionDelayMax,
      timeout: this.config.timeout,
      transports: ['websocket', 'polling'], // Try WebSocket first, fallback to polling
    })

    this.setupEventListeners()

    return this.socket
  }

  /**
   * Set up Socket.io event listeners
   */
  private setupEventListeners() {
    if (!this.socket) return

    // Connection successful
    this.socket.on('connect', () => {
      console.log('✅ WebSocket connected:', this.socket?.id)
      this.reconnectAttempts = 0
      this.updateConnectionStatus('connected')
    })

    // Disconnection
    this.socket.on('disconnect', (reason) => {
      console.log('❌ WebSocket disconnected:', reason)
      this.updateConnectionStatus('disconnected')
    })

    // Reconnection attempt
    this.socket.io.on('reconnect_attempt', (attempt) => {
      console.log(`🔄 Reconnection attempt ${attempt}/${this.config.reconnectionAttempts}`)
      this.reconnectAttempts = attempt
      this.updateConnectionStatus('reconnecting')
    })

    // Reconnection successful
    this.socket.io.on('reconnect', (attempt) => {
      console.log(`✅ Reconnected after ${attempt} attempts`)
      this.reconnectAttempts = 0
      this.updateConnectionStatus('connected')
    })

    // Reconnection failed
    this.socket.io.on('reconnect_failed', () => {
      console.error('🔥 Reconnection failed after maximum attempts')
      this.updateConnectionStatus('error')
    })

    // Connection error
    this.socket.io.on('error', (error) => {
      console.error('🔥 WebSocket error:', error)
      this.updateConnectionStatus('error')
    })

    // Connection status updates from server
    this.socket.on('connection:status', (payload) => {
      console.log('📡 Server connection status:', payload)
      this.updateConnectionStatus(payload.status)
    })
  }

  /**
   * Disconnect from the server
   */
  disconnect() {
    if (this.socket) {
      console.log('🔌 Disconnecting from WebSocket server...')
      this.socket.disconnect()
      this.socket = null
      this.updateConnectionStatus('disconnected')
    }
  }

  /**
   * Get the socket instance
   */
  getSocket(): SocketInstance | null {
    return this.socket
  }

  /**
   * Get current connection status
   */
  getStatus(): ConnectionStatus {
    return this.connectionStatus
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false
  }

  /**
   * Subscribe to data rooms
   */
  subscribe(rooms: ('stats' | 'recommendations' | 'facilities')[]) {
    if (!this.socket?.connected) {
      console.warn('⚠️ Cannot subscribe: socket not connected')
      return
    }

    this.socket.emit('subscribe', { rooms })
    console.log('📥 Subscribed to rooms:', rooms)
  }

  /**
   * Unsubscribe from data rooms
   */
  unsubscribe(rooms: ('stats' | 'recommendations' | 'facilities')[]) {
    if (!this.socket?.connected) {
      console.warn('⚠️ Cannot unsubscribe: socket not connected')
      return
    }

    this.socket.emit('unsubscribe', { rooms })
    console.log('📤 Unsubscribed from rooms:', rooms)
  }

  /**
   * Send ping to check connection health
   */
  ping() {
    if (!this.socket?.connected) {
      console.warn('⚠️ Cannot ping: socket not connected')
      return
    }

    this.socket.emit('ping', { timestamp: Date.now() })
  }

  /**
   * Register callback for connection status changes
   */
  onStatusChange(callback: (status: ConnectionStatus) => void) {
    this.statusCallbacks.add(callback)

    // Immediately call with current status
    callback(this.connectionStatus)

    // Return cleanup function
    return () => {
      this.statusCallbacks.delete(callback)
    }
  }

  /**
   * Update connection status and notify listeners
   */
  private updateConnectionStatus(status: ConnectionStatus) {
    if (this.connectionStatus === status) return

    this.connectionStatus = status
    this.statusCallbacks.forEach((callback) => callback(status))
  }

  /**
   * Get reconnection attempt count
   */
  getReconnectAttempts(): number {
    return this.reconnectAttempts
  }
}

// Singleton instance
let socketClientInstance: SocketClient | null = null

/**
 * Get or create the Socket client singleton
 */
export function getSocketClient(config?: Partial<WebSocketConfig>): SocketClient {
  if (!socketClientInstance) {
    socketClientInstance = new SocketClient(config)
  }
  return socketClientInstance
}

/**
 * Reset the socket client (useful for testing)
 */
export function resetSocketClient() {
  if (socketClientInstance) {
    socketClientInstance.disconnect()
    socketClientInstance = null
  }
}

export default SocketClient
