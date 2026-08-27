"use client"

import { motion } from "framer-motion"
import { X, Heart, Eye, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  subcategories: string[]
  items: {
    id: number
    name: string
    description: string
    priceRange: string
    image: string
    subcategory: string
  }[]
}

interface CategoryModalProps {
  categoryId: string
  onClose: () => void
  categories: Category[]
}

export default function CategoryModal({ categoryId, onClose, categories }: CategoryModalProps) {
  const category = categories.find((cat) => cat.id === categoryId)

  if (!category) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 300,
          },
        }}
        exit={{
          y: "100%",
          opacity: 0,
          transition: { duration: 0.2 },
        }}
        className="w-full max-w-6xl max-h-[80vh] bg-white rounded-t-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${category.color} p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/10" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{category.icon}</div>
              <div>
                <h2 className="text-2xl font-bold font-playfair">{category.name}</h2>
                <p className="text-white/90">{category.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 rounded-full">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-20 text-white/30 text-2xl">🌸</div>
          <div className="absolute bottom-4 right-32 text-white/30 text-xl">✨</div>
        </div>

        {/* Subcategories */}
        <div className="p-6 border-b border-pink-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 font-playfair">Browse by Category</h3>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((subcategory) => (
              <Badge
                key={subcategory}
                variant="outline"
                className="border-pink-200 text-pink-700 hover:bg-pink-50 cursor-pointer transition-colors"
              >
                {subcategory}
              </Badge>
            ))}
          </div>
        </div>

        {/* Products Carousel */}
        <div className="p-6 overflow-y-auto max-h-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-playfair">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: index * 0.1 },
                }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>

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

                          <Link href={`/product/${item.id}`}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                size="icon"
                                className="bg-pink-500 text-white hover:bg-pink-600 rounded-full shadow-lg animate-pulse"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-pink-700 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-pink-600">{item.priceRange}</span>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            className="btn-shine bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full"
                          >
                            <ShoppingBag className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                Showing {category.items.length} products in {category.name}
              </p>
            </div>
            <Link href={`/category/${category.id}`}>
              <Button className="btn-shine bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
