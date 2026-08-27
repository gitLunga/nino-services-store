"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, X } from "lucide-react"

export default function FeedbackChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedReaction, setSelectedReaction] = useState("")
  const [showThankYou, setShowThankYou] = useState(false)

  const reactions = [
    { emoji: "😍", label: "Love it!", value: "love" },
    { emoji: "😊", label: "Good", value: "good" },
    { emoji: "😕", label: "Needs work", value: "needs-work" },
  ]

  const quickReplies = ["More product variety", "Better prices", "Faster shipping", "Improved website"]

  const handleReactionSelect = (reaction: string) => {
    setSelectedReaction(reaction)
    setStep(2)
  }

  const handleQuickReply = (reply: string) => {
    setShowThankYou(true)
    setTimeout(() => {
      setIsOpen(false)
      setStep(1)
      setSelectedReaction("")
      setShowThankYou(false)
    }, 2000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-50 btn-shine bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-20 right-6 z-50 w-80 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 shadow-xl">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">N</span>
            </div>
            <span className="font-semibold">Nino Services</span>
          </div>
          <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {showThankYou ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4 animate-bounce">💕</div>
              <h3 className="text-xl font-bold text-pink-600 font-playfair mb-2">Thank You!</h3>
              <p className="text-gray-600">Your feedback helps us improve! ✨</p>
            </div>
          ) : step === 1 ? (
            <>
              <div className="bg-white rounded-2xl rounded-bl-none p-4 shadow-sm border border-pink-100">
                <p className="text-gray-700">Hi beautiful! 💕 How was your shopping experience with us today?</p>
              </div>

              <div className="flex justify-center gap-4">
                {reactions.map((reaction) => (
                  <Button
                    key={reaction.value}
                    onClick={() => handleReactionSelect(reaction.value)}
                    className="flex flex-col items-center gap-2 h-auto py-3 px-4 bg-white hover:bg-pink-50 border border-pink-200 text-gray-700"
                    variant="outline"
                  >
                    <span className="text-2xl">{reaction.emoji}</span>
                    <span className="text-xs">{reaction.label}</span>
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-2xl rounded-bl-none p-4 shadow-sm border border-pink-100">
                <p className="text-gray-700">
                  Thanks for the feedback! What would you like to see improved? (Optional)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    variant="outline"
                    className="text-xs h-auto py-2 px-3 bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 hover:from-pink-200 hover:to-purple-200"
                  >
                    {reply}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => handleQuickReply("No suggestions")}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                Skip & Close
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
