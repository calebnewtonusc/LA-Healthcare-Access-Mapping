'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { scrollReveal } from '@/lib/animations'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={scrollReveal}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
