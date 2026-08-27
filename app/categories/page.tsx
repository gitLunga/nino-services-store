import AnimatedCategoryGrid from "@/components/animated-category-grid"
import { categoriesData } from "@/lib/categories-data"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="section-eyebrow mb-4">Discover</span>
          <h1 className="text-5xl font-bold text-gray-800 mt-3 mb-6 font-playfair">Shop by Category</h1>
          <div className="divider-brand mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated collections designed to celebrate your unique style and feminine elegance.
          </p>
        </div>

        {/* Animated Category Grid */}
        <AnimatedCategoryGrid categories={categoriesData} />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 max-w-2xl mx-auto rounded-3xl p-8 shadow-elegant hover-lift">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-playfair">Can't Find What You're Looking For?</h2>
            <p className="text-gray-600 mb-6">
              I'm always adding new products and taking special requests. Let me know what you need!
            </p>
            <a
              href="/contact"
              className="btn-shine inline-block bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-elegant"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
