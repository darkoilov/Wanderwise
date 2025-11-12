import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Heart, Plane, Camera, Globe, Map, Coffee, Compass } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { icon: MapPin, label: "Countries Explored", value: "25+" },
    { icon: Users, label: "Happy Travelers", value: "500+" },
    { icon: Award, label: "Years Traveling", value: "5+" },
    { icon: Heart, label: "Custom Itineraries", value: "200+" },
  ]

  const values = [
    {
      icon: Globe,
      title: "Authentic Experiences",
      description:
          "We don't just chase tourist attractions. We dive into cultures, learn local phrases, and taste traditional dishes.",
    },
    {
      icon: Map,
      title: "Hidden Gems",
      description: "We find those magical places that don't always make it into the guidebooks.",
    },
    {
      icon: Coffee,
      title: "Personal Touch",
      description: "Every journey is tailored to your style, your pace, and your imagination.",
    },
    {
      icon: Compass,
      title: "Insider Knowledge",
      description: "With our personal experience and insider tips, we create experiences that reflect your dreams.",
    },
  ]

  const journey = [
    {
      year: "2018",
      title: "The Beginning",
      description:
          "Started our journey as a young couple from Germany, exploring Europe with backpacks full of dreams.",
    },
    {
      year: "2020",
      title: "Going Global",
      description: "Expanded our travels to Asia, Africa, and South America. Reached 15 countries and counting.",
    },
    {
      year: "2022",
      title: "Sharing Our Passion",
      description: "Built an online community, sharing travel tips, guides, and inspiring others to explore.",
    },
    {
      year: "2024",
      title: "WanderWise Born",
      description: "Turned our passion into a mission - creating custom travel experiences for dreamers like us.",
    },
  ]

  return (
      <div className="min-h-screen">
        {/* Hero Section */}
         <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about2.jpeg"
            alt="Young couple traveling"
            fill
            className="object-cover"
            style={{ objectPosition: "center 44%" }}
            priority
          />
          {/* Smooth overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="mb-6 flex justify-center">
              <Badge className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 px-4 py-1.5">
                Our Story
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
              We're a Young Couple from Germany
            </h1>
            <p className="text-xl md:text-2xl text-white/90 text-balance">
              With a shared passion: traveling the world and discovering its hidden gems
            </p>
          </div>
        </div>
      </section>


        {/* Our Story Section */}
        <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about.jpeg"
                  alt="Young couple traveling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">25+ Countries</p>
                    <p className="text-sm text-gray-600">Explored Together</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Together, we've explored over <strong>25 countries</strong>, always with curiosity in our hearts and
                  backpacks full of dreams.
                </p>
                <p>
                  What started as a hobby soon became something more. We've always loved planning our own trips –{" "}
                  <strong>tailored to our style, our pace, and our imagination</strong>.
                </p>
                <p>
                  We don't just chase tourist attractions. We{" "}
                  <strong>dive into cultures, learn local phrases, taste traditional dishes</strong>, and find those
                  magical places that don't always make it into the guidebooks.
                </p>
                <p>
                  Over time, our journeys inspired not only friends and family, but also our{" "}
                  <strong>growing online community</strong>. That's when we decided to turn our passion into something
                  meaningful – a way to help others experience the world in their own unique way.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/packages">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Compass className="mr-2 h-5 w-5" />
                    Explore Our Packages
                  </Button>
                </Link>
                <Link href="/custom-itinerary">
                  <Button size="lg" variant="outline">
                    <Map className="mr-2 h-5 w-5" />
                    Plan Custom Trip
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Stats Section */}
        <section className="py-10 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey in Numbers</h2>
              <p className="text-xl text-gray-600">The milestones we've achieved together</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                  <div
                      key={index}
                      className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-10 w-10 text-blue-600" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                With our personal experience, insider tips, and love for detail, we create custom travel experiences that
                reflect your dreams, your style, and your rhythm.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                  <Card
                      key={index}
                      className="text-center p-6 hover:shadow-xl transition-shadow border-2 hover:border-blue-200"
                  >
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600">From backpackers to travel curators</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

                {journey.map((milestone, index) => (
                    <div key={index} className="relative mb-12 md:ml-16">
                      {/* Timeline dot */}
                      <div className="absolute -left-[4.5rem] top-2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                      <Card className="hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <Badge className="mb-2 bg-blue-600">{milestone.year}</Badge>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Camera className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-4">Ready to Create Your Own Story?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Let us help you discover the world in your own unique way. Whether it's hidden beaches, mountain trails, or
              vibrant cities – your adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/custom-itinerary">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                  <Map className="mr-2 h-5 w-5" />
                  Plan Your Custom Trip
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 px-8 bg-transparent"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
  )
}
