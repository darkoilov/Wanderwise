// lib/services/passwordResetService.ts
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import crypto from "crypto"
import bcrypt from "bcryptjs"

type ResetTokenDoc = {
    _id?: ObjectId
    userId: ObjectId
    tokenHash: string
    createdAt: Date
    expiresAt: Date
    usedAt: Date | null
}

const COLLECTION = "password_reset_tokens"

export class PasswordResetService {
    private static async col() {
        const db = await getDatabase()
        return db.collection<ResetTokenDoc>(COLLECTION)
    }

    /** Create a single-use token for a user id */
    static async createTokenForUser(userId: ObjectId, ttlMinutes = 60) {
        const col = await this.col()

        // Invalidate any previous active tokens for this user
        await col.updateMany(
            { userId, usedAt: null, expiresAt: { $gt: new Date() } },
            { $set: { expiresAt: new Date() } },
        )

        const token = crypto.randomUUID() // opaque random string for URL
        const tokenHash = await bcrypt.hash(token, 10)

        const now = new Date()
        const expiresAt = new Date(now.getTime() + ttlMinutes * 60 * 1000)

        await col.insertOne({
            userId,
            tokenHash,
            createdAt: now,
            expiresAt,
            usedAt: null,
        })

        return { token, expiresAt }
    }

    /** Verify an incoming token, return the matched doc (not yet consumed) */
    static async findValidByToken(token: string) {
        const col = await this.col()
        // We only search active candidates; compare hashes in app
        const candidates = await col
            .find({ usedAt: null, expiresAt: { $gt: new Date() } })
            .sort({ createdAt: -1 })
            .limit(50)
            .toArray()

        for (const c of candidates) {
            const ok = await bcrypt.compare(token, c.tokenHash)
            if (ok) return c
        }
        return null
    }

    static async consumeToken(id: ObjectId) {
        const col = await this.col()
        await col.updateOne({ _id: id }, { $set: { usedAt: new Date() } })
    }
}
