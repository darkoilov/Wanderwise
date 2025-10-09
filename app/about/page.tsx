import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Heart, Plane, Camera, Globe } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Travelers", value: "2,500+" },
    { icon: MapPin, label: "Destinations", value: "150+" },
    { icon: Award, label: "Years Experience", value: "8+" },
    { icon: Heart, label: "5-Star Reviews", value: "98%" },
  ]

  const values = [
    {
      icon: Globe,
      title: "Authentic Experiences",
      description: "We believe in connecting you with the real culture and spirit of each destination."
    },
    {
      icon: Heart,
      title: "Personalized Service",
      description: "Every journey is crafted specifically for your interests, preferences, and travel style."
    },
    {
      icon: Award,
      title: "Expert Knowledge",
      description: "Our team of travel experts brings years of experience and insider knowledge to every trip."
    },
    {
      icon: Camera,
      title: "Memorable Moments",
      description: "We focus on creating experiences that will become your most treasured memories."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About WanderWise</h1>
            <p className="text-xl mb-8 text-blue-100">
              Passionate about creating extraordinary travel experiences that connect you with the world's most amazing destinations and cultures.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">My Travel Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Hi, I'm Sarah Mitchell, founder of WanderWise. My love affair with travel began during a solo backpacking trip through Southeast Asia in 2015. What started as a personal adventure transformed into a deep passion for helping others discover the transformative power of travel.
                </p>
                <p>
                  Over the past 8 years, I've explored over 60 countries, lived with local families, learned traditional crafts, and discovered hidden gems that most tourists never see. Each journey taught me that the best travel experiences happen when you connect authentically with local cultures and step outside your comfort zone.
                </p>
                <p>
                  In 2018, I founded WanderWise with a simple mission: to create personalized travel experiences that go beyond typical tourist attractions. We focus on authentic connections, sustainable tourism, and creating memories that last a lifetime.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Let's Plan Your Journey
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder-u5rfc.png"
                alt="Sarah Mitchell - Travel Expert"
                width={500}
                height={600}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Plane className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Mitchell</p>
                    <p className="text-sm text-gray-600">Travel Expert & Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Numbers that reflect our commitment to exceptional travel experiences</p>
          </div>
          
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

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every experience we create
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 mb-8">
              To inspire and enable meaningful travel experiences that create lasting connections between travelers and the destinations they visit, while supporting local communities and promoting sustainable tourism practices.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Sustainable Tourism</h3>
                <p className="text-gray-600 text-sm">Supporting local communities and protecting the environments we visit</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Cultural Connection</h3>
                <p className="text-gray-600 text-sm">Facilitating authentic interactions with local cultures and traditions</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Personal Growth</h3>
                <p className="text-gray-600 text-sm">Creating transformative experiences that broaden perspectives and inspire growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's create a personalized travel experience that matches your dreams and exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/custom-itinerary">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Plan Your Trip
              </Button>
            </Link>
            <Link href="/packages">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
