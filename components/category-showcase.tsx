"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/categories-data"

interface CategoryShowcaseProps {
  categories: Category[]
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category, index) => {
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/category/${category.id}`}>
              <Card className="group relative overflow-hidden hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-2 border-pink-100 bg-white/80 backdrop-blur-sm h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/0 via-pink-50/0 to-purple-50/0 group-hover:from-pink-50/60 group-hover:to-purple-50/40 transition-all duration-500" />
                <CardContent className="p-6 text-center h-full flex flex-col justify-center relative z-10">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-playfair group-hover:text-pink-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{category.description}</p>
                  <Badge className="mx-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white group-hover:from-pink-600 group-hover:to-purple-600 transition-all">
                    {category.items.length} items
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
