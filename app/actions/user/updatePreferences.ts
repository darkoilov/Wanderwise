// app/actions/user/updatePreferences.ts
"use server"

import { z } from "zod"
import { auth } from "@/lib/auth"
import { updatePreferencesSchema } from "@/lib/validation/user"
import { UserService } from "@/lib/services/userService"

export async function updatePreferencesAction(input: z.infer<typeof updatePreferencesSchema>) {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized" }

    const data = updatePreferencesSchema.safeParse(input)
    if (!data.success) return { success: false, message: "Invalid data" }

    await UserService.updatePreferences(session.user.id, data.data)
    return { success: true }
}
