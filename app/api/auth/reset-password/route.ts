// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { PasswordResetService } from "@/lib/services/passwordResetService"
import { UserService } from "@/lib/services/userService"
import { ObjectId } from "mongodb"

const Schema = z.object({
    token: z.string().min(10, "Invalid token"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const parsed = Schema.safeParse(body)
        if (!parsed.success) {
            const first = parsed.error.issues?.[0]
            return NextResponse.json({ error: first?.message ?? "Invalid payload" }, { status: 400 })
        }

        const { token, password } = parsed.data

        const doc = await PasswordResetService.findValidByToken(token)
        if (!doc) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
        }

        const userId = (doc.userId as ObjectId).toString()

        // let users with google-only accounts set a password (enables credentials login)
        await UserService.setPasswordWithoutCurrent(userId, password)

        // mark token as used and invalidate any other active tokens
        await PasswordResetService.consumeToken(doc._id!)
        // optional: best-effort invalidate other tokens
        // (reuse service or do directly)
        // not strictly necessary since we set usedAt on the exact token

        return NextResponse.json({ ok: true })
    } catch (e) {
        return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
    }
}
