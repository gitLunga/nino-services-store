"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Sparkles, MessageCircle, ShoppingBag, Heart } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Welcome to Nino's Online Store",
    subtitle: "Your Personal Shopping Experience",
    description:
      "Browse my WhatsApp catalog and discover beautiful items curated just for you. Thank you for choosing Nino Services! 💕",
    image: "/images/hero/nino-store-welcome.jpg",
    cta: "View WhatsApp Catalog",
    ctaAction: "whatsapp",
    gradient: "from-pink-400 to-rose-400",
    textColor: "text-gray-800",
  },
  {
    id: 2,
    title: "Shop Anytime, Anywhere",
    subtitle: "Mobile Shopping Made Easy",
    description:
      "Discover our complete collection online with easy browsing, detailed product views, and seamless ordering",
    image: "/images/hero/online-shopping-illustration.jpg",
    cta: "Browse Products",
    ctaAction: "browse",
    gradient: "from-purple-400 to-indigo-400",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Spring Collection 2024",
    subtitle: "Bloom with Elegance",
    description: "Discover our latest feminine pieces that celebrate your unique style and personality",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Shop Collection",
    ctaAction: "browse",
    gradient: "from-pink-400 to-purple-500",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Beauty Essentials",
    subtitle: "Glow Up Your Routine",
    description: "Premium skincare and makeup for the modern goddess - because you deserve to shine",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Explore Beauty",
    ctaAction: "beauty",
    gradient: "from-rose-400 to-pink-500",
    textColor: "text-white",
  },
  {
    id: 5,
    title: "Exclusive Sale",
    subtitle: "Up to 50% Off",
    description: "Limited time offer on selected items - don't miss out on these amazing deals!",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Shop Sale",
    ctaAction: "sale",
    gradient: "from-purple-400 to-indigo-500",
    textColor: "text-white",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isClient])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleCTAClick = (action: string) => {
    if (!isClient) return

    switch (action) {
      case "whatsapp":
        window.open("https://www.whatsapp.com/catalog/27688849849/", "_blank")
        break
      case "browse":
        router.push("/products")
        break
      case "beauty":
        router.push("/category/beauty")
        break
      case "sale":
        router.push("/products?filter=sale")
        break
      default:
        router.push("/products")
    }
  }

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Overlay for better text readability */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} ${slide.image.includes("nino-store-welcome") ? "opacity-20" : "opacity-60"}`}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-center max-w-4xl px-4 ${slide.textColor}`}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair">{slide.title}</h1>
                <Sparkles className="w-6 h-6" />
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 font-light">{slide.subtitle}</h2>

              <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => handleCTAClick(slide.ctaAction)}
                  className={`${
                    slide.ctaAction === "whatsapp"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                  } rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  {slide.ctaAction === "whatsapp" ? (
                    <MessageCircle className="w-5 h-5 mr-2" />
                  ) : slide.ctaAction === "browse" ? (
                    <ShoppingBag className="w-5 h-5 mr-2" />
                  ) : (
                    <Heart className="w-5 h-5 mr-2" />
                  )}
                  {slide.cta}
                </Button>

                {/* Secondary CTA for first slide */}
                {slide.id === 1 && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleCTAClick("browse")}
                    className="bg-white/10 border-white/30 text-gray-800 hover:bg-white/20 rounded-full px-8 py-3 text-lg font-semibold backdrop-blur-sm"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Browse Online Store
                  </Button>
                )}
              </div>

              {/* Contact Info for first slide */}
              {slide.id === 1 && (
                <div className="mt-6 text-gray-700">
                  <p className="text-lg font-semibold">📱 068 884 9849</p>
                  <p className="text-sm opacity-80">Available on WhatsApp for instant assistance</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Slide Counter - Only show on client */}
      {isClient && (
        <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </div>
  )
}
