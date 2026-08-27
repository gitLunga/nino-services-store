"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingBag, Filter, Grid, List, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import WhatsAppFloat from "@/components/whatsapp-float"
import { useCart } from "@/hooks/use-cart"
import type { Category } from "@/lib/categories-data"

interface CategoryPageProps {
  category: Category
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedSubcategory, setSelectedSubcategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [showConfetti, setShowConfetti] = useState<number | null>(null)

  const { addToCart } = useCart()

  const filteredItems =
    selectedSubcategory === "All"
      ? category.items
      : category.items.filter((item) => item.subcategory === selectedSubcategory)

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: Number.parseInt(item.priceRange.split(" - ")[0].replace("R", "")),
      image: item.image,
    })

    // Show confetti animation
    setShowConfetti(item.id)
    setTimeout(() => setShowConfetti(null), 1000)
  }

  const handleWhatsAppOrder = (item: any) => {
    const message = `Hi! I'm interested in the ${item.name} (${item.priceRange}). Can you help me with this?`
    const whatsappUrl = `https://wa.me/27688849849?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="section-eyebrow mb-4">Collection</span>
          <div className="flex items-center justify-center gap-4 mt-3 mb-4">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-3xl shadow-elegant`}
            >
              {category.icon}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 font-playfair">{category.name}</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.description}</p>
          <div className="divider-brand mt-6" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-64 space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4 font-playfair flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>

              {/* Subcategory Filter */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-gray-700">Subcategory</h4>
                <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                  <SelectTrigger className="border-pink-200 focus:border-pink-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Items</SelectItem>
                    {category.subcategories.map((subcategory) => (
                      <SelectItem key={subcategory} value={subcategory}>
                        {subcategory}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quick Subcategory Buttons */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700 text-sm">Quick Filter</h4>
                {category.subcategories.map((subcategory) => (
                  <motion.div key={subcategory} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={selectedSubcategory === subcategory ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSubcategory(subcategory)}
                      className={`w-full justify-start text-xs ${
                        selectedSubcategory === subcategory
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                          : "border-pink-200 text-pink-700 hover:bg-pink-50"
                      }`}
                    >
                      {subcategory}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
            >
              <p className="text-gray-600">
                Showing {filteredItems.length} products
                {selectedSubcategory !== "All" && ` in ${selectedSubcategory}`}
              </p>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 border-pink-200 focus:border-pink-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-pink-200 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-none ${viewMode === "grid" ? "bg-pink-500 text-white" : ""}`}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-none ${viewMode === "list" ? "bg-pink-500 text-white" : ""}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                    className="group relative"
                  >
                    <Card className="overflow-hidden border-2 border-pink-100 bg-white/90 backdrop-blur-sm hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:shadow-pink-200/50">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          {/* 3D Rotation Effect */}
                          <motion.div
                            whileHover={{
                              rotateY: 5,
                              rotateX: 5,
                              transition: { duration: 0.3 },
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={400}
                              height={300}
                              className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
                                viewMode === "grid" ? "w-full h-64" : "w-32 h-32"
                              }`}
                            />
                          </motion.div>

                          {/* Sparkle Effects */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 rounded-full animate-ping" />
                            <div className="absolute top-4 right-6 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
                            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" />
                          </div>

                          {/* Action Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
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

                          {/* Confetti Animation */}
                          <AnimatePresence>
                            {showConfetti === item.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                              >
                                <div className="text-4xl">🎉</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                          <Badge variant="outline" className="text-pink-600 border-pink-200 mb-2">
                            {item.subcategory}
                          </Badge>

                          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-700 transition-colors">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-pink-600">{item.priceRange}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                              <Button
                                onClick={() => handleAddToCart(item)}
                                className="w-full btn-shine bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full relative overflow-hidden"
                              >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Add to Cart
                                {showConfetti === item.id && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.2, 1] }}
                                    className="absolute inset-0 bg-white/20 rounded-full"
                                  />
                                )}
                              </Button>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleWhatsAppOrder(item)}
                                className="border-green-500 text-green-600 hover:bg-green-50 rounded-full"
                              >
                                WhatsApp
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or browse other categories</p>
                <Button
                  onClick={() => setSelectedSubcategory("All")}
                  className="btn-shine bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full"
                >
                  Show All Products
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <WhatsAppFloat />
    </div>
  )
}
