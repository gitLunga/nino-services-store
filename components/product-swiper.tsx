"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/product-data"

interface ProductSwiperProps {
  products: Product[]
}

export default function ProductSwiper({ products }: ProductSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const { addToCart } = useCart()

  const itemsPerPage = 4
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentProducts = products.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory,
    })
  }

  const handleWhatsAppOrder = (product: Product) => {
    const message = `Hi! I'm interested in the ${product.name} for R${product.price}. Can you help me with this?`
    const whatsappUrl = `https://wa.me/27688849849?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="rounded-full border-pink-200 hover:bg-pink-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-pink-500 w-6" : "bg-pink-200"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={currentIndex === totalPages - 1}
          className="rounded-full border-pink-200 hover:bg-pink-50"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Products Carousel */}
      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Link href={`/product/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {product.isOnSale && (
                        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                          Sale ✨
                        </Badge>
                      )}

                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="icon"
                              className="bg-white/90 text-pink-600 hover:bg-white rounded-full shadow-lg"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                          </motion.div>

                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="icon"
                              onClick={() => handleAddToCart(product)}
                              className="bg-pink-500 text-white hover:bg-pink-600 rounded-full shadow-lg"
                            >
                              <ShoppingBag className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                      </div>

                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-pink-700 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-pink-600">R{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">R{product.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 btn-shine bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full"
                        >
                          <ShoppingBag className="w-3 h-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleWhatsAppOrder(product)}
                          className="border-green-500 text-green-600 hover:bg-green-50 rounded-full"
                        >
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
