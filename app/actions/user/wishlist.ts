// app/actions/user/wishlist.ts
"use server"

import { z } from "zod"
import { auth } from "@/lib/auth"
import { wishlistSchema } from "@/lib/validation/user"
import { UserService } from "@/lib/services/userService"
import { getDatabase } from "@/lib/mongodb"

export async function addToWishlistAction(input: { packageId: string }) {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized" }

    const data = wishlistSchema.safeParse(input)
    if (!data.success) return { success: false, message: "Invalid data" }

    await UserService.addToWishlist(session.user.id, data.data.packageId)
    return { success: true }
}

export async function removeFromWishlistAction(input: { packageId: string }) {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized" }

    const data = wishlistSchema.safeParse(input)
    if (!data.success) return { success: false, message: "Invalid data" }

    await UserService.removeFromWishlist(session.user.id, data.data.packageId)
    return { success: true }
}

// Helper to fetch wishlist items with package info (for UI lists)
export async function getWishlistAction() {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized", items: [] }

    const db = await getDatabase()
    const ids = await UserService.getWishlist(session.user.id)
    if (!ids.length) return { success: true, items: [] }

    // Join with packages
    const items = await db
        .collection("packages")
        .find({ _id: { $in: ids } }, { projection: { title: 1, image: 1, location: 1, duration: 1, price: 1, originalPrice: 1, rating: 1, reviews: 1 } })
        .toArray()

    return { success: true, items }
}
