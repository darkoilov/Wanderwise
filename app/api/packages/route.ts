import { type NextRequest, NextResponse } from "next/server"
import { PackageService } from "@/lib/services/packageService"
import type { PackageFilters } from "@/lib/models/Package"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters: PackageFilters = {
      category: searchParams.get("category") || undefined,
      duration: searchParams.get("duration") || undefined,
      priceRange: searchParams.get("priceRange") || undefined,
      search: searchParams.get("search") || undefined,
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
    }

    console.log("[API] GET /api/packages called with filters:", filters)

    const result = await PackageService.getAllPackages(filters)

    if (!result || result.packages.length === 0) {
      console.warn("[API] No packages found for the given filters")
    } else {
      console.log(`[API] Found ${result.packages.length} packages`)
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("GET /api/packages error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch packages",
      },
      { status: 500 },
    )
  }
}



export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.title || !body.location || !body.price) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, location, price",
        },
        { status: 400 },
      )
    }

    const newPackage = await PackageService.createPackage({
      ...body,
      isActive: true,
    })

    return NextResponse.json(
      {
        success: true,
        data: newPackage,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("POST /api/packages error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create package",
      },
      { status: 500 },
    )
  }
}

