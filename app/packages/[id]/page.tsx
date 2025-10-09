import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Plane, Home, Map, Target, Utensils, ArrowLeft, Send, Phone, MessageCircle } from "lucide-react"
import PackageCarousel from "./components/package-carousel"
import {PackageService} from "@/lib/services/packageService";

const ICONS = { Plane, Home, Map, Target, Utensils } as const
type IconKey = keyof typeof ICONS

export default async function PackageDetailPage({ params }: { params: { id: string } }) {
  const packageData = await PackageService.getPackageById(params.id)
  if (!packageData) notFound()

  const images = packageData.images?.length ? packageData.images : ["/placeholder.svg"]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link href="/packages" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Packages
          </Link>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{packageData.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">{packageData.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">{packageData.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 fill-current text-yellow-400" />
                  <span className="font-medium">
                    {packageData.rating} ({packageData.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-bold text-blue-600">{packageData.price}</span>
                {packageData.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">{packageData.originalPrice}</span>
                )}
              </div>
              <p className="text-gray-600 font-medium">per person</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel (client only where needed) */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="relative max-w-5xl mx-auto">
            <PackageCarousel title={packageData.title} images={images} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Main */}
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Trip</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{packageData.description}</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included</h2>
                <div className="space-y-8">
                  {packageData?.included?.map((item: any, i: number) => {
                    const Icon = ICONS[(item.icon as IconKey) || "Plane"] ?? Plane
                    return (
                      <div key={i} className="flex gap-6">
                        <div className="content-center bg-blue-100 p-4 rounded-xl flex-shrink-0">
                          <Icon className="h-7 w-7 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {packageData.sights?.length ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm border">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Sights You'll Never Forget</h2>
                  <div className="space-y-4">
                    {packageData.sights.map((s: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0" />
                        <p className="text-gray-700 font-medium">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Book With Us?</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{packageData.whyBook}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card className="shadow-xl border-0">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="text-4xl font-bold text-blue-600">{packageData.price}</span>
                      {packageData.originalPrice && (
                        <span className="text-2xl text-gray-400 line-through">{packageData.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-gray-600 font-medium">per person</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Duration</span>
                      <span className="font-bold text-gray-900">{packageData.duration}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Category</span>
                      <Badge className="bg-blue-100 text-blue-700 font-medium">{packageData.category}</Badge>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600 font-medium">Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-current text-yellow-400 mr-2" />
                        <span className="font-bold text-gray-900">{packageData.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* actions */}
                  <div className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-200 hover:shadow-lg">
                      Book This Trip
                    </Button>
                    <Link href="/custom-itinerary">
                      <Button
                        variant="outline"
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 font-bold py-4 text-lg rounded-xl transition-all duration-200 bg-transparent"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Customize Trip
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="font-bold text-gray-900 mb-4 text-xl">Need Help Planning?</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our travel experts are here to help you customize this trip to your preferences.
                  </p>
                  <div className="space-y-3">
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-xl bg-transparent"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Us
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full border-green-200 text-green-600 hover:bg-green-50 font-medium py-3 rounded-xl bg-transparent"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
