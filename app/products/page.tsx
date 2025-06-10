import ProductsPageClient from "@/components/products-page-client"
import { products } from "@/lib/product-data"

export default function ProductsPage() {
  return <ProductsPageClient products={products} />
}
