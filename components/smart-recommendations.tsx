"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/product-data"

interface SmartRecommendationsProps {
  products: Product[]
}

export default function SmartRecommendations({ products }: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const { addToCart, lastViewedProduct } = useCart()

  useEffect(() => {
    // Simple recommendation algorithm
    const getRecommendations = () => {
      // Get random products for now (in a real app, this would be more sophisticated)
      const shuffled = [...products].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 4)
    }

    setRecommendations(getRecommendations())
  }, [products, lastViewedProduct])

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

  if (recommendations.length === 0) return null

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <h2 className="text-3xl font-bold text-gray-800 font-playfair">Smart Recommendations</h2>
            <Sparkles className="w-6 h-6 text-pink-500" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Curated just for you based on your browsing and shopping preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm">
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

                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Recommended
                    </Badge>

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
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full"
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
        </div>

        <div className="text-center mt-8">
          <Link href="/products">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full px-8 py-3">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
