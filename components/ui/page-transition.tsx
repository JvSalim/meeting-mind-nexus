
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function PageTransition({ children, className = '', delay = 0 }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeInSection({ children, className = '', delay = 0 }: PageTransitionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideInSection({ children, className = '', direction = 'left', delay = 0 }: PageTransitionProps & { direction?: 'left' | 'right' }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const x = direction === 'left' ? -50 : 50

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
