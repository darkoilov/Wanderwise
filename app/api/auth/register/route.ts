// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { UserService } from "@/lib/services/userService"

// Validation schema
const RegisterSchema = z.object({
  name: z.string().trim().min(2, "Name is too short"),
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: z
      .string()
      .min(8, "Password must be at least 8 characters")
  // Optional: add complexity if you want
  // .regex(/^(?=.*[A-Z])(?=.*\d).+$/, "Add a number and uppercase letter")
})

type RegisterBody = z.infer<typeof RegisterSchema>

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = RegisterSchema.safeParse(json)

    if (!parsed.success) {
      const first = parsed.error.issues?.[0]
      return NextResponse.json({ error: first?.message ?? "Invalid payload" }, { status: 400 })
    }

    const { email, name, password } = parsed.data as RegisterBody

    // Normalize email
    const normalizedEmail = email.toLowerCase()

    // Does a user exist?
    const exists = await UserService.getUserByEmail(normalizedEmail)
    if (exists) {
      // If they registered with OAuth earlier (no passwordHash), guide them
      if (!exists.passwordHash) {
        return NextResponse.json(
            { error: "Email already registered via social login. Use 'Continue with Google'." },
            { status: 409 }
        )
      }
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Hash password (configurable cost; default 12)
    const saltRounds = Number(process.env.BCRYPT_COST ?? 12)
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user (credentials)
    const user = await UserService.createUser({
      email: normalizedEmail,
      name: name.trim(),
      image: undefined,
      passwordHash,
      role: "user",
      provider: "credentials",
      providerId: undefined,
      emailVerified: null, // TODO: set after you add email verification
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Return minimal safe user payload
    return NextResponse.json(
        { user: { id: String(user._id), email: normalizedEmail, name: user.name } },
        { status: 201 }
    )
  } catch (err) {
    console.error("Register error:", err)
    // Avoid leaking internals
    return NextResponse.json({ error: "Failed to register" }, { status: 500 })
  }
}

/*
Recommendations:
- Ensure a unique index on users.email (lowercased) in your DB.
- Add basic abuse protection (rate limit per IP/email) via middleware or a KV (e.g. Upstash).
- Add email verification flow (send token, mark emailVerified on confirm).
*/
