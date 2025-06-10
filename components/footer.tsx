"use client"

import Link from "next/link"
import { Heart, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  const handleWhatsAppClick = () => {
    window.open("https://www.whatsapp.com/catalog/27688849849/", "_blank")
  }

  return (
    <footer className="bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-playfair">
                Nino Services
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your destination for feminine elegance and beauty. We curate the finest products for the modern woman.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-pink-500 hover:text-pink-600">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-pink-500 hover:text-pink-600">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-pink-500 hover:text-pink-600">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 font-playfair">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-600 hover:text-pink-500 text-sm">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-pink-500 text-sm">
                Contact
              </Link>
              <Link href="/shipping" className="block text-gray-600 hover:text-pink-500 text-sm">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-gray-600 hover:text-pink-500 text-sm">
                Returns
              </Link>
              <Link href="/faq" className="block text-gray-600 hover:text-pink-500 text-sm">
                FAQ
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 font-playfair">Categories</h3>
            <div className="space-y-2">
              <Link href="/category/clothing" className="block text-gray-600 hover:text-pink-500 text-sm">
                Clothing & Fashion
              </Link>
              <Link href="/category/beauty" className="block text-gray-600 hover:text-pink-500 text-sm">
                Beauty & Personal Care
              </Link>
              <Link href="/category/accessories" className="block text-gray-600 hover:text-pink-500 text-sm">
                Accessories
              </Link>
              <Link href="/category/electronics" className="block text-gray-600 hover:text-pink-500 text-sm">
                Electronics
              </Link>
              <Link href="/category/haircare" className="block text-gray-600 hover:text-pink-500 text-sm">
                Hair Care
              </Link>
            </div>
          </div>

          {/* Contact & WhatsApp */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 font-playfair">Get in Touch</h3>
            <div className="space-y-3">
              <p className="text-gray-600 text-sm">Need help? We're here for you!</p>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat for Help</span>
              </button>
              <p className="text-gray-600 text-sm">Email: hello@ninoservices.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-current" /> by Nino Services © 2024
          </p>
        </div>
      </div>
    </footer>
  )
}
