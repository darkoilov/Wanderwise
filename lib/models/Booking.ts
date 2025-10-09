// import type { ObjectId } from "mongodb"
//
// export interface Booking {
//   _id?: ObjectId
//   userId: ObjectId
//   packageId: number
//   status: "pending" | "confirmed" | "cancelled" | "completed"
//   paymentStatus: "pending" | "paid" | "failed" | "refunded"
//   paymentIntentId?: string
//   customerInfo: {
//     name: string
//     email: string
//     phone: string
//     travelers: number
//     specialRequests?: string
//   }
//   travelDates: {
//     startDate: Date
//     endDate: Date
//   }
//   pricing: {
//     basePrice: number
//     totalPrice: number
//     currency: string
//     discount?: number
//   }
//   createdAt: Date
//   updatedAt: Date
// }
//
// export interface BookingRequest {
//   packageId: number
//   customerInfo: {
//     name: string
//     email: string
//     phone: string
//     travelers: number
//     specialRequests?: string
//   }
//   travelDates: {
//     startDate: string
//     endDate: string
//   }
// }



// lib/models/Booking.ts
import type { ObjectId } from "mongodb"
import type { CurrencyCode } from "./User"

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed"
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

export interface Booking {
    _id?: ObjectId
    userId: ObjectId
    packageId: ObjectId

    status: BookingStatus
    paymentStatus: PaymentStatus

    paymentIntentId?: string
    receiptUrl?: string
    voucherUrl?: string

    customerInfo: {
        name: string
        email: string
        phone: string
        travelers: number
        specialRequests?: string
    }

    travelDates: {
        startDate: Date
        endDate: Date
    }

    pricing: {
        basePrice: number
        totalPrice: number
        currency: CurrencyCode
        discount?: number
    }

    bookingRef: string

    createdAt: Date
    updatedAt: Date
}

export interface BookingRequest {
    packageId: string
    customerInfo: {
        name: string
        email: string
        phone: string
        travelers: number
        specialRequests?: string
    }
    travelDates: {
        startDate: string
        endDate: string
    }
}
