import HeroCarousel from "@/components/hero-carousel"
import CategoryShowcase from "@/components/category-showcase"
import ProductSwiper from "@/components/product-swiper"
import SmartRecommendations from "@/components/smart-recommendations"
import FeedbackChat from "@/components/feedback-chat"
import WhatsAppFloat from "@/components/whatsapp-float"
import Footer from "@/components/footer"
import { products } from "@/lib/product-data"
import { categoriesData } from "@/lib/categories-data"

export default function HomePage() {
  // Get featured products
  const featuredProducts = products.filter((product) => product.isOnSale).slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <HeroCarousel />

      {/* Welcome Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="section-eyebrow mb-4">Nino Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-6 font-playfair">
            Welcome to Nino Services
          </h2>
          <div className="divider-brand mb-6" />
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your one-stop destination for beautiful fashion, accessories, and lifestyle products. We curate the finest
            items to help you express your unique style and personality.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-eyebrow mb-4">Explore</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 font-playfair">Shop by Category</h2>
            <div className="divider-brand" />
          </div>
          <CategoryShowcase categories={categoriesData} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-eyebrow mb-4">Trending Now</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 font-playfair">Featured Products</h2>
            <div className="divider-brand" />
          </div>
          <ProductSwiper products={featuredProducts} />
        </div>
      </section>

      {/* Smart Recommendations */}
      <SmartRecommendations products={products} />

      {/* Feedback Chat */}
      <FeedbackChat />

      {/* WhatsApp Float */}
      <WhatsAppFloat />

      {/* Footer */}
      <Footer />
    </div>
  )
}
