"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Heart, MessageCircle, Instagram, Facebook, Twitter, Send, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleWhatsAppClick = () => {
    window.open("https://www.whatsapp.com/catalog/27688849849/", "_blank")
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hi Nino! Please add me to your updates list. My email: ${email || "(not provided)"}`
    window.open(`https://wa.me/27688849849?text=${encodeURIComponent(message)}`, "_blank")
    setEmail("")
  }

  const scrollToTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/Nino_Dladla", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  return (
    <footer className="relative bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-100">
      <div className="h-1 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500" />

      {/* Newsletter */}
      <div className="border-b border-pink-100/80">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-soft border border-pink-100 px-6 py-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-800 font-playfair mb-1">Stay in the loop</h3>
              <p className="text-gray-600 text-sm">
                Get first access to new arrivals and exclusive offers, straight to WhatsApp.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full border-pink-200 focus:border-pink-400 bg-white"
              />
              <Button type="submit" className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shrink-0 btn-shine">
                <Send className="w-4 h-4 mr-1.5" />
                Join
              </Button>
            </form>
          </div>
        </div>
      </div>

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
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-pink-500 border border-pink-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-white hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 hover:shadow-glow"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 font-playfair">Quick Links</h3>
            <div className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/shipping", label: "Shipping Info" },
                { href: "/returns", label: "Returns" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-gray-600 hover:text-pink-500 text-sm transition-colors w-fit"
                >
                  <span className="h-px w-0 bg-pink-400 transition-all duration-300 group-hover:w-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 font-playfair">Categories</h3>
            <div className="space-y-2">
              {[
                { href: "/category/clothing", label: "Clothing & Fashion" },
                { href: "/category/beauty", label: "Beauty & Personal Care" },
                { href: "/category/accessories", label: "Accessories" },
                { href: "/category/electronics", label: "Electronics" },
                { href: "/category/haircare", label: "Hair Care" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-gray-600 hover:text-pink-500 text-sm transition-colors w-fit"
                >
                  <span className="h-px w-0 bg-pink-400 transition-all duration-300 group-hover:w-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & WhatsApp */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 font-playfair">Get in Touch</h3>
            <div className="space-y-3">
              <p className="text-gray-600 text-sm">Need help? We're here for you!</p>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium transition-transform hover:translate-x-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat for Help</span>
              </button>
              <p className="text-gray-600 text-sm">Email: hello@ninoservices.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-current" /> by Nino Services © 2024
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 text-xs font-medium text-pink-600 bg-white border border-pink-200 rounded-full px-4 py-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-pink-50"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
