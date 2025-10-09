import { type NextRequest, NextResponse } from "next/server"
import { PackageService } from "@/lib/services/packageService"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const packageId = params.id
    const package_ = await PackageService.getPackageById(packageId)

    if (!package_) {
      return NextResponse.json(
        {
          success: false,
          error: "Package not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: package_,
    })
  } catch (error) {
    console.error(`GET /api/packages/${params.id} error:`, error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch package",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const packageId = params.id 
    const body = await request.json()

    const updated = await PackageService.updatePackage(packageId, body)

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: "Package not found or no changes made",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Package updated successfully",
    })
  } catch (error) {
    console.error(`PUT /api/packages/${params.id} error:`, error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update package",
      },
      { status: 500 },
    )
  }
}
