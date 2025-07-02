
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedTextProps {
  texts: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export default function AnimatedText({
  texts,
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
}: AnimatedTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText.length < currentFullText.length) {
        // Typing
        setCurrentText(currentFullText.slice(0, currentText.length + 1))
        setIsTyping(true)
      } else if (!isDeleting && currentText.length === currentFullText.length) {
        // Pause before deleting
        setIsTyping(false)
        setTimeout(() => setIsDeleting(true), pauseDuration)
      } else if (isDeleting && currentText.length > 0) {
        // Deleting
        setCurrentText(currentText.slice(0, -1))
        setIsTyping(true)
      } else if (isDeleting && currentText.length === 0) {
        // Move to next text
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(false)
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <div className={`relative ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-block"
      >
        {currentText}
      </motion.span>
      <motion.span
        animate={{ 
          opacity: isTyping ? [1, 0, 1] : 1,
        }}
        transition={{ 
          duration: 0.8, 
          repeat: isTyping ? Infinity : 0,
          ease: "easeInOut"
        }}
        className="inline-block w-0.5 h-[1em] bg-gradient-to-t from-purple-400 to-blue-400 ml-1 align-middle rounded-full"
      />
    </div>
  )
}
