"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CategoryModal from "@/components/category-modal"

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

interface AnimatedCategoryGridProps {
  categories: Category[]
}

export default function AnimatedCategoryGrid({ categories }: AnimatedCategoryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const closeModal = () => {
    setSelectedCategory(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategoryClick(category.id)}
            className="cursor-pointer"
          >
            <Card className="group relative overflow-hidden border-2 border-pink-100 bg-gradient-to-br from-white/90 to-pink-50/50 backdrop-blur-sm hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:shadow-pink-200/50">
              {/* Sparkle Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 rounded-full animate-ping" />
                <div className="absolute top-4 right-6 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" />
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-pink-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="p-6 text-center relative z-10">
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {category.icon}
                </motion.div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 font-playfair group-hover:text-pink-700 transition-colors">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{category.description}</p>

                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white group-hover:from-pink-600 group-hover:to-purple-600 transition-all">
                  {category.items.length} items
                </Badge>

                {/* Floral Decoration */}
                <div className="absolute top-2 left-2 text-pink-300 opacity-50 group-hover:opacity-100 transition-opacity">
                  🌸
                </div>
                <div className="absolute bottom-2 right-2 text-purple-300 opacity-50 group-hover:opacity-100 transition-opacity">
                  🌺
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <CategoryModal categoryId={selectedCategory} onClose={closeModal} categories={categories} />
        )}
      </AnimatePresence>
    </>
  )
}
