"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GlowModeToggle from "@/components/glow-mode-toggle"
import { useCart } from "@/hooks/use-cart"
import CartSidebar from "@/components/cart-sidebar"
import ToastNotification from "@/components/toast-notification"
import ConfettiBurst from "@/components/confetti-burst"
import FlyingItemAnimation from "@/components/flying-item-animation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const announcements = [
  "✨ New arrivals dropping weekly",
  "💬 Order instantly via WhatsApp",
  "🚚 Nationwide delivery across South Africa",
  "💖 Curated with care by Nino Services",
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Announcement Bar */}
      <div className="relative z-50 overflow-hidden bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 text-white">
        <div className="flex whitespace-nowrap py-2 text-xs sm:text-sm font-medium tracking-wide animate-marquee">
          {[...announcements, ...announcements].map((item, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2 opacity-95">
              <Sparkles className="w-3.5 h-3.5" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-pink-100 shadow-soft"
            : "bg-white/95 backdrop-blur-sm border-pink-100/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-6 h-16 md:h-[4.5rem]">
            {/* Logo */}
            <Link href="/" className="group flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-md transition-transform duration-500 ease-out group-hover:rotate-[360deg] group-hover:scale-110">
                <span className="text-white font-bold text-sm font-playfair">N</span>
              </div>
              <span className="text-xl md:text-2xl font-bold text-gradient-brand font-playfair tracking-tight">
                Nino Services
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={pathname === link.href}
                  className="nav-link text-gray-700 hover:text-pink-600 font-medium transition-colors data-[active=true]:text-pink-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-pink-500" />
                <Input
                  placeholder="Search for products..."
                  className="pl-10 rounded-full border-pink-200 focus-visible:ring-pink-300 focus:border-pink-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <GlowModeToggle />
              <Button variant="ghost" size="icon" className="hidden md:flex hover:text-pink-600 hover:bg-pink-50">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex hover:text-pink-600 hover:bg-pink-50">
                <User className="w-5 h-5" />
              </Button>
              <Button
                ref={cartButtonRef}
                variant="ghost"
                size="icon"
                className="relative hover:text-pink-600 hover:bg-pink-50"
                onClick={() => toggleCart()}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
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
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden border-t border-pink-100"
              >
                <div className="flex flex-col space-y-1 py-4">
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search products..." className="pl-10 rounded-full border-pink-200" />
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg px-3 py-2.5 transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
