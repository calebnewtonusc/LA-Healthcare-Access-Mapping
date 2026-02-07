'use client'

/**
 * Connection Status Indicator
 *
 * Displays the current WebSocket connection status with a pulsing indicator.
 * Shows connection state: connected (green), reconnecting (yellow), disconnected/error (red)
 */

import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, AlertCircle } from 'lucide-react'
import { useRealtimeStore, selectConnectionStatus } from '@/lib/stores/realtime-store'
import type { ConnectionStatus } from '@/lib/websocket/types'

interface ConnectionIndicatorProps {
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ConnectionIndicator({
  showLabel = true,
  size = 'md',
  className = '',
}: ConnectionIndicatorProps) {
  const connectionStatus = useRealtimeStore(selectConnectionStatus)

  // Size classes
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  // Get status config
  const statusConfig = getStatusConfig(connectionStatus)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-2 ${className}`}
    >
      {/* Pulsing dot indicator */}
      <div className="relative flex items-center justify-center">
        {/* Pulse ring */}
        <AnimatePresence>
          {connectionStatus === 'connected' && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className={`absolute ${sizeClasses[size]} rounded-full ${statusConfig.bgClass}`}
            />
          )}
        </AnimatePresence>

        {/* Dot */}
        <motion.div
          animate={{
            scale: connectionStatus === 'reconnecting' ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: connectionStatus === 'reconnecting' ? Infinity : 0,
            ease: 'easeInOut',
          }}
          className={`${sizeClasses[size]} rounded-full ${statusConfig.bgClass}`}
        />
      </div>

      {/* Icon */}
      <statusConfig.Icon
        className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} ${statusConfig.textClass}`}
      />

      {/* Label */}
      {showLabel && (
        <span
          className={`text-sm font-medium ${statusConfig.textClass} ${
            size === 'sm' ? 'text-xs' : ''
          }`}
        >
          {statusConfig.label}
        </span>
      )}
    </motion.div>
  )
}

// ============================================================================
// Status Configuration
// ============================================================================

function getStatusConfig(status: ConnectionStatus) {
  switch (status) {
    case 'connected':
      return {
        label: 'Live',
        Icon: Wifi,
        bgClass: 'bg-neon-green dark:bg-neon-green',
        textClass: 'text-neon-green dark:text-neon-green',
      }
    case 'reconnecting':
      return {
        label: 'Reconnecting...',
        Icon: Wifi,
        bgClass: 'bg-yellow-500 dark:bg-yellow-400',
        textClass: 'text-yellow-600 dark:text-yellow-400',
      }
    case 'error':
      return {
        label: 'Error',
        Icon: AlertCircle,
        bgClass: 'bg-red-500 dark:bg-red-400',
        textClass: 'text-red-600 dark:text-red-400',
      }
    case 'disconnected':
    default:
      return {
        label: 'Offline',
        Icon: WifiOff,
        bgClass: 'bg-gray-400 dark:bg-gray-500',
        textClass: 'text-gray-500 dark:text-gray-400',
      }
  }
}

// ============================================================================
// Compact Variant (just the dot)
// ============================================================================

export function ConnectionIndicatorDot({ size = 'md' }: Pick<ConnectionIndicatorProps, 'size'>) {
  return <ConnectionIndicator showLabel={false} size={size} />
}
