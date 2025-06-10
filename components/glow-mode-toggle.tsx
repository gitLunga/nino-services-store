"use client"

import { useGlowMode } from "@/hooks/use-glow-mode"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export default function GlowModeToggle() {
  const { isGlowMode, toggleGlowMode } = useGlowMode()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <Button
        className="relative w-10 h-10 rounded-full border-2 bg-gradient-to-r from-pink-200 to-purple-200 border-pink-300"
        style={{
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
      >
        <Sparkles className="w-5 h-5 text-pink-600" />
      </Button>
    )
  }

  return (
    <Button
      onClick={toggleGlowMode}
      className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 ${
        isGlowMode
          ? "bg-gradient-to-r from-pink-500 to-purple-600 border-gold-400 shadow-lg shadow-pink-500/50"
          : "bg-gradient-to-r from-pink-200 to-purple-200 border-pink-300 hover:border-pink-400"
      } group overflow-hidden`}
      style={{
        clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      }}
    >
      <Sparkles
        className={`w-5 h-5 transition-all duration-300 ${isGlowMode ? "text-white animate-pulse" : "text-pink-600"}`}
      />
      {isGlowMode && (
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-gold-400 opacity-30 animate-pulse" />
      )}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isGlowMode ? "animate-ping bg-pink-400 opacity-20" : ""
        }`}
      />
    </Button>
  )
}
