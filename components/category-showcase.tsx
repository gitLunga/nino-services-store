import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/categories-data"

interface CategoryShowcaseProps {
  categories: Category[]
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => {
        return (
          <Link key={category.id} href={`/category/${category.id}`}>
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-pink-100 bg-white/80 backdrop-blur-sm h-full">
              <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 font-playfair">{category.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{category.description}</p>
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white group-hover:from-pink-600 group-hover:to-purple-600 transition-all">
                  {category.items.length} items
                </Badge>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
