"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity?: number
  category?: string
  subcategory?: string
  selectedColor?: string
  selectedSize?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  lastViewedProduct: string
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  updateLastViewedProduct: (path: string) => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastViewedProduct: "/",

      addToCart: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          set({
            items: items.map((i) => (i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)),
          })
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
          })
        }
      },

      removeFromCart: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
          return
        }

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },

      updateLastViewedProduct: (path) => {
        set({ lastViewedProduct: path })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + (item.quantity || 1), 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      },
    }),
    {
      name: "nino-cart-storage",
    },
  ),
)
