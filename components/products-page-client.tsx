"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingBag, Filter, Grid, List, Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import WhatsAppFloat from "@/components/whatsapp-float"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/product-data"

interface ProductsPageClientProps {
  products: Product[]
}

export default function ProductsPageClient({ products }: ProductsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showConfetti, setShowConfetti] = useState<number | null>(null)

  const { addToCart } = useCart()

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))]

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return b.id - a.id
        default:
          return 0
      }
    })

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory,
    })

    // Show confetti animation
    setShowConfetti(product.id)
    setTimeout(() => setShowConfetti(null), 1000)
  }

  const handleWhatsAppOrder = (product: Product) => {
    const message = `Hi! I'm interested in the ${product.name} for R${product.price}. Can you help me with this?`
    const whatsappUrl = `https://wa.me/27688849849?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-playfair">All Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of beautiful products
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-64 space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4 font-playfair flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>

              {/* Search */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-gray-700">Search</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-pink-200 focus:border-pink-400"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-gray-700">Category</h4>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-pink-200 focus:border-pink-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quick Category Buttons */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700 text-sm">Quick Filter</h4>
                {categories.slice(1).map((category) => (
                  <motion.div key={category} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full justify-start text-xs ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                          : "border-pink-200 text-pink-700 hover:bg-pink-50"
                      }`}
                    >
                      {category}
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
                Showing {filteredProducts.length} of {products.length} products
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
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
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
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
                          <motion.div
                            whileHover={{
                              rotateY: 5,
                              rotateX: 5,
                              transition: { duration: 0.3 },
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={400}
                              height={300}
                              className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
                                viewMode === "grid" ? "w-full h-64" : "w-32 h-32"
                              }`}
                            />
                          </motion.div>

                          {/* Sale Badge */}
                          {product.isOnSale && (
                            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                              Sale ✨
                            </Badge>
                          )}

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

                              <Link href={`/product/${product.id}`}>
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
                            {showConfetti === product.id && (
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
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-pink-600 border-pink-200 text-xs">
                              {product.category}
                            </Badge>
                            {product.subcategory && (
                              <Badge variant="outline" className="text-purple-600 border-purple-200 text-xs">
                                {product.subcategory}
                              </Badge>
                            )}
                          </div>

                          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-700 transition-colors">
                            {product.name}
                          </h3>

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-pink-600">R{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">R{product.originalPrice}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                              <Button
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full relative overflow-hidden"
                              >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Add to Cart
                                {showConfetti === product.id && (
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
                                onClick={() => handleWhatsAppOrder(product)}
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
            {filteredProducts.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full"
                >
                  Clear Filters
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
