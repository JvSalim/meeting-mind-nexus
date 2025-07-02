
'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface InteractiveButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  asChild?: boolean
}

const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, onClick, disabled, type = 'button', ...props }, ref) => {
    const baseStyles = "relative overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
      primary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white focus:ring-purple-500",
      secondary: "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white focus:ring-slate-500",
      outline: "border-2 border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 focus:ring-purple-500",
      ghost: "text-slate-300 hover:text-white hover:bg-slate-800/50 focus:ring-slate-500"
    }
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ 
          scale: 1.05,
          boxShadow: variant === 'primary' ? '0 10px 30px rgba(168, 85, 247, 0.4)' : 
                     variant === 'secondary' ? '0 10px 30px rgba(71, 85, 105, 0.4)' :
                     '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={onClick}
        disabled={disabled}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 flex items-center justify-center"
        >
          {children}
        </motion.div>
      </motion.button>
    )
  }
)

InteractiveButton.displayName = "InteractiveButton"

export { InteractiveButton }
