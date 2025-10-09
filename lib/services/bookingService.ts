// import { getDatabase } from "@/lib/mongodb"
// import type { Booking } from "@/lib/models/Booking"
// import { ObjectId } from "mongodb"
//
// export class BookingService {
//   private static async getCollection() {
//     const db = await getDatabase()
//     return db.collection<Booking>("bookings")
//   }
//
//   static async createBooking(
//     bookingData: Omit<Booking, "_id" | "createdAt" | "updatedAt" | "status" | "paymentStatus">,
//   ): Promise<Booking> {
//     try {
//       const collection = await this.getCollection()
//       const now = new Date()
//
//       const newBooking: Booking = {
//         ...bookingData,
//         userId: new ObjectId(bookingData.userId),
//         status: "pending",
//         paymentStatus: "pending",
//         createdAt: now,
//         updatedAt: now,
//       }
//
//       const result = await collection.insertOne(newBooking)
//       return { ...newBooking, _id: result.insertedId }
//     } catch (error) {
//       console.error("Error creating booking:", error)
//       throw new Error("Failed to create booking")
//     }
//   }
//
//   static async getBookingById(id: string): Promise<Booking | null> {
//     try {
//       const collection = await this.getCollection()
//       const booking = await collection.findOne({ _id: new ObjectId(id) })
//       return booking
//     } catch (error) {
//       console.error("Error fetching booking:", error)
//       throw new Error("Failed to fetch booking")
//     }
//   }
//
//   static async getUserBookings(userId: string): Promise<Booking[]> {
//     try {
//       const collection = await this.getCollection()
//       const bookings = await collection
//         .find({ userId: new ObjectId(userId) })
//         .sort({ createdAt: -1 })
//         .toArray()
//       return bookings
//     } catch (error) {
//       console.error("Error fetching user bookings:", error)
//       throw new Error("Failed to fetch bookings")
//     }
//   }
//
//   static async updateBooking(id: string, updates: Partial<Booking>): Promise<boolean> {
//     try {
//       const collection = await this.getCollection()
//       const result = await collection.updateOne(
//         { _id: new ObjectId(id) },
//         {
//           $set: {
//             ...updates,
//             updatedAt: new Date(),
//           },
//         },
//       )
//
//       return result.modifiedCount > 0
//     } catch (error) {
//       console.error("Error updating booking:", error)
//       throw new Error("Failed to update booking")
//     }
//   }
// }



// lib/services/bookingService.ts
import { getDatabase } from "@/lib/mongodb"
import type { Booking } from "@/lib/models/Booking"
import { ObjectId } from "mongodb"

function toObjectId(id: string | ObjectId) {
  return typeof id === "string" ? new ObjectId(id) : id
}

function makeBookingRef() {
  const y = new Date().getFullYear()
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `WW-${y}-${suffix}`
}

export class BookingService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Booking>("bookings")
  }

  static async createBooking(
      bookingData: Omit<Booking, "_id" | "createdAt" | "updatedAt" | "status" | "paymentStatus" | "bookingRef">,
  ): Promise<Booking> {
    const col = await this.getCollection()
    const now = new Date()

    const newBooking: Booking = {
      ...bookingData,
      userId: toObjectId(bookingData.userId),
      packageId: toObjectId(bookingData.packageId),
      status: "pending",
      paymentStatus: "pending",
      bookingRef: makeBookingRef(),
      createdAt: now,
      updatedAt: now,
    }

    const result = await col.insertOne(newBooking)
    return { ...newBooking, _id: result.insertedId }
  }

  static async getBookingById(id: string): Promise<Booking | null> {
    const col = await this.getCollection()
    return col.findOne({ _id: new ObjectId(id) })
  }

  static async getUserBookings(userId: string, status?: Booking["status"]): Promise<Booking[]> {
    const col = await this.getCollection()
    const query: any = { userId: new ObjectId(userId) }
    if (status) query.status = status
    return col.find(query).sort({ createdAt: -1 }).toArray()
  }

  static async updateBooking(id: string, updates: Partial<Booking>): Promise<boolean> {
    const col = await this.getCollection()
    const { _id, userId, packageId, ...safe } = updates as any
    const res = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...safe, updatedAt: new Date() } },
    )
    return res.modifiedCount > 0
  }

  static async markPaid(id: string, paymentIntentId: string, receiptUrl?: string): Promise<boolean> {
    const col = await this.getCollection()
    const res = await col.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            paymentStatus: "paid",
            status: "confirmed",
            paymentIntentId,
            receiptUrl,
            updatedAt: new Date(),
          },
        },
    )
    return res.modifiedCount > 0
  }
}
