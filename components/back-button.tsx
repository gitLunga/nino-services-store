"use client"

import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

interface BackButtonProps {
  customPath?: string
  label?: string
}

export default function BackButton({ customPath, label }: BackButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { lastViewedProduct } = useCart()

  const getBackPath = () => {
    if (customPath) return customPath

    if (pathname.startsWith("/product/")) return lastViewedProduct || "/products"
    if (pathname.startsWith("/category/")) return "/categories"
    if (pathname === "/products") return "/"
    if (pathname === "/categories") return "/"

    return "/"
  }

  const getBackLabel = () => {
    if (label) return label

    if (pathname.startsWith("/product/")) return "Back to Products"
    if (pathname.startsWith("/category/")) return "Back to Categories"
    if (pathname === "/products") return "Back to Home"
    if (pathname === "/categories") return "Back to Home"

    return "Back"
  }

  const handleBack = () => {
    const backPath = getBackPath()
    router.push(backPath)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="fixed top-20 left-4 z-40"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Button
          onClick={handleBack}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {getBackLabel()}
        </Button>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute top-full left-0 mt-2 bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none"
      >
        Return to {getBackLabel().replace("Back to ", "")}
      </motion.div>
    </motion.div>
  )
}
