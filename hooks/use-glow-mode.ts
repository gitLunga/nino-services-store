"use client"

import { useState, useEffect } from "react"

export function useGlowMode() {
  const [isGlowMode, setIsGlowMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem("glow-mode")
    if (saved) {
      setIsGlowMode(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (!isClient) return

    localStorage.setItem("glow-mode", JSON.stringify(isGlowMode))
    if (isGlowMode) {
      document.documentElement.classList.add("glow-mode")
    } else {
      document.documentElement.classList.remove("glow-mode")
    }
  }, [isGlowMode, isClient])

  const toggleGlowMode = () => {
    if (isClient) {
      setIsGlowMode(!isGlowMode)
    }
  }

  return { isGlowMode, toggleGlowMode }
}
