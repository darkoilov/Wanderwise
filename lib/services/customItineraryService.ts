import { getDatabase } from "@/lib/mongodb"
import type { ObjectId } from "mongodb"

export interface CustomItinerary {
  _id?: ObjectId
  customerInfo: {
    name: string
    email: string
    phone: string
    travelers: number
  }
  travelDetails: {
    destinations: string
    startDate?: Date
    endDate?: Date
    budget: string
    accommodation?: string
    travelStyle?: string
  }
  interests: string[]
  specialRequests: string
  status: "new" | "in_progress" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export class CustomItineraryService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<CustomItinerary>("custom_itineraries")
  }

  static async createItineraryRequest(
    itineraryData: Omit<CustomItinerary, "_id" | "status" | "createdAt" | "updatedAt">,
  ): Promise<CustomItinerary> {
    try {
      const collection = await this.getCollection()
      const now = new Date()

      const newItinerary: CustomItinerary = {
        ...itineraryData,
        status: "new",
        createdAt: now,
        updatedAt: now,
      }

      const result = await collection.insertOne(newItinerary)
      return { ...newItinerary, _id: result.insertedId }
    } catch (error) {
      console.error("Error creating custom itinerary:", error)
      throw new Error("Failed to create custom itinerary")
    }
  }

  static async sendItineraryConfirmation(itinerary: CustomItinerary): Promise<void> {
    // Email confirmation logic would go here
    console.log("Custom itinerary request received:", {
      name: itinerary.customerInfo.name,
      email: itinerary.customerInfo.email,
      destinations: itinerary.travelDetails.destinations,
    })
  }
}
