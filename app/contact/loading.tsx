import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Phone, Mail, Clock, MessageCircle, Globe } from 'lucide-react'

export default function ContactLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl mb-8 text-blue-100">
              Ready to plan your next adventure? We're here to help make your travel dreams come true
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
              <p className="text-xl text-gray-600">Choose the best way to reach us</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[MapPin, Phone, Mail, MessageCircle].map((Icon, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <Skeleton className="h-5 w-24 mx-auto mb-3" />
                    <div className="space-y-1 mb-4">
                      <Skeleton className="h-4 w-32 mx-auto" />
                      <Skeleton className="h-4 w-28 mx-auto" />
                      <Skeleton className="h-4 w-36 mx-auto" />
                    </div>
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <Skeleton className="h-4 w-80" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                    
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                    
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours & Additional Info */}
              <div className="space-y-6">
                {/* Office Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Follow Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-64 mb-4" />
                    <div className="flex space-x-4">
                      <Skeleton className="h-8 flex-1" />
                      <Skeleton className="h-8 flex-1" />
                    </div>
                    <div className="flex space-x-4 mt-2">
                      <Skeleton className="h-8 flex-1" />
                      <Skeleton className="h-8 flex-1" />
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Emergency Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-64 mb-2" />
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Quick answers to common questions</p>
            </div>
            
            <div className="space-y-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <Skeleton className="h-5 w-80 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Skeleton className="h-4 w-48 mx-auto mb-4" />
              <Skeleton className="h-10 w-32 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-xl text-gray-600 mb-8">Located in the heart of New York City</p>
            
            <Skeleton className="w-full h-64 rounded-lg mb-6" />
            
            <Skeleton className="h-10 w-32 mx-auto" />
          </div>
        </div>
      </section>
    </div>
  )
}
