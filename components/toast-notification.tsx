"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  type?: "success" | "error" | "info"
  duration?: number
}

export default function ToastNotification({
  message,
  isVisible,
  onClose,
  type = "success",
  duration = 2000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-[100] max-w-sm"
        >
          <div
            className={`
            rounded-2xl shadow-2xl border-2 p-4 backdrop-blur-sm
            ${type === "success" ? "bg-green-50/95 border-green-200 text-green-800" : ""}
            ${type === "error" ? "bg-red-50/95 border-red-200 text-red-800" : ""}
            ${type === "info" ? "bg-blue-50/95 border-blue-200 text-blue-800" : ""}
          `}
          >
            <div className="flex items-center gap-3">
              {type === "success" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </motion.div>
              )}

              <div className="flex-1">
                <p className="font-semibold text-sm">{message}</p>
              </div>

              <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 hover:bg-white/50 rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
