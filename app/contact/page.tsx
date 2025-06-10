"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Mail, Clock, MessageCircle, Instagram, Music, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Hi Nino! 

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message: ${formData.message}

Sent from Nino Services website contact form.`

    const whatsappUrl = `https://wa.me/27688849849?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 font-playfair">Get in Touch</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our products? Need styling advice? Or just want to say hello? I'd love to hear from
            you! 💕
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-gray-800">Let's Connect!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <p className="text-gray-600">+27 68 884 9849</p>
                    <Badge className="bg-green-100 text-green-800 mt-1">Preferred Contact Method</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">hello@ninoservices.co.za</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-600">Johannesburg, South Africa</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Response Time</h3>
                    <p className="text-gray-600">Usually within 2-4 hours</p>
                    <Badge className="bg-orange-100 text-orange-800 mt-1">Fast Response</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200">
              <CardHeader>
                <CardTitle className="text-xl font-playfair text-gray-800">Follow My Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link
                    href="https://instagram.com/Nino_Dladla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/60 rounded-lg hover:bg-white/80 transition-all"
                  >
                    <Instagram className="w-8 h-8 text-pink-500" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Instagram</h4>
                      <p className="text-gray-600">@Nino_Dladla</p>
                      <p className="text-sm text-gray-500">Daily fashion inspiration & behind-the-scenes</p>
                    </div>
                  </Link>

                  <Link
                    href="https://tiktok.com/@ninodladla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/60 rounded-lg hover:bg-white/80 transition-all"
                  >
                    <Music className="w-8 h-8 text-purple-500" />
                    <div>
                      <h4 className="font-semibold text-gray-800">TikTok</h4>
                      <p className="text-gray-600">@ninodladla</p>
                      <p className="text-sm text-gray-500">Fun styling tips & product showcases</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-gray-800">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-400"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-pink-200 focus:border-pink-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="border-pink-200 focus:border-pink-400"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-pink-200 focus:border-pink-400 min-h-[120px]"
                    placeholder="Tell me what's on your mind..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full py-3"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send via WhatsApp
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  This form will open WhatsApp with your message pre-filled for easy sending.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mt-16 bg-white/80 backdrop-blur-sm border-pink-100">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-gray-800 text-center">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">How long does shipping take?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  We typically process and ship orders within 1-2 business days. Delivery usually takes 3-5 business
                  days within South Africa.
                </p>

                <h4 className="font-semibold text-gray-800 mb-2">Do you offer returns?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Yes! We offer a 7-day return policy for unworn items in original condition. Contact us via WhatsApp to
                  initiate a return.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  We accept EFT, cash deposits, and payment on delivery for local orders. All payments are processed
                  securely.
                </p>

                <h4 className="font-semibold text-gray-800 mb-2">Can I see items before purchasing?</h4>
                <p className="text-gray-600 text-sm">
                  We can arrange viewings for local customers in Johannesburg. Just send us a WhatsApp message to
                  schedule.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
