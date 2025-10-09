// app/actions/user/changePassword.ts
"use server"

import { z } from "zod"
import { auth } from "@/lib/auth"
import { changePasswordSchema } from "@/lib/validation/user"
import { UserService } from "@/lib/services/userService"

export async function changePasswordAction(input: z.infer<typeof changePasswordSchema>) {
    const session = await auth()
    if (!session?.user?.id) return { success: false, message: "Unauthorized" }

    const data = changePasswordSchema.safeParse(input)
    if (!data.success) return { success: false, message: "Invalid data" }

    try {
        await UserService.changePassword(session.user.id, data.data.currentPassword, data.data.newPassword)
        return { success: true }
    } catch (e: any) {
        return { success: false, message: e.message ?? "Failed to change password" }
    }
}
