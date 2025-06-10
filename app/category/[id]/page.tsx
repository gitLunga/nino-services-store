import { getCategoryById } from "@/lib/categories-data"
import { notFound } from "next/navigation"
import CategoryPage from "@/components/category-page"

export default function CategoryPageWrapper({ params }: { params: { id: string } }) {
  const category = getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  return <CategoryPage category={category} />
}
