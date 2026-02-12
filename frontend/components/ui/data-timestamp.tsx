'use client'

import { Clock } from 'lucide-react'

interface DataTimestampProps {
  label?: string
  className?: string
}

export function DataTimestamp({ label = "Data last updated", className = "" }: DataTimestampProps) {
  return (
    <div className={`flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 ${className}`}>
      <Clock className="w-3 h-3" />
      <span>
        {label}: <strong>Oct 2024</strong> (facilities) | <strong>2020 Census</strong> (population)
      </span>
      <span className="text-yellow-600 dark:text-yellow-500 font-semibold">• Data is 4-6 years old</span>
    </div>
  )
}
