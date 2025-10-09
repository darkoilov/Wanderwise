"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import StripeCheckout from "@/components/stripe-checkout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Booking {
  _id: string
  packageId: number
  customerInfo: {
    name: string
    email: string
    travelers: number
  }
  travelDates: {
    startDate: string
    endDate: string
  }
  pricing: {
    basePrice: number
    totalPrice: number
    currency: string
  }
  packageDetails?: {
    title: string
    location: string
    image: string
  }
}

export default function CheckoutPage({ params }: { params: { bookingId: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated") {
      fetchBooking()
    }
  }, [status, params.bookingId])

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${params.bookingId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch booking")
      }

      setBooking(data.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    router.push(`/booking-confirmation/${params.bookingId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
            <p className="text-gray-600 mb-4">{error || "The booking you're looking for doesn't exist."}</p>
            <Link href="/packages" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Packages
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/packages" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Packages
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-gray-600 mt-2">Review your details and complete payment</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {booking.packageDetails && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{booking.packageDetails.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {booking.packageDetails.location}
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Traveler</span>
                      <span className="font-medium">{booking.customerInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium">{booking.customerInfo.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of Travelers</span>
                      <span className="font-medium">{booking.customerInfo.travelers}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">Travel Dates</span>
                    </div>
                    <div className="pl-6">
                      <p className="text-sm text-gray-600">
                        {new Date(booking.travelDates.startDate).toLocaleDateString()} -{" "}
                        {new Date(booking.travelDates.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Price</span>
                      <span className="font-medium">
                        {booking.pricing.currency} {booking.pricing.basePrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travelers</span>
                      <span className="font-medium">× {booking.customerInfo.travelers}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        {booking.pricing.currency} {booking.pricing.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div>
              <StripeCheckout
                bookingId={booking._id}
                amount={booking.pricing.totalPrice}
                currency={booking.pricing.currency}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
