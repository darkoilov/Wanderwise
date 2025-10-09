// app/actions/user/updateProfile.ts
"use server"

import { z } from "zod"
import { auth } from "@/lib/auth"
import { updateProfileSchema } from "@/lib/validation/user"
import { UserService } from "@/lib/services/userService"

export async function updateProfileAction(input: z.infer<typeof updateProfileSchema>) {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized" }

    const parsed = updateProfileSchema.safeParse(input)
    if (!parsed.success) return { success: false, message: "Invalid data" }

    await UserService.updateProfile(session.user.id, parsed.data)
    return { success: true }
}
