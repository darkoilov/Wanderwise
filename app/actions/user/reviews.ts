"use server"

import { ObjectId } from "mongodb"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"

const createReviewSchema = z.object({
    packageId: z.string().min(1),
    rating: z.number().min(1).max(5),
    title: z.string().max(120).optional(),
    body: z.string().min(5).max(3000),
})

export async function getMyReviewsAction() {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized", items: [] }

    const db = await getDatabase()
    const items = await db
        .collection("reviews")
        .find({ userId: new ObjectId(session.user.id) })
        .sort({ createdAt: -1 })
        .toArray()

    // Normalize shape for UI
    const mapped = items.map((r) => ({
        _id: r._id,
        packageTitle: r.packageTitle,
        location: r.location,
        image: r.image,
        rating: r.rating,
        date: r.createdAt.toLocaleDateString(),
        reviewText: r.body,
        helpful: r.helpfulCount ?? 0,
    }))

    return { success: true, items: mapped }
}

export async function createReviewAction(input: z.infer<typeof createReviewSchema>) {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized" }

    const parsed = createReviewSchema.safeParse(input)
    if (!parsed.success) return { success: false, message: "Invalid data" }

    const db = await getDatabase()
    const userId = new ObjectId(session.user.id)
    const packageId = new ObjectId(parsed.data.packageId)

    // Ensure completed booking
    const booking = await db.collection("bookings").findOne({ userId, packageId, status: "completed" })
    if (!booking) return { success: false, message: "You can only review completed trips" }

    // Prevent duplicate reviews
    const existing = await db.collection("reviews").findOne({ userId, packageId })
    if (existing) return { success: false, message: "You already reviewed this package" }

    // Fetch package info (title, location, image)
    const pkg = await db.collection("packages").findOne({ _id: packageId })
    if (!pkg) return { success: false, message: "Package not found" }

    const now = new Date()
    await db.collection("reviews").insertOne({
        userId,
        packageId,
        rating: parsed.data.rating,
        title: parsed.data.title,
        body: parsed.data.body,
        helpfulCount: 0,
        packageTitle: pkg.title,
        location: pkg.location,
        image: pkg.image,
        createdAt: now,
        updatedAt: now,
    })

    return { success: true }
}

export async function deleteReviewAction(reviewId: string) {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized" }

    const db = await getDatabase()
    const res = await db.collection("reviews").deleteOne({
        _id: new ObjectId(reviewId),
        userId: new ObjectId(session.user.id),
    })
    if (!res.deletedCount) return { success: false, message: "Not found" }
    return { success: true }
}
