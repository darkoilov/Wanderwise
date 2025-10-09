import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Stripe from "stripe"
import { BookingService } from "@/lib/services/bookingService"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 },
      )
    }

    const { bookingId } = await request.json()

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking ID is required",
        },
        { status: 400 },
      )
    }

    // Get booking details
    const booking = await BookingService.getBookingById(bookingId)

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        { status: 404 },
      )
    }

    // Verify booking belongs to user
    if (booking.userId.toString() !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized access to booking",
        },
        { status: 403 },
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.pricing.totalPrice * 100), // Convert to cents
      currency: booking.pricing.currency.toLowerCase(),
      metadata: {
        bookingId: booking._id!.toString(),
        userId: session.user.id,
        packageId: booking.packageId.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Update booking with payment intent ID
    await BookingService.updateBooking(bookingId, {
      paymentIntentId: paymentIntent.id,
    })

    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    })
  } catch (error) {
    console.error("POST /api/stripe/create-payment-intent error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create payment intent",
      },
      { status: 500 },
    )
  }
}
