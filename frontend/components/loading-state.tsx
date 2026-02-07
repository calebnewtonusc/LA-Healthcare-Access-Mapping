'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  message?: string
  fullscreen?: boolean
}

export function LoadingState({ message = 'Loading...', fullscreen = false }: LoadingStateProps) {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${fullscreen ? 'min-h-screen' : 'py-12'}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className="w-12 h-12 text-blue-600 dark:text-neon-cyan" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-slate-700 dark:text-dark-text-secondary font-medium"
      >
        {message}
      </motion.p>

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-600 dark:bg-neon-cyan"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )

  if (fullscreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-primary">
        {content}
      </div>
    )
  }

  return content
}
