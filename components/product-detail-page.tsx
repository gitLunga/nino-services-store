"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Heart, Star, ShoppingBag, Minus, Plus, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WhatsAppFloat from "@/components/whatsapp-float"
import BackButton from "@/components/back-button"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/product-data"

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    comment: "Absolutely gorgeous! The quality is amazing and it looks even better in person. Highly recommend!",
    verified: true,
  },
  {
    id: 2,
    name: "Emma L.",
    rating: 4,
    date: "2024-01-10",
    comment: "Beautiful product, very elegant. The color is perfect. Fast shipping too!",
    verified: true,
  },
  {
    id: 3,
    name: "Jessica R.",
    rating: 5,
    date: "2024-01-05",
    comment: "Love this piece! It's become my go-to accessory. Great value for money.",
    verified: true,
  },
]

interface ProductDetailPageProps {
  product: Product
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "")
  const [quantity, setQuantity] = useState(1)

  const addToCartButtonRef = useRef<HTMLButtonElement>(null)
  const { addToCart, updateLastViewedProduct } = useCart()

  // Update last viewed product
  useEffect(() => {
    updateLastViewedProduct(`/product/${product.id}`)
  }, [product.id, updateLastViewedProduct])

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor,
      selectedSize,
      category: product.category,
      subcategory: product.subcategory,
    })

    // Trigger the flying animation
    if (addToCartButtonRef.current && typeof window !== "undefined" && (window as any).triggerCartAnimation) {
      ;(window as any).triggerCartAnimation(product.image, product.name, addToCartButtonRef.current)
    }
  }

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering the ${product.name}${selectedColor ? ` in ${selectedColor}` : ""}${selectedSize ? `, size ${selectedSize}` : ""}, quantity ${quantity} for R${(product.price * quantity).toFixed(2)}. Can you help me with this order?`
    const whatsappUrl = `https://wa.me/27688849849?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <BackButton />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
              <Image
                src={product.images?.[selectedImage] || product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.isOnSale && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg px-3 py-1">
                  Sale ✨
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-pink-500 shadow-lg" : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-pink-600 border-pink-200">
                  {product.category}
                </Badge>
                {product.subcategory && (
                  <Badge variant="outline" className="text-purple-600 border-purple-200">
                    {product.subcategory}
                  </Badge>
                )}
                {product.inStock && (
                  <Badge className="bg-green-100 text-green-800">In Stock ({product.stockCount} left)</Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-playfair">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-lg font-medium ml-2">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-pink-600">R{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">R{product.originalPrice}</span>
                )}
                {product.isOnSale && product.originalPrice && (
                  <Badge className="bg-red-100 text-red-800">
                    Save R{(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button
                  ref={addToCartButtonRef}
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-pink-500 text-pink-600 hover:bg-pink-50 rounded-full"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <Button
                size="lg"
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Order via WhatsApp
              </Button>

              <Button variant="outline" size="lg" className="w-full rounded-full">
                <Share2 className="w-5 h-5 mr-2" />
                Share Product
              </Button>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-3 font-playfair">Product Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-pink-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 font-playfair">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                  <p className="text-gray-600 leading-relaxed">
                    This exquisite piece is perfect for both everyday wear and special occasions. The timeless design
                    ensures it will remain a cherished part of your collection for years to come. Each piece is
                    carefully inspected for quality and comes with our satisfaction guarantee.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="bg-white/80 backdrop-blur-sm border-pink-100">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-800">{review.name}</span>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 font-playfair">Shipping Information</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Free shipping on orders over R500</li>
                        <li>• Standard delivery: 3-5 business days</li>
                        <li>• Express delivery: 1-2 business days</li>
                        <li>• Nationwide shipping available</li>
                        <li>• Tracking provided for all orders</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 font-playfair">Returns & Exchanges</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 7-day return policy</li>
                        <li>• Free returns on defective items</li>
                        <li>• Items must be in original condition</li>
                        <li>• Easy WhatsApp return process</li>
                        <li>• Refunds processed within 3-5 days</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <WhatsAppFloat />
    </div>
  )
}
