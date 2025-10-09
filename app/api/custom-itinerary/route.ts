import { type NextRequest, NextResponse } from "next/server"
import { CustomItineraryService } from "@/lib/services/customItineraryService"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.destinations || !body.travelers || !body.budget) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Create custom itinerary request
    const itinerary = await CustomItineraryService.createItineraryRequest({
      customerInfo: {
        name: body.name,
        email: body.email,
        phone: body.phone || "",
        travelers: Number.parseInt(body.travelers),
      },
      travelDetails: {
        destinations: body.destinations,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        budget: body.budget,
        accommodation: body.accommodation,
        travelStyle: body.travelStyle,
      },
      interests: body.selectedInterests || [],
      specialRequests: body.specialRequests || "",
    })

    // Send confirmation email
    try {
      await CustomItineraryService.sendItineraryConfirmation(itinerary)
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Custom itinerary request submitted successfully",
        data: { id: itinerary._id },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("POST /api/custom-itinerary error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit itinerary request",
      },
      { status: 500 },
    )
  }
}
