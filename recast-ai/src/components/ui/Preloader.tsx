'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 380)
          return 100
        }
        return Math.min(prev + Math.floor(Math.random() * 5) + 1, 100)
      })
    }, 22)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#1A1A1A] flex items-end justify-between p-10 md:p-16 pointer-events-none"
        >
          <span className="font-display text-[#EDEEE8]/60 text-base tracking-wide">
            RecastAI
          </span>
          <span className="font-display text-[#EDEEE8] tabular-nums leading-none" style={{ fontSize: 'clamp(3.5rem,10vw,8rem)' }}>
            {Math.min(count, 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
