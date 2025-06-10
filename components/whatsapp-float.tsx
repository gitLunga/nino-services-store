"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    // Using the provided WhatsApp catalog link
    window.open("https://www.whatsapp.com/catalog/27688849849/", "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      <div className="absolute -top-12 right-0 bg-black text-white text-sm px-3 py-1 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us on WhatsApp!
      </div>
    </div>
  )
}
