export interface CategoryItem {
  id: number
  name: string
  description: string
  priceRange: string
  image: string
  category: string
  subcategory: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  subcategories: string[]
  items: CategoryItem[]
}

export const categoriesData: Category[] = [
  {
    id: "clothing",
    name: "Clothing, Fashion & Apparel",
    description: "Elegant dresses, tops & seasonal collections",
    icon: "👗",
    color: "from-pink-400 to-rose-400",
    subcategories: [
      "Women's Dresses",
      "Tops & Blouses",
      "Activewear & Leggings",
      "Skirts & Pants",
      "Lingerie & Sleepwear",
      "Seasonal Collections",
    ],
    items: [
      {
        id: 101,
        name: "Colorful Tie-Strap Summer Dresses",
        description: "Beautiful flowing dresses perfect for any occasion",
        priceRange: "R280 - R350",
        image: "/images/dresses/tie-dresses.jpg",
        category: "clothing",
        subcategory: "Women's Dresses",
      },
      {
        id: 102,
        name: "Ruffle Midi Dresses Collection",
        description: "Elegant ruffle dresses in vibrant colors",
        priceRange: "R320 - R380",
        image: "/images/dresses/ruffle-dresses.jpg",
        category: "clothing",
        subcategory: "Women's Dresses",
      },
      {
        id: 103,
        name: "Flowing Maxi Dresses",
        description: "Comfortable and stylish maxi dresses",
        priceRange: "R350 - R420",
        image: "/images/dresses/maxi-dresses.jpg",
        category: "clothing",
        subcategory: "Women's Dresses",
      },
      {
        id: 104,
        name: "Cozy Turtleneck Collection",
        description: "Soft and cozy turtleneck sweaters in multiple colors",
        priceRange: "R247 - R280",
        image: "/images/clothing/turtleneck-collection.jpg",
        category: "clothing",
        subcategory: "Tops & Blouses",
      },
      {
        id: 105,
        name: "High-Waisted Ribbed Leggings",
        description: "High-waisted ribbed leggings with tummy control",
        priceRange: "R120 - R150",
        image: "/images/clothing/leggings-tights.jpg",
        category: "clothing",
        subcategory: "Activewear & Leggings",
      },
      {
        id: 106,
        name: "2-Piece Crop Top & Legging Sets",
        description: "Matching crop top and high-waisted legging sets",
        priceRange: "R220 - R280",
        image: "/images/clothing/2pcs-sets.jpg",
        category: "clothing",
        subcategory: "Activewear & Leggings",
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Bags, jewelry & beautiful accents",
    icon: "💎",
    color: "from-purple-400 to-pink-400",
    subcategories: ["Bags & Purses", "Jewelry", "Hats & Scarves", "Belts & Gloves"],
    items: [
      {
        id: 201,
        name: "Mesh Rhinestone Handbags",
        description: "Sparkling mesh bags in multiple colors",
        priceRange: "R100 - R120",
        image: "/images/handbags/mesh-bags.jpg",
        category: "accessories",
        subcategory: "Bags & Purses",
      },
      {
        id: 202,
        name: "Structured Mini Bags",
        description: "Elegant structured bags for any occasion",
        priceRange: "R100 - R150",
        image: "/images/handbags/structured-bags.jpg",
        category: "accessories",
        subcategory: "Bags & Purses",
      },
      {
        id: 203,
        name: "Colorful Crossbody Bags",
        description: "Vibrant crossbody bags for everyday use",
        priceRange: "R100 - R130",
        image: "/images/handbags/colorful-bags.jpg",
        category: "accessories",
        subcategory: "Bags & Purses",
      },
      {
        id: 204,
        name: "Canvas Character Totes",
        description: "Cute character-themed tote bags",
        priceRange: "R80 - R100",
        image: "/images/handbags/canvas-totes.jpg",
        category: "accessories",
        subcategory: "Bags & Purses",
      },
      {
        id: 205,
        name: "Fluffy Heart Bag",
        description: "Adorable heart-shaped fluffy bag",
        priceRange: "R100 - R120",
        image: "/images/handbags/heart-bag.jpg",
        category: "accessories",
        subcategory: "Bags & Purses",
      },
      {
        id: 206,
        name: "Mini Structured Handbags",
        description: "Compact structured bags in classic colors",
        priceRange: "R160 - R180",
        image: "/images/handbags/mini-bags.jpg",
        category: "accessories",
        subcategory: "Bags & Purses",
      },
      {
        id: 207,
        name: "Black Textured Shoulder Bag",
        description: "Elegant textured bag with chain detail",
        priceRange: "R100 - R120",
        image: "/images/handbags/black-textured.jpg",
        category: "accessories",
        subcategory: "Bags & Purses",
      },
    ],
  },
  {
    id: "equipment",
    name: "Equipment & Tools",
    description: "Beauty tools, household gadgets & essentials",
    icon: "🔧",
    color: "from-rose-400 to-orange-400",
    subcategories: [
      "Beauty Tools",
      "Household Tools",
      "Storage & Organization",
      "Fitness & Wellness",
      "Travel Essentials",
    ],
    items: [
      {
        id: 501,
        name: "BLUEQUE Professional Nail Lamp",
        description: "Professional UV/LED nail lamp for perfect manicures",
        priceRange: "R250 - R300",
        image: "/images/equipment/nail-lamp.jpg",
        category: "equipment",
        subcategory: "Beauty Tools",
      },
      {
        id: 502,
        name: "Portable Lint Remover",
        description: "Handheld fabric shaver and lint remover",
        priceRange: "R150 - R180",
        image: "/images/equipment/lint-remover.jpg",
        category: "equipment",
        subcategory: "Household Tools",
      },
      {
        id: 503,
        name: "Multi-Tier Shoe Rack Organizer",
        description: "Multi-tier metal shoe rack with wall hooks",
        priceRange: "R250 - R300",
        image: "/images/equipment/shoe-rack.jpg",
        category: "equipment",
        subcategory: "Storage & Organization",
      },
      {
        id: 504,
        name: "Waist Trainer Belt",
        description: "Professional waist trainer with heat technology",
        priceRange: "R250 - R300",
        image: "/images/equipment/waist-trainers.jpg",
        category: "equipment",
        subcategory: "Fitness & Wellness",
      },
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    description: "Skincare, makeup & fragrances",
    icon: "✨",
    color: "from-pink-400 to-purple-400",
    subcategories: ["Skincare", "Makeup", "Fragrances", "Nail Care"],
    items: [
      {
        id: 401,
        name: "Hydrating Face Serum",
        description: "Nourishing serum for all skin types",
        priceRange: "R150 - R220",
        image: "/placeholder.svg?height=300&width=300",
        category: "beauty",
        subcategory: "Skincare",
      },
      {
        id: 402,
        name: "Luxury Lipstick Collection",
        description: "Premium lipsticks in various shades",
        priceRange: "R80 - R120",
        image: "/placeholder.svg?height=300&width=300",
        category: "beauty",
        subcategory: "Makeup",
      },
      {
        id: 403,
        name: "Sexy Night Body Mist",
        description: "Luxurious body mist with captivating fragrance",
        priceRange: "R150 - R180",
        image: "/images/beauty/body-mist.jpg",
        category: "beauty",
        subcategory: "Fragrances",
      },
    ],
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Comfortable shoes, slippers & casual wear",
    icon: "👟",
    color: "from-indigo-400 to-purple-400",
    subcategories: ["Casual Shoes", "Slippers", "Sandals", "Boots"],
    items: [
      {
        id: 301,
        name: "Classic Crocs - Beige",
        description: "Comfortable classic Crocs in beige with white accents",
        priceRange: "R350 - R400",
        image: "/images/footwear/crocs-beige.jpg",
        category: "footwear",
        subcategory: "Casual Shoes",
      },
      {
        id: 302,
        name: "Classic Crocs - Pink",
        description: "Stylish pink Crocs with darker pink accents",
        priceRange: "R350 - R400",
        image: "/images/footwear/crocs-pink.jpg",
        category: "footwear",
        subcategory: "Casual Shoes",
      },
      {
        id: 303,
        name: "Classic Crocs - Nude",
        description: "Elegant nude-colored Crocs with pink accents",
        priceRange: "R350 - R400",
        image: "/images/footwear/crocs-nude.jpg",
        category: "footwear",
        subcategory: "Casual Shoes",
      },
      {
        id: 304,
        name: "Teddy Bear Slippers",
        description: "Adorable pink teddy bear slippers for kids",
        priceRange: "R220 - R250",
        image: "/images/footwear/teddy-slippers.jpg",
        category: "footwear",
        subcategory: "Slippers",
      },
      {
        id: 305,
        name: "Heart-Shaped Love Slippers",
        description: "Adorable heart-shaped fuzzy slippers with Love branding",
        priceRange: "R180 - R220",
        image: "/images/footwear/heart-slippers.jpg",
        category: "footwear",
        subcategory: "Slippers",
      },
    ],
  },
  {
    id: "haircare",
    name: "Hair Care & Styling",
    description: "Treatments, styling products & hair essentials",
    icon: "✂️",
    color: "from-yellow-400 to-orange-400",
    subcategories: ["Hair Treatments", "Styling Products", "Shampoos & Conditioners", "Hair Accessories"],
    items: [
      {
        id: 701,
        name: "Brazilian Curls Hair Treatment",
        description: "UNIQUE Brazilian Curls treatment for all hair types",
        priceRange: "R70 - R90",
        image: "/images/haircare/brazilian-curls.jpg",
        category: "haircare",
        subcategory: "Hair Treatments",
      },
      {
        id: 702,
        name: "IKT Hair Care Combo Set",
        description: "Complete hair care set with foam, wax and styling products",
        priceRange: "R150 - R200",
        image: "/images/haircare/ikt-combo.jpg",
        category: "haircare",
        subcategory: "Styling Products",
      },
    ],
  },
  {
    id: "drinkware",
    name: "Drinkware & Accessories",
    description: "Tumblers, bottles & hydration essentials",
    icon: "🥤",
    color: "from-blue-400 to-cyan-400",
    subcategories: ["Tumblers", "Water Bottles", "Travel Mugs", "Accessories"],
    items: [
      {
        id: 801,
        name: "Stanley Quencher H2O Tumbler",
        description: "Authentic Stanley 40oz tumbler with all-day ice retention",
        priceRange: "R300 - R350",
        image: "/images/drinkware/stanley-tumbler.jpg",
        category: "drinkware",
        subcategory: "Tumblers",
      },
      {
        id: 802,
        name: "Colorful Insulated Tumblers",
        description: "Stylish insulated tumblers with handles in multiple colors",
        priceRange: "R200 - R250",
        image: "/images/drinkware/plain-tumblers.jpg",
        category: "drinkware",
        subcategory: "Tumblers",
      },
    ],
  },
  {
    id: "household",
    name: "Household Products",
    description: "Home decor, organization & essentials",
    icon: "🏠",
    color: "from-green-400 to-teal-400",
    subcategories: ["Home Decor", "Kitchen Essentials", "Bedding & Cushions", "Wall Art", "Rugs & Mats"],
    items: [
      {
        id: 601,
        name: "Fluffy Decorative Cushions",
        description: "Ultra-soft fluffy cushions in vibrant colors",
        priceRange: "R120 - R150",
        image: "/images/home/fluffy-cushions.jpg",
        category: "household",
        subcategory: "Home Decor",
      },
      {
        id: 602,
        name: "Butterfly Wall Stickers",
        description: "Beautiful butterfly wall decals in pink and silver",
        priceRange: "R80 - R100",
        image: "/images/home/wall-stickers.jpg",
        category: "household",
        subcategory: "Wall Art",
      },
      {
        id: 603,
        name: "Fluffy Area Rugs Collection",
        description: "Ultra-soft fluffy area rugs in multiple colors",
        priceRange: "R180 - R220",
        image: "/images/home/fluffy-mats.jpg",
        category: "household",
        subcategory: "Rugs & Mats",
      },
    ],
  },
]

export function getCategoryById(id: string): Category | undefined {
  return categoriesData.find((category) => category.id === id)
}

export function getItemsByCategory(categoryId: string): CategoryItem[] {
  const category = getCategoryById(categoryId)
  return category ? category.items : []
}

export function getItemsBySubcategory(categoryId: string, subcategory: string): CategoryItem[] {
  const category = getCategoryById(categoryId)
  return category ? category.items.filter((item) => item.subcategory === subcategory) : []
}
