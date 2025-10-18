import { getDatabase } from "@/lib/mongodb"
import type { TravelPackage, PackageFilters, PackageResponse } from "@/lib/models/Package"
import { ObjectId } from "mongodb"

  const DURATION_REGEX: Record<NonNullable<Exclude<PackageFilters["duration"], "all">>, RegExp> = {
    short:  /^\s*(?:[1-7])\s*days?/i,
    medium: /^\s*(?:[8-9]|1[0-4])\s*days?/i,
    long:   /^\s*(?:1[5-9]|[2-9]\d)\s*days?/i,
  }

  const PRICE_RANGE: Record<NonNullable<Exclude<PackageFilters["priceRange"], "all">>, any> = {
    budget: { $lt: 1500 },
    mid:    { $gte: 1500, $lte: 2500 },
    luxury: { $gt: 2500 },
  }

  export class PackageService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<TravelPackage>("packages")
  }

  static async getAllPackages(filters: PackageFilters = {}): Promise<PackageResponse> {
    const collection = await this.getCollection()
    const {
      category,
      duration,
      priceRange,
      search,
      isSeasonal,
      page = 1,
      limit = 10,
    } = filters

    const query: Record<string, any> = { isVisible: true }

    if (typeof isSeasonal === "boolean") query.isSeasonal = isSeasonal
    if (category && category !== "all") query.category = category

    if (search?.trim()) {
      query.$or = [
        { title:      { $regex: new RegExp(search, "i") } },
        { location:   { $regex: new RegExp(search, "i") } },
        { description:{ $regex: new RegExp(search, "i") } },
      ]
    }

    if (duration && duration !== "all") {
      query.duration = DURATION_REGEX[duration]
    }

    if (priceRange && priceRange !== "all") {
      query.price = PRICE_RANGE[priceRange]
    }

    const skip = Math.max(0, (page - 1) * limit)

    const [packages, total] = await Promise.all([
      collection.find(query).sort({ rating: -1, createdAt: -1 }).skip(skip).limit(limit).toArray(),
      collection.countDocuments(query),
    ])

    return {
      packages,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    }
  }


  static async getPackageById(id: string): Promise<TravelPackage | null> {
    try {
      const collection = await this.getCollection()
      const objectId = new ObjectId(id)

      const package_ = await collection.findOne({ _id: objectId })
      return package_

      // Mock implementation
      // return mockPackages.find(pkg => pkg.id === id) || null
    } catch (error) {
      console.error("Error fetching package:", error)
      throw new Error("Failed to fetch package")
    }
  }

  static async getFeaturedPackages(limit = 3): Promise<TravelPackage[]> {
    try {
      const collection = await this.getCollection()
      const packages = await collection
        .find({category: "featured"})
        .sort({ rating: -1, reviews: -1 })
        .limit(limit)
        .toArray()
      return packages

    } catch (error) {
      console.error("Error fetching featured packages:", error)
      throw new Error("Failed to fetch featured packages")
    }
  }

  static async createPackage(
  packageData: Omit<TravelPackage, "_id" | "createdAt" | "updatedAt">,
): Promise<TravelPackage> {
  try {
    const collection = await this.getCollection()
    const now = new Date()

    const newPackage: TravelPackage = {
      ...packageData,
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(newPackage)

    return { ...newPackage, _id: result.insertedId }
  } catch (error) {
    console.error("Error creating package:", error)
    throw new Error("Failed to create package")
  }
}


  static async updatePackage(id: number, updates: Partial<TravelPackage>): Promise<boolean> {
    try {
      const collection = await this.getCollection()
      const result = await collection.updateOne(
        { id },
        {
          $set: {
            ...updates,
            updatedAt: new Date(),
          },
        },
      )
      return result.modifiedCount > 0

      // Mock implementation
      // return true
    } catch (error) {
      console.error("Error updating package:", error)
      throw new Error("Failed to update package")
    }
  }
}
