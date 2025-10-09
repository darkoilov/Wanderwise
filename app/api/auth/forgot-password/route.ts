// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { UserService } from "@/lib/services/userService"
import { PasswordResetService } from "@/lib/services/passwordResetService"
import { sendPasswordResetEmail } from "@/lib/mail"
import { ObjectId } from "mongodb"

const Schema = z.object({
    email: z.string().trim().toLowerCase().email("Invalid email"),
})

export async function POST(req: NextRequest) {
    try {
        const json = await req.json()
        const parsed = Schema.safeParse(json)
        if (!parsed.success) {
            // still return 200 to not leak enumeration
            return NextResponse.json({ ok: true })
        }

        const email = parsed.data.email
        const user = await UserService.getUserByEmail(email)
        if (!user?._id) {
            // do not reveal anything
            return NextResponse.json({ ok: true })
        }

        const { token, expiresAt } = await PasswordResetService.createTokenForUser(
            user._id as ObjectId,
            60,
        )

        // fire-and-forget; if it throws, still return ok
        await sendPasswordResetEmail(email, token, 60)

        return NextResponse.json({ ok: true })
    } catch (e) {
        // avoid leaking internals / enumeration
        return NextResponse.json({ ok: true })
    }
}
