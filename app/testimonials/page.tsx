import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, MapPin, Calendar, Users, Heart, Camera, Plane } from 'lucide-react'
import Image from "next/image"

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      trip: "Bali Paradise Escape",
      rating: 5,
      date: "March 2024",
      image: "/smiling-woman-profile.png",
      text: "The Bali trip was absolutely magical! Every detail was perfectly planned, from the stunning beachfront resort to the cultural temple tours. Sarah's local connections made all the difference - we experienced authentic Balinese culture that most tourists never see. The spa treatments were heavenly, and the sunset dinner on the beach was unforgettable. I can't wait to book my next adventure with WanderWise!",
      highlights: ["Perfect planning", "Authentic experiences", "Local connections", "Luxury accommodations"]
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      trip: "European Grand Tour",
      rating: 5,
      date: "February 2024",
      image: "/smiling-man-profile.png",
      text: "Best travel experience ever! The custom European itinerary was exactly what we needed. The high-speed train connections were seamless, and each city offered unique experiences. From the Louvre's hidden gems to Rome's underground catacombs, every day brought new discoveries. The local food tours were incredible - we ate at places we never would have found on our own. Worth every penny!",
      highlights: ["Seamless logistics", "Hidden gems", "Food experiences", "Expert guidance"]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      trip: "Safari Adventure",
      rating: 5,
      date: "January 2024",
      image: "/happy-woman-profile.png",
      text: "Professional service and unforgettable memories! The Kenya safari exceeded all expectations. We witnessed the Great Migration, saw all of the Big Five, and stayed in luxury camps that felt like a dream. Our guide was incredibly knowledgeable about wildlife behavior and photography. The sunset game drives and traditional Maasai village visit were life-changing experiences. Highly recommended!",
      highlights: ["Wildlife expertise", "Luxury camps", "Photography guidance", "Cultural immersion"]
    },
    {
      id: 4,
      name: "David Kim",
      location: "Seoul, South Korea",
      trip: "Japan Cultural Journey",
      rating: 5,
      date: "December 2023",
      image: "/placeholder.svg?height=60&width=60",
      text: "An incredible journey through Japan's culture and traditions. The ryokan stays were authentic and peaceful, the tea ceremony was meditative, and the cherry blossom viewing spots were perfectly timed. The bullet train experiences and local food markets opened our eyes to modern Japanese life. Sarah's attention to detail and cultural insights made this trip truly special.",
      highlights: ["Cultural authenticity", "Perfect timing", "Local insights", "Traditional experiences"]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      location: "London, UK",
      trip: "Greek Island Hopping",
      rating: 5,
      date: "November 2023",
      image: "/placeholder.svg?height=60&width=60",
      text: "The Greek islands were a dream come true! Each island had its own character - Santorini's sunsets, Mykonos' energy, and Crete's history. The boutique hotels were perfectly chosen, and the ferry connections worked flawlessly. The wine tastings and cooking classes added such a personal touch. We felt like VIPs everywhere we went!",
      highlights: ["Island diversity", "Boutique accommodations", "Culinary experiences", "VIP treatment"]
    },
    {
      id: 6,
      name: "James Wilson",
      location: "Sydney, Australia",
      trip: "Patagonia Trekking",
      rating: 5,
      date: "October 2023",
      image: "/placeholder.svg?height=60&width=60",
      text: "The most challenging and rewarding trip of my life! The Patagonia landscapes were breathtaking - glaciers, mountains, and wildlife beyond imagination. Our guides were experienced mountaineers who kept us safe while pushing our limits. The mountain lodges provided perfect comfort after long hiking days. This adventure changed my perspective on what I'm capable of achieving.",
      highlights: ["Breathtaking landscapes", "Expert guides", "Personal growth", "Perfect logistics"]
    }
  ]

  const stats = [
    { icon: Users, label: "Happy Travelers", value: "2,500+" },
    { icon: Star, label: "Average Rating", value: "4.9/5" },
    { icon: MapPin, label: "Destinations", value: "150+" },
    { icon: Heart, label: "Repeat Customers", value: "85%" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">What Our Travelers Say</h1>
            <p className="text-xl mb-8 text-blue-100">
              Real stories from real travelers who trusted us with their dream adventures
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Traveler Stories</h2>
              <p className="text-xl text-gray-600">
                Discover why thousands of travelers choose WanderWise for their adventures
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {testimonial.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            {testimonial.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex mb-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                          ))}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.trip}
                        </Badge>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative mb-6">
                      <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                      <p className="text-gray-700 italic pl-6 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {testimonial.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Video Stories</h2>
            <p className="text-xl text-gray-600 mb-12">
              Watch our travelers share their incredible experiences
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Sarah's Bali Adventure"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Plane className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Sarah's Bali Adventure</h3>
                  <p className="text-sm opacity-90">3:24 minutes</p>
                </div>
              </div>
              
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Michael's European Journey"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Camera className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">Michael's European Journey</h3>
                  <p className="text-sm opacity-90">4:12 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Create Your Own Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers and let us create an unforgettable adventure for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Plan Your Trip
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
              View Packages
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
