// !!!!!!!!!!!!!!!!!!!!!!!!!!! DODAVANJE DUMMY DATA VO DATABASE


import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Heart, MapPin, Plane, Star, ArrowRight, Target, Globe, Award } from "lucide-react"
import PackageCard from "@/app/packages/components/PackageCard"
import { PackageService } from "@/lib/services/packageService"
import {DiscountModalWrapper} from "@/components/DiscountModal/DiscountModalWrapper";
import {Card, CardContent} from "@/components/ui/card";

export const revalidate = 300

export default async function HomePage() {
  // Data from DB (fast: direct service calls)
  const featured = await PackageService.getFeaturedPackages(6)
  // “Special deals”: either category "special" or discounted (originalPrice > price)
  const { packages: specialDeals } = await PackageService.getAllPackages({
    page: 1,
    limit: 6,
    // optional: if you store a category "special" or "lastminute", pass it; if not, we filter below:
    // category: "special"
  })

  const specials = specialDeals.filter(p => (p.originalPrice ?? 0) > (p.price ?? 0) || p.category === "special")

  const testimonials = [
    { name: "Sarah Johnson",  location: "New York, USA",   text: "The Bali trip was absolutely magical! Every detail was perfectly planned.", rating: 5, image: "/smiling-woman-profile.png" },
    { name: "Michael Chen",   location: "Toronto, Canada", text: "Best travel experience ever. The custom itinerary was exactly what we needed.", rating: 5, image: "/smiling-man-profile.png" },
    { name: "Emma Rodriguez", location: "Madrid, Spain",   text: "Professional service and unforgettable memories. Highly recommended!", rating: 5, image: "/happy-woman-profile.png" },
  ]

  return (
      <div className="min-h-screen">
        {/* Discount Popup (client) */}
        <DiscountModalWrapper />

        {/* Hero Video Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            {/*<video autoPlay loop muted playsInline className="w-full h-full object-cover">*/}
            {/*  <source src="/hero-destinations-video.mp4" type="video/mp4" />*/}
            {/*</video>*/}
            <div className="absolute inset-0 z-0">
              <Image src="/tropical-sunset-paradise.png" alt="Travel destination" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Your
              <span className="block text-amber-400">Dream Destination</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Personalized travel experiences crafted just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 text-lg">
                  <Plane className="mr-2 h-5 w-5" />
                  Explore Destinations
                </Button>
              </Link>
              <Link href="/custom-itinerary">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent">
                  Design Your Travel
                </Button>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Packages */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Travel Packages</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked destinations and carefully curated experiences for the modern traveler
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((p) => (
                  <PackageCard key={String(p._id)} pkg={{ ...p, _id: String(p._id) }} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/packages">
                <Button variant="outline" size="lg" className="px-8 bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50">
                  View All Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Special Deals */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-red-500 text-white mb-4 px-4 py-2 text-lg">Limited Time Offers</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Deals</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Exclusive discounts on premium travel packages - Book now before they're gone!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specials.map((p, i) => (
                  <PackageCard key={i} pkg={p} variant="deal" />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/last-minute">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8">
                  View All Last Minute Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-12">
                To inspire and enable meaningful travel experiences that create lasting connections between travelers and
                the destinations they visit, while supporting local communities and promoting sustainable tourism practices.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Personalized Experiences</h3>
                  <p className="text-gray-600 text-sm">Every journey tailored to your unique preferences and dreams</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Sustainable Tourism</h3>
                  <p className="text-gray-600 text-sm">Supporting local communities and protecting our planet</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                  <p className="text-gray-600 text-sm">Years of experience creating unforgettable adventures</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Travel With Us */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Travel With Us</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We create unforgettable travel experiences with personalized service and attention to detail
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <MapPin className="h-8 w-8 text-blue-600" />, title: "Expert Local Knowledge", text: "Insider access to hidden gems and authentic experiences you won't find elsewhere" },
                { icon: <Heart className="h-8 w-8 text-green-600" />, title: "Personalized Service", text: "Every itinerary is crafted specifically for your interests, budget, and travel style" },
                { icon: <Camera className="h-8 w-8 text-purple-600" />, title: "Unforgettable Memories", text: "We focus on creating moments that last long after you return home" },
              ].map((f, i) => (
                  <div key={i} className="text-center bg-white p-8 rounded-xl shadow-sm">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {f.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                    <p className="text-gray-600">{f.text}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Inspirations (blog placeholders) */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Travel Inspiration</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Stories, tips, and guides from our latest adventures</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="overflow-hidden hover:shadow-xl transition-shadow rounded-xl border bg-white">
                    <div className="relative h-48">
                      <Image
                          src={`/generic-placeholder-graphic.png?height=200&width=400`}
                          alt="Blog post"
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3">Travel Tips</Badge>
                      <h3 className="text-xl font-semibold mb-2">10 Hidden Gems in Europe</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Discover the secret spots that most tourists never see...
                      </p>
                      <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Read More →
                      </Link>
                    </div>
                  </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="outline" size="lg" className="px-8 bg-transparent">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
              <p className="text-xl text-gray-600">Real experiences from real travelers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>

                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                        ))}
                      </div>

                      <p className="text-gray-700 italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us create a personalized travel experience that matches your dreams and exceeds your expectations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/custom-itinerary">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">Plan Custom Trip</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 bg-transparent">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
  )
}
