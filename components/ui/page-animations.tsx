
'use client'

import { motion, AnimatePresence } from 'framer-motion'
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
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeInSection({ children, className = '', delay = 0 }: PageTransitionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-10% 0px'
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideInSection({ 
  children, 
  className = '', 
  direction = 'left', 
  delay = 0 
}: PageTransitionProps & { direction?: 'left' | 'right' | 'up' | 'down' }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-10% 0px'
  })

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -60, y: 0 }
      case 'right': return { x: 60, y: 0 }
      case 'up': return { x: 0, y: -60 }
      case 'down': return { x: 0, y: 60 }
      default: return { x: -60, y: 0 }
    }
  }

  const initial = getInitialPosition()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScaleInSection({ children, className = '', delay = 0 }: PageTransitionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-10% 0px'
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ 
  children, 
  className = '', 
  staggerDelay = 0.1 
}: PageTransitionProps & { staggerDelay?: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: Omit<PageTransitionProps, 'delay'>) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
