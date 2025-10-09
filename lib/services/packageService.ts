import { getDatabase } from "@/lib/mongodb"
import type { TravelPackage, PackageFilters, PackageResponse } from "@/lib/models/Package"
import { ObjectId } from "mongodb"

export class PackageService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<TravelPackage>("packages")
  }

  static async getAllPackages(filters: PackageFilters = {}): Promise<PackageResponse> {
    try {
      const collection = await this.getCollection()
      const { category, duration, priceRange, search, page = 1, limit = 10 } = filters

      const query: any = {}

      if (category && category !== "all") {
        query.category = { $regex: new RegExp(category, "i") }
      }

      if (search) {
        query.$or = [
          { title: { $regex: new RegExp(search, "i") } },
          { location: { $regex: new RegExp(search, "i") } },
          { description: { $regex: new RegExp(search, "i") } },
        ]
      }

      if (duration && duration !== "all") {
        switch (duration) {
          case "short":
            query.duration = { $regex: /^[1-7]\s*days?/i }
            break
          case "medium":
            query.duration = { $regex: /^([8-9]|1[0-4])\s*days?/i }
            break
          case "long":
            query.duration = { $regex: /(1[5-9]|[2-9]\d)\s*days?/i }
            break
        }
      }

      if (priceRange && priceRange !== "all") {
        const priceQuery: any = {}
        switch (priceRange) {
          case "budget":
            priceQuery.$lt = 1500
            break
          case "mid":
            priceQuery.$gte = 1500
            priceQuery.$lte = 2500
            break
          case "luxury":
            priceQuery.$gt = 2500
            break
        }
        if (Object.keys(priceQuery).length > 0) {
          query.priceNumeric = priceQuery
        }
      }

      // Execute query with pagination
      const skip = (page - 1) * limit
      const [packages, total] = await Promise.all([
        collection.find(query).sort({ rating: -1, createdAt: -1 }).skip(skip).limit(limit).toArray(),
        collection.countDocuments(query),
      ])

      return {
        packages,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      }

      // Mock implementation for v0 preview
      // const { page = 1, limit = 10 } = filters

      // return {
      //   packages: mockPackages,
      //   total: mockPackages.length,
      //   page,
      //   totalPages: Math.ceil(mockPackages.length / limit),
      // }
    } catch (error) {
      console.error("Error fetching packages:", error)
      throw new Error("Failed to fetch packages")
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
        .find()
        .sort({ rating: -1, reviews: -1 })
        .limit(limit)
        .toArray()
      return packages

      // Mock implementation
      // return mockPackages.slice(0, limit)
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

    console.log("[PackageService] Inserting package:", newPackage.title)

    const result = await collection.insertOne(newPackage)

    console.log("[PackageService] Inserted package ID:", result.insertedId.toHexString())

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









//
//
// // lib/services/PublicPackageService.ts
// import { ObjectId } from "mongodb"
// import {
//   getPackageCollection,
//   ensurePackageIndexes,
//   type TravelPackage,
//   type PackageFilters,
//   type PackageResponse,
// } from "@/lib/models/Package"
//
// export class PublicPackageService {
//   private static async col() {
//     await ensurePackageIndexes()
//     return getPackageCollection()
//   }
//
//   static async getAllPackages(filters: PackageFilters = {}): Promise<PackageResponse> {
//     const collection = await this.col()
//     const { category, duration, priceRange, search, page = 1, limit = 10 } = filters
//
//     const query: Record<string, any> = { isVisible: true }
//
//     if (category && category !== "all") query.category = category
//     if (search) query.$text = { $search: search }
//     if (duration && duration !== "all") {
//       if (duration === "short") query.duration = { $regex: /^[1-7]\s*days?/i }
//       if (duration === "medium") query.duration = { $regex: /^([8-9]|1[0-4])\s*days?/i }
//       if (duration === "long") query.duration = { $regex: /(1[5-9]|[2-9]\d)\s*days?/i }
//     }
//     if (priceRange && priceRange !== "all") {
//       const pq: any = {}
//       if (priceRange === "budget") pq.$lt = 1500
//       if (priceRange === "mid") { pq.$gte = 1500; pq.$lte = 2500 }
//       if (priceRange === "luxury") pq.$gt = 2500
//       if (Object.keys(pq).length) query.price = pq
//     }
//
//     const skip = (page - 1) * limit
//     const [packages, total] = await Promise.all([
//       collection
//           .find(query)
//           .sort({ order: 1, rating: -1, createdAt: -1 })
//           .skip(skip)
//           .limit(limit)
//           .toArray(),
//       collection.countDocuments(query),
//     ])
//
//     return { packages, total, page, totalPages: Math.ceil(total / limit) }
//   }
//
//   static async getPackageById(id: string): Promise<TravelPackage | null> {
//     const collection = await this.col()
//     return collection.findOne({ _id: new ObjectId(id), isVisible: true })
//   }
//
//   static async getPackageBySlug(slug: string): Promise<TravelPackage | null> {
//     const collection = await this.col()
//     return collection.findOne({ slug, isVisible: true })
//   }
//
//   static async getFeaturedPackages(limit = 3): Promise<TravelPackage[]> {
//     const collection = await this.col()
//     return collection
//         .find({ isVisible: true })
//         .sort({ rating: -1, reviews: -1, createdAt: -1 })
//         .limit(limit)
//         .toArray()
//   }
// }
