import { NextResponse } from "next/server"
import { PackageService } from "@/lib/services/packageService"

export async function GET() {
  try {
    const featuredPackages = await PackageService.getFeaturedPackages(3)

    return NextResponse.json({
      success: true,
      data: featuredPackages,
    })
  } catch (error) {
    console.error("GET /api/packages/featured error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch featured packages",
      },
      { status: 500 },
    )
  }
}
