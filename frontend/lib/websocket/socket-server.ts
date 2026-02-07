/**
 * Socket.io Server Setup
 *
 * Creates and configures the Socket.io server for real-time updates.
 * This module exports the Socket.io instance that can be used
 * across the application to emit events to connected clients.
 */

import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  SubscribePayload,
  UnsubscribePayload,
  PingPayload,
} from './types'

// Global Socket.io server instance
let io: SocketIOServer<ClientToServerEvents, ServerToClientEvents> | null = null

// Connection tracking
const connections = new Map<string, Set<string>>() // socketId -> Set<roomName>

/**
 * Initialize Socket.io server
 */
export function initializeSocketServer(httpServer: HTTPServer): SocketIOServer {
  if (io) {
    console.log('♻️ Socket.io server already initialized')
    return io
  }

  console.log('🚀 Initializing Socket.io server...')

  io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.NEXT_PUBLIC_APP_URL || 'https://la-healthcare-access-mapping.vercel.app'
          : ['http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true,
    },
    transports: ['websocket', 'polling'], // Fallback to polling if WebSocket fails
    pingTimeout: 60000,
    pingInterval: 25000,
  })

  // Connection handler
  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`)
    connections.set(socket.id, new Set())

    // Send connection status
    socket.emit('connection:status', {
      status: 'connected',
      timestamp: Date.now(),
      message: 'Successfully connected to real-time server',
    })

    // Subscribe to data rooms
    socket.on('subscribe', (payload: SubscribePayload) => {
      const userRooms = connections.get(socket.id)
      if (!userRooms) return

      payload.rooms.forEach((room) => {
        socket.join(room)
        userRooms.add(room)
        console.log(`📥 Client ${socket.id} subscribed to: ${room}`)
      })
    })

    // Unsubscribe from data rooms
    socket.on('unsubscribe', (payload: UnsubscribePayload) => {
      const userRooms = connections.get(socket.id)
      if (!userRooms) return

      payload.rooms.forEach((room) => {
        socket.leave(room)
        userRooms.delete(room)
        console.log(`📤 Client ${socket.id} unsubscribed from: ${room}`)
      })
    })

    // Ping/Pong for connection health check
    socket.on('ping', (payload: PingPayload) => {
      socket.emit('pong', { timestamp: Date.now() })
    })

    // Disconnection handler
    socket.on('disconnect', (reason) => {
      console.log(`❌ Client disconnected: ${socket.id} (${reason})`)
      connections.delete(socket.id)
    })

    // Error handler
    socket.on('error', (error) => {
      console.error(`🔥 Socket error for ${socket.id}:`, error)
      socket.emit('connection:status', {
        status: 'error',
        timestamp: Date.now(),
        message: error.message || 'Socket error occurred',
      })
    })
  })

  console.log('✅ Socket.io server initialized successfully')
  return io
}

/**
 * Get the Socket.io server instance
 */
export function getSocketServer(): SocketIOServer | null {
  return io
}

/**
 * Broadcast stats update to all subscribed clients
 */
export function broadcastStatsUpdate(data: any) {
  if (!io) {
    console.warn('⚠️ Socket.io server not initialized')
    return
  }

  io.to('stats').emit('stats:update', {
    type: 'stats:update',
    timestamp: Date.now(),
    data,
  })

  console.log('📊 Broadcasted stats update to subscribed clients')
}

/**
 * Broadcast recommendations update to all subscribed clients
 */
export function broadcastRecommendationsUpdate(delta: any) {
  if (!io) {
    console.warn('⚠️ Socket.io server not initialized')
    return
  }

  io.to('recommendations').emit('recommendations:update', {
    type: 'recommendations:update',
    timestamp: Date.now(),
    delta,
  })

  console.log('📋 Broadcasted recommendations update to subscribed clients')
}

/**
 * Broadcast facilities update to all subscribed clients
 */
export function broadcastFacilitiesUpdate(delta: any) {
  if (!io) {
    console.warn('⚠️ Socket.io server not initialized')
    return
  }

  io.to('facilities').emit('facilities:update', {
    type: 'facilities:update',
    timestamp: Date.now(),
    delta,
  })

  console.log('🏥 Broadcasted facilities update to subscribed clients')
}

/**
 * Get connection statistics
 */
export function getConnectionStats() {
  if (!io) {
    return {
      connected: 0,
      rooms: {},
    }
  }

  const rooms = {
    stats: io.sockets.adapter.rooms.get('stats')?.size || 0,
    recommendations: io.sockets.adapter.rooms.get('recommendations')?.size || 0,
    facilities: io.sockets.adapter.rooms.get('facilities')?.size || 0,
  }

  return {
    connected: io.engine.clientsCount,
    rooms,
  }
}
