"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface FlyingItemProps {
  isVisible: boolean
  onComplete: () => void
  itemImage: string
  itemName: string
  startPosition: { x: number; y: number }
  endPosition: { x: number; y: number }
}

export default function FlyingItemAnimation({
  isVisible,
  onComplete,
  itemImage,
  itemName,
  startPosition,
  endPosition,
}: FlyingItemProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            x: startPosition.x,
            y: startPosition.y,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: endPosition.x,
            y: endPosition.y,
            scale: 0.3,
            opacity: 0.8,
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            x: { type: "spring", stiffness: 100, damping: 15 },
            y: { type: "spring", stiffness: 100, damping: 15 },
          }}
          className="fixed pointer-events-none z-[80] w-16 h-16"
        >
          <div className="relative w-full h-full">
            <Image
              src={itemImage || "/placeholder.svg"}
              alt={itemName}
              fill
              className="object-cover rounded-lg shadow-lg border-2 border-pink-200"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-lg animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
