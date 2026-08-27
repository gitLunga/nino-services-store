"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, ShoppingBag, MessageCircle, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
    useCart()

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return

    let message = "Hi Nino! 💕 I'd like to place an order:\n\n"
    message += "🛍️ *ORDER DETAILS*\n"
    message += "━━━━━━━━━━━━━━━━━━━━\n\n"

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      if (item.category) message += `   📦 Category: ${item.category}\n`
      if (item.subcategory) message += `   🏷️ Subcategory: ${item.subcategory}\n`
      message += `   📦 Quantity: ${item.quantity || 1}\n`
      message += `   💰 Price: R${item.price} each\n`
      message += `   💵 Subtotal: R${(item.price * (item.quantity || 1)).toFixed(2)}\n\n`
    })

    message += "━━━━━━━━━━━━━━━━━━━━\n"
    message += `🏷️ *TOTAL: R${getTotalPrice().toFixed(2)}*\n\n`
    message += "Please confirm availability and provide payment details.\n"
    message += "Thank you! ✨💖"

    const whatsappUrl = `https://wa.me/27688849849?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleCart} />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
      >
        <Card className="h-full flex flex-col border-0 rounded-none">
          {/* Header */}
          <CardHeader className="border-b border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-playfair text-gray-800 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-pink-500" />
                Shopping Cart
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={toggleCart} className="hover:bg-pink-100 rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Badge className="bg-pink-100 text-pink-800">
                {items.length} {items.length === 1 ? "item" : "items"}
              </Badge>
              {items.length > 0 && (
                <span className="text-lg font-bold text-pink-600">R{getTotalPrice().toFixed(2)}</span>
              )}
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="flex-1 overflow-y-auto p-0">
            <AnimatePresence mode="wait">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-full p-8 text-center"
                >
                  {/* Empty State Illustration */}
                  <div className="relative mb-6">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="text-6xl mb-4"
                    >
                      🛍️
                    </motion.div>

                    {/* Floating Hearts */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.5, 1, 0.5],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.5,
                          ease: "easeInOut",
                        }}
                        className="absolute text-pink-400 text-xl"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${10 + i * 20}%`,
                        }}
                      >
                        💖
                      </motion.div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-600 mb-2 font-playfair">
                    Your Nino cart is waiting for treasures!
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-xs">
                    Discover beautiful items that celebrate your unique style
                  </p>

                  <div className="space-y-3 w-full">
                    <Button
                      onClick={toggleCart}
                      className="w-full btn-shine bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full"
                    >
                      Browse New Arrivals
                    </Button>

                    <Link href="/products">
                      <Button
                        variant="outline"
                        className="w-full border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full"
                        onClick={toggleCart}
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <div className="p-4 space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                        className="relative"
                      >
                        <Card className="border-pink-100 bg-pink-50/50">
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <div className="relative">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                                />
                                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                                  {item.quantity || 1}
                                </Badge>
                              </div>

                              <div className="flex-1 space-y-2">
                                <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.name}</h4>

                                <div className="flex items-center gap-2">
                                  {item.category && (
                                    <Badge variant="outline" className="text-xs border-pink-200 text-pink-700">
                                      {item.category}
                                    </Badge>
                                  )}
                                  {item.subcategory && (
                                    <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                                      {item.subcategory}
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-pink-600">R{item.price}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(item.id)}
                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                    className="h-8 w-8 rounded-full border-pink-200 hover:bg-pink-50"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity || 1}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                    className="h-8 w-8 rounded-full border-pink-200 hover:bg-pink-50"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          </CardContent>

          {/* Footer */}
          {items.length > 0 && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="border-t border-pink-100 p-4 space-y-4 bg-gradient-to-r from-pink-50 to-purple-50"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-pink-600">R{getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-3 font-semibold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Confirm Order via WhatsApp
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    Clear Cart
                  </Button>

                  <Button
                    variant="outline"
                    onClick={toggleCart}
                    className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
