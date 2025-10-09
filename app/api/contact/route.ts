import { type NextRequest, NextResponse } from "next/server"
import { ContactService } from "@/lib/services/contactService"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: name, email, subject, message",
        },
        { status: 400 },
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address",
        },
        { status: 400 },
      )
    }

    // Save contact message
    const contact = await ContactService.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      subject: body.subject,
      message: body.message,
      inquiryType: body.inquiryType || "general",
    })

    // Send email notification (optional)
    try {
      await ContactService.sendContactNotification(contact)
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact message sent successfully",
        data: { id: contact._id },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("POST /api/contact error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send contact message",
      },
      { status: 500 },
    )
  }
}
