import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Manrope, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nino Services - Feminine Elegance & Beauty",
  description:
    "Your destination for feminine elegance and beauty. Shop clothing, accessories, beauty products, and more.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
