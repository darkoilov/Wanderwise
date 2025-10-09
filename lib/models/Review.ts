// lib/models/Review.ts
import type { ObjectId } from "mongodb"

export interface Review {
    _id?: ObjectId
    userId: ObjectId
    packageId: ObjectId
    rating: number // 1..5
    title?: string
    body: string
    helpfulCount: number
    createdAt: Date
    updatedAt: Date
}
