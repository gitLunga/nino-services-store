"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiBurstProps {
  isVisible: boolean
  onComplete: () => void
  x?: number
  y?: number
}

export default function ConfettiBurst({ isVisible, onComplete, x = 0, y = 0 }: ConfettiBurstProps) {
  const [particles, setParticles] = useState<Array<{ id: number; color: string; delay: number }>>([])

  useEffect(() => {
    if (isVisible) {
      const colors = ["#FF9BB4", "#E6C229", "#FF6B8B", "#FFD700", "#FF69B4", "#DDA0DD"]
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.2,
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        onComplete()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed pointer-events-none z-[90]" style={{ left: x, top: y }}>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                rotate: Math.random() * 360,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 0.8,
                delay: particle.delay,
                ease: "easeOut",
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{ backgroundColor: particle.color }}
            />
          ))}

          {/* Heart emojis */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`heart-${i}`}
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{
                scale: [0, 1.2, 0],
                x: (Math.random() - 0.5) * 80,
                y: -Math.random() * 60 - 20,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              className="absolute text-2xl"
            >
              💖
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
