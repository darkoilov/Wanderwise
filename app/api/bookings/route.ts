import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { BookingService } from "@/lib/services/bookingService"
import { PackageService } from "@/lib/services/packageService"
import type { BookingRequest } from "@/lib/models/Booking"

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

    const body: BookingRequest = await request.json()

    // Validate required fields
    if (!body.packageId || !body.customerInfo || !body.travelDates) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required booking information",
        },
        { status: 400 },
      )
    }

    // Verify package exists
    const package_ = await PackageService.getPackageById(body.packageId)
    if (!package_) {
      return NextResponse.json(
        {
          success: false,
          error: "Package not found",
        },
        { status: 404 },
      )
    }

    // Create booking
    const booking = await BookingService.createBooking({
      userId: session.user.id,
      packageId: body.packageId,
      customerInfo: body.customerInfo,
      travelDates: {
        startDate: new Date(body.travelDates.startDate),
        endDate: new Date(body.travelDates.endDate),
      },
      pricing: {
        basePrice: Number.parseFloat(package_.price.replace(/[€,]/g, "")),
        totalPrice: Number.parseFloat(package_.price.replace(/[€,]/g, "")) * body.customerInfo.travelers,
        currency: "EUR",
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: booking,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("POST /api/bookings error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create booking",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
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

    const bookings = await BookingService.getUserBookings(session.user.id)

    return NextResponse.json({
      success: true,
      data: bookings,
    })
  } catch (error) {
    console.error("GET /api/bookings error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch bookings",
      },
      { status: 500 },
    )
  }
}
