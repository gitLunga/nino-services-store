import { getProductById } from "@/lib/product-data"
import { notFound } from "next/navigation"
import ProductDetailPage from "@/components/product-detail-page"

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = getProductById(productId)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}
