"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GlowModeToggle from "@/components/glow-mode-toggle"
import { useCart } from "@/hooks/use-cart"
import CartSidebar from "@/components/cart-sidebar"
import ToastNotification from "@/components/toast-notification"
import ConfettiBurst from "@/components/confetti-burst"
import FlyingItemAnimation from "@/components/flying-item-animation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems, toggleCart } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 })
  const [flyingItem, setFlyingItem] = useState<{
    isVisible: boolean
    image: string
    name: string
    startPos: { x: number; y: number }
  }>({ isVisible: false, image: "", name: "", startPos: { x: 0, y: 0 } })

  const cartButtonRef = useRef<HTMLButtonElement>(null)
  const cartCount = getTotalItems()

  // Listen for cart additions
  const handleCartAddition = (itemImage: string, itemName: string, startElement: HTMLElement) => {
    if (typeof window === "undefined" || !cartButtonRef.current) return

    const startRect = startElement.getBoundingClientRect()
    const endRect = cartButtonRef.current.getBoundingClientRect()

    // Flying animation
    setFlyingItem({
      isVisible: true,
      image: itemImage,
      name: itemName,
      startPos: {
        x: startRect.left + startRect.width / 2,
        y: startRect.top + startRect.height / 2,
      },
    })

    // Confetti at cart icon
    setTimeout(() => {
      setConfettiPosition({
        x: endRect.left + endRect.width / 2,
        y: endRect.top + endRect.height / 2,
      })
      setShowConfetti(true)
    }, 600)

    // Toast notification
    setTimeout(() => {
      setToastMessage(`${itemName} added to cart!`)
      setShowToast(true)
    }, 800)
  }

  // Expose the function globally for other components to use
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).triggerCartAnimation = handleCartAddition
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-playfair">
                Nino Services
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-pink-500 transition-colors">
                Products
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-pink-500 transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-pink-500 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-pink-500 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search for products..."
                  className="pl-10 rounded-full border-pink-200 focus:border-pink-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <GlowModeToggle />
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="w-5 h-5" />
              </Button>
              <Button ref={cartButtonRef} variant="ghost" size="icon" className="relative" onClick={() => toggleCart()}>
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-pink-100">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search products..." className="pl-10 rounded-full border-pink-200" />
                </div>
                <Link href="/" className="text-gray-700 hover:text-pink-500 py-2">
                  Home
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-pink-500 py-2">
                  Products
                </Link>
                <Link href="/categories" className="text-gray-700 hover:text-pink-500 py-2">
                  Categories
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-pink-500 py-2">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-pink-500 py-2">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Flying Item Animation */}
      <FlyingItemAnimation
        isVisible={flyingItem.isVisible}
        onComplete={() => setFlyingItem((prev) => ({ ...prev, isVisible: false }))}
        itemImage={flyingItem.image}
        itemName={flyingItem.name}
        startPosition={flyingItem.startPos}
        endPosition={
          cartButtonRef.current
            ? {
                x:
                  cartButtonRef.current.getBoundingClientRect().left +
                  cartButtonRef.current.getBoundingClientRect().width / 2,
                y:
                  cartButtonRef.current.getBoundingClientRect().top +
                  cartButtonRef.current.getBoundingClientRect().height / 2,
              }
            : { x: 0, y: 0 }
        }
      />

      {/* Confetti Burst */}
      <ConfettiBurst
        isVisible={showConfetti}
        onComplete={() => setShowConfetti(false)}
        x={confettiPosition.x}
        y={confettiPosition.y}
      />

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
        duration={2000}
      />
    </>
  )
}
