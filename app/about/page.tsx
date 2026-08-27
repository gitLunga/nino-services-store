import Image from "next/image"
import Link from "next/link"
import { Heart, Instagram, Music, BookOpen, ChefHat, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="section-eyebrow mb-4">Our Story</span>
          <h1 className="text-5xl font-bold text-gray-800 mt-3 mb-6 font-playfair">About Nino Services</h1>
          <div className="divider-brand mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Where passion meets fashion, and every piece tells a story of elegance, beauty, and feminine empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/about/nino-profile.jpg"
                alt="Noluthando Ayanda Dladla - Founder of Nino Services"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
              <Heart className="w-12 h-12 text-white fill-current" />
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-playfair">Meet Noluthando Ayanda Dladla</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Hello there! I am Noluthando Ayanda Dladla, a passionate entrepreneur and the heart behind Nino
                Services. At just 21 years old, I'm a third-year student teacher from the University of Johannesburg,
                majoring in Life Sciences with Natural Sciences and Physical Education.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardContent className="p-4 text-center">
                  <GraduationCap className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Student Teacher</h3>
                  <p className="text-sm text-gray-600">University of Johannesburg</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardContent className="p-4 text-center">
                  <ChefHat className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Private Tutor</h3>
                  <p className="text-sm text-gray-600">Life Sciences & Math</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 font-playfair">My Passions</h3>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2">
                  <Music className="w-4 h-4 mr-2" />
                  Music Lover
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Novel Enthusiast
                </Badge>
                <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2">
                  <ChefHat className="w-4 h-4 mr-2" />
                  Cooking
                </Badge>
                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2">
                  Fashion & Dance
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 mb-16">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 font-playfair">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                As an upcoming teacher, my primary goal is to inspire and support each student's learning journey.
                Similarly, with Nino Services, I strive to create a safe, inclusive, and engaging shopping environment
                where all customers feel valued and respected. Just as I believe in empowering students, I believe in
                empowering women through fashion, beauty, and self-expression.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center bg-white/80 backdrop-blur-sm border-pink-100 hover-lift">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Quality & Care</h3>
              <p className="text-gray-600">
                Every product is carefully selected and inspected to ensure you receive only the finest quality items.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/80 backdrop-blur-sm border-pink-100 hover-lift">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Education & Growth</h3>
              <p className="text-gray-600">
                We believe in continuous learning and growing together as a community of empowered women.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/80 backdrop-blur-sm border-pink-100 hover-lift">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Inclusivity & Respect</h3>
              <p className="text-gray-600">
                Creating a safe space where every woman feels valued, respected, and celebrated for who she is.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Links */}
        <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-playfair">Connect With Me</h2>
            <div className="flex justify-center gap-6">
              <Link
                href="https://about.me/noluthandoayanda/getstarted/socialbios"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full px-6">
                  <BookOpen className="w-5 h-5 mr-2" />
                  About.me
                </Button>
              </Link>
              <Link href="https://instagram.com/Nino_Dladla" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6">
                  <Instagram className="w-5 h-5 mr-2" />
                  @Nino_Dladla
                </Button>
              </Link>
              <Link href="https://tiktok.com/@ninodladla" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-6">
                  <Music className="w-5 h-5 mr-2" />
                  @ninodladla
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
