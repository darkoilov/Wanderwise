import { getDatabase } from "@/lib/mongodb"
import type { TravelPackage, PackageFilters, PackageResponse } from "@/lib/models/Package"
import { ObjectId } from "mongodb"

const PRICE_RANGE: Record<Exclude<NonNullable<PackageFilters["priceRange"]>, "all">, any> = {
  budget: { $lt: 1500 },
  mid:    { $gte: 1500, $lte: 2500 },
  luxury: { $gt: 2500 },
}

/** Build a Mongo $expr that checks overlap of the package's duration string vs. a bucket */
function buildDurationOverlapExpr(bucket: "short" | "medium" | "long") {
  const A = bucket === "short"  ? 1  : bucket === "medium" ? 8  : 15
  const B = bucket === "short"  ? 7  : bucket === "medium" ? 14 : null

  const regexFind = {
    $regexFind: {
      input: "$duration",
      // 2 captures: 1) start, 2) optional end
      regex: /(\d+)(?:\s*-\s*(\d+))?\s*(?:day|days)?/i,
    },
  }

  return {
    $expr: {
      $let: {
        vars: { m: regexFind },
        in: {
          $cond: [
            { $not: ["$$m"] },
            false,
            {
              $let: {
                vars: {
                  start:  { $toInt: { $arrayElemAt: ["$$m.captures", 0] } },
                  endStr: { $arrayElemAt: ["$$m.captures", 1] },
                },
                in: {
                  $let: {
                    vars: {
                      end: { $ifNull: [{ $toInt: "$$endStr" }, "$$start"] },
                    },
                    in:
                    // long: [15, +∞) → overlap if end >= 15
                        B == null
                            ? { $gte: ["$$end", A] }
                            // finite bucket [A, B]: overlap if end >= A AND start <= B
                            : { $and: [{ $gte: ["$$end", A] }, { $lte: ["$$start", B] }] }
                  },
                },
              },
            },
          ],
        },
      },
    },
  }
}

function andPush(query: any, cond: any) {
  if (!cond) return
  if (!query.$and) query.$and = []
  query.$and.push(cond)
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
        { title:       { $regex: new RegExp(search, "i") } },
        { location:    { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ]
    }

    if (duration && duration !== "all") {
      andPush(query, buildDurationOverlapExpr(duration))
    }

    if (priceRange && priceRange !== "all") {
      query.price = PRICE_RANGE[priceRange]
    }

    const skip = Math.max(0, (page - 1) * limit)

    const [packages, total] = await Promise.all([
      collection
          .find(query)
          .sort({ rating: -1, createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray(),
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

    } catch (error) {
      console.error("Error updating package:", error)
      throw new Error("Failed to update package")
    }
  }
}