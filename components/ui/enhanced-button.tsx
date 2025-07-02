
'use client'

import { motion, MotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface EnhancedButtonProps extends MotionProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, onClick, disabled, type = 'button', ...props }, ref) => {
    const baseStyles = "relative overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
    
    const variants = {
      primary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white focus:ring-purple-500 shadow-lg hover:shadow-xl",
      secondary: "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white focus:ring-slate-500 shadow-lg hover:shadow-xl",
      outline: "border-2 border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 focus:ring-purple-500 backdrop-blur-sm",
      ghost: "text-slate-300 hover:text-white hover:bg-slate-800/50 focus:ring-slate-500 backdrop-blur-sm"
    }
    
    const sizes = {
      sm: "px-4 py-2 text-sm h-9",
      md: "px-6 py-3 text-base h-12",
      lg: "px-8 py-4 text-lg h-14"
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.15 }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 flex items-center justify-center gap-2"
        >
          {children}
        </motion.div>
        
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-2xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
    )
  }
)

EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton }
